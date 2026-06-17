import { cn } from "@/lib/utils"
import { Reveal } from "@/components/Reveal"

export function SectionHeading({ eyebrow, title, accent, subtitle, light = false, className }) {
  return (
    <Reveal className={cn("mx-auto max-w-2xl text-center", className)}>
      {eyebrow && (
        <span className="inline-block rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-brand-red">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-4 text-3xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl",
          light ? "text-white" : "text-brand-dark"
        )}
      >
        {title} {accent && <span className="text-brand-red">{accent}</span>}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mx-auto mt-4 text-base sm:text-lg",
            light ? "text-zinc-300" : "text-zinc-600"
          )}
        >
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-brand-red to-brand-gold" />
    </Reveal>
  )
}
