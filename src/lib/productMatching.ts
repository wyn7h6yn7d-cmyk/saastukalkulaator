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
  { keywords: ["shampoo", "šampoon", "sampoon"], productId: "šampoon" },
  { keywords: ["toothpaste", "hambapasta"], productId: "hambapasta" },
  { keywords: ["prügikott", "prugikott", "garbage bag"], productId: "prugikott" },
  { keywords: ["paberkott", "paper bag"], productId: "paberkott" },
  { keywords: ["küürivahend", "kuurigivahend", "cleaner", "cif"], productId: "kuurigivahend" },

  // Pets
  { keywords: ["cat food", "kassitoit", "kassi toit"], productId: "kassitoit" },
  { keywords: ["dog food", "koeratoit", "koera toit"], productId: "koeratoit" },
  { keywords: ["kassiliiv", "cat litter"], productId: "kassiliiv" },
  { keywords: ["koeramaius", "dog treat"], productId: "koeramaius" },

  // Meat
  {
    keywords: ["chicken breast", "chicken fillet", "kanafilee", "kanafille", "kana filee"],
    productId: "kanafilee",
  },
  { keywords: ["minced meat", "ground beef", "hakkliha", "hakklih"], productId: "hakkliha" },
  { keywords: ["kanatiivad", "chicken wings", "chicken thigh"], productId: "kanatiivad" },
  { keywords: ["lihapallid", "meatballs"], productId: "lihapallid" },
  { keywords: ["pork", "sealiha", "sealiha"], productId: "sealiha" },
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
  { keywords: ["cottage cheese", "kohupiim"], productId: "kohupiim" },
  { keywords: ["smetana", "cream"], productId: "smetana" },
  { keywords: ["lard", "rasv"], productId: "rasv" },
  { keywords: ["honey", "mett", "mesi"], productId: "mett" },

  // Dry
  { keywords: ["rice", "riis"], productId: "riis" },
  { keywords: ["pasta", "spaghetti", "makaron", "makaronid", "noodles"], productId: "pasta" },
  { keywords: ["buckwheat", "tatar"], productId: "tatar" },
  { keywords: ["oatmeal", "oats", "kaerahelbed", "kaerahelb"], productId: "kaerahelbed" },
  { keywords: ["flour", "jahu"], productId: "jahu" },
  { keywords: ["sugar", "suhkur"], productId: "suhkur" },
  { keywords: ["peas", "hernes", "herned"], productId: "hernes" },
  { keywords: ["beans", "uba", "oad"], productId: "uba" },
  { keywords: ["breadcrumbs", "riivsai"], productId: "riivsai" },
  { keywords: ["couscous", "kuskuss"], productId: "kuskuss" },

  // Produce
  { keywords: ["banana", "banaan", "banaanid"], productId: "banaan" },
  { keywords: ["apple", "õun", "oun", "õunad"], productId: "õun" },
  { keywords: ["potato", "potatoes", "kartul", "kartulid"], productId: "kartul" },
  { keywords: ["cucumber", "kurk"], productId: "kurk" },
  { keywords: ["tomato", "tomatoes", "tomat", "tomatid"], productId: "tomat" },
  { keywords: ["carrot", "porgand", "porgandid"], productId: "porgand" },
  { keywords: ["onion", "sibul", "sibulad"], productId: "sibul" },
  { keywords: ["orange", "apelsin"], productId: "apelsin" },
  { keywords: ["pepper", "paprika", "paprikad"], productId: "paprika" },
  { keywords: ["salad", "salat"], productId: "salat" },
  { keywords: ["cabbage", "kapsas"], productId: "kapsas" },
  { keywords: ["broccoli", "brokoli"], productId: "brokoli" },

  // Drinks
  { keywords: ["coffee", "kohv"], productId: "kohv" },
  { keywords: ["tea", "tee"], productId: "tee" },
  { keywords: ["orange juice", "mahlmahl"], productId: "mahlmahl" },
  { keywords: ["nectar", "nektar", "nektariin"], productId: "nektariin" },
  { keywords: ["ice tea", "jäätee", "jaatee", "jook"], productId: "jook" },
  { keywords: ["cider", "siider"], productId: "siider" },
  { keywords: ["mineral water", "mineraalvesi", "mineralvesi"], productId: "mineraalvesi" },
  { keywords: ["juice", "mahl"], productId: "mahl" },
];

const RULES_BY_KEYWORD_LENGTH = [...KEYWORD_RULES].sort(
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
    const keywords = [...rule.keywords].sort((a, b) => b.length - a.length);
    for (const kw of keywords) {
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
