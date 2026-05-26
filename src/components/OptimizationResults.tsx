import { formatEuro } from "@/lib/format";
import type { OptimizationResult } from "@/lib/optimizer";
import { GlassCard } from "./ui/GlassCard";
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
      <GlassCard glow className="overflow-hidden p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-[#00f5a0]">
          Soovitatud ostuplaan
        </p>
        <p className="font-[family-name:var(--font-outfit)] mt-2 text-4xl font-bold text-white">
          {formatEuro(result.split.total)}
        </p>
        <p className="text-sm text-[#94a89e]">
          {result.split.storeCount}{" "}
          {result.split.storeCount === 1 ? "pood" : "poodi"}
        </p>
        <div className="mt-5 space-y-2 border-t border-white/10 pt-5 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-[#94a89e]">Sääst vs parim üks pood</span>
            <span className="font-semibold text-[#00f5a0]">
              {formatEuro(result.savings.vsCheapestAllInOne)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-[#94a89e]">Sääst vs kalleim üks pood</span>
            <span className="font-semibold text-[#ffb020]">
              {formatEuro(result.savings.vsMostExpensiveAllInOne)}
            </span>
          </div>
        </div>
        <p className="mt-4 rounded-xl border border-[#00f5a0]/20 bg-[#00f5a0]/5 px-4 py-3 text-sm text-[#c5d9ce]">
          {result.message}
        </p>
      </GlassCard>

      {result.split.groups.map((group) => (
        <GlassCard key={group.store.id} className="overflow-hidden">
          <div className="border-b border-white/10 bg-black/20 px-5 py-4">
            <StoreBadge store={group.store} />
            <p className="mt-2 text-sm text-[#94a89e]">{group.store.address}</p>
            <p className="text-xs text-[#5a6e64]">{group.store.distanceKm} km</p>
          </div>
          <ul className="divide-y divide-white/5 px-5">
            {group.items.map((item) => (
              <li
                key={`${group.store.id}-${item.productId}`}
                className="py-4"
              >
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-white">{item.productName}</p>
                    <p className="mt-0.5 text-xs text-[#94a89e]">
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
                    <p className="font-bold text-white">
                      {formatEuro(item.lineTotal)}
                    </p>
                    <p className="text-xs text-[#00f5a0]">
                      {formatEuro(item.unitPrice)} / tk
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-white/10 bg-[#00f5a0]/5 px-5 py-3">
            <span className="text-sm text-[#c5d9ce]">Poe vahesumma</span>
            <span className="font-bold text-[#00f5a0]">
              {formatEuro(group.subtotal)}
            </span>
          </div>
        </GlassCard>
      ))}

      <GlassCard className="p-5">
        <h3 className="font-semibold text-white">Kui ostaksid kõik ühest poest</h3>
        <p className="mt-1 text-xs text-[#94a89e]">
          Odavaim: {result.cheapestAllInOne.store.name}
        </p>
        <ol className="mt-4 space-y-2">
          {rankedAllInOne.map((option, index) => (
            <li
              key={option.store.id}
              className={`flex justify-between gap-3 rounded-xl px-3 py-2.5 ${
                index === 0 && option.complete
                  ? "border border-[#00f5a0]/30 bg-[#00f5a0]/10"
                  : "bg-black/20"
              }`}
            >
              <div>
                <span className="text-sm text-white">{option.store.name}</span>
                {!option.complete && (
                  <p className="text-xs text-[#ffb020]">Mõni toode puudub</p>
                )}
              </div>
              <span className="shrink-0 font-mono text-sm font-semibold text-[#00f5a0]">
                {formatEuro(option.total)}
              </span>
            </li>
          ))}
        </ol>
      </GlassCard>

      {unmatched.length > 0 && (
        <div className="rounded-2xl border border-[#ffb020]/30 bg-[#ffb020]/10 p-5">
          <h3 className="text-sm font-semibold text-[#ffc857]">
            Neid tooteid ei leidnud mock-andmetest:
          </h3>
          <ul className="mt-2 space-y-1">
            {unmatched.map((raw) => (
              <li
                key={raw}
                className="rounded-lg bg-black/20 px-3 py-2 text-sm text-[#ffe4a8]"
              >
                {raw}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-center text-xs text-[#5a6e64]">Demoandmed</p>
    </div>
  );
}
