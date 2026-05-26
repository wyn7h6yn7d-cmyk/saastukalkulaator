import type { CartLine } from "./optimizeCart";
import { parseShoppingList as parseList, toOptimizerItems } from "./optimizer";

export interface ParsedShoppingList {
  lines: CartLine[];
  unmatched: string[];
  matchedLabels: { raw: string; productId: string; quantity: number }[];
}

/** @deprecated Prefer `parseShoppingList` from `@/lib/optimizer` */
export function parseShoppingList(text: string): ParsedShoppingList {
  const parsed = parseList(text);
  const items = toOptimizerItems(parsed);
  const unmatched = parsed.filter((p) => !p.matched).map((p) => p.rawText);

  return {
    lines: items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
    unmatched,
    matchedLabels: items.map((item) => ({
      raw: item.rawText,
      productId: item.productId,
      quantity: item.quantity,
    })),
  };
}

export const DEFAULT_LIST_TEXT = `piim 2l
munad 10tk
kanafilee 600g
riis 1kg
kohv 500g
banaan 1kg`;
