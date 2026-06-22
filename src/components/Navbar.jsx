import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useNavigate, useLocation } from "react-router-dom"
import { X, ArrowUpRight, ArrowRight } from "lucide-react"
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "motion/react"
import { navLinks, site } from "@/lib/site"
import { scrollToHash } from "@/lib/smoothScroll"
import { cn } from "@/lib/utils"

const listVariants = {
  closed: {},
  open: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
}
const itemVariants = {
  closed: { opacity: 0, y: 24 },
  open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  // Drive the condensed state off Motion's scroll value, not a window listener.
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24))

  // Lock background scroll + allow Esc to close while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    if (!open) return
    const onKey = (e) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  const handleNav = (e, href) => {
    e.preventDefault()
    setOpen(false)
    if (pathname !== "/") {
      // Section anchors only exist on the home page — go there first, then scroll.
      navigate("/")
      setTimeout(() => scrollToHash(href), 120)
    } else {
      scrollToHash(href)
    }
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

        {/* Mobile toggle — thin twin-line mark */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="group inline-flex size-10 flex-col items-center justify-center gap-[7px] lg:hidden"
        >
          <span className="block h-px w-7 bg-paper transition-all duration-300 group-hover:w-5" />
          <span className="block h-px w-7 bg-paper transition-all duration-300 group-hover:w-6" />
        </button>
      </nav>

      {/* Scroll progress rule */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-px origin-left bg-gradient-to-r from-accent to-gold"
      />

      {/* Premium full-screen mobile / tablet menu */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-[60] bg-ink lg:hidden"
            >
              {/* Depth: soft brand glows */}
              <div className="pointer-events-none absolute -left-1/3 -top-1/4 h-[60vh] w-[60vh] rounded-full bg-accent/12 blur-[120px]" />
              <div className="pointer-events-none absolute -bottom-1/4 -right-1/4 h-[50vh] w-[50vh] rounded-full bg-gold/10 blur-[120px]" />

              <div className="relative mx-auto flex h-full w-full max-w-2xl flex-col overflow-y-auto px-6 pb-10 pt-5 sm:px-8">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                  <a
                    href="#home"
                    onClick={(e) => handleNav(e, "#home")}
                    className="flex items-center gap-3"
                  >
                    <img src="/logo.png" alt="Four Wheels Zone" className="h-10 w-10 object-contain" />
                    <span className="font-display text-sm tracking-wide text-paper">
                      FOUR WHEELS ZONE
                    </span>
                  </a>
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                    className="group inline-flex size-11 items-center justify-center border border-paper/15 text-paper/70 transition-colors hover:border-accent hover:text-accent"
                  >
                    <X className="size-5 transition-transform duration-300 group-hover:rotate-90" />
                  </button>
                </div>

                {/* Numbered links */}
                <motion.ul
                  variants={listVariants}
                  initial="closed"
                  animate="open"
                  className="mt-12 flex flex-col sm:mt-16"
                >
                  {navLinks.map((link, i) => (
                    <motion.li key={link.href} variants={itemVariants}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNav(e, link.href)}
                        className="group flex items-baseline gap-5 border-t border-paper/10 py-5"
                      >
                        <span className="font-mono text-[11px] tabular-nums text-gold/70">
                          0{i + 1}
                        </span>
                        <span className="font-display text-4xl uppercase leading-none tracking-tight text-paper/85 transition-colors duration-300 group-hover:text-paper sm:text-6xl">
                          {link.label}
                        </span>
                        <ArrowUpRight className="ml-auto size-5 text-paper/25 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold" />
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* CTA + contact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + navLinks.length * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-auto pt-10"
                >
                  <a
                    href="#book"
                    onClick={(e) => handleNav(e, "#book")}
                    className="group relative flex items-center justify-between overflow-hidden border border-gold/40 px-6 py-5"
                  >
                    <span className="relative z-10 font-mono text-xs uppercase tracking-[0.3em] text-paper transition-colors duration-300 group-hover:text-ink">
                      Book a Service
                    </span>
                    <ArrowRight className="relative z-10 size-5 text-gold transition-colors duration-300 group-hover:text-ink" />
                    <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  </a>

                  <div className="mt-8 space-y-4">
                    {site.phones.map((p) => (
                      <a
                        key={p.number}
                        href={p.href}
                        className="group flex items-baseline justify-between border-t border-paper/10 pt-4"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/40">
                          {p.label}
                        </span>
                        <span className="font-display text-xl tracking-wide text-paper transition-colors group-hover:text-gold">
                          {p.number}
                        </span>
                      </a>
                    ))}
                    <div className="flex items-center justify-between border-t border-paper/10 pt-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/40">
                        {site.branchName}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
                        {site.tagline}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  )
}
