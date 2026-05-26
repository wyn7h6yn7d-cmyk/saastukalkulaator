"use client";

import { useRef, useState } from "react";
import {
  parseShoppingList,
  runOptimization,
  toOptimizerItems,
  type OptimizationResult,
} from "@/lib/optimizer";
import { DEFAULT_LIST_TEXT } from "@/lib/parseShoppingList";
import { FILTER_STORE_IDS, stores } from "@/lib/mockData";
import type { ChainId, ShopPreference, StoreId } from "@/lib/types";
import { OptimizationResults } from "./OptimizationResults";
import { GlassCard } from "./ui/GlassCard";
import { PAGE_CONTAINER, WebLayout } from "./layout/WebLayout";

const PREFERENCES: { value: ShopPreference; label: string }[] = [
  { value: "cheapest", label: "Odavaim hind" },
  { value: "max1", label: "Max 1 pood" },
  { value: "max2", label: "Max 2 poodi" },
  { value: "max3", label: "Max 3 poodi" },
];

export function ShoppingApp() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [listText, setListText] = useState(DEFAULT_LIST_TEXT);
  const [preference, setPreference] = useState<ShopPreference>("max2");
  const [selectedStores, setSelectedStores] = useState<Set<StoreId>>(
    () => new Set(FILTER_STORE_IDS),
  );
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OptimizationResult | null>(null);

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
    const unmatched = parsed.filter((p) => !p.matched);

    if (items.length === 0) {
      setError(
        unmatched.length > 0
          ? "Ühtegi rida ei tuvastatud. Proovi: piim, munad, kanafilee."
          : "Lisa vähemalt üks toode.",
      );
      return;
    }

    const selectedChains: ChainId[] = stores
      .filter((s) => selectedStores.has(s.id))
      .map((s) => s.chain);

    const optimization = runOptimization(listText, selectedChains, preference);

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
        <header className="mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-[#00f5a0]">
            Ostukorvi terminal
          </p>
          <h1 className="font-[family-name:var(--font-outfit)] mt-2 text-3xl font-bold text-white sm:text-4xl">
            Minu ostunimekiri
          </h1>
          <p className="mt-2 max-w-xl text-[#94a89e]">
            Sisesta tooted — süsteem leiab parima hinna jaotuse.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start xl:gap-14">
          <form onSubmit={handleSubmit} className="space-y-5">
            <GlassCard className="p-5">
              <label
                htmlFor="shopping-list"
                className="mb-2 block text-sm font-medium text-[#c5d9ce]"
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
                rows={10}
                className="input-glass w-full resize-y rounded-xl px-4 py-3 font-mono text-sm"
                placeholder="piim 2l&#10;munad 10tk..."
              />
            </GlassCard>

            <GlassCard className="p-5">
              <h2 className="text-sm font-medium text-[#c5d9ce]">Eelistused</h2>
              <fieldset className="mt-3 grid gap-2 sm:grid-cols-2">
                <legend className="sr-only">Eelistus</legend>
                {PREFERENCES.map(({ value, label }) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition ${
                      preference === value
                        ? "border-[#00f5a0]/50 bg-[#00f5a0]/10 text-[#00f5a0]"
                        : "border-white/10 text-[#94a89e] hover:border-white/20"
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
                      className="accent-[#00f5a0]"
                    />
                    {label}
                  </label>
                ))}
              </fieldset>
            </GlassCard>

            <GlassCard className="p-5">
              <h2 className="text-sm font-medium text-[#c5d9ce]">Poed</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {stores.map((store) => (
                  <label
                    key={store.id}
                    className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                      selectedStores.has(store.id)
                        ? "border-[#00f5a0]/40 bg-[#00f5a0]/10 text-white"
                        : "border-white/10 text-[#94a89e]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedStores.has(store.id)}
                      onChange={() => toggleStore(store.id)}
                      className="accent-[#00f5a0]"
                    />
                    <span className="truncate">{store.name}</span>
                  </label>
                ))}
              </div>
            </GlassCard>

            {error && (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

            <button type="submit" className="btn-neon w-full rounded-xl py-4 text-sm sm:w-auto sm:px-10">
              Leia parim ostuplaan
            </button>
          </form>

          <div ref={resultsRef} className="min-h-[240px]">
            {result ? (
              <OptimizationResults result={result} />
            ) : (
              <GlassCard className="flex h-full min-h-[280px] flex-col items-center justify-center p-8 text-center">
                <span className="text-4xl opacity-40">📡</span>
                <p className="mt-4 text-sm text-[#94a89e]">
                  Tulemused ilmuvad siia pärast skaneerimist.
                </p>
                <p className="mt-2 text-xs text-[#5a6e64]">
                  Futuristlik hinnamootor käivitub ühe klõpsuga.
                </p>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </WebLayout>
  );
}
