import { AnimatedBackground } from "./AnimatedBackground";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

interface WebLayoutProps {
  children: React.ReactNode;
}

export function WebLayout({ children }: WebLayoutProps) {
  return (
    <div className="relative flex min-h-dvh flex-col text-[#e8f5ef]">
      <AnimatedBackground />
      <SiteHeader />
      <main className="relative flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export const PAGE_CONTAINER =
  "relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8";
