"use client";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  onDark?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", onDark = false, className, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-sans font-medium rounded-pill transition-colors duration-standard ease-brand focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-signal-500/55 disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap";

    const sizes: Record<Size, string> = {
      sm: "h-9 px-16 text-sm",
      md: "h-11 px-24 text-body",
      lg: "h-14 px-32 text-body-lg",
    };

    const variants: Record<Variant, string> = {
      primary: onDark
        ? "bg-terra-500 text-white hover:bg-terra-600"
        : "bg-terra-500 text-white hover:bg-terra-600",
      outline: onDark
        ? "border border-cream/40 text-cream hover:border-cream/70 hover:bg-cream/10"
        : "border border-navy-900/30 text-navy-900 hover:border-navy-900/60 hover:bg-navy-900/5",
      ghost: onDark
        ? "text-cream/80 hover:text-cream hover:bg-cream/10"
        : "text-navy-700 hover:text-navy-900 hover:bg-navy-900/5",
    };

    return (
      <button
        ref={ref}
        className={cn(base, sizes[size], variants[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
