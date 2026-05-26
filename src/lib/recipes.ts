export interface RecipeIngredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  portions: number;
  ingredients: RecipeIngredient[];
  /** Fiktiivne odavaim hind (demo) */
  estimatedTotalEuro: number;
  /** Read lines for /app shopping list parser */
  shoppingLines: string[];
}

export function recipeToShoppingListText(recipe: Recipe): string {
  return recipe.shoppingLines.join("\n");
}

export function pricePerPortion(recipe: Recipe): number {
  return Math.round((recipe.estimatedTotalEuro / recipe.portions) * 100) / 100;
}

export const RECIPES: Recipe[] = [
  {
    id: "kanapasta",
    title: "Kanapasta neljale",
    description:
      "Kiire õhtusöök: kana, pasta ja kreemjas kaste. Sobib neljale.",
    portions: 4,
    estimatedTotalEuro: 19.85,
    shoppingLines: [
      "kanafilee 600g",
      "pasta 500g",
      "hapukoor 400g",
      "tomat 500g",
      "või 200g",
      "sibul 1kg",
      "juust 200g",
    ],
    ingredients: [
      { name: "Kanafilee", amount: "600 g" },
      { name: "Pasta", amount: "500 g" },
      { name: "Hapukoor", amount: "400 g" },
      { name: "Tomat", amount: "500 g" },
      { name: "Või", amount: "200 g" },
      { name: "Sibul", amount: "1 kg" },
      { name: "Juust", amount: "200 g" },
    ],
  },
  {
    id: "hakklihakaste",
    title: "Hakklihakaste ja riis",
    description: "Klassikaline kodune eine riisiga — neli portsjonit.",
    portions: 4,
    estimatedTotalEuro: 14.2,
    shoppingLines: [
      "hakkliha 500g",
      "riis 1kg",
      "sibul 1kg",
      "tomat 500g",
      "hapukoor 200g",
      "või 200g",
    ],
    ingredients: [
      { name: "Hakkliha", amount: "500 g" },
      { name: "Riis", amount: "1 kg" },
      { name: "Sibul", amount: "1 kg" },
      { name: "Tomat", amount: "500 g" },
      { name: "Hapukoor", amount: "200 g" },
      { name: "Või", amount: "200 g" },
    ],
  },
  {
    id: "hommikusook",
    title: "Hommikusöögi ostukorv",
    description: "Põhilised hommikutooted kahele inimesele nädalaks.",
    portions: 14,
    estimatedTotalEuro: 22.4,
    shoppingLines: [
      "piim 2l",
      "munad 10tk",
      "leib 500g",
      "või 200g",
      "jogurt 400g",
      "kohv 500g",
      "banaan 1kg",
    ],
    ingredients: [
      { name: "Piim", amount: "2 l" },
      { name: "Munad", amount: "10 tk" },
      { name: "Leib", amount: "500 g" },
      { name: "Või", amount: "200 g" },
      { name: "Jogurt", amount: "400 g" },
      { name: "Kohv", amount: "500 g" },
      { name: "Banaan", amount: "1 kg" },
    ],
  },
  {
    id: "odav-nadalavahetus",
    title: "Odav nädalavahetuse korv",
    description: "Soodne korv suuremale seltskonnale — pasta, riis ja liha.",
    portions: 6,
    estimatedTotalEuro: 24.6,
    shoppingLines: [
      "pasta 1kg",
      "riis 1kg",
      "kartul 2kg",
      "hakkliha 1kg",
      "munad 10tk",
      "jahu 1kg",
      "sibul 1kg",
    ],
    ingredients: [
      { name: "Pasta", amount: "1 kg" },
      { name: "Riis", amount: "1 kg" },
      { name: "Kartul", amount: "2 kg" },
      { name: "Hakkliha", amount: "1 kg" },
      { name: "Munad", amount: "10 tk" },
      { name: "Jahu", amount: "1 kg" },
      { name: "Sibul", amount: "1 kg" },
    ],
  },
  {
    id: "tervislik-louna",
    title: "Tervislik tööpäeva lõuna",
    description: "Kerge salat ja puuviljad viie lõunakorraga.",
    portions: 5,
    estimatedTotalEuro: 16.75,
    shoppingLines: [
      "kurk 2tk",
      "tomat 1kg",
      "salat 2tk",
      "banaan 1kg",
      "õun 1kg",
      "jogurt 400g",
      "porgand 1kg",
    ],
    ingredients: [
      { name: "Kurk", amount: "2 tk" },
      { name: "Tomat", amount: "1 kg" },
      { name: "Salat", amount: "2 tk" },
      { name: "Banaan", amount: "1 kg" },
      { name: "Õun", amount: "1 kg" },
      { name: "Jogurt", amount: "400 g" },
      { name: "Porgand", amount: "1 kg" },
    ],
  },
];

export const RECIPE_MAP = Object.fromEntries(
  RECIPES.map((r) => [r.id, r]),
) as Record<string, Recipe>;
