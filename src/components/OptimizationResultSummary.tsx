import { formatEuro } from "@/lib/format";
import type { OptimizationResult } from "@/lib/optimizer";
import type { WorthItVerdict } from "@/lib/savingsVsTime";
import { Card } from "./ui/Card";

const VERDICT_LABEL: Record<WorthItVerdict, string> = {
  yes: "Jah, tasub",
  no: "Ei tasu",
  marginal: "Kaalu üle",
};

const VERDICT_BADGE: Record<WorthItVerdict, string> = {
  yes: "bg-brand-light text-brand",
  no: "bg-amber-50 text-amber-900",
  marginal: "bg-page text-muted",
};

interface OptimizationResultSummaryProps {
  result: OptimizationResult;
}

export function OptimizationResultSummary({ result }: OptimizationResultSummaryProps) {
  const { savingsVsTime } = result;
  const verdict = savingsVsTime.verdict;

  return (
    <Card className="p-5 sm:p-6">
      <h2 className="text-sm font-semibold text-ink">Tulemus</h2>

      <dl className="mt-4 space-y-4">
        <div>
          <dt className="text-xs font-medium text-muted">Kogusumma</dt>
          <dd className="savings-hero mt-0.5">{formatEuro(result.split.total)}</dd>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-xs font-medium text-muted">Sääst</dt>
            <dd className="mt-0.5 text-lg font-bold text-brand">
              {formatEuro(result.savings.vsCheapestAllInOne)}
            </dd>
            <p className="mt-0.5 text-[11px] text-muted">vs odavaim ühest poest</p>
          </div>
          <div>
            <dt className="text-xs font-medium text-muted">Poode</dt>
            <dd className="mt-0.5 text-lg font-bold text-ink">
              {result.split.storeCount}
            </dd>
          </div>
        </div>
      </dl>

      <div className="mt-4 border-t border-border pt-4">
        <p className="text-xs font-medium text-muted">Soovitus</p>
        <p className="mt-1 text-sm leading-relaxed text-ink">{result.message}</p>
      </div>

      <div className="mt-4 rounded-md border border-border bg-page px-3 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-ink">Kas tasub ära?</p>
          <span
            className={`rounded-md px-2.5 py-1 text-xs font-semibold ${VERDICT_BADGE[verdict]}`}
          >
            {VERDICT_LABEL[verdict]}
          </span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          {savingsVsTime.message}
        </p>
        <p className="mt-2 text-xs text-muted">
          Lisateekond hinnanguliselt{" "}
          <span className="font-medium text-ink">
            {savingsVsTime.estimatedExtraDistanceKm} km
          </span>
          , sääst{" "}
          <span className="font-medium text-brand">
            {formatEuro(savingsVsTime.estimatedSavingsEuro)}
          </span>
        </p>
      </div>

      {result.travelTolerance === "nearest" && (
        <p className="mt-3 text-xs text-muted">
          Lähim pood: {result.nearestAllInOne.store.name} (
          {formatEuro(result.nearestAllInOne.total)})
        </p>
      )}

      {result.excludedByDistance.length > 0 && (
        <p className="mt-2 text-xs text-muted">
          Kauguse tõttu välja:{" "}
          {result.excludedByDistance.map((s) => s.name).join(", ")}.
        </p>
      )}
    </Card>
  );
}
