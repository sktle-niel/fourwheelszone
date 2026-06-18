import { ArrowUpRight } from "lucide-react"
import { Reveal, Eyebrow, MaskReveal } from "@/components/primitives"
import { services } from "@/lib/site"

export function Services() {
  return (
    <section id="services" className="relative bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Sticky heading */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow tone="ink">What We Do</Eyebrow>
              <h2 className="mt-6 font-display text-5xl uppercase leading-[0.9] tracking-tight sm:text-6xl">
                <MaskReveal>Services</MaskReveal>
                <MaskReveal delay={0.1} className="text-accent">
                  Built To Last
                </MaskReveal>
              </h2>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink/60">
                From a simple oil change to complex engine diagnostics, every
                job is handled with casa-grade discipline and honest pricing.
              </p>
            </div>
          </div>

          {/* Service list */}
          <div className="lg:col-span-8">
            <ul>
              {services.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.05} as="li">
                  <div
                    className="group relative grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 border-t border-ink/15 py-8 transition-colors sm:grid-cols-[auto_1fr_auto] sm:py-10"
                  >
                    <span className="font-mono text-xs text-accent">{s.n}</span>

                    <div>
                      <h3 className="font-display text-4xl uppercase leading-none tracking-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl">
                        {s.title}
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/60">
                        {s.desc}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                          <span
                            key={t}
                            className="border border-ink/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <ArrowUpRight className="col-start-2 size-7 self-center justify-self-start text-ink/30 transition-all duration-300 group-hover:text-accent sm:col-start-3 sm:justify-self-end sm:opacity-0 sm:group-hover:translate-x-1 sm:group-hover:opacity-100" />
                  </div>
                </Reveal>
              ))}
              <li className="border-t border-ink/15" />
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
