import Link from "next/link";
import { AlertProductCard } from "@/components/AlertProductCard";
import { APP_PAGE_CONTAINER, WebLayout } from "@/components/layout/WebLayout";
import { MOCK_PRICE_ALERTS } from "@/lib/priceAlerts";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Hinnateated",
  description: "Jälgi lemmiktoote hindu ja saa teada, kui hind langeb.",
};

export default function AlertsPage() {
  const dealCount = MOCK_PRICE_ALERTS.filter((a) => a.dealFound).length;

  return (
    <WebLayout>
      <div className={APP_PAGE_CONTAINER}>
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-ink">
            Hinnateated
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Vali tooted, mille hinnalangust soovid jälgida.
          </p>
          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
            Hinnateated tulevad peagi. Siin näed, kuidas toote jälgimine välja
            näeb.
          </p>
        </header>

        {dealCount > 0 && (
          <p className="mb-4 text-sm font-medium text-brand">
            {dealCount}{" "}
            {dealCount === 1 ? "tootel on" : "tootel on"} praegu pakkumine
            leitud.
          </p>
        )}

        <ul className="space-y-4">
          {MOCK_PRICE_ALERTS.map((alert) => (
            <li key={alert.id}>
              <AlertProductCard alert={alert} />
            </li>
          ))}
        </ul>

        <Card className="mt-8 border-dashed p-6 text-center">
          <p className="text-sm font-medium text-ink">
            Lisa toode, mille pakkumisi soovid jälgida.
          </p>
          <button
            type="button"
            disabled
            className="mt-4 w-full cursor-not-allowed rounded-lg border border-border bg-page px-4 py-3 text-sm font-semibold text-muted"
            title="Tulekul"
          >
            Lisa toode (tulekul)
          </button>
          <p className="mt-3 text-xs text-muted">
            Või{" "}
            <Link href="/hinnad" className="font-medium text-brand underline">
              sirvi hindu
            </Link>{" "}
            ja lisa hiljem jälgimisele.
          </p>
        </Card>
      </div>
    </WebLayout>
  );
}
