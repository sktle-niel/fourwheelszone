import { MapPin, Phone, Heart } from "lucide-react"
import { FacebookIcon } from "@/components/icons"
import { site, navLinks } from "@/lib/site"

function scrollTo(e, href) {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-charcoal text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Four Wheels Zone"
                className="h-14 w-14 object-contain"
              />
              <div>
                <p className="text-lg font-extrabold uppercase tracking-wide text-white">
                  Four Wheels <span className="text-brand-red">Zone</span>
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
                  {site.tagline}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
              Maaasahang talyer sa Tagburos, Puerto Princesa. {site.slogan}.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">
              Menu
            </h4>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => scrollTo(e, l.href)}
                    className="text-sm text-zinc-400 transition-colors hover:text-brand-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-zinc-400">
              <li className="flex gap-2.5">
                <MapPin className="size-4 shrink-0 text-brand-red" />
                <span>{site.address}</span>
              </li>
              {site.phones.map((p) => (
                <li key={p.number} className="flex gap-2.5">
                  <Phone className="size-4 shrink-0 text-brand-red" />
                  <a href={p.href} className="hover:text-brand-gold">
                    {p.label}: {p.number}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-2 rounded-lg bg-[#1877F2] px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <FacebookIcon className="size-4" /> Facebook Page
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Four Wheels Zone — Tagburos, Palawan.
            All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Gawa nang may <Heart className="size-3.5 fill-brand-red text-brand-red" />{" "}
            para sa Four Wheels Zone
          </p>
        </div>
      </div>
    </footer>
  )
}
