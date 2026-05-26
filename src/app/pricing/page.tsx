import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
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
        <header className="mb-12 text-center">
          <p className="text-xs uppercase tracking-widest text-[#00f5a0]">
            Paketid
          </p>
          <h1 className="font-[family-name:var(--font-outfit)] mt-2 text-4xl font-bold text-white">
            Hinnakiri
          </h1>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <GlassCard
              key={plan.id}
              glow={plan.highlighted}
              className={`flex flex-col p-6 ${plan.highlighted ? "lg:-mt-2 lg:mb-2" : ""}`}
            >
              {plan.highlighted && (
                <span className="mb-3 w-fit rounded-full bg-[#00f5a0] px-2.5 py-0.5 text-xs font-bold text-[#041208]">
                  Populaarseim
                </span>
              )}
              <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-white">
                {plan.title}
              </h2>
              <p className="mt-3">
                <span
                  className={`font-bold ${plan.highlighted ? "text-4xl text-[#00f5a0]" : "text-3xl text-white"}`}
                >
                  {plan.price}
                </span>
                <span className="text-[#94a89e]">{plan.period}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-[#c5d9ce]">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-[#00f5a0]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/app"
                className={`mt-6 block rounded-xl py-3 text-center text-sm font-semibold ${
                  plan.highlighted
                    ? "btn-neon"
                    : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </Link>
            </GlassCard>
          ))}
        </div>

        <p className="mt-10 rounded-xl border border-[#ffb020]/30 bg-[#ffb020]/10 px-4 py-3 text-center text-sm text-[#ffc857]">
          Makselahendust MVP-s veel ei ole. See on hinnastuse näidis.
        </p>
      </div>
    </WebLayout>
  );
}
