import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  highlight?: boolean;
  id?: string;
}

export function Card({
  children,
  className = "",
  highlight = false,
  id,
}: CardProps) {
  return (
    <div
      id={id}
      className={highlight ? `card-highlight ${className}` : `card ${className}`}
    >
      {children}
    </div>
  );
}
