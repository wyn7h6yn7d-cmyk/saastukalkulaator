/** Loeb ostunimekirja URL parameetrist (?list=...) */
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
