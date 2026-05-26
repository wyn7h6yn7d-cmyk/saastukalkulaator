import type { ChainId } from "./types";

export const CHAIN_LABELS: Record<ChainId, string> = {
  prisma: "Prisma",
  rimi: "Rimi",
  selver: "Selver",
  maxima: "Maxima",
  lidl: "Lidl",
};

/** Placeholder opening hours until real data is available */
export const OPENING_HOURS_PLACEHOLDER = "E–P 9:00–22:00";
