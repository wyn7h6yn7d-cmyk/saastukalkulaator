"use client";

import { useState } from "react";
import type { OptimizationResult } from "@/lib/optimizer";
import { DEFAULT_LIST_TEXT } from "@/lib/defaultList";
import { FILTER_STORE_IDS, stores } from "@/lib/storesData";
import { TRAVEL_TOLERANCE_OPTIONS } from "@/lib/savingsVsTime";
import type { ShopPreference, StoreId, TravelTolerance } from "@/lib/types";
import { OptimizationResultDetails } from "./OptimizationResultDetails";
import { OptimizationResultSummary } from "./OptimizationResultSummary";
import { Card } from "./ui/Card";
import { APP_PAGE_CONTAINER, WebLayout } from "./layout/WebLayout";

const MAX_STORE_OPTIONS: { value: ShopPreference; label: string }[] = [
  { value: "cheapest", label: "Piiramata" },
  { value: "max1", label: "1 pood" },
  { value: "max2", label: "2 poodi" },
  { value: "max3", label: "3 poodi" },
];

interface ShoppingAppProps {
  initialListText?: string;
  prefillNotice?: string | null;
}

export function ShoppingApp({
  initialListText,
  prefillNotice: initialPrefillNotice = null,
}: ShoppingAppProps) {
  const [listText, setListText] = useState(
    () => initialListText?.trim() || DEFAULT_LIST_TEXT,
  );
  const [prefillNotice] = useState(initialPrefillNotice);
  const [preference, setPreference] = useState<ShopPreference>("max2");
  const [travelTolerance, setTravelTolerance] =
    useState<TravelTolerance>("extra2");
  const [selectedStores, setSelectedStores] = useState<Set<StoreId>>(
    () => new Set(FILTER_STORE_IDS),
  );
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  function toggleStore(id: StoreId) {
    setSelectedStores((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (selectedStores.size === 0) {
      setError("Vali vähemalt üks pood.");
      return;
    }

    const selectedStoreList = stores.filter((s) => selectedStores.has(s.id));

    setIsOptimizing(true);
    try {
      const { runOptimization } = await import("@/lib/optimizer");
      const optimization = runOptimization(
        listText,
        selectedStoreList,
        preference,
        travelTolerance,
      );

      if (!optimization) {
        setResult(null);
        setError("Valitud poodides pole kõiki tooteid. Vali rohkem poode.");
        return;
      }

      setResult(optimization);
    } finally {
      setIsOptimizing(false);
    }
  }

  return (
    <WebLayout>
      <div className={APP_PAGE_CONTAINER}>
        <header className="mb-6 lg:mb-8">
          <h1 className="text-2xl font-bold text-ink md:text-3xl">
            Võrdle ostukorvi
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted md:text-base">
            Kirjuta nimekiri ja leiame soodsaima ostuplaani. Praegu
            näidishinnad.
          </p>
          {prefillNotice && (
            <p
              className="mt-3 rounded-lg border border-border bg-brand-light px-4 py-3 text-sm text-ink"
              role="status"
            >
              {prefillNotice}
            </p>
          )}
        </header>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:items-start lg:gap-8 xl:gap-10">
          <form onSubmit={handleSubmit} className="min-w-0">
            <Card className="p-4 sm:p-5">
              <label
                htmlFor="shopping-list"
                className="block text-sm font-semibold text-ink"
              >
                Ostunimekiri
              </label>
              <p className="mt-1 text-xs text-muted">
                Üks toode rea kohta, nt{" "}
                <span className="font-mono text-ink">piim 2l</span> või{" "}
                <span className="font-mono text-ink">munad 10tk</span>
              </p>
              <textarea
                id="shopping-list"
                value={listText}
                onChange={(e) => setListText(e.target.value)}
                rows={9}
                className="input-field textarea-field mt-3 font-mono text-sm"
                placeholder={"piim 2l\nmunad 10tk\nkanafilee 600g"}
                spellCheck={false}
              />

              <fieldset className="mt-6">
                <legend className="text-sm font-semibold text-ink">
                  Mitu poodi kasutada?
                </legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {MAX_STORE_OPTIONS.map(({ value, label }) => (
                    <label
                      key={value}
                      className={`inline-flex min-h-10 cursor-pointer items-center rounded-md border px-3 py-2 text-sm font-medium ${
                        preference === value
                          ? "border-brand bg-brand-light text-brand"
                          : "border-border bg-card text-ink"
                      }`}
                    >
                      <input
                        type="radio"
                        name="preference"
                        checked={preference === value}
                        onChange={() => setPreference(value)}
                        className="sr-only"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-6">
                <legend className="text-sm font-semibold text-ink">
                  Milliseid poode võrdleme?
                </legend>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {stores.map((store) => (
                    <label
                      key={store.id}
                      className={`flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md border px-3 py-2.5 ${
                        selectedStores.has(store.id)
                          ? "border-brand bg-brand-light"
                          : "border-border bg-card"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedStores.has(store.id)}
                        onChange={() => toggleStore(store.id)}
                        className="h-4 w-4 shrink-0 rounded border-border accent-brand"
                      />
                      <span className="text-sm font-medium text-ink">
                        {store.name}
                        <span className="font-normal text-muted">
                          {" "}
                          · {store.distanceKm} km
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6">
                <label
                  htmlFor="travel-tolerance"
                  className="text-sm font-semibold text-ink"
                >
                  Kui kaugele oled valmis sõitma?
                </label>
                <select
                  id="travel-tolerance"
                  value={travelTolerance}
                  onChange={(e) =>
                    setTravelTolerance(e.target.value as TravelTolerance)
                  }
                  className="input-field mt-2 !min-h-11 text-sm"
                >
                  {TRAVEL_TOLERANCE_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </Card>

            {error && (
              <p
                className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary mt-4 w-full text-base"
              disabled={isOptimizing}
            >
              {isOptimizing ? "Arvutan…" : "Leia parim ostuplaan"}
            </button>

            {result && (
              <div className="mt-6 lg:hidden">
                <OptimizationResultSummary result={result} />
              </div>
            )}
          </form>

          <aside className="mt-8 hidden lg:mt-0 lg:block">
            {result ? (
              <div className="sticky top-[4.5rem]">
                <OptimizationResultSummary result={result} />
              </div>
            ) : (
              <Card className="p-6">
                <h2 className="text-sm font-semibold text-ink">Tulemus</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Pärast nupu{" "}
                  <strong className="font-medium text-ink">
                    Leia parim ostuplaan
                  </strong>{" "}
                  näed siin kogusummat, säästu ja soovitust.
                </p>
              </Card>
            )}
          </aside>
        </div>

        {result && (
          <div className="mt-10 border-t border-border pt-10 lg:mt-12">
            <OptimizationResultDetails result={result} />
          </div>
        )}
      </div>
    </WebLayout>
  );
}
