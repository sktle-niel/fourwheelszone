import { ParallaxBg, Reveal, Eyebrow } from "@/components/primitives"
import { photos } from "@/lib/site"

export function Statement() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden">
      <ParallaxBg
        src={photos.craft}
        speed={16}
        position="center"
        overlay="bg-ink/72"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-28 sm:px-8">
        <Reveal>
          <Eyebrow index="(02)">The Workshop Standard</Eyebrow>
        </Reveal>

        <Reveal delay={0.1}>
          <blockquote className="mt-8 max-w-4xl font-display text-[clamp(2rem,5.5vw,4.75rem)] uppercase leading-[0.95] tracking-tight text-paper">
            We treat every engine like it&apos;s our own —{" "}
            <span className="text-outline-thin">diagnosed properly</span>,
            repaired honestly, returned <span className="text-accent">running right.</span>
          </blockquote>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 max-w-md border-l-2 border-accent pl-5 text-sm leading-relaxed text-paper/65">
            No guesswork, no shortcuts. Computerized diagnostics confirm the
            problem before a single bolt is turned — so you only pay for the
            repair you actually need.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
