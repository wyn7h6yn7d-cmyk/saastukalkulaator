import { Suspense } from "react";
import { ShoppingApp } from "@/components/ShoppingApp";

export const metadata = {
  title: "Minu ostunimekiri — Säästukorv",
};

export default function ComparePage() {
  return (
    <Suspense fallback={null}>
      <ShoppingApp />
    </Suspense>
  );
}
