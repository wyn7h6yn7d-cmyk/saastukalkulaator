"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  parseShoppingList,
  runOptimization,
  toOptimizerItems,
  type OptimizationResult,
} from "@/lib/optimizer";
import { DEFAULT_LIST_TEXT } from "@/lib/parseShoppingList";
import {
  consumeShoppingListPrefill,
  readListFromSearchParam,
} from "@/lib/shoppingListPrefill";
import { FILTER_STORE_IDS, stores } from "@/lib/mockData";
import { TRAVEL_TOLERANCE_OPTIONS } from "@/lib/savingsVsTime";
import type { ShopPreference, StoreId, TravelTolerance } from "@/lib/types";
import { OptimizationResults } from "./OptimizationResults";
import { Card } from "./ui/Card";
import { PAGE_CONTAINER, WebLayout } from "./layout/WebLayout";

const PREFERENCES: { value: ShopPreference; label: string }[] = [
  { value: "cheapest", label: "Odavaim hind" },
  { value: "max1", label: "Max 1 pood" },
  { value: "max2", label: "Max 2 poodi" },
  { value: "max3", label: "Max 3 poodi" },
];

export function ShoppingApp() {
  const searchParams = useSearchParams();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [listText, setListText] = useState(DEFAULT_LIST_TEXT);
  const [prefillNotice, setPrefillNotice] = useState<string | null>(null);
  const [preference, setPreference] = useState<ShopPreference>("max2");
  const [travelTolerance, setTravelTolerance] =
    useState<TravelTolerance>("extra2");
  const [selectedStores, setSelectedStores] = useState<Set<StoreId>>(
    () => new Set(FILTER_STORE_IDS),
  );
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OptimizationResult | null>(null);

  useEffect(() => {
    const fromStorage = consumeShoppingListPrefill();
    const fromUrl = readListFromSearchParam(searchParams);
    const prefilled = fromStorage ?? fromUrl;

    if (prefilled?.trim()) {
      setListText(prefilled.trim());
      setResult(null);
      setPrefillNotice(
        fromStorage
          ? "Retsepti koostisosad on ostunimekirjas. Võrdle hindu allpool."
          : "Ostunimekiri laaditi lingist. Võrdle hindu allpool.",
      );
    }
  }, [searchParams]);

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
    setResult(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (selectedStores.size === 0) {
      setError("Vali vähemalt üks pood.");
      return;
    }

    const parsed = parseShoppingList(listText);
    const items = toOptimizerItems(parsed);

    if (items.length === 0) {
      setError("Lisa vähemalt üks toode (nt piim, munad, kanafilee).");
      return;
    }

    const selectedStoreList = stores.filter((s) => selectedStores.has(s.id));

    const optimization = runOptimization(
      listText,
      selectedStoreList,
      preference,
      travelTolerance,
    );

    if (!optimization) {
      setError("Valitud poodides pole kõiki tooteid. Vali rohkem poode.");
      return;
    }

    setResult(optimization);
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <WebLayout>
      <div className={PAGE_CONTAINER}>
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Võrdle hindu</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Kirjuta tooted eraldi ridadele. Näiteks: piim 2l, munad 10tk,
            kanafilee 600g. Või alusta{" "}
            <a href="/recipes" className="font-medium text-emerald-700 underline">
              retseptidest
            </a>
            .
          </p>
          {prefillNotice && (
            <p
              className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
              role="status"
            >
              {prefillNotice}
            </p>
          )}
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Card className="p-4 sm:p-5">
            <label
              htmlFor="shopping-list"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Ostunimekiri
            </label>
            <textarea
              id="shopping-list"
              value={listText}
              onChange={(e) => {
                setListText(e.target.value);
                setResult(null);
              }}
              rows={8}
              className="input-field textarea-field font-mono text-sm"
              placeholder="piim 2l&#10;munad 10tk..."
            />
          </Card>

          <Card className="p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-slate-800">Eelistused</h2>
            <fieldset className="mt-3 space-y-2">
              <legend className="sr-only">Eelistus</legend>
              {PREFERENCES.map(({ value, label }) => (
                <label
                  key={value}
                  className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                    preference === value
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="preference"
                    checked={preference === value}
                    onChange={() => {
                      setPreference(value);
                      setResult(null);
                    }}
                    className="h-5 w-5 shrink-0 accent-emerald-600"
                  />
                  <span className="text-sm font-medium text-slate-800">
                    {label}
                  </span>
                </label>
              ))}
            </fieldset>
          </Card>

          <Card className="p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-slate-800">
              Kui palju lisateekonda oled nõus tegema?
            </h2>
            <fieldset className="mt-3 space-y-2">
              <legend className="sr-only">Lisateekond</legend>
              {TRAVEL_TOLERANCE_OPTIONS.map(({ value, label, hint }) => (
                <label
                  key={value}
                  className={`flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-colors ${
                    travelTolerance === value
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="travelTolerance"
                    checked={travelTolerance === value}
                    onChange={() => {
                      setTravelTolerance(value);
                      setResult(null);
                    }}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-emerald-600"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-slate-800">
                      {label}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      {hint}
                    </span>
                  </span>
                </label>
              ))}
            </fieldset>
          </Card>

          <Card className="p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-slate-800">Poed</h2>
            <div className="mt-3 space-y-2">
              {stores.map((store) => (
                <label
                  key={store.id}
                  className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 ${
                    selectedStores.has(store.id)
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-slate-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedStores.has(store.id)}
                    onChange={() => toggleStore(store.id)}
                    className="h-5 w-5 shrink-0 rounded accent-emerald-600"
                  />
                  <span className="text-sm font-medium text-slate-800">
                    {store.name}
                    <span className="ml-1 font-normal text-slate-500">
                      · {store.distanceKm} km
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </Card>

          {error && (
            <p
              className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800"
              role="alert"
            >
              {error}
            </p>
          )}

          <button type="submit" className="btn-primary w-full">
            Leia parim ostuplaan
          </button>
        </form>

        <div ref={resultsRef} className="mt-10">
          {result ? (
            <OptimizationResults result={result} />
          ) : (
            <Card className="p-8 text-center">
              <p className="text-3xl opacity-30" aria-hidden>
                🛒
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Tulemused ilmuvad siia pärast võrdlust.
              </p>
            </Card>
          )}
        </div>
      </div>
    </WebLayout>
  );
}
