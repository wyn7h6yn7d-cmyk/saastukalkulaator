import Link from "next/link";
import { products } from "@/lib/mockData";
import { formatEuro } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { PAGE_CONTAINER, WebLayout } from "@/components/layout/WebLayout";

export const metadata = { title: "Hinnad" };

export default function PricesPage() {
  return (
    <WebLayout>
      <div className={PAGE_CONTAINER}>
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Hinnad</h1>
          <p className="mt-2 text-sm text-slate-600">
            Näidishinnad — reaalajas uuendusi pole veel.
          </p>
        </header>

        <ul className="space-y-2">
          {products.map((product) => {
            const cheapest = Math.min(...Object.values(product.prices));
            return (
              <li key={product.id}>
                <Card className="flex min-h-14 items-center justify-between gap-4 px-4 py-3">
                  <div>
                    <p className="font-semibold text-slate-900">{product.name}</p>
                    <p className="text-xs text-slate-500">{product.defaultUnit}</p>
                  </div>
                  <p className="shrink-0 text-base font-bold text-emerald-700">
                    {formatEuro(cheapest)}
                  </p>
                </Card>
              </li>
            );
          })}
        </ul>

        <div className="mt-8">
          <Link href="/app" className="btn-primary w-full">
            Võrdle ostunimekirja
          </Link>
        </div>
      </div>
    </WebLayout>
  );
}
