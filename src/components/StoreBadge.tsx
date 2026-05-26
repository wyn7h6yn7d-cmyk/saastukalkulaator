import type { Store } from "@/lib/types";

interface StoreBadgeProps {
  store: Store;
  size?: "sm" | "md";
}

export function StoreBadge({ store, size = "md" }: StoreBadgeProps) {
  const sizeClasses =
    size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium text-white ${sizeClasses}`}
      style={{ backgroundColor: store.color }}
    >
      {store.name}
    </span>
  );
}
