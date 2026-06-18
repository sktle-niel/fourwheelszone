import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1]

/* Fade + rise as the element scrolls into view. */
export function Reveal({ children, delay = 0, y = 30, className, as = "div" }) {
  const M = motion[as] ?? motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </M>
  )
}

/* Reveal that masks a line of text behind a moving bar — for headings. */
export function MaskReveal({ children, delay = 0, className }) {
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

/* Full-bleed photographic background that drifts on scroll. Always monochrome. */
export function ParallaxBg({
  src,
  speed = 12,
  overlay = "bg-ink/70",
  position = "center",
  className,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`])

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        style={{ y, backgroundImage: `url(${src})`, backgroundPosition: position }}
        className="photo-bw absolute inset-x-0 top-[-18%] h-[136%] bg-cover bg-no-repeat will-change-transform"
      />
      <div className={cn("absolute inset-0", overlay)} />
    </div>
  )
}

/* Mono eyebrow: index · rule · label. */
export function Eyebrow({ index, children, tone = "paper", className }) {
  const muted = tone === "ink" ? "text-ink/55" : "text-paper/55"
  const rule = tone === "ink" ? "bg-ink/25" : "bg-paper/25"
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.34em]",
        muted,
        className
      )}
    >
      {index && <span className="text-accent">{index}</span>}
      <span className={cn("h-px w-8", rule)} />
      <span>{children}</span>
    </div>
  )
}
