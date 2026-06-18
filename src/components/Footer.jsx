import { ArrowUpRight } from "lucide-react"
import { FacebookIcon } from "@/components/icons"
import { site, navLinks } from "@/lib/site"

function scrollTo(e, href) {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
}

export function Footer() {
  return (
    <footer className="border-t border-paper/12 bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Giant wordmark */}
        <div className="border-b border-paper/12 py-14">
          <p className="font-display text-[clamp(2.8rem,13vw,12rem)] uppercase leading-[0.82] tracking-tight text-paper">
            Four Wheels <span className="text-outline">Zone</span>
          </p>
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Four Wheels Zone" className="h-11 w-11 object-contain" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/55">
                {site.tagline} · {site.slogan}
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/55">
              A trusted auto-repair workshop in Tagburos, Puerto Princesa City,
              Palawan.
            </p>
          </div>

          <div className="md:col-span-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/40">
              Menu
            </span>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => scrollTo(e, l.href)}
                    className="font-display text-lg uppercase tracking-wide text-paper/70 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/40">
              Get in touch
            </span>
            <p className="mt-5 text-sm leading-relaxed text-paper/55">{site.address}</p>
            <div className="mt-4 space-y-1.5">
              {site.phones.map((p) => (
                <a
                  key={p.number}
                  href={p.href}
                  className="block font-display text-xl tracking-wide text-paper/80 transition-colors hover:text-accent"
                >
                  {p.number}
                </a>
              ))}
            </div>
            <a
              href={site.facebook}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 border border-paper/20 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:border-accent hover:text-accent"
            >
              <FacebookIcon className="size-4" /> Facebook
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-paper/12 py-7 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Four Wheels Zone. Tagburos, Palawan.</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
