import { Wrench } from "lucide-react"
import { Reveal, MaskReveal } from "@/components/primitives"
import { services, site } from "@/lib/site"

// Online booking is not live yet. This section previews the upcoming form
// in a disabled state and routes people to call / message in the meantime.
const fieldCx =
  "h-12 w-full border-0 border-b border-paper/20 bg-transparent px-0 font-sans text-base text-paper/80 outline-none placeholder:text-paper/30 disabled:cursor-not-allowed [color-scheme:dark]"

export function BookingForm() {
  return (
    <section id="book" className="relative bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Left copy */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 border border-gold/45 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
              <Wrench className="size-3.5" /> Available soon
            </span>
            <h2 className="mt-6 font-display text-5xl uppercase leading-[0.88] tracking-tight sm:text-7xl">
              <MaskReveal>Bring It</MaskReveal>
              <MaskReveal delay={0.1} className="text-accent">
                In Today
              </MaskReveal>
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-paper/60">
              Online booking is on the way, we&apos;re building it right now. For
              now, just call or message us and we&apos;ll reserve your slot.
              Consultation is free. That&apos;s the casa promise.
            </p>

            <div className="mt-10 space-y-4">
              {site.phones.map((p) => (
                <a
                  key={p.number}
                  href={p.href}
                  className="group flex items-baseline gap-4 border-t border-paper/12 pt-4"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
                    {p.label}
                  </span>
                  <span className="font-display text-2xl tracking-wide transition-colors group-hover:text-accent">
                    {p.number}
                  </span>
                </a>
              ))}
              <a
                href={`mailto:${site.email}`}
                className="group flex items-baseline gap-4 border-t border-paper/12 pt-4"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
                  Email
                </span>
                <span className="min-w-0 truncate font-mono text-sm text-paper/80 transition-colors group-hover:text-accent">
                  {site.email}
                </span>
              </a>
            </div>
          </div>

          {/* Disabled preview of the upcoming booking form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <fieldset
              disabled
              aria-label="Online booking form, available soon"
              className="grid gap-7 opacity-55 sm:grid-cols-2"
            >
              <Field label="Name" className="sm:col-span-2">
                <input placeholder="Juan Dela Cruz" className={fieldCx} />
              </Field>

              <Field label="Contact Number">
                <input inputMode="tel" placeholder="09XX XXX XXXX" className={fieldCx} />
              </Field>

              <Field label="Vehicle (Make / Model)">
                <input placeholder="Toyota Vios 2018" className={fieldCx} />
              </Field>

              <Field label="Service">
                <select defaultValue="" className={fieldCx}>
                  <option value="" className="bg-ink">
                    Select a service
                  </option>
                  {services.map((s) => (
                    <option key={s.title} value={s.title} className="bg-ink">
                      {s.title}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Preferred Date">
                <input type="date" className={fieldCx} />
              </Field>

              <Field label="Additional Details" className="sm:col-span-2">
                <textarea
                  rows={3}
                  placeholder="What's the issue or symptom?"
                  className="w-full resize-none border-0 border-b border-paper/20 bg-transparent px-0 py-2 font-sans text-base text-paper/80 outline-none placeholder:text-paper/30"
                />
              </Field>
            </fieldset>

            <div className="mt-8 flex flex-col items-start gap-4 border-t border-paper/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center justify-center gap-3 border border-paper/25 px-8 py-5 font-mono text-xs uppercase tracking-[0.3em] text-paper/55"
              >
                <Wrench className="size-4 text-gold" /> Available Soon
              </button>
              <p className="max-w-[18rem] font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-paper/40">
                We&apos;re working on it. Tap a number to call or message us in
                the meantime.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({ label, children, className }) {
  return (
    <div className={className}>
      <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  )
}
