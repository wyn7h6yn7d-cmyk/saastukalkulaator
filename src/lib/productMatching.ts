import type { Product } from "./types";

/** Longer phrases first — matched via substring on normalized line */
export const KEYWORD_RULES: { keywords: string[]; productId: string }[] = [
  // Household
  {
    keywords: [
      "toilet paper",
      "tualettpaber",
      "wc-paber",
      "wc paber",
      "wc-paper",
      "tualett",
      "wc",
    ],
    productId: "wc-paber",
  },
  {
    keywords: [
      "dish soap",
      "dishwashing",
      "nõudepesuvahend",
      "noudipesuvahend",
      "nõudepesu",
    ],
    productId: "noudipesuvahend",
  },
  {
    keywords: ["laundry detergent", "pesugeel", "pesuvahend"],
    productId: "pesugeel",
  },

  // Pets
  { keywords: ["cat food", "kassitoit", "kassi toit"], productId: "kassitoit" },
  { keywords: ["dog food", "koeratoit", "koera toit"], productId: "koeratoit" },

  // Meat
  {
    keywords: ["chicken breast", "chicken fillet", "kanafilee", "kanafille", "kana filee"],
    productId: "kanafilee",
  },
  { keywords: ["minced meat", "ground beef", "hakkliha", "hakklih"], productId: "hakkliha" },
  { keywords: ["peekon", "bacon"], productId: "peekon" },
  { keywords: ["vorst", "sausage"], productId: "vorst" },
  { keywords: ["sink", "ham", "vorstik"], productId: "sink" },
  { keywords: ["kana", "chicken"], productId: "kanafilee" },

  // Basic
  { keywords: ["milk", "piim"], productId: "piim" },
  { keywords: ["eggs", "egg", "munad", "muna"], productId: "munad" },
  { keywords: ["rye bread", "rukkileib", "leib", "bread"], productId: "leib" },
  { keywords: ["white bread", "sai"], productId: "sai" },
  { keywords: ["butter", "või", "voi"], productId: "või" },
  { keywords: ["cheese", "juust", "gouda"], productId: "juust" },
  { keywords: ["sour cream", "hapukoor"], productId: "hapukoor" },
  { keywords: ["yogurt", "yoghurt", "jogurt"], productId: "jogurt" },

  // Dry
  { keywords: ["rice", "riis"], productId: "riis" },
  { keywords: ["pasta", "spaghetti", "makaron", "makaronid", "noodles"], productId: "pasta" },
  { keywords: ["buckwheat", "tatar"], productId: "tatar" },
  { keywords: ["oatmeal", "oats", "kaerahelbed", "kaerahelb"], productId: "kaerahelbed" },
  { keywords: ["flour", "jahu"], productId: "jahu" },
  { keywords: ["sugar", "suhkur"], productId: "suhkur" },

  // Produce
  { keywords: ["banana", "banaan", "banaanid"], productId: "banaan" },
  { keywords: ["apple", "õun", "oun", "õunad"], productId: "õun" },
  { keywords: ["potato", "potatoes", "kartul", "kartulid"], productId: "kartul" },
  { keywords: ["cucumber", "kurk"], productId: "kurk" },
  { keywords: ["tomato", "tomatoes", "tomat", "tomatid"], productId: "tomat" },
  { keywords: ["carrot", "porgand", "porgandid"], productId: "porgand" },
  { keywords: ["onion", "sibul", "sibulad"], productId: "sibul" },
  { keywords: ["salad", "salat"], productId: "salat" },

  // Drinks
  { keywords: ["coffee", "kohv"], productId: "kohv" },
  { keywords: ["tea", "tee"], productId: "tee" },
  { keywords: ["mineral water", "mineraalvesi", "mineralvesi"], productId: "mineraalvesi" },
  { keywords: ["juice", "mahl"], productId: "mahl" },
];

/** Eelarvutatud — ei sorteeri igal renderil / matchil uuesti */
const RULES_BY_KEYWORD_LENGTH = KEYWORD_RULES.map((rule) => ({
  productId: rule.productId,
  keywords: [...rule.keywords].sort((a, b) => b.length - a.length),
})).sort(
  (a, b) =>
    Math.max(...b.keywords.map((k) => k.length)) -
    Math.max(...a.keywords.map((k) => k.length)),
);

export function normalizeSearchText(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-zäöüõ0-9\s-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Match shopping-list line to catalog product id */
export function matchProductIdFromText(text: string): string | null {
  const lower = text.toLowerCase();

  for (const rule of RULES_BY_KEYWORD_LENGTH) {
    for (const kw of rule.keywords) {
      if (lower.includes(kw)) return rule.productId;
    }
  }

  return null;
}

export function findProductByName(
  query: string,
  productMap: Record<string, Product>,
): Product | undefined {
  const normalized = normalizeSearchText(query);
  if (!normalized) return undefined;

  const fromRules =
    matchProductIdFromText(normalized) ??
    matchProductIdFromText(normalized.split(" ")[0] ?? "");
  if (fromRules && productMap[fromRules]) {
    return productMap[fromRules];
  }

  const products = Object.values(productMap);
  return products.find(
    (p) =>
      p.id === normalized ||
      normalized.includes(p.id) ||
      p.name.toLowerCase().includes(normalized) ||
      normalized.includes(p.name.toLowerCase()),
  );
}
