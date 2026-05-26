export function formatEuro(amount: number): string {
  return new Intl.NumberFormat("et-EE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}
