import { useRef, useState } from "react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Eyebrow, MaskReveal } from "@/components/primitives"
import { services } from "@/lib/site"
import { scrollToHash } from "@/lib/smoothScroll"
import { cn } from "@/lib/utils"

export function Services() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const panelRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  const current = services[active]

  const goBook = (e) => {
    e.preventDefault()
    scrollToHash("#book")
  }

  return (
    <section id="services" className="relative bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24 lg:py-32">
        {/* Header */}
        <div className="border-b border-ink/15 pb-12">
          <Eyebrow tone="ink">What We Do</Eyebrow>
          <h2 className="mt-6 font-display text-5xl uppercase leading-[0.9] tracking-tight sm:text-6xl">
            <MaskReveal>Services</MaskReveal>
            <MaskReveal delay={0.1} className="text-accent">
              Built To Last
            </MaskReveal>
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink/60">
            From a simple oil change to complex engine diagnostics, every job is
            handled with casa-grade discipline and honest pricing.
          </p>
        </div>

        <div className="grid gap-x-10 md:grid-cols-12">
          {/* Service list */}
          <div className="md:col-span-7">
            <ul>
              {services.map((s, i) => {
                const isActive = i === active
                return (
                  <li key={s.n}>
                    <a
                      href="#book"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={goBook}
                      className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 border-b border-ink/15 py-7 sm:py-8"
                    >
                      <span
                        className={cn(
                          "pt-1 font-mono text-xs transition-colors",
                          isActive ? "text-accent" : "text-ink/40"
                        )}
                      >
                        {s.n}
                      </span>

                      <div>
                        <h3
                          className={cn(
                            "font-display text-4xl uppercase leading-none tracking-tight transition-transform duration-300 lg:text-5xl",
                            isActive && "md:translate-x-2"
                          )}
                        >
                          {s.title}
                        </h3>

                        {/* Inline image on phones only (tablet+ uses the sticky panel) */}
                        <div className="mt-4 aspect-[16/9] overflow-hidden border border-ink/15 md:hidden">
                          <img
                            src={s.img}
                            alt={s.title}
                            loading="lazy"
                            className="photo-mood size-full object-cover"
                          />
                        </div>

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

                      <ArrowUpRight
                        className={cn(
                          "size-7 self-center transition-all duration-300",
                          isActive
                            ? "text-accent md:translate-x-1"
                            : "text-ink/30",
                          "md:opacity-0 md:group-hover:opacity-100"
                        )}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Sticky parallax media panel (tablet and up) */}
          <div className="hidden md:col-span-5 md:block">
            <div ref={panelRef} className="sticky top-24 pt-8">
              <div className="relative aspect-[4/5] overflow-hidden border border-ink/15 bg-ink">
                <AnimatePresence initial={false} mode="sync">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0"
                  >
                    <motion.div
                      style={{
                        y: reduce ? 0 : imgY,
                        backgroundImage: `url(${current.img})`,
                      }}
                      className="photo-mood absolute inset-[-12%] bg-cover bg-center"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7 text-paper">
                  <div className="font-display text-4xl uppercase leading-none tracking-tight">
                    {current.title}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {current.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-paper/25 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Position indicator */}
              <div className="mt-5 flex gap-1.5">
                {services.map((s, i) => (
                  <span
                    key={s.n}
                    className={cn(
                      "h-0.5 flex-1 transition-colors duration-300",
                      i === active ? "bg-accent" : "bg-ink/15"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
