import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1]

/* Fade + rise as the element scrolls into view. Static under reduced motion. */
export function Reveal({ children, delay = 0, y = 30, className, as = "div" }) {
  const M = motion[as] ?? motion.div
  const reduce = useReducedMotion()
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={reduce ? undefined : { duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </M>
  )
}

/* Reveal that masks a line of text behind a moving bar — for headings. */
export function MaskReveal({ children, delay = 0, className }) {
  const reduce = useReducedMotion()
  if (reduce) return <span className={cn("block", className)}>{children}</span>
  return (
    <span className={cn("block overflow-hidden", className)}>
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/* Full-bleed photographic background that drifts on scroll.
   Defaults to the warm near-monochrome "mood" treatment. */
export function ParallaxBg({
  src,
  speed = 12,
  overlay = "bg-ink/70",
  position = "center",
  treatment = "photo-mood",
  className,
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const drift = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`])

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        style={{ y: reduce ? 0 : drift, backgroundImage: `url(${src})`, backgroundPosition: position }}
        className={cn(
          "absolute inset-x-0 top-[-18%] h-[136%] bg-cover bg-no-repeat will-change-transform",
          treatment
        )}
      />
      <div className={cn("absolute inset-0", overlay)} />
    </div>
  )
}

/* Mono eyebrow: brand tick · label · rule. No section numbering. */
export function Eyebrow({ children, tone = "paper", accent = "red", className }) {
  const muted = tone === "ink" ? "text-ink/60" : "text-paper/60"
  const rule = tone === "ink" ? "bg-ink/20" : "bg-paper/20"
  const tick = accent === "gold" ? "bg-gold" : "bg-accent"
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.34em]",
        muted,
        className
      )}
    >
      <span className={cn("size-1.5 rotate-45", tick)} />
      <span>{children}</span>
      <span className={cn("h-px w-8", rule)} />
    </div>
  )
}
