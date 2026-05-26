"use client";

import { formatEuro } from "@/lib/format";
import type { PriceAlert } from "@/lib/priceAlerts";
import { Card } from "./ui/Card";

interface AlertProductCardProps {
  alert: PriceAlert;
}

export function AlertProductCard({ alert }: AlertProductCardProps) {
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-base font-bold text-ink">
            {alert.productName}
          </h2>
          <p className="text-xs text-muted">{alert.unit}</p>
        </div>
        {alert.dealFound && (
          <span className="badge-discount shrink-0 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">
            Pakkumine leitud
          </span>
        )}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-brand-light px-3 py-2.5">
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">
            Parim hind
          </dt>
          <dd className="mt-0.5 text-lg font-bold text-brand">
            {formatEuro(alert.currentBestPrice)}
          </dd>
        </div>
        <div className="rounded-lg bg-page px-3 py-2.5">
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">
            Siht hind
          </dt>
          <dd className="mt-0.5 text-lg font-bold text-ink">
            {formatEuro(alert.targetPrice)}
          </dd>
        </div>
      </dl>

      <p className="mt-3 text-sm text-muted">
        <span>Pood: </span>
        <span className="font-medium text-ink">{alert.storeName}</span>
      </p>

      <button
        type="button"
        className="btn-secondary mt-4 w-full !min-h-11"
        onClick={() => {
          /* MVP: teavitused tulevad hiljem */
        }}
      >
        Muuda
      </button>
    </Card>
  );
}
