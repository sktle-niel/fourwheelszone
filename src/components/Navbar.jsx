import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, useScroll, useSpring, useMotionValueEvent } from "motion/react"
import { navLinks, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  // Drive the condensed state off Motion's scroll value, not a window listener.
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24))

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const handleNav = (e, href) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled ? "bg-ink/85 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-4 sm:px-8">
        {/* Wordmark */}
        <a
          href="#home"
          onClick={(e) => handleNav(e, "#home")}
          className="group flex items-center gap-3"
        >
          <img
            src="/logo.png"
            alt="Four Wheels Zone"
            className="h-10 w-10 object-contain"
          />
          <span className="hidden leading-none sm:block">
            <span className="block font-display text-base tracking-wide text-paper">
              FOUR WHEELS ZONE
            </span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.32em] text-paper/45">
              {site.slogan}
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="group relative font-mono text-[11px] uppercase tracking-[0.28em] text-paper/65 transition-colors hover:text-paper"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#book"
            onClick={(e) => handleNav(e, "#book")}
            className="group relative overflow-hidden border border-paper/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-paper"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-paper">
              Book a Service
            </span>
            <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 group-hover:translate-x-0" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center text-paper lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Scroll progress rule */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-px origin-left bg-gradient-to-r from-accent to-gold"
      />

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-paper/10 bg-ink/97 backdrop-blur-md transition-[max-height,opacity] duration-500 lg:hidden",
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col px-5 py-2 sm:px-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="flex items-center gap-4 border-b border-paper/5 py-4 font-display text-2xl tracking-wide text-paper/80 transition-colors hover:text-paper"
            >
              <span className="size-1.5 rotate-45 bg-accent" />
              {link.label}
            </a>
          ))}
          <a
            href="#book"
            onClick={(e) => handleNav(e, "#book")}
            className="mt-4 mb-4 inline-flex items-center justify-center bg-accent py-4 font-mono text-xs uppercase tracking-[0.3em] text-paper"
          >
            Book a Service
          </a>
        </div>
      </div>
    </header>
  )
}
