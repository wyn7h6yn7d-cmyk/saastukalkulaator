import type { ChainId, Store, StoreId } from "./types";

/** Ainult poe meta — ilma tootehindade genereerimiseta (kerge client import) */
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

export const FILTER_STORE_IDS: StoreId[] = stores.map((s) => s.id);
