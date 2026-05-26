import Link from "next/link";
import { stores } from "@/lib/mockData";
import { CHAIN_LABELS, OPENING_HOURS_PLACEHOLDER } from "@/lib/chainLabels";
import { StoreBadge } from "@/components/StoreBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { PAGE_CONTAINER, WebLayout } from "@/components/layout/WebLayout";

export const metadata = { title: "Poed" };

export default function StoresPage() {
  return (
    <WebLayout>
      <div className={PAGE_CONTAINER}>
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-[#00f5a0]">
            Asukohad
          </p>
          <h1 className="font-[family-name:var(--font-outfit)] mt-2 text-4xl font-bold text-white">
            Poed
          </h1>
        </header>

        <GlassCard className="mb-10 p-8 text-center">
          <span className="text-4xl">🗺️</span>
          <h2 className="mt-4 font-semibold text-white">Poed sinu lähedal</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#94a89e]">
            Kaardivaade lisatakse järgmises versioonis. Praegu kasutame
            näidisandmeid Tallinna poodidega.
          </p>
        </GlassCard>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <li key={store.id}>
              <GlassCard className="flex h-full flex-col p-5 transition hover:border-[#00f5a0]/30">
                <StoreBadge store={store} />
                <h3 className="mt-4 font-[family-name:var(--font-outfit)] text-lg font-bold text-white">
                  {store.name}
                </h3>
                <p className="text-sm text-[#00f5a0]">{CHAIN_LABELS[store.chain]}</p>
                <div className="mt-4 flex-1 space-y-2 text-sm text-[#94a89e]">
                  <p>{store.address}</p>
                  <p>~{store.distanceKm} km</p>
                  <p>{OPENING_HOURS_PLACEHOLDER}</p>
                </div>
                <Link
                  href="/hinnad"
                  className="mt-5 block rounded-xl border border-[#00f5a0]/30 bg-[#00f5a0]/10 py-2.5 text-center text-sm font-semibold text-[#00f5a0] transition hover:bg-[#00f5a0]/20"
                >
                  Vaata poes hindu
                </Link>
              </GlassCard>
            </li>
          ))}
        </ul>
      </div>
    </WebLayout>
  );
}
