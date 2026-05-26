import { Suspense } from "react";
import { ComparePageClient } from "@/components/ComparePageClient";

export const metadata = {
  title: "Võrdle ostukorvi",
};

export default function ComparePage() {
  return (
    <Suspense fallback={null}>
      <ComparePageClient />
    </Suspense>
  );
}
