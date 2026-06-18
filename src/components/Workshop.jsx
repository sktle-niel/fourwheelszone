import { Reveal, Eyebrow, ParallaxBg, MaskReveal } from "@/components/primitives"
import { capabilities, photos } from "@/lib/site"

export function Workshop() {
  return (
    <section id="workshop" className="relative overflow-hidden">
      <ParallaxBg
        src={photos.rims}
        speed={16}
        position="center"
        overlay="bg-ink/82"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="(04)">Full Capability</Eyebrow>
            <h2 className="mt-6 font-display text-5xl uppercase leading-[0.9] tracking-tight text-paper sm:text-6xl">
              <MaskReveal>Everything</MaskReveal>
              <MaskReveal delay={0.1} className="text-outline">
                Under
              </MaskReveal>
              <MaskReveal delay={0.18}>One Roof</MaskReveal>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/65">
              One workshop, one team, one standard. Whatever your vehicle needs,
              it gets handled here — properly and on time.
            </p>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 sm:grid-cols-2">
              {capabilities.map((c, i) => (
                <Reveal key={c} delay={i * 0.04} as="li">
                  <div className="group flex items-center gap-4 border-b border-paper/12 py-4">
                    <span className="font-mono text-[11px] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base text-paper/80 transition-colors group-hover:text-paper sm:text-lg">
                      {c}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
