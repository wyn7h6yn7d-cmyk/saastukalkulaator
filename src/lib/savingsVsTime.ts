import type { Store, StoreId, TravelTolerance } from "./types";

/** Poed, kuhu kasutaja on valmis minema (mock kauguste põhjal). */
export function filterStoresByTravelTolerance(
  selectedStores: Store[],
  tolerance: TravelTolerance,
): Store[] {
  if (selectedStores.length === 0) return [];

  const nearest = getNearestStore(selectedStores);

  if (tolerance === "nearest") {
    return selectedStores.filter((s) => s.id === nearest.id);
  }
  if (tolerance === "unlimited") {
    return selectedStores;
  }

  const maxExtraKm = tolerance === "extra2" ? 2 : 5;
  const maxDistanceKm = nearest.distanceKm + maxExtraKm;

  return selectedStores.filter((s) => s.distanceKm <= maxDistanceKm + 0.001);
}

export function getNearestStore(stores: Store[]): Store {
  return stores.reduce((best, store) =>
    store.distanceKm < best.distanceKm ? store : best,
  );
}

/**
 * Lisakilomeetrid võrreldes lähima poega.
 * Iga täiendav pood = max(0, poe_kaugus − lähim_kaugus).
 */
export function computeExtraDistanceKm(
  planStoreIds: StoreId[],
  selectedStores: Store[],
): number {
  const uniqueIds = [...new Set(planStoreIds)];
  if (uniqueIds.length <= 1) return 0;

  const nearestKm = getNearestStore(selectedStores).distanceKm;
  let extra = 0;

  for (const id of uniqueIds) {
    const store = selectedStores.find((s) => s.id === id);
    if (!store) continue;
    extra += Math.max(0, store.distanceKm - nearestKm);
  }

  return Math.round(extra * 10) / 10;
}

export type WorthItVerdict = "yes" | "no" | "marginal";

export interface SavingsVsTimeAssessment {
  nearestStore: Store;
  estimatedExtraDistanceKm: number;
  estimatedSavingsEuro: number;
  verdict: WorthItVerdict;
  /** Lühike vastus "Kas tasub ära?" küsimusele */
  verdictLabel: string;
  message: string;
  nearestOnlyMode: boolean;
}

const VERDICT_LABELS: Record<WorthItVerdict, string> = {
  yes: "Jah, tasub",
  no: "Ei tasu",
  marginal: "Kaalu üle",
};

function assessVerdict(params: {
  savingsEuro: number;
  extraDistanceKm: number;
  tolerance: TravelTolerance;
  nearestOnlyMode: boolean;
  storeCount: number;
}): Pick<
  SavingsVsTimeAssessment,
  "verdict" | "verdictLabel" | "message" | "nearestOnlyMode"
> {
  const { savingsEuro, extraDistanceKm, tolerance, nearestOnlyMode, storeCount } =
    params;

  if (nearestOnlyMode) {
    return {
      verdict: "yes",
      verdictLabel: VERDICT_LABELS.yes,
      message: "Valisid ainult lähima poe — ostad kõik sealt.",
      nearestOnlyMode: true,
    };
  }

  const maxReasonableExtra =
    tolerance === "extra2" ? 2 : tolerance === "extra5" ? 5 : 8;

  const lowSavings = savingsEuro < 2;
  const goodSavings = savingsEuro >= 5;
  const longTrip = extraDistanceKm > maxReasonableExtra + 0.05;
  const reasonableTrip = extraDistanceKm <= maxReasonableExtra;

  if (storeCount <= 1) {
    return {
      verdict: "yes",
      verdictLabel: VERDICT_LABELS.yes,
      message: "Kõik tooted ühest poest — lisateekonda pole vaja.",
      nearestOnlyMode: false,
    };
  }

  if (lowSavings && longTrip) {
    return {
      verdict: "no",
      verdictLabel: VERDICT_LABELS.no,
      message:
        "Sääst on väike ja lisateekond pikk. Seekord tasub osta ühest poest.",
      nearestOnlyMode: false,
    };
  }

  if (goodSavings && reasonableTrip) {
    return {
      verdict: "yes",
      verdictLabel: VERDICT_LABELS.yes,
      message: "Sääst on piisav, mitme poe vahel jagamine tasub ära.",
      nearestOnlyMode: false,
    };
  }

  if (lowSavings) {
    return {
      verdict: "no",
      verdictLabel: VERDICT_LABELS.no,
      message: "Sääst on väike. Ühest poest ostmine on lihtsam.",
      nearestOnlyMode: false,
    };
  }

  if (longTrip) {
    return {
      verdict: "marginal",
      verdictLabel: VERDICT_LABELS.marginal,
      message:
        "Sääst on olemas, aga lisateekond on pikk. Kaaluge odavaimat ühe poe varianti.",
      nearestOnlyMode: false,
    };
  }

  return {
    verdict: "marginal",
    verdictLabel: VERDICT_LABELS.marginal,
    message: "Sääst on mõõdukas. Jagamine võib tasuda, kui teekond sobib.",
    nearestOnlyMode: false,
  };
}

export function buildSavingsVsTimeAssessment(params: {
  selectedStores: Store[];
  planStoreIds: StoreId[];
  savingsEuro: number;
  tolerance: TravelTolerance;
}): SavingsVsTimeAssessment {
  const nearestStore = getNearestStore(params.selectedStores);
  const estimatedExtraDistanceKm = computeExtraDistanceKm(
    params.planStoreIds,
    params.selectedStores,
  );
  const nearestOnlyMode = params.tolerance === "nearest";
  const storeCount = new Set(params.planStoreIds).size;

  const verdictPart = assessVerdict({
    savingsEuro: params.savingsEuro,
    extraDistanceKm: estimatedExtraDistanceKm,
    tolerance: params.tolerance,
    nearestOnlyMode,
    storeCount,
  });

  return {
    nearestStore,
    estimatedExtraDistanceKm,
    estimatedSavingsEuro: Math.round(params.savingsEuro * 100) / 100,
    ...verdictPart,
  };
}

export const TRAVEL_TOLERANCE_OPTIONS: {
  value: TravelTolerance;
  label: string;
  hint: string;
}[] = [
  {
    value: "nearest",
    label: "Ainult lähim pood",
    hint: "0 km lisaring — ainult lähim valitud pood",
  },
  {
    value: "extra2",
    label: "Kuni 2 km lisaring",
    hint: "Lähim pood + kuni 2 km kaugemale",
  },
  {
    value: "extra5",
    label: "Kuni 5 km lisaring",
    hint: "Lähim pood + kuni 5 km kaugemale",
  },
  {
    value: "unlimited",
    label: "Pole oluline, tahan odavaimat",
    hint: "Kõik valitud poed on lubatud",
  },
];
