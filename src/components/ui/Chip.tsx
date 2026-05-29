import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  onDark?: boolean;
}

export default function Chip({ onDark = false, className, children, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-12 py-4 rounded-pill font-mono text-eyebrow uppercase tracking-widest",
        onDark
          ? "bg-white/10 text-cream/80 border border-white/10"
          : "bg-navy-900/8 text-navy-700 border border-navy-900/10",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
