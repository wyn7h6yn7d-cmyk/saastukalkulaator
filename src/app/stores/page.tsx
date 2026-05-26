import Link from "next/link";
import { stores } from "@/lib/mockData";
import { CHAIN_LABELS, OPENING_HOURS_PLACEHOLDER } from "@/lib/chainLabels";
import { StoreBadge } from "@/components/StoreBadge";
import { Card } from "@/components/ui/Card";
import { PAGE_CONTAINER, WebLayout } from "@/components/layout/WebLayout";

export const metadata = { title: "Poed" };

export default function StoresPage() {
  return (
    <WebLayout>
      <div className={PAGE_CONTAINER}>
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Poed</h1>
          <p className="mt-2 text-sm text-slate-600">
            Tallinna näidispoed — vali pood ja võrdle hindu.
          </p>
        </header>

        <Card className="mb-6 p-5 text-center">
          <p className="text-2xl" aria-hidden>
            🗺️
          </p>
          <h2 className="mt-2 font-semibold text-slate-900">Poed sinu lähedal</h2>
          <p className="mt-2 text-sm text-slate-600">
            Kaardivaade lisatakse järgmises versioonis. Praegu kasutame
            näidisandmeid.
          </p>
        </Card>

        <ul className="space-y-4">
          {stores.map((store) => (
            <li key={store.id}>
              <Card className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <StoreBadge store={store} />
                  <span className="text-xs font-medium text-slate-500">
                    {store.distanceKm} km
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  {store.name}
                </h3>
                <p className="text-sm font-medium text-emerald-700">
                  {CHAIN_LABELS[store.chain]}
                </p>
                <p className="mt-2 text-sm text-slate-600">{store.address}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {OPENING_HOURS_PLACEHOLDER}
                </p>
                <Link
                  href="/hinnad"
                  className="btn-secondary mt-5 w-full !min-h-11"
                >
                  Vaata poes hindu
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </WebLayout>
  );
}
