import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { ParallaxBg, MaskReveal } from "@/components/primitives"
import { photos, site } from "@/lib/site"

function scrollTo(e, href) {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden"
    >
      <ParallaxBg
        src={photos.hero}
        speed={14}
        position="center 35%"
        overlay="bg-gradient-to-b from-ink/85 via-ink/55 to-ink"
      />
      {/* whisper of brand red, so the base reads warm not clinical */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_85%_15%,rgba(226,29,36,0.16),transparent_55%)]"
      />

      <motion.div
        style={{ y: reduce ? 0 : textY, opacity: reduce ? 1 : fade }}
        className="relative mx-auto w-full max-w-[1400px] px-5 pb-14 sm:px-8 sm:pb-20"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.34em] text-paper/60"
        >
          <span className="size-1.5 rotate-45 bg-accent" />
          EST. 2019
          <span className="h-px w-10 bg-paper/25" />
          <span className="text-gold">{site.tagline}</span>
        </motion.p>

        <h1 className="font-display text-[clamp(3rem,11vw,9.5rem)] uppercase leading-[0.86] tracking-tight text-paper">
          <MaskReveal delay={0.15}>Four Wheels</MaskReveal>
          <MaskReveal delay={0.3} className="text-outline">
            Zone
          </MaskReveal>
        </h1>

        <div className="mt-9 flex flex-col gap-8 border-t border-paper/15 pt-7 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-md text-sm leading-relaxed text-paper/75 sm:text-base"
          >
            Brakes, diagnostics, and full mechanical care in Tagburos, Puerto
            Princesa. Casa-grade work, neighborhood prices.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62 }}
            className="flex shrink-0 flex-wrap items-center gap-3"
          >
            <a
              href="#book"
              onClick={(e) => scrollTo(e, "#book")}
              className="group inline-flex items-center gap-2.5 bg-accent px-7 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-paper transition-[transform,background-color] duration-300 hover:bg-accent-dark active:scale-[0.98]"
            >
              Book a Service
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              onClick={(e) => scrollTo(e, "#services")}
              className="inline-flex items-center gap-2.5 border border-paper/30 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-paper/85 transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              View Services
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
