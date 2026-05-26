import Link from "next/link";
import { GlassCard } from "../ui/GlassCard";
import { PAGE_CONTAINER, WebLayout } from "../layout/WebLayout";

const STEPS = [
  { step: "01", title: "Sisesta nimekiri", desc: "Kirjuta tooted readena." },
  { step: "02", title: "Võrdle hindu", desc: "Skaneerime mock-hinnad." },
  { step: "03", title: "Leia parim plaan", desc: "Üks või mitu poodi." },
  { step: "04", title: "Säästa", desc: "Näed täpset summat." },
] as const;

export function LandingPage() {
  return (
    <WebLayout>
      <div className={PAGE_CONTAINER}>
        <section className="grid items-center gap-12 py-8 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#00f5a0]/30 bg-[#00f5a0]/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[#00f5a0]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00f5a0]" />
              Toidupoe tulevik · Tallinn
            </p>
            <h1 className="font-[family-name:var(--font-outfit)] mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              <span className="text-glow">Säästukorv</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#94a89e]">
              Nutikas ostukorv, mis leiab odavaima plaani Eesti poodide vahel.
              Värskelt. Kiiresti. Veebis.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/app" className="btn-neon rounded-xl px-8 py-3.5 text-sm">
                Alusta võrdlust →
              </Link>
              <a
                href="#kuidas"
                className="rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Kuidas töötab
              </a>
            </div>
          </div>

          <GlassCard glow className="relative overflow-hidden p-6 sm:p-8">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#00f5a0]/20 blur-3xl" />
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00f5a0]">
              Live preview
            </p>
            <p className="mt-2 font-[family-name:var(--font-outfit)] text-3xl font-bold text-white">
              28,76 €
            </p>
            <p className="text-sm text-[#94a89e]">6 toodet · 2 poodi</p>
            <div className="mt-6 space-y-2 border-t border-white/10 pt-6">
              {["piim", "munad", "kanafilee", "riis"].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2 text-sm"
                >
                  <span className="text-[#c5d9ce]">{item}</span>
                  <span className="font-mono text-[#00f5a0]">✓</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-[#5a6e64]">
              Sääst 7,64 € · demoandmed
            </p>
          </GlassCard>
        </section>

        <section id="kuidas" className="scroll-mt-24 py-12">
          <h2 className="font-[family-name:var(--font-outfit)] text-center text-2xl font-bold text-white sm:text-3xl">
            Kuidas see töötab
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ step, title, desc }) => (
              <GlassCard key={step} className="p-5 transition hover:border-[#00f5a0]/30">
                <span className="font-mono text-2xl font-bold text-[#00f5a0]/60">
                  {step}
                </span>
                <h3 className="mt-3 font-semibold text-white">{title}</h3>
                <p className="mt-1 text-sm text-[#94a89e]">{desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="py-12 text-center">
          <GlassCard glow className="mx-auto max-w-2xl p-10">
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-white">
              Valmis säästma?
            </h2>
            <p className="mt-2 text-[#94a89e]">
              Ava võrdlus brauseris — paigaldust pole vaja.
            </p>
            <Link
              href="/app"
              className="btn-neon mt-8 inline-flex rounded-xl px-10 py-3.5 text-sm"
            >
              Proovi kohe
            </Link>
          </GlassCard>
        </section>
      </div>
    </WebLayout>
  );
}
