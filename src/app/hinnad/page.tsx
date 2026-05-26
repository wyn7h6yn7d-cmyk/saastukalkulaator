import Link from "next/link";
import { products } from "@/lib/mockData";
import { formatEuro } from "@/lib/format";
import { GlassCard } from "@/components/ui/GlassCard";
import { PAGE_CONTAINER, WebLayout } from "@/components/layout/WebLayout";

export const metadata = { title: "Hinnad" };

export default function PricesPage() {
  return (
    <WebLayout>
      <div className={PAGE_CONTAINER}>
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-[#00f5a0]">
            Hinnaregister
          </p>
          <h1 className="font-[family-name:var(--font-outfit)] mt-2 text-4xl font-bold text-white">
            Hinnad
          </h1>
          <p className="mt-2 text-[#94a89e]">Näidishinnad · live sync tulekul</p>
        </header>

        <GlassCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-black/30">
                  <th className="px-5 py-4 font-medium text-[#94a89e]">Toode</th>
                  <th className="px-5 py-4 font-medium text-[#94a89e]">Ühik</th>
                  <th className="px-5 py-4 text-right font-medium text-[#94a89e]">
                    Alates
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((product) => {
                  const cheapest = Math.min(...Object.values(product.prices));
                  return (
                    <tr
                      key={product.id}
                      className="transition hover:bg-white/5"
                    >
                      <td className="px-5 py-3.5 font-medium text-white">
                        {product.name}
                      </td>
                      <td className="px-5 py-3.5 text-[#94a89e]">
                        {product.defaultUnit}
                      </td>
                      <td className="px-5 py-3.5 text-right font-mono font-semibold text-[#00f5a0]">
                        {formatEuro(cheapest)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <div className="mt-10 text-center">
          <Link href="/app" className="btn-neon inline-flex rounded-xl px-8 py-3 text-sm">
            Võrdle ostunimekirja
          </Link>
        </div>
      </div>
    </WebLayout>
  );
}
