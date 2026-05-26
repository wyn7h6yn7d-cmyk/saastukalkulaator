import { formatEuro } from "@/lib/format";
import type { OptimizationResult } from "@/lib/optimizer";
import { Card } from "./ui/Card";
import { StoreBadge } from "./StoreBadge";

interface OptimizationResultDetailsProps {
  result: OptimizationResult;
}

function formatDifference(diff: number): string {
  if (Math.abs(diff) < 0.005) return "0 €";
  const prefix = diff > 0 ? "+" : "";
  return `${prefix}${formatEuro(diff)}`;
}

export function OptimizationResultDetails({ result }: OptimizationResultDetailsProps) {
  const unmatched = result.parsed
    .filter((p) => !p.matched)
    .map((p) => p.rawText);

  const splitTotal = result.split.total;

  const rankedAllInOne = [...result.allInOneOptions].sort((a, b) => {
    if (a.complete !== b.complete) return a.complete ? -1 : 1;
    return a.total - b.total;
  });

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-lg font-bold text-ink">Ostuplaan poe kaupa</h2>
        <p className="mt-1 text-sm text-muted">
          Kust iga toode soodsaim on — {result.split.storeCount}{" "}
          {result.split.storeCount === 1 ? "pood" : "poodi"}.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {result.split.groups.map((group) => (
            <Card key={group.store.id} className="overflow-hidden">
              <div className="border-b border-border px-4 py-4">
                <StoreBadge store={group.store} />
                <p className="mt-2 text-sm text-muted">{group.store.address}</p>
                <p className="text-xs text-muted">{group.store.distanceKm} km</p>
              </div>
              <ul className="divide-y divide-border">
                {group.items.map((item) => (
                  <li
                    key={`${group.store.id}-${item.productId}`}
                    className="flex justify-between gap-3 px-4 py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-ink">{item.productName}</p>
                        {item.isDiscount && (
                          <span className="badge-discount rounded px-1.5 py-0.5 text-[10px] font-semibold">
                            Pakkumine
                          </span>
                        )}
                        {item.loyaltyPrice != null &&
                          item.loyaltyPrice < item.shelfPrice && (
                            <span className="badge-loyalty rounded px-1.5 py-0.5 text-[10px] font-semibold">
                              Kliendikaart
                            </span>
                          )}
                      </div>
                      <p className="truncate text-xs text-muted">
                        {item.originalName}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-bold text-ink">
                        {formatEuro(item.lineTotal)}
                      </p>
                      {item.isDiscount && item.shelfPrice > item.unitPrice && (
                        <p className="text-xs text-muted line-through">
                          {formatEuro(item.shelfPrice * item.quantity)}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between border-t border-border bg-page px-4 py-3">
                <span className="text-sm font-medium text-muted">Vahesumma</span>
                <span className="font-bold text-ink">
                  {formatEuro(group.subtotal)}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">
          Kui ostaksid kõik ühest poest
        </h2>
        <p className="mt-1 text-sm text-muted">
          Võrdlus sinu soovitatud plaaniga ({formatEuro(splitTotal)}).
        </p>

        <Card className="mt-4 hidden overflow-hidden sm:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[20rem] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-page text-xs font-semibold text-muted">
                  <th className="px-4 py-3">Pood</th>
                  <th className="px-4 py-3 text-right">Summa</th>
                  <th className="px-4 py-3 text-right">Erinevus</th>
                </tr>
              </thead>
              <tbody>
                {rankedAllInOne.map((option) => {
                  const diff = option.complete
                    ? option.total - splitTotal
                    : null;
                  return (
                    <tr
                      key={option.store.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-3 font-medium text-ink">
                        {option.store.name}
                        {!option.complete && (
                          <span className="ml-2 text-xs font-normal text-discount">
                            (puuduvad tooted)
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-ink">
                        {option.complete ? formatEuro(option.total) : "—"}
                      </td>
                      <td
                        className={`px-4 py-3 text-right font-medium ${
                          diff == null
                            ? "text-muted"
                            : diff <= 0
                              ? "text-brand"
                              : "text-discount"
                        }`}
                      >
                        {diff == null ? "—" : formatDifference(diff)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <ul className="mt-4 space-y-2 sm:hidden">
          {rankedAllInOne.map((option) => {
            const diff = option.complete ? option.total - splitTotal : null;
            return (
              <li
                key={option.store.id}
                className="rounded-lg border border-border bg-card px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink">{option.store.name}</p>
                    {!option.complete && (
                      <p className="text-xs text-discount">Puuduvad tooted</p>
                    )}
                  </div>
                  <p className="font-bold text-ink">
                    {option.complete ? formatEuro(option.total) : "—"}
                  </p>
                </div>
                <p className="mt-2 text-xs text-muted">
                  Erinevus:{" "}
                  <span
                    className={
                      diff == null
                        ? ""
                        : diff <= 0
                          ? "font-semibold text-brand"
                          : "font-semibold text-discount"
                    }
                  >
                    {diff == null ? "—" : formatDifference(diff)}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      {unmatched.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <h3 className="text-sm font-semibold text-amber-900">
            Neid ridu ei õnnestunud mock-andmetega siduda:
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

      <p className="text-center text-xs text-muted">
        Hinnad on näidised — täpsustuvad, kui poed on ühendatud.
      </p>
    </div>
  );
}
