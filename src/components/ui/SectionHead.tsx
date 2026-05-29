import { cn } from "@/lib/utils";
import Eyebrow from "./Eyebrow";

interface SectionHeadProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  onDark?: boolean;
  className?: string;
  id?: string;
}

export default function SectionHead({
  eyebrow,
  title,
  description,
  centered = false,
  onDark = false,
  className,
  id,
}: SectionHeadProps) {
  return (
    <div className={cn("space-y-16", centered && "text-center items-center", className)}>
      {eyebrow && (
        <Eyebrow className={onDark ? "text-signal-300" : undefined}>{eyebrow}</Eyebrow>
      )}
      <h2
        id={id}
        className={cn(
          "text-h2 font-medium tracking-tight max-w-[20ch]",
          centered && "mx-auto",
          onDark ? "text-white" : "text-navy-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-body-lg max-w-[60ch] leading-relaxed",
            centered && "mx-auto",
            onDark ? "text-navy-200" : "text-navy-600"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
