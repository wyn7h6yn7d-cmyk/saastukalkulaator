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
          <h2 className="text-base font-bold text-slate-900">
            {alert.productName}
          </h2>
          <p className="text-xs text-slate-500">{alert.unit}</p>
        </div>
        {alert.dealFound && (
          <span className="badge-discount shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">
            Pakkumine leitud
          </span>
        )}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-emerald-50 px-3 py-2.5">
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-emerald-800/80">
            Parim hind
          </dt>
          <dd className="mt-0.5 text-lg font-bold text-emerald-800">
            {formatEuro(alert.currentBestPrice)}
          </dd>
        </div>
        <div className="rounded-xl bg-slate-50 px-3 py-2.5">
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Siht hind
          </dt>
          <dd className="mt-0.5 text-lg font-bold text-slate-900">
            {formatEuro(alert.targetPrice)}
          </dd>
        </div>
      </dl>

      <p className="mt-3 text-sm text-slate-600">
        <span className="text-slate-500">Pood: </span>
        <span className="font-medium text-slate-800">{alert.storeName}</span>
      </p>

      <button
        type="button"
        className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
        onClick={() => {
          /* MVP: teavitused tulevad hiljem */
        }}
      >
        Muuda
      </button>
    </Card>
  );
}
