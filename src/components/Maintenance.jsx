import { Reveal, ParallaxBg, MaskReveal } from "@/components/primitives"
import { maintenance, photos } from "@/lib/site"

export function Maintenance() {
  return (
    <section id="maintenance" className="relative bg-ink text-paper">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-0 lg:grid-cols-12">
        {/* Image rail */}
        <div className="relative min-h-[42vh] overflow-hidden lg:col-span-5 lg:min-h-full">
          <ParallaxBg
            src={photos.oil}
            speed={18}
            position="center"
            overlay="bg-gradient-to-t from-ink via-ink/35 to-ink/55 lg:bg-gradient-to-r"
          />
          <div className="relative flex h-full flex-col justify-end p-6 sm:p-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/60">
              Scheduled care
            </span>
            <p className="mt-2 max-w-xs font-display text-3xl uppercase leading-none tracking-tight sm:text-4xl">
              Keep it running like new
            </p>
          </div>
        </div>

        {/* Schedule list */}
        <div className="px-5 py-20 sm:px-8 lg:col-span-7 lg:py-28 lg:pl-16">
          <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight sm:text-6xl">
            <MaskReveal>Service</MaskReveal>
            <MaskReveal delay={0.1} className="text-gold">
              Intervals
            </MaskReveal>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/60">
            Stay ahead of breakdowns. Here is how often the big systems need
            attention to keep running strong.
          </p>

          <dl className="mt-12">
            {maintenance.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.04}>
                <div className="group grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-paper/12 py-5 transition-colors hover:bg-paper/[0.03]">
                  <div>
                    <dt className="font-display text-xl uppercase tracking-wide text-paper transition-colors group-hover:text-accent sm:text-2xl">
                      {m.title}
                    </dt>
                    <dd className="mt-1 text-sm text-paper/55">{m.sub}</dd>
                  </div>
                  <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-paper/70">
                    {m.interval}
                  </span>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-paper/12" />
          </dl>
        </div>
      </div>
    </section>
  )
}
