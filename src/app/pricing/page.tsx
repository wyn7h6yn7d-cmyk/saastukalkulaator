import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PAGE_CONTAINER, WebLayout } from "@/components/layout/WebLayout";

export const metadata = { title: "Hinnakiri" };

const PLANS = [
  {
    id: "free",
    title: "Tasuta",
    price: "0 €",
    period: "",
    highlighted: false,
    features: [
      "3 ostunimekirja kuus",
      "kuni 15 toodet nimekirjas",
      "hinnavõrdlus näidisandmetega",
      "ühe ja mitme poe võrdlus",
    ],
    cta: "Alusta tasuta",
  },
  {
    id: "premium",
    title: "Säästja",
    price: "4.99 €",
    period: "/kuu",
    highlighted: true,
    features: [
      "piiramatu arv ostunimekirju",
      "pakkumise alarmid",
      "lemmiktoodete jälgimine",
      "pere jagatud ostunimekiri",
      "retseptist ostukorv",
      "hinnaajalugu",
    ],
    cta: "Vali Säästja",
  },
  {
    id: "family",
    title: "Pere",
    price: "7.99 €",
    period: "/kuu",
    highlighted: false,
    features: [
      "kõik Premium funktsioonid",
      "mitu kasutajat",
      "ühised ostunimekirjad",
      "nädala menüü planeerimine",
      "mitu asukohta",
    ],
    cta: "Vali Pere",
  },
] as const;

export default function PricingPage() {
  return (
    <WebLayout>
      <div className={PAGE_CONTAINER}>
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Hinnakiri</h1>
          <p className="mt-2 text-sm text-slate-600">
            Alusta tasuta — makselahendus tuleb hiljem.
          </p>
        </header>

        <ul className="space-y-5">
          {PLANS.map((plan) => (
            <li key={plan.id}>
              <Card
                className={`p-5 sm:p-6 ${
                  plan.highlighted ? "ring-2 ring-emerald-400" : ""
                }`}
              >
                {plan.highlighted && (
                  <span className="mb-3 inline-block rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
                    Populaarseim
                  </span>
                )}
                <h2 className="text-xl font-bold text-slate-900">{plan.title}</h2>
                <p className="mt-2">
                  <span
                    className={`font-bold ${
                      plan.highlighted
                        ? "text-3xl text-emerald-700"
                        : "text-2xl text-slate-900"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span className="text-slate-500">{plan.period}</span>
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-slate-700">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-emerald-600">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/app"
                  className={`mt-6 block w-full text-center ${
                    plan.highlighted ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  {plan.cta}
                </Link>
              </Card>
            </li>
          ))}
        </ul>

        <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900">
          Makselahendust MVP-s veel ei ole. See on hinnastuse näidis.
        </p>

        <p className="mt-6 text-center text-sm text-slate-500">
          <Link href="/" className="font-medium text-emerald-700 hover:underline">
            ← Tagasi avalehele
          </Link>
        </p>
      </div>
    </WebLayout>
  );
}
