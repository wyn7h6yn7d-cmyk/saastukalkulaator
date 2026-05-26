/** Mock andmed pakkumise alarmide MVP jaoks (teavitused veel puuduvad). */

export interface PriceAlert {
  id: string;
  productName: string;
  unit: string;
  currentBestPrice: number;
  targetPrice: number;
  storeName: string;
  dealFound: boolean;
}

export const MOCK_PRICE_ALERTS: PriceAlert[] = [
  {
    id: "kohv",
    productName: "Kohv",
    unit: "500 g",
    currentBestPrice: 4.79,
    targetPrice: 5.2,
    storeName: "Lidl Tähesaju",
    dealFound: true,
  },
  {
    id: "kanafilee",
    productName: "Kanafilee",
    unit: "1 kg",
    currentBestPrice: 6.69,
    targetPrice: 7.0,
    storeName: "Lidl Tähesaju",
    dealFound: true,
  },
  {
    id: "pesugeel",
    productName: "Pesugeel",
    unit: "1,5 l",
    currentBestPrice: 6.99,
    targetPrice: 6.5,
    storeName: "Lidl Tähesaju",
    dealFound: false,
  },
  {
    id: "kassitoit",
    productName: "Kassitoit",
    unit: "2 kg",
    currentBestPrice: 10.49,
    targetPrice: 11.0,
    storeName: "Lidl Tähesaju",
    dealFound: true,
  },
  {
    id: "juust",
    productName: "Juust",
    unit: "200 g",
    currentBestPrice: 1.89,
    targetPrice: 2.1,
    storeName: "Maxima Lasnamäe",
    dealFound: true,
  },
];
