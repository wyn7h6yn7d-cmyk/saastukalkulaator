import { BottomNav } from "./BottomNav";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

interface WebLayoutProps {
  children: React.ReactNode;
}

export function WebLayout({ children }: WebLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-page">
      <SiteHeader />
      <main className="flex-1 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        {children}
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}

export const PAGE_CONTAINER =
  "mx-auto w-full max-w-lg px-4 py-6 sm:max-w-2xl sm:px-6 sm:py-8 lg:max-w-3xl";

export const APP_PAGE_CONTAINER =
  "mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8";

export const PAGE_CONTAINER_WIDE = APP_PAGE_CONTAINER;
