const PREFILL_STORAGE_KEY = "saastukorv-shopping-list-prefill";

/** Salvestab ostunimekirja teksti — loetakse /app lehel ühe korra. */
export function setShoppingListPrefill(text: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PREFILL_STORAGE_KEY, text);
}

/** Tagastab salvestatud nimekirja ja kustutab selle. */
export function consumeShoppingListPrefill(): string | null {
  if (typeof window === "undefined") return null;
  const value = sessionStorage.getItem(PREFILL_STORAGE_KEY);
  if (value != null) {
    sessionStorage.removeItem(PREFILL_STORAGE_KEY);
    return value;
  }
  return null;
}

/** Lühike nimekiri URL-ist (?list=...) — base64 või encodeURIComponent */
export function readListFromSearchParam(
  searchParams: URLSearchParams,
): string | null {
  const raw = searchParams.get("list");
  if (!raw) return null;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}
