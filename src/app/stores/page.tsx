import Link from "next/link";
import { stores } from "@/lib/mockData";
import { CHAIN_LABELS, OPENING_HOURS_PLACEHOLDER } from "@/lib/chainLabels";
import { StoreBadge } from "@/components/StoreBadge";
import { Card } from "@/components/ui/Card";
import { APP_PAGE_CONTAINER, WebLayout } from "@/components/layout/WebLayout";

export const metadata = { title: "Poed" };

export default function StoresPage() {
  return (
    <WebLayout>
      <div className={APP_PAGE_CONTAINER}>
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-ink">Poed</h1>
          <p className="mt-2 text-sm text-muted">
            Vali pood ja võrdle hindu — praegu Tallinna näidispoodidega.
          </p>
        </header>

        <Card className="mb-6 p-5 text-center">
          <h2 className="font-semibold text-ink">Poed sinu lähedal</h2>
          <p className="mt-2 text-sm text-muted">
            Kaardivaade lisatakse järgmises versioonis. Praegu kasutame
            näidisandmeid.
          </p>
        </Card>

        <ul className="grid gap-4 md:grid-cols-2">
          {stores.map((store) => (
            <li key={store.id}>
              <Card className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <StoreBadge store={store} />
                  <span className="text-xs font-medium text-muted">
                    {store.distanceKm} km
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-ink">
                  {store.name}
                </h3>
                <p className="text-sm font-medium text-brand">
                  {CHAIN_LABELS[store.chain]}
                </p>
                <p className="mt-2 text-sm text-muted">{store.address}</p>
                <p className="mt-1 text-sm text-muted">
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
