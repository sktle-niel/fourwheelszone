import { Reveal, ParallaxBg } from "@/components/primitives"
import { photos } from "@/lib/site"

export function Divider() {
  return (
    <section className="relative flex min-h-[52svh] items-center justify-center overflow-hidden text-center">
      <ParallaxBg
        src={photos.wheel}
        speed={20}
        position="center"
        overlay="bg-ink/78"
      />
      <div className="relative px-5">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-paper/55">
            Repair · Service · Trusted
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 font-display text-[clamp(3rem,11vw,9rem)] uppercase leading-none tracking-tight text-paper">
            Alagang <span className="text-accent">Casa</span>
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-paper/60">
            Casa-grade care without the casa price. That promise has kept
            Palawan drivers coming back since day one.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
