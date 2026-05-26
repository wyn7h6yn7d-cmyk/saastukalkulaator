import Link from "next/link";
import { Card } from "../ui/Card";
import { PAGE_CONTAINER, WebLayout } from "../layout/WebLayout";

const STEPS = [
  { n: "1", title: "Sisesta nimekiri", text: "Kirjuta tooted eraldi ridadele." },
  { n: "2", title: "Võrdle hindu", text: "Võrdleme poodide näidishindu." },
  { n: "3", title: "Saa plaan", text: "Näed, kust mida osta." },
  { n: "4", title: "Säästa", text: "Selge summa ja sääst." },
] as const;

export function LandingPage() {
  return (
    <WebLayout>
      <div className={PAGE_CONTAINER}>
        <section className="text-center sm:text-left">
          <p className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
            Eesti ostukorv
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            Osta targemalt.
            <br />
            <span className="text-emerald-700">Maksa vähem.</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Sisesta ostunimekiri ja leia odavaim plaan Rimi, Selveri, Maxima,
            Prisma ja Lidl vahel.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-start">
            <Link href="/app" className="btn-primary w-full sm:w-auto">
              Alusta võrdlust
            </Link>
            <Link href="/stores" className="btn-secondary w-full sm:w-auto">
              Vaata poode
            </Link>
          </div>
        </section>

        <Card className="mt-10 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Näidisvõrdlus
          </p>
          <p className="savings-hero mt-2 text-emerald-700">28,76 €</p>
          <p className="mt-1 text-sm text-slate-600">6 toodet · 2 poodi</p>
          <p className="mt-3 text-sm font-semibold text-emerald-600">
            Säästad 7,64 €
          </p>
        </Card>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-slate-900">Kuidas see töötab?</h2>
          <ol className="mt-4 space-y-3">
            {STEPS.map(({ n, title, text }) => (
              <li key={n} className="card flex gap-4 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                  {n}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="mt-0.5 text-sm text-slate-600">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-slate-900">Miks Säästukorv?</h2>
          <ul className="mt-4 space-y-2">
            {[
              "Selge ülevaade, kust osta",
              "Võrdled mitut poodi korraga",
              "Säästad raha ja aega",
              "Töötab telefonis ja arvutis",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm"
              >
                <span className="text-emerald-600">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 text-center text-xs text-slate-400">
          <Link href="/pricing" className="underline hover:text-emerald-700">
            Vaata hindu ja pakette
          </Link>
          {" · "}
          Demoandmed
        </p>
      </div>
    </WebLayout>
  );
}
