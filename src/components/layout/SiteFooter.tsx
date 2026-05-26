import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[#060b08]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-[family-name:var(--font-outfit)] font-semibold text-white">
            Säästukorv
          </p>
          <p className="mt-1 text-sm text-[#94a89e]">
            Nutikas ostukorv · tuleviku toidupood veebis
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#94a89e]">
          <Link href="/app" className="transition hover:text-[#00f5a0]">
            Võrdle hindu
          </Link>
          <Link href="/stores" className="transition hover:text-[#00f5a0]">
            Poed
          </Link>
          <Link href="/pricing" className="transition hover:text-[#00f5a0]">
            Hinnakiri
          </Link>
        </div>
        <p className="text-xs text-[#5a6e64]">
          © {new Date().getFullYear()} · demoandmed
        </p>
      </div>
    </footer>
  );
}
