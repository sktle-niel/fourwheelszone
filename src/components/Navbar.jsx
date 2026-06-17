import { useEffect, useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { navLinks, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // I-lock ang scroll kapag bukas ang mobile menu
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const handleNav = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-brand-dark/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNav(e, "#home")}
          className="flex items-center gap-3"
        >
          <img
            src="/logo.png"
            alt="Four Wheels Zone logo"
            className="h-12 w-12 object-contain drop-shadow-[0_0_10px_rgba(225,29,38,0.45)] sm:h-14 sm:w-14"
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-base font-extrabold uppercase tracking-wide text-white">
              Four Wheels <span className="text-brand-red">Zone</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-gold">
              {site.tagline}
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.slice(0, -1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-200 transition-colors hover:bg-white/5 hover:text-brand-gold"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden bg-brand-red font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark sm:inline-flex"
          >
            <a href="#book" onClick={(e) => handleNav(e, "#book")}>
              <Phone className="size-4" /> Book Now
            </a>
          </Button>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-white/5 bg-brand-dark/98 backdrop-blur-md transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="rounded-lg px-4 py-3 text-base font-semibold text-zinc-100 transition-colors hover:bg-brand-red/15 hover:text-brand-gold"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
