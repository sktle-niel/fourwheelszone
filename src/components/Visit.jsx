import { Navigation, Clock } from "lucide-react"
import { FacebookIcon } from "@/components/icons"
import { Reveal, MaskReveal } from "@/components/primitives"
import { site } from "@/lib/site"

const hours = [
  { day: "Mon - Sat", time: "8:00 AM - 9:00 PM" },
  { day: "Sunday", time: "By appointment" },
]

export function Visit() {
  return (
    <section id="visit" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24 lg:py-32">
        <div className="flex flex-col gap-5">
          <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight sm:text-7xl">
            <MaskReveal>One Branch.</MaskReveal>
            <MaskReveal delay={0.1} className="text-accent">
              One Palawan.
            </MaskReveal>
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-ink/60">
            We run a single workshop in Tagburos, Puerto Princesa. No
            franchises, no other locations. Drop by during business hours or
            book ahead.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Map */}
          <Reveal className="lg:col-span-7">
            <div className="h-full overflow-hidden border border-ink/15">
              <iframe
                title="Four Wheels Zone, Tagburos, Puerto Princesa"
                src={site.mapEmbed}
                className="h-80 w-full grayscale lg:h-full lg:min-h-[30rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={0.12} className="lg:col-span-5">
            <div className="flex h-full flex-col">
              <div className="border border-ink/15 p-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                  Address
                </span>
                <p className="mt-3 font-display text-2xl uppercase leading-tight tracking-wide">
                  {site.branchName}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  {site.address}
                </p>
                <a
                  href={site.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:text-accent"
                >
                  <Navigation className="size-4" /> Get directions
                </a>
              </div>

              <div className="mt-6 border border-ink/15 p-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                  Call or text
                </span>
                <div className="mt-4 flex flex-col divide-y divide-ink/10">
                  {site.phones.map((p) => (
                    <a
                      key={p.number}
                      href={p.href}
                      className="group flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                    >
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">
                        {p.label}
                      </span>
                      <span className="font-display text-xl tracking-wide transition-colors group-hover:text-accent">
                        {p.number}
                      </span>
                    </a>
                  ))}
                  <a
                    href={`mailto:${site.email}`}
                    className="group flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">
                      Email
                    </span>
                    <span className="min-w-0 truncate font-mono text-sm text-ink/80 transition-colors group-hover:text-accent">
                      {site.email}
                    </span>
                  </a>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="border border-ink/15 p-7">
                  <Clock className="size-5 text-accent" />
                  <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.3em] text-ink/50">
                    Hours
                  </span>
                  <div className="mt-3 space-y-2">
                    {hours.map((h) => (
                      <div key={h.day} className="flex justify-between gap-2 text-sm">
                        <span className="text-ink/55">{h.day}</span>
                        <span className="font-semibold">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col justify-between border border-ink/15 bg-ink p-7 text-paper transition-colors hover:bg-accent"
                >
                  <FacebookIcon className="size-6" />
                  <div className="mt-6">
                    <span className="font-display text-xl uppercase tracking-wide">
                      Follow Us
                    </span>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60 group-hover:text-paper/80">
                      Updates · Promos · Chat →
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
