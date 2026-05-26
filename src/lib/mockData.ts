import {
  CHAIN_LABEL,
  PRODUCT_SEEDS,
  STORE_BY_CHAIN,
} from "./productCatalog";
import { findProductByName as findProduct } from "./productMatching";
import { stores } from "./storesData";
import type {
  ChainId,
  Product,
  Store,
  StoreId,
  StoreProduct,
} from "./types";

const UPDATED_AT = "2026-05-20T08:00:00.000Z";

export const CHAINS: ChainId[] = ["prisma", "rimi", "selver", "maxima", "lidl"];

export { stores, CHAIN_COLORS, FILTER_STORE_IDS } from "./storesData";

function parsePackageAmount(packageSize: string): number {
  const normalized = packageSize.toLowerCase().replace(",", ".");
  const kg = normalized.match(/([\d.]+)\s*kg/);
  if (kg) return parseFloat(kg[1]!);
  const gOnly = normalized.match(/([\d.]+)\s*g(?!r)/);
  if (gOnly && !normalized.includes("kg")) return parseFloat(gOnly[1]!) / 1000;
  const liters = normalized.match(/([\d.]+)\s*l/);
  if (liters) return parseFloat(liters[1]!);
  const count = normalized.match(/([\d.]+)\s*tk/);
  if (count) return parseFloat(count[1]!);
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
      items.push({
        storeId,
        productId: seed.id,
        originalName: `${seed.name} ${seed.packageSize}`,
        brand: seed.brand === "—" ? CHAIN_LABEL[chain] : seed.brand,
        price,
        unitPrice: computeUnitPrice(price, seed.packageSize),
        packageSize: seed.packageSize,
        isDiscount: seed.discountAt?.includes(chain) ?? false,
        loyaltyPrice: seed.loyaltyAt?.[chain],
        updatedAt: UPDATED_AT,
      });
    }
  }

  return items;
}

export function getEffectivePrice(sp: StoreProduct): number {
  if (sp.loyaltyPrice != null && sp.loyaltyPrice < sp.price) {
    return sp.loyaltyPrice;
  }
  return sp.price;
}

export const storeProducts: StoreProduct[] = buildStoreProducts();

export const STORE_PRODUCT_MAP = Object.fromEntries(
  storeProducts.map((sp) => [`${sp.storeId}:${sp.productId}`, sp]),
) as Record<string, StoreProduct>;

export const products: Product[] = PRODUCT_SEEDS.map((seed) => ({
  id: seed.id,
  name: seed.name,
  defaultUnit: seed.defaultUnit,
  prices: Object.fromEntries(
    stores.map((store) => {
      const sp = STORE_PRODUCT_MAP[`${store.id}:${seed.id}`]!;
      return [store.id, getEffectivePrice(sp)];
    }),
  ) as Record<StoreId, number>,
}));

export const STORES = stores;
export const PRODUCTS = products;

export const STORE_MAP = Object.fromEntries(
  stores.map((s) => [s.id, s]),
) as Record<StoreId, Store>;

export const PRODUCT_MAP = Object.fromEntries(
  products.map((p) => [p.id, p]),
) as Record<string, Product>;

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
