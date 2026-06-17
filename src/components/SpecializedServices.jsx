import { Clock } from "lucide-react"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { specializedServices } from "@/lib/site"

export function SpecializedServices() {
  return (
    <section
      id="specials"
      className="relative overflow-hidden bg-brand-dark py-20 sm:py-28"
    >
      {/* glow accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-20 size-96 rounded-full bg-brand-red/10 blur-[120px]" />
        <div className="absolute bottom-10 left-0 size-80 rounded-full bg-brand-gold/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          light
          eyebrow="Affordable Services"
          title="Specialized"
          accent="Care"
          subtitle="Para sa tamang maintenance schedule ng sasakyan mo — alam mo agad kung kailan kailangan."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {specializedServices.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.title} delay={i * 70}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand-gold/40 hover:bg-white/[0.06]">
                  {/* left accent bar */}
                  <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-red to-brand-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex items-start gap-4">
                    <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-brand-gold/30 bg-brand-gold/10 text-brand-gold transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-extrabold uppercase tracking-wide text-white">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-400">{s.subtitle}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4">
                    <Clock className="size-4 text-brand-red" />
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-steel">
                      {s.interval}
                    </span>
                  </div>
                </article>
              </Reveal>
            )
          })}

          {/* CTA card */}
          <Reveal delay={specializedServices.length * 70}>
            <a
              href="#book"
              onClick={(e) => {
                e.preventDefault()
                document
                  .querySelector("#book")
                  ?.scrollIntoView({ behavior: "smooth" })
              }}
              className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-brand-red/40 bg-brand-red/5 p-6 text-center transition-all duration-300 hover:border-brand-red hover:bg-brand-red/10"
            >
              <span className="text-2xl font-black uppercase text-white">
                Hindi sigurado?
              </span>
              <span className="text-sm text-zinc-400">
                Mag-book ng free check-up at sasabihin namin ang kailangan ng
                sasakyan mo.
              </span>
              <span className="mt-1 rounded-full bg-brand-red px-5 py-2 text-sm font-bold uppercase tracking-wide text-white">
                Mag-book na →
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
