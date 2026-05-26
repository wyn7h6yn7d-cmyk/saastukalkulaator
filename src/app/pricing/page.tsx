import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { APP_PAGE_CONTAINER, WebLayout } from "@/components/layout/WebLayout";

export const metadata = { title: "Paketid" };

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
      "hinnateated",
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
      <div className={APP_PAGE_CONTAINER}>
        <header className="mb-8 text-center lg:mb-10">
          <h1 className="text-2xl font-bold text-ink lg:text-3xl">
            Paketid
          </h1>
          <p className="mt-2 text-sm text-muted lg:text-base">
            Vali pakett, mis sobib. Alusta tasuta — maksmine lisandub hiljem.
          </p>
        </header>

        <ul className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {PLANS.map((plan) => (
            <li key={plan.id}>
              <Card
                className={`p-5 sm:p-6 ${
                  plan.highlighted ? "ring-2 ring-brand/40" : ""
                }`}
              >
                {plan.highlighted && (
                  <span className="mb-3 inline-block rounded-md bg-brand px-3 py-1 text-xs font-bold text-white">
                    Populaarseim
                  </span>
                )}
                <h2 className="text-xl font-bold text-ink">{plan.title}</h2>
                <p className="mt-2">
                  <span
                    className={`font-bold ${
                      plan.highlighted
                        ? "text-3xl text-brand"
                        : "text-2xl text-ink"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span className="text-muted">{plan.period}</span>
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-ink">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-brand">✓</span>
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

        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/" className="font-medium text-brand hover:underline">
            ← Tagasi avalehele
          </Link>
        </p>
      </div>
    </WebLayout>
  );
}
