import { MapPin, Phone, Clock, Navigation } from "lucide-react"
import { FacebookIcon } from "@/components/icons"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

const hours = [
  { day: "Lunes – Sabado", time: "8:00 AM – 6:00 PM" },
  { day: "Linggo", time: "By appointment" },
]

export function Branch() {
  return (
    <section id="location" className="bg-zinc-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Visit Us"
          title="Our"
          accent="Location"
          subtitle="Iisa lang ang aming branch — dito sa Tagburos, Puerto Princesa City, Palawan. Welcome ka anumang oras ng business hours!"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Map */}
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
              <iframe
                title="Four Wheels Zone — Tagburos, Puerto Princesa"
                src={site.mapEmbed}
                className="h-80 w-full lg:h-full lg:min-h-[28rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>

          {/* Contact details */}
          <Reveal delay={120}>
            <div className="flex h-full flex-col gap-5">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                    <MapPin className="size-6" />
                  </span>
                  <div>
                    <h3 className="font-extrabold uppercase tracking-wide text-brand-dark">
                      {site.branchName}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                      {site.address}
                    </p>
                    <Button
                      asChild
                      variant="link"
                      className="mt-1 h-auto p-0 text-brand-red"
                    >
                      <a href={site.mapLink} target="_blank" rel="noreferrer">
                        <Navigation className="size-4" /> Get directions
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold-light">
                    <Phone className="size-6 text-brand-gold" />
                  </span>
                  <div className="w-full">
                    <h3 className="font-extrabold uppercase tracking-wide text-brand-dark">
                      Tumawag o mag-text
                    </h3>
                    <div className="mt-2 flex flex-col gap-2">
                      {site.phones.map((p) => (
                        <a
                          key={p.number}
                          href={p.href}
                          className="flex items-center justify-between rounded-lg bg-zinc-50 px-4 py-2.5 text-sm transition-colors hover:bg-brand-red/5"
                        >
                          <span className="font-semibold text-zinc-500">
                            {p.label}
                          </span>
                          <span className="font-bold text-brand-dark">
                            {p.number}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <Clock className="size-6 text-brand-red" />
                  <h3 className="mt-3 font-extrabold uppercase tracking-wide text-brand-dark">
                    Business Hours
                  </h3>
                  <div className="mt-2 space-y-1">
                    {hours.map((h) => (
                      <div
                        key={h.day}
                        className="flex justify-between gap-2 text-sm text-zinc-600"
                      >
                        <span>{h.day}</span>
                        <span className="font-semibold text-brand-dark">
                          {h.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col justify-center rounded-2xl border border-zinc-200 bg-[#1877F2] p-6 text-white shadow-sm transition-transform duration-300 hover:-translate-y-1"
                >
                  <FacebookIcon className="size-7" />
                  <h3 className="mt-3 font-extrabold uppercase tracking-wide">
                    Follow sa Facebook
                  </h3>
                  <p className="mt-1 text-sm text-white/80">
                    Updates, promos, at chat support →
                  </p>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
