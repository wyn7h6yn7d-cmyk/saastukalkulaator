import {
  getEffectivePrice,
  getStoreProduct,
  PRODUCT_MAP,
  STORE_MAP,
  stores,
} from "./mockData";
import type {
  CartOptimization,
  LineRecommendation,
  ShopPreference,
  Store,
  StoreId,
} from "./types";

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface OptimizeOptions {
  allowedStoreIds: StoreId[];
  preference: ShopPreference;
}

const PREFERENCE_LABELS: Record<ShopPreference, string> = {
  cheapest: "Odavaim hind (poode ei piira)",
  max1: "Maksimaalselt 1 pood",
  max2: "Maksimaalselt 2 poodi",
  max3: "Maksimaalselt 3 poodi",
};

function combinations<T>(items: T[], size: number): T[][] {
  if (size === 0) return [[]];
  if (items.length < size) return [];

  const [first, ...rest] = items;
  const withFirst = combinations(rest, size - 1).map((c) => [first!, ...c]);
  const withoutFirst = combinations(rest, size);
  return [...withFirst, ...withoutFirst];
}

function getAllowedStores(ids: StoreId[]): Store[] {
  return stores.filter((s) => ids.includes(s.id));
}

function linePrice(
  productId: string,
  storeId: StoreId,
  quantity: number,
): number {
  const sp = getStoreProduct(storeId, productId);
  if (!sp) return Infinity;
  return getEffectivePrice(sp) * quantity;
}

function totalAtStore(
  lines: CartLine[],
  storeId: StoreId,
  allowedIds: StoreId[],
): number {
  if (!allowedIds.includes(storeId)) return Infinity;
  return lines.reduce(
    (sum, line) => sum + linePrice(line.productId, storeId, line.quantity),
    0,
  );
}

function getPricesForProduct(
  productId: string,
  allowed: Store[],
): { store: Store; price: number }[] {
  return allowed
    .map((store) => {
      const sp = getStoreProduct(store.id, productId);
      if (!sp) return null;
      return { store, price: getEffectivePrice(sp) };
    })
    .filter((row): row is { store: Store; price: number } => row !== null)
    .sort((a, b) => a.price - b.price);
}

function buildOptimization(
  lines: CartLine[],
  assignments: StoreId[],
  allowed: Store[],
  preference: ShopPreference,
): CartOptimization {
  const items: LineRecommendation[] = lines.map((line, index) => {
    const product = PRODUCT_MAP[line.productId]!;
    const allPrices = getPricesForProduct(line.productId, allowed);
    const assignedId = assignments[index]!;
    const assignedStore = STORE_MAP[assignedId];
    const sp = getStoreProduct(assignedId, line.productId)!;
    const bestPrice = getEffectivePrice(sp);
    const highest = allPrices[allPrices.length - 1]!;

    return {
      productId: line.productId,
      productName: product.name,
      unit: product.defaultUnit,
      quantity: line.quantity,
      bestStore: assignedStore,
      bestPrice,
      lineTotal: bestPrice * line.quantity,
      savingsVsHighest: (highest.price - bestPrice) * line.quantity,
      allPrices,
    };
  });

  const optimizedTotal = items.reduce((s, i) => s + i.lineTotal, 0);

  const allowedIds = allowed.map((s) => s.id);
  const storeTotals = allowed.map((store) => ({
    store,
    total: totalAtStore(lines, store.id, allowedIds),
  }));
  const highestSingleStoreTotal = Math.max(...storeTotals.map((s) => s.total));

  const breakdownMap = new Map<
    string,
    { store: Store; itemCount: number; subtotal: number }
  >();

  for (const item of items) {
    const key = item.bestStore.id;
    const existing = breakdownMap.get(key);
    if (existing) {
      existing.itemCount += 1;
      existing.subtotal += item.lineTotal;
    } else {
      breakdownMap.set(key, {
        store: item.bestStore,
        itemCount: 1,
        subtotal: item.lineTotal,
      });
    }
  }

  const storeBreakdown = [...breakdownMap.values()].sort(
    (a, b) => b.subtotal - a.subtotal,
  );

  return {
    items,
    optimizedTotal,
    highestSingleStoreTotal,
    savings: Math.max(0, highestSingleStoreTotal - optimizedTotal),
    storeCount: storeBreakdown.length,
    preferenceLabel: PREFERENCE_LABELS[preference],
    storeBreakdown,
  };
}

function optimizePerItem(
  lines: CartLine[],
  allowed: Store[],
  preference: ShopPreference,
): CartOptimization {
  const assignments = lines.map((line) => {
    const prices = getPricesForProduct(line.productId, allowed);
    return prices[0]!.store.id;
  });
  return buildOptimization(lines, assignments, allowed, preference);
}

function optimizeWithStoreLimit(
  lines: CartLine[],
  allowed: Store[],
  maxStores: number,
  preference: ShopPreference,
): CartOptimization {
  const storeIds = allowed.map((s) => s.id);
  const k = Math.min(maxStores, storeIds.length);

  if (k === 1) {
    let bestStoreId = storeIds[0]!;
    let bestTotal = Infinity;
    for (const sid of storeIds) {
      const total = totalAtStore(lines, sid, storeIds);
      if (total < bestTotal) {
        bestTotal = total;
        bestStoreId = sid;
      }
    }
    const assignments = lines.map(() => bestStoreId);
    return buildOptimization(lines, assignments, allowed, preference);
  }

  const combos = combinations(storeIds, k);
  let bestAssignments: StoreId[] = [];
  let bestTotal = Infinity;

  for (const combo of combos) {
    const assignments: StoreId[] = [];
    let total = 0;

    for (const line of lines) {
      let minPrice = Infinity;
      let chosen = combo[0]!;
      for (const sid of combo) {
        const price = linePrice(line.productId, sid, line.quantity);
        if (price < minPrice) {
          minPrice = price;
          chosen = sid;
        }
      }
      assignments.push(chosen);
      total += minPrice;
    }

    if (total < bestTotal) {
      bestTotal = total;
      bestAssignments = assignments;
    }
  }

  return buildOptimization(lines, bestAssignments, allowed, preference);
}

export function optimizeCart(
  lines: CartLine[],
  options: OptimizeOptions,
): CartOptimization | null {
  const validLines = lines.filter(
    (l) => l.quantity > 0 && PRODUCT_MAP[l.productId],
  );
  if (validLines.length === 0) return null;

  const allowed = getAllowedStores(options.allowedStoreIds);
  if (allowed.length === 0) return null;

  switch (options.preference) {
    case "cheapest":
      return optimizePerItem(validLines, allowed, options.preference);
    case "max1":
      return optimizeWithStoreLimit(validLines, allowed, 1, options.preference);
    case "max2":
      return optimizeWithStoreLimit(validLines, allowed, 2, options.preference);
    case "max3":
      return optimizeWithStoreLimit(validLines, allowed, 3, options.preference);
  }
}

export { PREFERENCE_LABELS };
