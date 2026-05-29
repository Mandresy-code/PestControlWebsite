import { cn } from "@/lib/utils";

interface StatProps {
  value: string;
  label: string;
  onDark?: boolean;
  className?: string;
}

export default function Stat({ value, label, onDark = false, className }: StatProps) {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <span
        className={cn(
          "font-mono text-h1 font-medium tracking-tight leading-none",
          onDark ? "text-white" : "text-navy-900"
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "text-body leading-snug max-w-[20ch]",
          onDark ? "text-navy-200" : "text-navy-500"
        )}
      >
        {label}
      </span>
    </div>
  );
}
