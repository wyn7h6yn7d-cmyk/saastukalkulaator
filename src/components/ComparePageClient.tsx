"use client";

import { useSearchParams } from "next/navigation";
import { ShoppingApp } from "./ShoppingApp";
import { readListFromSearchParam } from "@/lib/shoppingListPrefill";

export function ComparePageClient() {
  const searchParams = useSearchParams();
  const initialList = readListFromSearchParam(searchParams);

  const prefillNotice = initialList?.trim()
    ? searchParams.get("from") === "recipe"
      ? "Retsepti koostisosad on ostunimekirjas. Võrdle hindu allpool."
      : "Ostunimekiri laaditi lingist. Võrdle hindu allpool."
    : null;

  return (
    <ShoppingApp
      initialListText={initialList?.trim()}
      prefillNotice={prefillNotice}
    />
  );
}
