import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowDownRight } from "lucide-react"
import { ParallaxBg, MaskReveal } from "@/components/primitives"
import { photos, site, stats } from "@/lib/site"

export function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      <ParallaxBg
        src={photos.hero}
        speed={14}
        position="center 35%"
        overlay="bg-gradient-to-b from-ink/80 via-ink/55 to-ink"
      />

      {/* Vertical meta rail */}
      <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 sm:right-8 lg:block">
        <span className="block rotate-90 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.4em] text-paper/50">
          Tagburos · Puerto Princesa · Palawan
        </span>
      </div>

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative mx-auto w-full max-w-[1400px] px-5 pb-16 sm:px-8 sm:pb-20"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.34em] text-paper/60"
        >
          <span className="text-accent">EST. 2019</span>
          <span className="h-px w-10 bg-paper/30" />
          {site.tagline}
        </motion.p>

        <h1 className="font-display text-[clamp(3.2rem,12vw,11rem)] uppercase leading-[0.86] tracking-tight text-paper">
          <MaskReveal delay={0.15}>Four Wheels</MaskReveal>
          <MaskReveal delay={0.3} className="text-outline">
            Zone
          </MaskReveal>
        </h1>

        <div className="mt-8 flex flex-col gap-8 border-t border-paper/15 pt-7 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-md text-sm leading-relaxed text-paper/70 sm:text-base"
          >
            A trusted auto-repair workshop in Palawan. Brakes, diagnostics,
            maintenance and full mechanical care — done with the precision of a
            casa, the warmth of a neighbor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62 }}
            className="flex shrink-0 items-stretch gap-8"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl text-paper sm:text-5xl">
                  {s.value}
                </div>
                <div className="mt-1 max-w-[8rem] font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-paper/45">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.a
          href="#services"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-paper/60 transition-colors hover:text-accent"
        >
          Scroll to explore
          <ArrowDownRight className="size-4" />
        </motion.a>
      </motion.div>
    </section>
  )
}
