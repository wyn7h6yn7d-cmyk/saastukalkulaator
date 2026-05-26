import {
  CHAIN_LABEL,
  PRODUCT_SEEDS,
  STORE_BY_CHAIN,
} from "./productCatalog";
import { findProductByName as findProduct } from "./productMatching";
import type {
  ChainId,
  Product,
  Store,
  StoreId,
  StoreProduct,
} from "./types";

const UPDATED_AT = "2026-05-20T08:00:00.000Z";

export const CHAINS: ChainId[] = ["prisma", "rimi", "selver", "maxima", "lidl"];

export const CHAIN_COLORS: Record<ChainId, string> = {
  prisma: "#FF6B00",
  rimi: "#E30613",
  selver: "#00A651",
  maxima: "#0054A6",
  lidl: "#0050AA",
};

export const stores: Store[] = [
  {
    id: "prisma-sikupilli",
    chain: "prisma",
    name: "Prisma Sikupilli",
    address: "Tartu mnt 87, Tallinn",
    distanceKm: 2.4,
    color: CHAIN_COLORS.prisma,
  },
  {
    id: "rimi-ulemiste",
    chain: "rimi",
    name: "Rimi Ülemiste",
    address: "Suur-Sõjamäe 4, Tallinn",
    distanceKm: 3.1,
    color: CHAIN_COLORS.rimi,
  },
  {
    id: "selver-jarve",
    chain: "selver",
    name: "Selver Järve",
    address: "Pärnu mnt 238, Tallinn",
    distanceKm: 4.2,
    color: CHAIN_COLORS.selver,
  },
  {
    id: "maxima-lasnamae",
    chain: "maxima",
    name: "Maxima XXX Lasnamäe",
    address: "Linnamäe tee 57, Tallinn",
    distanceKm: 5.0,
    color: CHAIN_COLORS.maxima,
  },
  {
    id: "lidl-tahesaju",
    chain: "lidl",
    name: "Lidl Tähesaju",
    address: "Tähesaju tee 4, Tallinn",
    distanceKm: 3.8,
    color: CHAIN_COLORS.lidl,
  },
];

function parsePackageAmount(packageSize: string): number {
  const normalized = packageSize.toLowerCase().replace(",", ".");

  const kg = normalized.match(/([\d.]+)\s*kg/);
  if (kg) return parseFloat(kg[1]!);

  const gOnly = normalized.match(/([\d.]+)\s*g(?!r)/);
  if (gOnly && !normalized.includes("kg")) {
    return parseFloat(gOnly[1]!) / 1000;
  }

  const liters = normalized.match(/([\d.]+)\s*l/);
  if (liters) return parseFloat(liters[1]!);

  const count = normalized.match(/([\d.]+)\s*tk/);
  if (count) return parseFloat(count[1]!);

  const rolls = normalized.match(/([\d.]+)\s*rulli/);
  if (rolls) return parseFloat(rolls[1]!);

  return 1;
}

function computeUnitPrice(price: number, packageSize: string): number {
  const amount = parsePackageAmount(packageSize);
  if (amount <= 0) return price;
  return Math.round((price / amount) * 100) / 100;
}

function buildStoreProducts(): StoreProduct[] {
  const items: StoreProduct[] = [];

  for (const seed of PRODUCT_SEEDS) {
    for (const chain of CHAINS) {
      const storeId = STORE_BY_CHAIN[chain] as StoreId;
      const price = seed.prices[chain];
      const isDiscount = seed.discountAt?.includes(chain) ?? false;
      const loyaltyPrice = seed.loyaltyAt?.[chain];
      const brand =
        seed.brand === "—" ? CHAIN_LABEL[chain] : seed.brand;

      items.push({
        storeId,
        productId: seed.id,
        originalName: `${seed.name} ${seed.packageSize}`,
        brand,
        price,
        unitPrice: computeUnitPrice(price, seed.packageSize),
        packageSize: seed.packageSize,
        isDiscount,
        loyaltyPrice,
        updatedAt: UPDATED_AT,
      });
    }
  }

  return items;
}

/** Price used for cart optimization (best available to customer). */
export function getEffectivePrice(sp: StoreProduct): number {
  if (sp.loyaltyPrice != null && sp.loyaltyPrice < sp.price) {
    return sp.loyaltyPrice;
  }
  return sp.price;
}

export const storeProducts: StoreProduct[] = buildStoreProducts();

export const products: Product[] = PRODUCT_SEEDS.map((seed) => ({
  id: seed.id,
  name: seed.name,
  defaultUnit: seed.defaultUnit,
  prices: Object.fromEntries(
    stores.map((store) => {
      const sp = storeProducts.find(
        (row) => row.storeId === store.id && row.productId === seed.id,
      )!;
      return [store.id, getEffectivePrice(sp)];
    }),
  ) as Record<StoreId, number>,
}));

// ——— Backward-compatible exports ———

export const STORES = stores;
export const PRODUCTS = products;

export const STORE_MAP = Object.fromEntries(
  stores.map((s) => [s.id, s]),
) as Record<StoreId, Store>;

export const PRODUCT_MAP = Object.fromEntries(
  products.map((p) => [p.id, p]),
) as Record<string, Product>;

export const STORE_PRODUCT_MAP = Object.fromEntries(
  storeProducts.map((sp) => [`${sp.storeId}:${sp.productId}`, sp]),
) as Record<string, StoreProduct>;

export const FILTER_STORE_IDS: StoreId[] = stores.map((s) => s.id);

export const FILTER_CHAIN_IDS: ChainId[] = [...CHAINS];

export function getStoreProduct(
  storeId: StoreId,
  productId: string,
): StoreProduct | undefined {
  return STORE_PRODUCT_MAP[`${storeId}:${productId}`];
}

export function getStoreProductsForProduct(productId: string): StoreProduct[] {
  return storeProducts.filter((sp) => sp.productId === productId);
}

export function getStoresByChain(chain: ChainId): Store[] {
  return stores.filter((s) => s.chain === chain);
}

export function getStoreIdsByChains(chainIds: ChainId[]): StoreId[] {
  return stores.filter((s) => chainIds.includes(s.chain)).map((s) => s.id);
}

export function findProductByName(query: string): Product | undefined {
  return findProduct(query, PRODUCT_MAP);
}
