import Link from "next/link";
import { Card } from "../ui/Card";
import { APP_PAGE_CONTAINER, WebLayout } from "../layout/WebLayout";

const STEPS = [
  {
    title: "Sisesta ostunimekiri",
    text: "Kirjuta tooted eraldi ridadele — nagu märkmikus või telefonis.",
  },
  {
    title: "Vali poed",
    text: "Vali, milliseid poode võrdled ja kas soovid ühte või mitut poodi.",
  },
  {
    title: "Leia soodsam plaan",
    text: "Näed, kust mida osta, kogu summat ja hinnangulist säästu.",
  },
] as const;

const BENEFITS = [
  "Pakkumised ja hinnad ühes vaates",
  "Võrdle hindu mitme poe vahel",
  "Arvestab sooduspakkumisi",
  "Näitab, kas lisaring tasub ära",
] as const;

const HERO_LIST = [
  "piim 2l",
  "munad 10tk",
  "kanafilee 600g",
  "riis 1kg",
  "kohv 500g",
] as const;

const HERO_PLAN = [
  { store: "Prisma", items: "piim, riis" },
  { store: "Lidl", items: "munad, kanafilee" },
  { store: "Rimi", items: "kohv pakkumisega" },
] as const;

function HeroPreviewCard() {
  return (
    <div
      id="näide"
      className="overflow-hidden rounded-lg border border-[#E2E6DE] bg-white shadow-[0_1px_2px_rgba(23,32,22,0.04)]"
    >
      <div className="border-b border-[#E2E6DE] px-5 py-3.5">
        <p className="text-sm font-semibold text-[#172016]">Näidisostukorv</p>
      </div>

      <div className="border-b border-[#E2E6DE] px-5 py-4">
        <p className="text-xs font-medium text-[#667064]">Ostunimekiri</p>
        <ul className="mt-2 space-y-1 font-mono text-sm leading-relaxed text-[#172016]">
          {HERO_LIST.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <div className="px-5 py-4">
        <p className="text-xs font-medium text-[#667064]">Soovitatud plaan</p>
        <ul className="mt-2.5 space-y-2 text-sm text-[#172016]">
          {HERO_PLAN.map(({ store, items }) => (
            <li key={store} className="flex gap-2">
              <span className="w-[3.25rem] shrink-0 font-semibold">{store}:</span>
              <span className="text-[#667064]">{items}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-1 border-t border-[#E2E6DE] bg-[#F7F8F4] px-5 py-4 text-sm">
        <p className="text-[#172016]">
          <span className="text-[#667064]">Kokku: </span>
          <span className="text-lg font-bold text-[#2F7D4A]">28,76 €</span>
        </p>
        <p className="text-[#172016]">
          <span className="text-[#667064]">Sääst: </span>
          <span className="font-bold text-[#2F7D4A]">7,64 €</span>
        </p>
      </div>
    </div>
  );
}

export function LandingPage() {
  return (
    <WebLayout>
      <div className={APP_PAGE_CONTAINER}>
        <section className="-mx-4 border-b border-[#E2E6DE] bg-[#F7F8F4] px-4 pb-12 pt-6 sm:-mx-6 sm:px-6 md:pb-16 md:pt-10 lg:-mx-8 lg:px-8">
          <div className="mx-auto max-w-6xl md:grid md:grid-cols-2 md:items-center md:gap-12 lg:gap-16">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#172016] sm:text-4xl">
                Leia oma ostukorvile odavaim plaan
              </h1>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-[#667064]">
                Sisesta ostunimekiri ja Säästukorv näitab, kust mida osta ning kui
                palju säästad.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/app"
                  className="btn-primary w-full sm:w-auto sm:min-w-[11rem]"
                >
                  Võrdle ostukorvi
                </Link>
                <a
                  href="#näide"
                  className="btn-secondary w-full sm:w-auto sm:min-w-[11rem]"
                >
                  Vaata näidet
                </a>
              </div>
            </div>

            <div className="mt-10 md:mt-0">
              <HeroPreviewCard />
            </div>
          </div>
        </section>

        <section className="border-t border-border py-12 md:py-14">
          <h2 className="text-xl font-bold text-ink md:text-2xl">
            Kuidas see töötab?
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Kolm lihtsat sammu — võrdlus käivitub alles siis, kui sa ise seda
            soovid.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="card p-5">
                <span className="text-sm font-semibold text-brand">
                  {index + 1}.
                </span>
                <h3 className="mt-2 font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-border py-12 md:py-14">
          <h2 className="text-xl font-bold text-ink md:text-2xl">
            Miks see kasulik on?
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3.5 text-sm text-ink"
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-brand"
                  aria-hidden
                >
                  ✓
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 rounded-lg border border-border bg-card px-6 py-8 text-center md:mb-12">
          <h2 className="text-lg font-bold text-ink">Proovi oma nimekirjaga</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Võrdle hindu ja leia soodsam plaan — nagu tavaline ostukorv, ainult
            targemalt.
          </p>
          <Link href="/app" className="btn-primary mt-6 inline-flex">
            Võrdle hindu
          </Link>
        </section>

        <p className="pb-8 text-center text-xs text-muted">
          <Link href="/recipes" className="underline hover:text-brand">
            Retseptid
          </Link>
          {" · "}
          <Link href="/pricing" className="underline hover:text-brand">
            Paketid
          </Link>
        </p>
      </div>
    </WebLayout>
  );
}
