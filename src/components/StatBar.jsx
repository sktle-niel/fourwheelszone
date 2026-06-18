import { Reveal } from "@/components/primitives"
import { stats } from "@/lib/site"

// Proof band that sits directly under the hero (kept out of the hero stack).
export function StatBar() {
  return (
    <section className="border-y border-paper/12 bg-ink-soft">
      <div className="mx-auto grid max-w-[1400px] grid-cols-3 divide-x divide-paper/10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="px-4 py-7 sm:px-8 sm:py-9">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl text-paper sm:text-5xl">
                  {s.value}
                </span>
                <span
                  className={
                    "size-1.5 rotate-45 " + (i === 1 ? "bg-gold" : "bg-accent")
                  }
                />
              </div>
              <div className="mt-2 max-w-[10rem] font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-paper/45">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
