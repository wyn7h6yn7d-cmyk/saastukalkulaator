import {
  getEffectivePrice,
  getStoreProduct,
  getStoresByChain,
  PRODUCT_MAP,
  stores,
} from "./mockData";
import type { ChainId, Store, StoreId } from "./types";

// ——— Types ———

export interface ParsedListItem {
  rawText: string;
  normalizedName: string | null;
  quantityText: string;
  productId: string | null;
  quantity: number;
  matched: boolean;
}

export interface OptimizerItem {
  productId: string;
  productName: string;
  quantity: number;
  rawText: string;
}

export interface MissingProduct {
  productId: string;
  productName: string;
}

export interface AllInOneStoreOption {
  store: Store;
  chain: ChainId;
  total: number;
  missing: MissingProduct[];
  complete: boolean;
}

export interface SplitLineItem {
  productId: string;
  productName: string;
  quantity: number;
  rawText: string;
  originalName: string;
  brand: string;
  unitPrice: number;
  lineTotal: number;
  shelfPrice: number;
  isDiscount: boolean;
  loyaltyPrice?: number;
}

export interface StoreSplitGroup {
  store: Store;
  items: SplitLineItem[];
  subtotal: number;
}

export interface CheapestSplitResult {
  groups: StoreSplitGroup[];
  total: number;
  storeCount: number;
}

export interface SavingsResult {
  vsCheapestAllInOne: number;
  vsMostExpensiveAllInOne: number;
}

export interface OptimizationResult {
  parsed: ParsedListItem[];
  allInOneOptions: AllInOneStoreOption[];
  cheapestAllInOne: AllInOneStoreOption;
  mostExpensiveAllInOne: AllInOneStoreOption;
  split: CheapestSplitResult;
  savings: SavingsResult;
  message: string;
}

// ——— Keyword matching ———

const KEYWORD_RULES: { keywords: string[]; productId: string }[] = [
  { keywords: ["kanafilee", "kana"], productId: "kanafilee" },
  { keywords: ["munad", "mun"], productId: "munad" },
  { keywords: ["piim"], productId: "piim" },
  { keywords: ["riis"], productId: "riis" },
  { keywords: ["kohv"], productId: "kohv" },
  { keywords: ["banaan"], productId: "banaan" },
  { keywords: ["juust"], productId: "juust" },
  { keywords: ["hakkliha", "hakklih"], productId: "hakkliha" },
  { keywords: ["kurk"], productId: "kurk" },
  { keywords: ["tomat"], productId: "tomat" },
  { keywords: ["pasta", "makaron"], productId: "pasta" },
  { keywords: ["leib"], productId: "leib" },
  { keywords: ["sai"], productId: "sai" },
  { keywords: ["või", "voi"], productId: "või" },
  { keywords: ["jogurt"], productId: "jogurt" },
  { keywords: ["kartul"], productId: "kartul" },
  { keywords: ["wc-paber", "wc paber", "tualettpaber"], productId: "wc-paber" },
  { keywords: ["pesugeel"], productId: "pesugeel" },
  { keywords: ["õun", "oun"], productId: "õun" },
  { keywords: ["hapukoor"], productId: "hapukoor" },
];

function extractQuantityText(line: string): string {
  const match = line.trim().match(/(\d+\s*(?:l|kg|g|tk|ml|tl))/i);
  return match ? match[1]!.replace(/\s+/g, "") : "1";
}

function parseQuantityNumber(quantityText: string): number {
  const match = quantityText.match(/^(\d+)/);
  if (!match) return 1;

  const num = parseInt(match[1]!, 10);
  const unit = quantityText.replace(/^\d+/, "").toLowerCase();

  if (unit === "l" || unit === "kg") return Math.max(1, num);
  return 1;
}

function matchProductId(line: string): string | null {
  const lower = line.toLowerCase();

  for (const rule of KEYWORD_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.productId;
    }
  }

  return null;
}

// ——— 1. Parse shopping list ———

export function parseShoppingList(input: string): ParsedListItem[] {
  const result: ParsedListItem[] = [];

  for (const rawLine of input.split("\n")) {
    const rawText = rawLine.trim();
    if (!rawText) continue;

    const quantityText = extractQuantityText(rawText);
    const quantity = parseQuantityNumber(quantityText);
    const productId = matchProductId(rawText);
    const product = productId ? PRODUCT_MAP[productId] : undefined;

    result.push({
      rawText,
      normalizedName: product?.name ?? null,
      quantityText,
      productId: product ? productId : null,
      quantity,
      matched: Boolean(product),
    });
  }

  return result;
}

export function toOptimizerItems(parsed: ParsedListItem[]): OptimizerItem[] {
  return parsed
    .filter((p) => p.matched && p.productId)
    .map((p) => ({
      productId: p.productId!,
      productName: PRODUCT_MAP[p.productId!]!.name,
      quantity: p.quantity,
      rawText: p.rawText,
    }));
}

// ——— Helpers ———

function getSelectedStores(chains: ChainId[]): Store[] {
  const selected: Store[] = [];
  for (const chain of chains) {
    const chainStores = getStoresByChain(chain);
    if (chainStores[0]) selected.push(chainStores[0]);
  }
  return selected;
}

function getPriceAtStore(
  productId: string,
  storeId: StoreId,
): number | null {
  const sp = getStoreProduct(storeId, productId);
  if (!sp) return null;
  return getEffectivePrice(sp);
}

function getPricesAtSelectedStores(
  productId: string,
  selectedStores: Store[],
): { store: Store; price: number }[] {
  return selectedStores
    .map((store) => {
      const price = getPriceAtStore(productId, store.id);
      if (price === null) return null;
      return { store, price };
    })
    .filter((row): row is { store: Store; price: number } => row !== null)
    .sort((a, b) => a.price - b.price);
}

// ——— 2. All-in-one store options ———

export function getAllInOneStoreOptions(
  items: OptimizerItem[],
  selectedStoreChains: ChainId[],
): AllInOneStoreOption[] {
  const selectedStores = getSelectedStores(selectedStoreChains);
  const options: AllInOneStoreOption[] = [];

  for (const store of selectedStores) {
    const missing: MissingProduct[] = [];
    let total = 0;

    for (const item of items) {
      const price = getPriceAtStore(item.productId, store.id);
      if (price === null) {
        missing.push({
          productId: item.productId,
          productName: item.productName,
        });
        continue;
      }
      total += price * item.quantity;
    }

    options.push({
      store,
      chain: store.chain,
      total,
      missing,
      complete: missing.length === 0,
    });
  }

  return options.sort((a, b) => {
    if (a.complete !== b.complete) return a.complete ? -1 : 1;
    return a.total - b.total;
  });
}

// ——— 3. Cheapest split ———

type ItemAssignment = {
  item: OptimizerItem;
  store: Store;
  price: number;
};

function assignCheapestPerItem(
  items: OptimizerItem[],
  selectedStores: Store[],
): ItemAssignment[] {
  return items.map((item) => {
    const prices = getPricesAtSelectedStores(item.productId, selectedStores);
    const best = prices[0]!;
    return { item, store: best.store, price: best.price };
  });
}

function savingsForStore(
  assignments: ItemAssignment[],
  storeId: StoreId,
  selectedStores: Store[],
): number {
  let savings = 0;

  for (const row of assignments) {
    if (row.store.id !== storeId) continue;

    const prices = getPricesAtSelectedStores(
      row.item.productId,
      selectedStores,
    );
    if (prices.length < 2) continue;

    const secondCheapest = prices[1]!.price;
    savings += (secondCheapest - row.price) * row.item.quantity;
  }

  return savings;
}

function reduceToMaxStores(
  assignments: ItemAssignment[],
  selectedStores: Store[],
  maxStores: number,
): ItemAssignment[] {
  const storeIds = [...new Set(assignments.map((a) => a.store.id))];
  if (storeIds.length <= maxStores) return assignments;

  const ranked = storeIds
    .map((id) => ({
      storeId: id,
      savings: savingsForStore(assignments, id, selectedStores),
    }))
    .sort((a, b) => b.savings - a.savings);

  const keptIds = new Set(
    ranked.slice(0, maxStores).map((r) => r.storeId),
  );
  const keptStores = selectedStores.filter((s) => keptIds.has(s.id));

  return assignments.map((row) => {
    if (keptIds.has(row.store.id)) return row;

    const prices = getPricesAtSelectedStores(
      row.item.productId,
      keptStores.length > 0 ? keptStores : selectedStores,
    );
    const best = prices[0]!;
    return { item: row.item, store: best.store, price: best.price };
  });
}

function groupAssignments(assignments: ItemAssignment[]): CheapestSplitResult {
  const groupMap = new Map<StoreId, StoreSplitGroup>();

  for (const { item, store, price } of assignments) {
    const sp = getStoreProduct(store.id, item.productId)!;
    const lineTotal = price * item.quantity;
    const line: SplitLineItem = {
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      rawText: item.rawText,
      originalName: sp.originalName,
      brand: sp.brand,
      unitPrice: price,
      lineTotal,
      shelfPrice: sp.price,
      isDiscount: sp.isDiscount,
      loyaltyPrice: sp.loyaltyPrice,
    };

    const existing = groupMap.get(store.id);
    if (existing) {
      existing.items.push(line);
      existing.subtotal += lineTotal;
    } else {
      groupMap.set(store.id, {
        store,
        items: [line],
        subtotal: lineTotal,
      });
    }
  }

  const groups = [...groupMap.values()].sort((a, b) => b.subtotal - a.subtotal);
  const total = groups.reduce((sum, g) => sum + g.subtotal, 0);

  return {
    groups,
    total,
    storeCount: groups.length,
  };
}

export function getCheapestSplit(
  items: OptimizerItem[],
  selectedStoreChains: ChainId[],
  maxStores: number,
): CheapestSplitResult {
  const selectedStores = getSelectedStores(selectedStoreChains);

  if (items.length === 0 || selectedStores.length === 0) {
    return { groups: [], total: 0, storeCount: 0 };
  }

  const effectiveMax = Math.max(
    1,
    Math.min(maxStores, selectedStores.length),
  );

  let assignments = assignCheapestPerItem(items, selectedStores);
  assignments = reduceToMaxStores(
    assignments,
    selectedStores,
    effectiveMax,
  );

  return groupAssignments(assignments);
}

// ——— 4. Savings ———

export function calculateSavings(
  bestSplitTotal: number,
  cheapestAllInOneTotal: number,
  mostExpensiveAllInOneTotal: number,
): SavingsResult {
  return {
    vsCheapestAllInOne: Math.max(0, cheapestAllInOneTotal - bestSplitTotal),
    vsMostExpensiveAllInOne: Math.max(
      0,
      mostExpensiveAllInOneTotal - bestSplitTotal,
    ),
  };
}

// ——— 5. Recommendation message ———

export function getRecommendationMessage(savings: SavingsResult): string {
  const amount = savings.vsCheapestAllInOne;

  if (amount < 2) {
    return "Mitme poe vahel jagamine ei pruugi seekord ära tasuda.";
  }
  if (amount <= 7) {
    return "Kahe poe vahel jagamine võib olla mõistlik.";
  }
  return "Seekord tasub ostud mitme poe vahel jagada.";
}

// ——— Full optimization pipeline ———

export function preferenceToMaxStores(
  preference: "cheapest" | "max1" | "max2" | "max3",
  chainCount: number,
): number {
  switch (preference) {
    case "cheapest":
      return chainCount;
    case "max1":
      return 1;
    case "max2":
      return 2;
    case "max3":
      return 3;
  }
}

export function runOptimization(
  listText: string,
  selectedChains: ChainId[],
  preference: "cheapest" | "max1" | "max2" | "max3",
): OptimizationResult | null {
  const parsed = parseShoppingList(listText);
  const items = toOptimizerItems(parsed);

  if (items.length === 0) return null;

  const allInOneOptions = getAllInOneStoreOptions(items, selectedChains);
  const completeOptions = allInOneOptions.filter((o) => o.complete);

  if (completeOptions.length === 0) return null;

  const cheapestAllInOne = completeOptions[0]!.total;
  const mostExpensiveAllInOne =
    completeOptions[completeOptions.length - 1]!.total;

  const maxStores = preferenceToMaxStores(
    preference,
    selectedChains.length,
  );
  const split = getCheapestSplit(items, selectedChains, maxStores);

  const savings = calculateSavings(
    split.total,
    cheapestAllInOne,
    mostExpensiveAllInOne,
  );

  return {
    parsed,
    allInOneOptions,
    cheapestAllInOne: completeOptions[0]!,
    mostExpensiveAllInOne: completeOptions[completeOptions.length - 1]!,
    split,
    savings,
    message: getRecommendationMessage(savings),
  };
}
