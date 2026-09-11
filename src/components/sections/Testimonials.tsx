"use client";
import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHead from "@/components/ui/SectionHead";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/content";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

// N'affiche rien tant que le client n'a pas fourni de citations réelles
// (voir lib/content.ts — testimonials). Ne jamais remplir ce tableau avec
// des citations inventées : mieux vaut une section absente qu'un faux avis client.
export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  if (testimonials.length === 0) return null;

  const current = testimonials[index];
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section className="bg-navy-900 text-white section-padding" aria-labelledby="testimonials-title">
      <div className="container-site">
        <SectionHead
          eyebrow="Ils nous font confiance"
          title="Ce que nos clients en disent."
          onDark
          className="mb-56"
          id="testimonials-title"
        />

        <div className="max-w-[680px] mx-auto text-center">
          <Quote size={32} strokeWidth={1.5} className="text-signal-400 mx-auto mb-24" />
          <p className="text-h3 font-medium text-white leading-relaxed mb-24">
            «&nbsp;{current.quote}&nbsp;»
          </p>
          <p className="text-body text-navy-300">
            <span className="font-medium text-white">{current.author}</span> — {current.role}
          </p>

          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-16 mt-40">
              <button
                onClick={prev}
                aria-label="Témoignage précédent"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-signal-400 transition-colors duration-micro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55"
              >
                <ChevronLeft size={16} strokeWidth={1.5} />
              </button>
              <div className="flex items-center gap-8">
                {testimonials.map((_, i) => (
                  <span
                    key={i}
                    className={cn("w-[6px] h-[6px] rounded-full transition-colors duration-micro",
                      i === index ? "bg-signal-400" : "bg-white/20")}
                  />
                ))}
              </div>
              <button
                onClick={next}
                aria-label="Témoignage suivant"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-signal-400 transition-colors duration-micro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500/55"
              >
                <ChevronRight size={16} strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
