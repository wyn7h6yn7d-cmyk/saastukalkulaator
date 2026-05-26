import type {
  ChainId,
  Product,
  Store,
  StoreId,
  StoreProduct,
} from "./types";

const UPDATED_AT = "2026-05-20T08:00:00.000Z";

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

type StorePriceEntry = {
  originalName: string;
  brand: string;
  price: number;
  unitPrice: number;
  packageSize: string;
  isDiscount?: boolean;
  loyaltyPrice?: number;
};

type ProductCatalogEntry = {
  id: string;
  name: string;
  defaultUnit: string;
  byStore: Record<StoreId, StorePriceEntry>;
};

const CATALOG: ProductCatalogEntry[] = [
  {
    id: "piim",
    name: "Piim",
    defaultUnit: "1 l",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Piim 2,5% 1L",
        brand: "Farmi",
        price: 0.92,
        unitPrice: 0.92,
        packageSize: "1 l",
        loyaltyPrice: 0.85,
      },
      "rimi-ulemiste": {
        originalName: "Külmpressitud piim 2,5% 1L",
        brand: "Rimi",
        price: 0.89,
        unitPrice: 0.89,
        packageSize: "1 l",
      },
      "selver-jarve": {
        originalName: "Piim 2,5% 1L",
        brand: "Tere",
        price: 0.95,
        unitPrice: 0.95,
        packageSize: "1 l",
        isDiscount: true,
        loyaltyPrice: 0.88,
      },
      "maxima-lasnamae": {
        originalName: "Homogeniseeritud piim 2,5%",
        brand: "Maxima",
        price: 0.88,
        unitPrice: 0.88,
        packageSize: "1 l",
      },
      "lidl-tahesaju": {
        originalName: "Täispiim 2,5% 1L",
        brand: "Pilos",
        price: 0.84,
        unitPrice: 0.84,
        packageSize: "1 l",
        isDiscount: true,
      },
    },
  },
  {
    id: "munad",
    name: "Munad",
    defaultUnit: "10 tk",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Kanamunad M 10 tk",
        brand: "Tallegg",
        price: 2.45,
        unitPrice: 0.25,
        packageSize: "10 tk",
      },
      "rimi-ulemiste": {
        originalName: "Kodumuna M 10 tk",
        brand: "Rimi",
        price: 2.39,
        unitPrice: 0.24,
        packageSize: "10 tk",
        loyaltyPrice: 2.19,
      },
      "selver-jarve": {
        originalName: "Kanamunad M 10 tk",
        brand: "Viru Muna",
        price: 2.55,
        unitPrice: 0.26,
        packageSize: "10 tk",
      },
      "maxima-lasnamae": {
        originalName: "Munad M 10 tk",
        brand: "Maxima",
        price: 2.35,
        unitPrice: 0.24,
        packageSize: "10 tk",
        isDiscount: true,
      },
      "lidl-tahesaju": {
        originalName: "Vabapidamisel munad M 10 tk",
        brand: "Freshona",
        price: 2.29,
        unitPrice: 0.23,
        packageSize: "10 tk",
      },
    },
  },
  {
    id: "kanafilee",
    name: "Kanafilee",
    defaultUnit: "1 kg",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Kana sisefilee kg",
        brand: "Prisma",
        price: 6.99,
        unitPrice: 6.99,
        packageSize: "1 kg",
        isDiscount: true,
      },
      "rimi-ulemiste": {
        originalName: "Kanafilee värske kg",
        brand: "Rimi",
        price: 7.19,
        unitPrice: 7.19,
        packageSize: "1 kg",
      },
      "selver-jarve": {
        originalName: "Broilerifilee kg",
        brand: "Tallegg",
        price: 6.89,
        unitPrice: 6.89,
        packageSize: "1 kg",
        loyaltyPrice: 6.49,
      },
      "maxima-lasnamae": {
        originalName: "Kanafilee kg",
        brand: "Maxima",
        price: 7.29,
        unitPrice: 7.29,
        packageSize: "1 kg",
      },
      "lidl-tahesaju": {
        originalName: "Kanafilee kg",
        brand: "Metzgerfrisch",
        price: 6.69,
        unitPrice: 6.69,
        packageSize: "1 kg",
        isDiscount: true,
      },
    },
  },
  {
    id: "riis",
    name: "Riis",
    defaultUnit: "1 kg",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Basmati riis 1 kg",
        brand: "Tilda",
        price: 2.89,
        unitPrice: 2.89,
        packageSize: "1 kg",
      },
      "rimi-ulemiste": {
        originalName: "Pikateraline riis 1 kg",
        brand: "Rimi",
        price: 2.75,
        unitPrice: 2.75,
        packageSize: "1 kg",
        loyaltyPrice: 2.49,
      },
      "selver-jarve": {
        originalName: "Basmati riis 1 kg",
        brand: "Selver",
        price: 2.95,
        unitPrice: 2.95,
        packageSize: "1 kg",
      },
      "maxima-lasnamae": {
        originalName: "Riis 1 kg",
        brand: "Maxima",
        price: 2.65,
        unitPrice: 2.65,
        packageSize: "1 kg",
        isDiscount: true,
      },
      "lidl-tahesaju": {
        originalName: "Basmati riis 1 kg",
        brand: "Golden Sun",
        price: 2.59,
        unitPrice: 2.59,
        packageSize: "1 kg",
      },
    },
  },
  {
    id: "kohv",
    name: "Kohv",
    defaultUnit: "500 g",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Jahvatatud kohv 500 g",
        brand: "Paulig",
        price: 5.49,
        unitPrice: 10.98,
        packageSize: "500 g",
        loyaltyPrice: 4.99,
      },
      "rimi-ulemiste": {
        originalName: "Kohv New York 500 g",
        brand: "Paulig",
        price: 5.29,
        unitPrice: 10.58,
        packageSize: "500 g",
      },
      "selver-jarve": {
        originalName: "Röstikohv 500 g",
        brand: "Gustav",
        price: 5.59,
        unitPrice: 11.18,
        packageSize: "500 g",
        isDiscount: true,
      },
      "maxima-lasnamae": {
        originalName: "Kohv 500 g",
        brand: "Maxima",
        price: 4.99,
        unitPrice: 9.98,
        packageSize: "500 g",
      },
      "lidl-tahesaju": {
        originalName: "Jahvatatud kohv 500 g",
        brand: "Bellarom",
        price: 4.79,
        unitPrice: 9.58,
        packageSize: "500 g",
        isDiscount: true,
      },
    },
  },
  {
    id: "banaan",
    name: "Banaan",
    defaultUnit: "1 kg",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Banaan kg",
        brand: "—",
        price: 1.22,
        unitPrice: 1.22,
        packageSize: "1 kg",
      },
      "rimi-ulemiste": {
        originalName: "Banaan kg",
        brand: "—",
        price: 1.19,
        unitPrice: 1.19,
        packageSize: "1 kg",
        isDiscount: true,
      },
      "selver-jarve": {
        originalName: "Banaan kg",
        brand: "—",
        price: 1.29,
        unitPrice: 1.29,
        packageSize: "1 kg",
      },
      "maxima-lasnamae": {
        originalName: "Banaan kg",
        brand: "—",
        price: 1.15,
        unitPrice: 1.15,
        packageSize: "1 kg",
      },
      "lidl-tahesaju": {
        originalName: "Banaan kg",
        brand: "—",
        price: 1.12,
        unitPrice: 1.12,
        packageSize: "1 kg",
        loyaltyPrice: 0.99,
      },
    },
  },
  {
    id: "juust",
    name: "Juust",
    defaultUnit: "200 g",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Gouda juust 200 g",
        brand: "Valio",
        price: 2.19,
        unitPrice: 10.95,
        packageSize: "200 g",
      },
      "rimi-ulemiste": {
        originalName: "Hollandi juust 200 g",
        brand: "Rimi",
        price: 2.09,
        unitPrice: 10.45,
        packageSize: "200 g",
        loyaltyPrice: 1.89,
      },
      "selver-jarve": {
        originalName: "Gouda viilujuust 200 g",
        brand: "Saaremaa",
        price: 2.25,
        unitPrice: 11.25,
        packageSize: "200 g",
      },
      "maxima-lasnamae": {
        originalName: "Juust 200 g",
        brand: "Maxima",
        price: 1.99,
        unitPrice: 9.95,
        packageSize: "200 g",
        isDiscount: true,
      },
      "lidl-tahesaju": {
        originalName: "Gouda juust 200 g",
        brand: "Pilos",
        price: 1.95,
        unitPrice: 9.75,
        packageSize: "200 g",
      },
    },
  },
  {
    id: "hakkliha",
    name: "Hakkliha",
    defaultUnit: "500 g",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Veisehakkliha 500 g",
        brand: "Prisma",
        price: 4.29,
        unitPrice: 8.58,
        packageSize: "500 g",
        isDiscount: true,
      },
      "rimi-ulemiste": {
        originalName: "Hakkliha 500 g 15%",
        brand: "Rimi",
        price: 4.49,
        unitPrice: 8.98,
        packageSize: "500 g",
      },
      "selver-jarve": {
        originalName: "Seahakkliha 500 g",
        brand: "Maks& Moorits",
        price: 3.99,
        unitPrice: 7.98,
        packageSize: "500 g",
        loyaltyPrice: 3.69,
      },
      "maxima-lasnamae": {
        originalName: "Hakkliha 500 g",
        brand: "Maxima",
        price: 4.19,
        unitPrice: 8.38,
        packageSize: "500 g",
      },
      "lidl-tahesaju": {
        originalName: "Hakkliha 500 g",
        brand: "Metzgerfrisch",
        price: 3.89,
        unitPrice: 7.78,
        packageSize: "500 g",
        isDiscount: true,
      },
    },
  },
  {
    id: "kurk",
    name: "Kurk",
    defaultUnit: "1 tk",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Kurk 300 g",
        brand: "—",
        price: 0.95,
        unitPrice: 0.95,
        packageSize: "1 tk",
      },
      "rimi-ulemiste": {
        originalName: "Kurk tk",
        brand: "—",
        price: 0.89,
        unitPrice: 0.89,
        packageSize: "1 tk",
        isDiscount: true,
      },
      "selver-jarve": {
        originalName: "Kurgi kg",
        brand: "—",
        price: 1.09,
        unitPrice: 1.09,
        packageSize: "1 tk",
      },
      "maxima-lasnamae": {
        originalName: "Kurk tk",
        brand: "—",
        price: 0.85,
        unitPrice: 0.85,
        packageSize: "1 tk",
      },
      "lidl-tahesaju": {
        originalName: "Kurk tk",
        brand: "—",
        price: 0.79,
        unitPrice: 0.79,
        packageSize: "1 tk",
      },
    },
  },
  {
    id: "tomat",
    name: "Tomat",
    defaultUnit: "1 kg",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Tomat kg",
        brand: "—",
        price: 2.55,
        unitPrice: 2.55,
        packageSize: "1 kg",
      },
      "rimi-ulemiste": {
        originalName: "Kirsstomat 250 g",
        brand: "Rimi",
        price: 2.49,
        unitPrice: 9.96,
        packageSize: "250 g",
        loyaltyPrice: 2.19,
      },
      "selver-jarve": {
        originalName: "Tomat kg",
        brand: "—",
        price: 2.69,
        unitPrice: 2.69,
        packageSize: "1 kg",
      },
      "maxima-lasnamae": {
        originalName: "Tomat kg",
        brand: "—",
        price: 2.39,
        unitPrice: 2.39,
        packageSize: "1 kg",
        isDiscount: true,
      },
      "lidl-tahesaju": {
        originalName: "Tomat kg",
        brand: "—",
        price: 2.29,
        unitPrice: 2.29,
        packageSize: "1 kg",
      },
    },
  },
  {
    id: "pasta",
    name: "Pasta",
    defaultUnit: "500 g",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Spagetid 500 g",
        brand: "Barilla",
        price: 1.29,
        unitPrice: 2.58,
        packageSize: "500 g",
      },
      "rimi-ulemiste": {
        originalName: "Makaronid 500 g",
        brand: "Rimi",
        price: 0.99,
        unitPrice: 1.98,
        packageSize: "500 g",
        isDiscount: true,
      },
      "selver-jarve": {
        originalName: "Fusilli 500 g",
        brand: "Selver",
        price: 1.19,
        unitPrice: 2.38,
        packageSize: "500 g",
      },
      "maxima-lasnamae": {
        originalName: "Pasta 500 g",
        brand: "Maxima",
        price: 0.95,
        unitPrice: 1.9,
        packageSize: "500 g",
      },
      "lidl-tahesaju": {
        originalName: "Spagetid 500 g",
        brand: "Combino",
        price: 0.89,
        unitPrice: 1.78,
        packageSize: "500 g",
        loyaltyPrice: 0.79,
      },
    },
  },
  {
    id: "leib",
    name: "Leib",
    defaultUnit: "500 g",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Rukkileib 500 g",
        brand: "Fazer",
        price: 1.35,
        unitPrice: 2.7,
        packageSize: "500 g",
      },
      "rimi-ulemiste": {
        originalName: "Rukkileib 500 g",
        brand: "Rimi",
        price: 1.29,
        unitPrice: 2.58,
        packageSize: "500 g",
        loyaltyPrice: 1.15,
      },
      "selver-jarve": {
        originalName: "Rukkileib 500 g",
        brand: "Leibur",
        price: 1.39,
        unitPrice: 2.78,
        packageSize: "500 g",
      },
      "maxima-lasnamae": {
        originalName: "Rukkileib 500 g",
        brand: "Maxima",
        price: 1.19,
        unitPrice: 2.38,
        packageSize: "500 g",
        isDiscount: true,
      },
      "lidl-tahesaju": {
        originalName: "Rukkileib 500 g",
        brand: "Lidl",
        price: 1.15,
        unitPrice: 2.3,
        packageSize: "500 g",
      },
    },
  },
  {
    id: "sai",
    name: "Sai",
    defaultUnit: "400 g",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Sai 400 g",
        brand: "Fazer",
        price: 0.99,
        unitPrice: 2.48,
        packageSize: "400 g",
        isDiscount: true,
      },
      "rimi-ulemiste": {
        originalName: "Sai 400 g",
        brand: "Rimi",
        price: 1.05,
        unitPrice: 2.63,
        packageSize: "400 g",
      },
      "selver-jarve": {
        originalName: "Sai 400 g",
        brand: "Leibur",
        price: 1.09,
        unitPrice: 2.73,
        packageSize: "400 g",
      },
      "maxima-lasnamae": {
        originalName: "Sai 400 g",
        brand: "Maxima",
        price: 0.95,
        unitPrice: 2.38,
        packageSize: "400 g",
      },
      "lidl-tahesaju": {
        originalName: "Sai 400 g",
        brand: "Lidl",
        price: 0.89,
        unitPrice: 2.23,
        packageSize: "400 g",
      },
    },
  },
  {
    id: "või",
    name: "Või",
    defaultUnit: "200 g",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Või 200 g",
        brand: "Valio",
        price: 2.29,
        unitPrice: 11.45,
        packageSize: "200 g",
      },
      "rimi-ulemiste": {
        originalName: "Või 200 g",
        brand: "Rimi",
        price: 2.19,
        unitPrice: 10.95,
        packageSize: "200 g",
        loyaltyPrice: 1.99,
      },
      "selver-jarve": {
        originalName: "Või 200 g",
        brand: "Saaremaa",
        price: 2.35,
        unitPrice: 11.75,
        packageSize: "200 g",
      },
      "maxima-lasnamae": {
        originalName: "Või 200 g",
        brand: "Maxima",
        price: 2.09,
        unitPrice: 10.45,
        packageSize: "200 g",
        isDiscount: true,
      },
      "lidl-tahesaju": {
        originalName: "Või 200 g",
        brand: "Milbona",
        price: 1.99,
        unitPrice: 9.95,
        packageSize: "200 g",
      },
    },
  },
  {
    id: "jogurt",
    name: "Jogurt",
    defaultUnit: "400 g",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Jogurt naturaalne 400 g",
        brand: "Valio",
        price: 0.79,
        unitPrice: 1.98,
        packageSize: "400 g",
      },
      "rimi-ulemiste": {
        originalName: "Kreeka jogurt 400 g",
        brand: "Rimi",
        price: 0.85,
        unitPrice: 2.13,
        packageSize: "400 g",
        isDiscount: true,
      },
      "selver-jarve": {
        originalName: "Jogurt 400 g",
        brand: "Tere",
        price: 0.89,
        unitPrice: 2.23,
        packageSize: "400 g",
        loyaltyPrice: 0.75,
      },
      "maxima-lasnamae": {
        originalName: "Jogurt 400 g",
        brand: "Maxima",
        price: 0.75,
        unitPrice: 1.88,
        packageSize: "400 g",
      },
      "lidl-tahesaju": {
        originalName: "Jogurt 400 g",
        brand: "Pilos",
        price: 0.72,
        unitPrice: 1.8,
        packageSize: "400 g",
      },
    },
  },
  {
    id: "kartul",
    name: "Kartul",
    defaultUnit: "1 kg",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Kartul kg",
        brand: "—",
        price: 0.72,
        unitPrice: 0.72,
        packageSize: "1 kg",
      },
      "rimi-ulemiste": {
        originalName: "Kartul kg",
        brand: "—",
        price: 0.69,
        unitPrice: 0.69,
        packageSize: "1 kg",
        loyaltyPrice: 0.59,
      },
      "selver-jarve": {
        originalName: "Kartul kg",
        brand: "—",
        price: 0.75,
        unitPrice: 0.75,
        packageSize: "1 kg",
      },
      "maxima-lasnamae": {
        originalName: "Kartul kg",
        brand: "—",
        price: 0.65,
        unitPrice: 0.65,
        packageSize: "1 kg",
        isDiscount: true,
      },
      "lidl-tahesaju": {
        originalName: "Kartul kg",
        brand: "—",
        price: 0.62,
        unitPrice: 0.62,
        packageSize: "1 kg",
      },
    },
  },
  {
    id: "wc-paber",
    name: "WC-paber",
    defaultUnit: "8 rulli",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Tualettpaber 8 rulli",
        brand: "Zewa",
        price: 6.49,
        unitPrice: 0.81,
        packageSize: "8 rulli",
        loyaltyPrice: 5.99,
      },
      "rimi-ulemiste": {
        originalName: "WC-paber 8 rulli",
        brand: "Rimi",
        price: 5.99,
        unitPrice: 0.75,
        packageSize: "8 rulli",
        isDiscount: true,
      },
      "selver-jarve": {
        originalName: "Tualettpaber 8 rulli",
        brand: "Selver",
        price: 6.29,
        unitPrice: 0.79,
        packageSize: "8 rulli",
      },
      "maxima-lasnamae": {
        originalName: "WC-paber 8 rulli",
        brand: "Maxima",
        price: 5.49,
        unitPrice: 0.69,
        packageSize: "8 rulli",
      },
      "lidl-tahesaju": {
        originalName: "Tualettpaber 8 rulli",
        brand: "W5",
        price: 4.99,
        unitPrice: 0.62,
        packageSize: "8 rulli",
        isDiscount: true,
      },
    },
  },
  {
    id: "pesugeel",
    name: "Pesugeel",
    defaultUnit: "1,5 l",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Pesugeel 1,5 l",
        brand: "Persil",
        price: 8.49,
        unitPrice: 5.66,
        packageSize: "1,5 l",
      },
      "rimi-ulemiste": {
        originalName: "Pesugeel 1,5 l",
        brand: "Rimi",
        price: 7.99,
        unitPrice: 5.33,
        packageSize: "1,5 l",
        loyaltyPrice: 6.99,
      },
      "selver-jarve": {
        originalName: "Pesugeel 1,5 l",
        brand: "Ace",
        price: 8.99,
        unitPrice: 5.99,
        packageSize: "1,5 l",
        isDiscount: true,
      },
      "maxima-lasnamae": {
        originalName: "Pesugeel 1,5 l",
        brand: "Maxima",
        price: 7.49,
        unitPrice: 4.99,
        packageSize: "1,5 l",
      },
      "lidl-tahesaju": {
        originalName: "Pesugeel 1,5 l",
        brand: "W5",
        price: 6.99,
        unitPrice: 4.66,
        packageSize: "1,5 l",
        isDiscount: true,
      },
    },
  },
  {
    id: "õun",
    name: "Õun",
    defaultUnit: "1 kg",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Õun kg",
        brand: "—",
        price: 1.89,
        unitPrice: 1.89,
        packageSize: "1 kg",
      },
      "rimi-ulemiste": {
        originalName: "Õun Golden kg",
        brand: "—",
        price: 1.79,
        unitPrice: 1.79,
        packageSize: "1 kg",
        isDiscount: true,
      },
      "selver-jarve": {
        originalName: "Õun kg",
        brand: "—",
        price: 1.95,
        unitPrice: 1.95,
        packageSize: "1 kg",
      },
      "maxima-lasnamae": {
        originalName: "Õun kg",
        brand: "—",
        price: 1.69,
        unitPrice: 1.69,
        packageSize: "1 kg",
        loyaltyPrice: 1.49,
      },
      "lidl-tahesaju": {
        originalName: "Õun kg",
        brand: "—",
        price: 1.65,
        unitPrice: 1.65,
        packageSize: "1 kg",
      },
    },
  },
  {
    id: "hapukoor",
    name: "Hapukoor",
    defaultUnit: "400 g",
    byStore: {
      "prisma-sikupilli": {
        originalName: "Hapukoor 20% 400 g",
        brand: "Valio",
        price: 1.45,
        unitPrice: 3.63,
        packageSize: "400 g",
      },
      "rimi-ulemiste": {
        originalName: "Hapukoor 20% 400 g",
        brand: "Rimi",
        price: 1.39,
        unitPrice: 3.48,
        packageSize: "400 g",
        loyaltyPrice: 1.25,
      },
      "selver-jarve": {
        originalName: "Hapukoor 20% 400 g",
        brand: "Tere",
        price: 1.49,
        unitPrice: 3.73,
        packageSize: "400 g",
        isDiscount: true,
      },
      "maxima-lasnamae": {
        originalName: "Hapukoor 400 g",
        brand: "Maxima",
        price: 1.35,
        unitPrice: 3.38,
        packageSize: "400 g",
      },
      "lidl-tahesaju": {
        originalName: "Hapukoor 20% 400 g",
        brand: "Pilos",
        price: 1.29,
        unitPrice: 3.23,
        packageSize: "400 g",
      },
    },
  },
];

function buildStoreProducts(): StoreProduct[] {
  const items: StoreProduct[] = [];

  for (const entry of CATALOG) {
    for (const store of stores) {
      const row = entry.byStore[store.id];
      items.push({
        storeId: store.id,
        productId: entry.id,
        originalName: row.originalName,
        brand: row.brand,
        price: row.price,
        unitPrice: row.unitPrice,
        packageSize: row.packageSize,
        isDiscount: row.isDiscount ?? false,
        loyaltyPrice: row.loyaltyPrice,
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

export const products: Product[] = CATALOG.map((entry) => ({
  id: entry.id,
  name: entry.name,
  defaultUnit: entry.defaultUnit,
  prices: Object.fromEntries(
    stores.map((store) => {
      const sp = storeProducts.find(
        (row) => row.storeId === store.id && row.productId === entry.id,
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

export const CHAINS: ChainId[] = ["prisma", "rimi", "selver", "maxima", "lidl"];

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

const ALIASES: Record<string, string> = {
  kanafilee: "kanafilee",
  kana: "kanafilee",
  kanafille: "kanafilee",
  kanafillee: "kanafilee",
  munad: "munad",
  muna: "munad",
  piim: "piim",
  leib: "leib",
  banaan: "banaan",
  banaanid: "banaan",
  riis: "riis",
  kohv: "kohv",
  kartul: "kartul",
  kartulid: "kartul",
  jogurt: "jogurt",
  juust: "juust",
  tomat: "tomat",
  tomatid: "tomat",
  pasta: "pasta",
  makaron: "pasta",
  makaronid: "pasta",
  sai: "sai",
  või: "või",
  voi: "või",
  hakkliha: "hakkliha",
  kurk: "kurk",
  "wc paber": "wc-paber",
  "wc-paber": "wc-paber",
  tualettpaber: "wc-paber",
  pesugeel: "pesugeel",
  õun: "õun",
  oun: "õun",
  õunad: "õun",
  hapukoor: "hapukoor",
};

export function findProductByName(query: string): Product | undefined {
  const normalized = query
    .trim()
    .toLowerCase()
    .replace(/[^a-zäöüõ0-9\s-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!normalized) return undefined;

  const firstWord = normalized.split(" ")[0] ?? "";
  const aliasId = ALIASES[firstWord] ?? ALIASES[normalized];
  if (aliasId && PRODUCT_MAP[aliasId]) {
    return PRODUCT_MAP[aliasId];
  }

  return products.find(
    (p) =>
      p.id === normalized ||
      normalized.includes(p.id) ||
      p.name.toLowerCase().includes(normalized) ||
      normalized.includes(p.name.toLowerCase()),
  );
}
