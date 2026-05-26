import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  highlight?: boolean;
}

export function Card({ children, className = "", highlight = false }: CardProps) {
  return (
    <div className={highlight ? `card-highlight ${className}` : `card ${className}`}>
      {children}
    </div>
  );
}
