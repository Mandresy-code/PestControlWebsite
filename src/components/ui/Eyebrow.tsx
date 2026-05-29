import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  dot?: boolean;
}

export default function Eyebrow({ dot = true, className, children, ...props }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-8 font-mono text-eyebrow uppercase tracking-widest text-signal-500",
        className
      )}
      {...props}
    >
      {dot && <span className="block w-[6px] h-[6px] rounded-full bg-signal-500 shrink-0" />}
      {children}
    </span>
  );
}
