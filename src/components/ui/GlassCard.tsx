import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function GlassCard({ children, className = "", glow = false }: GlassCardProps) {
  return (
    <div
      className={`glass-panel rounded-2xl ${glow ? "glow-emerald" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
