import { formatEuro } from "@/lib/format";
import type { OptimizationResult } from "@/lib/optimizer";
import { Card } from "./ui/Card";
import { StoreBadge } from "./StoreBadge";

interface OptimizationResultsProps {
  result: OptimizationResult;
}

export function OptimizationResults({ result }: OptimizationResultsProps) {
  const unmatched = result.parsed
    .filter((p) => !p.matched)
    .map((p) => p.rawText);

  const rankedAllInOne = [...result.allInOneOptions].sort((a, b) => {
    if (a.complete !== b.complete) return a.complete ? -1 : 1;
    return a.total - b.total;
  });

  return (
    <div className="space-y-5">
      <Card highlight className="p-5 sm:p-6">
        <p className="text-sm font-medium text-emerald-100">
          Soovitatud ostuplaan
        </p>
        <p className="savings-hero mt-2 text-white">
          {formatEuro(result.split.total)}
        </p>
        <p className="mt-1 text-sm text-emerald-50">
          {result.split.storeCount}{" "}
          {result.split.storeCount === 1 ? "pood" : "poodi"}
        </p>

        <div className="mt-5 space-y-3 border-t border-white/20 pt-5 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-emerald-50">Sääst vs parim üks pood</span>
            <span className="text-lg font-bold text-white">
              {formatEuro(result.savings.vsCheapestAllInOne)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-emerald-50">Sääst vs kalleim üks pood</span>
            <span className="text-lg font-bold text-white">
              {formatEuro(result.savings.vsMostExpensiveAllInOne)}
            </span>
          </div>
        </div>

        <p className="mt-4 rounded-xl bg-white/15 px-4 py-3 text-sm leading-relaxed text-white">
          {result.message}
        </p>
      </Card>

      {result.split.groups.map((group) => (
        <Card key={group.store.id} className="overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-50 px-4 py-4">
            <StoreBadge store={group.store} />
            <p className="mt-2 text-sm text-slate-600">{group.store.address}</p>
            <p className="text-xs text-slate-400">{group.store.distanceKm} km</p>
          </div>

          <ul className="divide-y divide-slate-100">
            {group.items.map((item) => (
              <li
                key={`${group.store.id}-${item.productId}`}
                className="px-4 py-4"
              >
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">
                      {item.productName}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {item.originalName}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.isDiscount && (
                        <span className="badge-discount rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase">
                          Allahindlus
                        </span>
                      )}
                      {item.loyaltyPrice != null && (
                        <span className="badge-loyalty rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase">
                          Kliendihind {formatEuro(item.loyaltyPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-lg font-bold text-slate-900">
                      {formatEuro(item.lineTotal)}
                    </p>
                    <p className="text-xs text-emerald-700">
                      {formatEuro(item.unitPrice)} / tk
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between border-t border-slate-100 bg-emerald-50/50 px-4 py-3">
            <span className="text-sm font-medium text-slate-700">
              Poe vahesumma
            </span>
            <span className="text-base font-bold text-emerald-800">
              {formatEuro(group.subtotal)}
            </span>
          </div>
        </Card>
      ))}

      <Card className="p-4 sm:p-5">
        <h3 className="font-semibold text-slate-900">
          Kui ostaksid kõik ühest poest
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Odavaim: {result.cheapestAllInOne.store.name}
        </p>
        <ol className="mt-4 space-y-2">
          {rankedAllInOne.map((option, index) => (
            <li
              key={option.store.id}
              className={`flex min-h-12 items-center justify-between gap-3 rounded-xl px-4 py-3 ${
                index === 0 && option.complete
                  ? "bg-emerald-50 ring-1 ring-emerald-200"
                  : "bg-slate-50"
              }`}
            >
              <div>
                <span className="text-sm font-medium text-slate-800">
                  {option.store.name}
                </span>
                {!option.complete && (
                  <p className="text-xs text-amber-700">Mõni toode puudub</p>
                )}
              </div>
              <span className="text-base font-bold text-slate-900">
                {formatEuro(option.total)}
              </span>
            </li>
          ))}
        </ol>
      </Card>

      {unmatched.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <h3 className="text-sm font-semibold text-amber-900">
            Neid tooteid ei leidnud mock-andmetest:
          </h3>
          <ul className="mt-2 space-y-1">
            {unmatched.map((raw) => (
              <li key={raw} className="text-sm text-amber-800">
                · {raw}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-center text-xs text-slate-400">Demoandmed</p>
    </div>
  );
}
