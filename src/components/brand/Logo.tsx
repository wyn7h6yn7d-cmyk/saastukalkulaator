interface LogoProps {
  className?: string;
  showIcon?: boolean;
}

/** Lihtne tekstilogo — ilma efektideta */
export function Logo({ className = "", showIcon = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {showIcon && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 text-brand"
          aria-hidden
        >
          <path
            d="M3.5 7h13l-1.2 8.5H4.7L3.5 7Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M7 7V5.2a3 3 0 0 1 6 0V7"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      )}
      <span className="text-lg font-bold tracking-tight text-ink">Säästukorv</span>
    </span>
  );
}
