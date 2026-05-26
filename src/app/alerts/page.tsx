import Link from "next/link";
import { AlertProductCard } from "@/components/AlertProductCard";
import { PAGE_CONTAINER, WebLayout } from "@/components/layout/WebLayout";
import { MOCK_PRICE_ALERTS } from "@/lib/priceAlerts";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Pakkumise alarmid — Säästukorv",
  description: "Jälgi lemmiktoote hindu ja saa teada, kui hind langeb.",
};

export default function AlertsPage() {
  const dealCount = MOCK_PRICE_ALERTS.filter((a) => a.dealFound).length;

  return (
    <WebLayout>
      <div className={PAGE_CONTAINER}>
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Pakkumise alarmid
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Vali tooted, mille hinnalangust soovid jälgida.
          </p>
          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
            Demo: teavitused ja päris hinnavärskendused tulevad hiljem. Siin
            näed, kuidas jälgimine välja näeb.
          </p>
        </header>

        {dealCount > 0 && (
          <p className="mb-4 text-sm font-medium text-emerald-800">
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

        <Card className="mt-8 border-dashed border-slate-300 bg-slate-50/80 p-6 text-center">
          <p className="text-4xl opacity-40" aria-hidden>
            🔔
          </p>
          <p className="mt-3 text-sm font-medium text-slate-800">
            Lisa toode, mille pakkumisi soovid jälgida.
          </p>
          <button
            type="button"
            disabled
            className="mt-4 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-400"
            title="Tulekul"
          >
            Lisa toode (tulekul)
          </button>
          <p className="mt-3 text-xs text-slate-500">
            Või{" "}
            <Link href="/hinnad" className="font-medium text-emerald-700 underline">
              sirvi hindu
            </Link>{" "}
            ja lisa hiljem jälgimisele.
          </p>
        </Card>
      </div>
    </WebLayout>
  );
}
