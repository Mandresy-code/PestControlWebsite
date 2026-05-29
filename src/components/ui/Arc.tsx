import { cn } from "@/lib/utils";

interface ArcProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
  opacity?: number;
}

export default function Arc({
  size = 320,
  className,
  strokeWidth = 1,
  opacity = 0.12,
}: ArcProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
      className={cn("pointer-events-none select-none", className)}
      style={{ opacity }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - strokeWidth}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={`${size * 1.2} ${size * 0.8}`}
        strokeDashoffset={size * 0.4}
        strokeLinecap="round"
      />
    </svg>
  );
}
