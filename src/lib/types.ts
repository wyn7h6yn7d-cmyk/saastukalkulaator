export type ChainId = "prisma" | "rimi" | "selver" | "maxima" | "lidl";

export type StoreId =
  | "prisma-sikupilli"
  | "rimi-ulemiste"
  | "selver-jarve"
  | "maxima-lasnamae"
  | "lidl-tahesaju";

/** @deprecated Use StoreId — kept for chain-level filter grouping */
export type { ChainId as LegacyChainId };

export interface Store {
  id: StoreId;
  chain: ChainId;
  name: string;
  address: string;
  distanceKm: number;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  defaultUnit: string;
  /** Effective shelf prices per store (derived from storeProducts) */
  prices: Record<StoreId, number>;
}

export interface StoreProduct {
  storeId: StoreId;
  productId: string;
  originalName: string;
  brand: string;
  price: number;
  unitPrice: number;
  packageSize: string;
  isDiscount: boolean;
  loyaltyPrice?: number;
  updatedAt: string;
}

export interface LineRecommendation {
  productId: string;
  productName: string;
  unit: string;
  quantity: number;
  rawLine?: string;
  bestStore: Store;
  bestPrice: number;
  lineTotal: number;
  savingsVsHighest: number;
  allPrices: { store: Store; price: number }[];
}

export interface CartOptimization {
  items: LineRecommendation[];
  optimizedTotal: number;
  highestSingleStoreTotal: number;
  savings: number;
  storeCount: number;
  preferenceLabel: string;
  storeBreakdown: { store: Store; itemCount: number; subtotal: number }[];
}

export type ShopPreference = "cheapest" | "max1" | "max2" | "max3";
