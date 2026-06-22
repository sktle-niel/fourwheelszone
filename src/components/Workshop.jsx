import { Reveal, ParallaxBg, MaskReveal } from "@/components/primitives"
import { capabilities, photos } from "@/lib/site"

export function Workshop() {
  return (
    <section id="workshop" className="relative overflow-hidden">
      <ParallaxBg
        src={photos.rims}
        speed={16}
        position="center"
        overlay="bg-ink/85"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight text-paper sm:text-6xl">
              <MaskReveal>Everything</MaskReveal>
              <MaskReveal delay={0.1} className="text-outline">
                Under
              </MaskReveal>
              <MaskReveal delay={0.18}>One Roof</MaskReveal>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/65">
              One workshop, one team, one standard. Whatever your vehicle needs,
              it gets handled here, properly and on time.
            </p>
          </div>

          <div className="lg:col-span-8 lg:pt-3">
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-3">
              {capabilities.map((cap, gi) => (
                <Reveal key={cap.group} delay={gi * 0.08}>
                  <div>
                    <div className="flex items-center gap-2.5 border-b border-paper/20 pb-3">
                      <span
                        className={
                          "size-1.5 rotate-45 " +
                          (gi % 2 ? "bg-gold" : "bg-accent")
                        }
                      />
                      <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/85">
                        {cap.group}
                      </h3>
                    </div>
                    <ul className="mt-5 space-y-3.5">
                      {cap.items.map((it) => (
                        <li
                          key={it}
                          className="text-[15px] leading-snug text-paper/65"
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
