import { useState } from "react"
import { toast } from "sonner"
import { ArrowRight, Loader2 } from "lucide-react"
import { Reveal, Eyebrow, MaskReveal } from "@/components/primitives"
import { services, site } from "@/lib/site"

const empty = {
  name: "",
  phone: "",
  vehicle: "",
  service: "",
  date: "",
  message: "",
}

const fieldCx =
  "h-12 w-full border-0 border-b border-paper/20 bg-transparent px-0 font-sans text-base text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-accent [color-scheme:dark]"

export function BookingForm() {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = "Please enter your name."
    if (!/^[0-9+\s-]{7,}$/.test(form.phone.trim()))
      next.phone = "Enter a valid contact number."
    if (!form.service) next.service = "Select a service."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      toast.error("A few details are missing", {
        description: "Please check the highlighted fields.",
      })
      return
    }
    setSending(true)
    setTimeout(() => {
      setSending(false)
      toast.success(`Thanks, ${form.name.split(" ")[0]}!`, {
        description: `Your booking for ${form.service} is in. We'll call ${form.phone} to confirm.`,
        duration: 6000,
      })
      setForm(empty)
    }, 1200)
  }

  return (
    <section id="book" className="relative bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Left copy */}
          <div className="lg:col-span-5">
            <Eyebrow index="(06)">Book A Service</Eyebrow>
            <h2 className="mt-6 font-display text-5xl uppercase leading-[0.88] tracking-tight sm:text-7xl">
              <MaskReveal>Bring It</MaskReveal>
              <MaskReveal delay={0.1} className="text-accent">
                In Today
              </MaskReveal>
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-paper/60">
              Leave your details and we&apos;ll get back to confirm your
              appointment. Consultation is free — that&apos;s the casa promise.
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
            </div>
          </div>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <form onSubmit={handleSubmit} noValidate className="grid gap-7 sm:grid-cols-2">
              <Field label="Name" error={errors.name} className="sm:col-span-2">
                <input
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Juan Dela Cruz"
                  className={fieldCx}
                />
              </Field>

              <Field label="Contact Number" error={errors.phone}>
                <input
                  value={form.phone}
                  onChange={update("phone")}
                  inputMode="tel"
                  placeholder="09XX XXX XXXX"
                  className={fieldCx}
                />
              </Field>

              <Field label="Vehicle (Make / Model)">
                <input
                  value={form.vehicle}
                  onChange={update("vehicle")}
                  placeholder="Toyota Vios 2018"
                  className={fieldCx}
                />
              </Field>

              <Field label="Service" error={errors.service}>
                <select value={form.service} onChange={update("service")} className={fieldCx}>
                  <option value="" className="bg-ink">
                    — Select —
                  </option>
                  {services.map((s) => (
                    <option key={s.title} value={s.title} className="bg-ink">
                      {s.title}
                    </option>
                  ))}
                  <option value="PMS / Maintenance" className="bg-ink">
                    PMS / Maintenance
                  </option>
                  <option value="Other" className="bg-ink">
                    Other
                  </option>
                </select>
              </Field>

              <Field label="Preferred Date">
                <input
                  type="date"
                  value={form.date}
                  onChange={update("date")}
                  className={fieldCx}
                />
              </Field>

              <Field label="Additional Details" className="sm:col-span-2">
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  rows={3}
                  placeholder="What's the issue or symptom?"
                  className="w-full resize-none border-0 border-b border-paper/20 bg-transparent px-0 py-2 font-sans text-base text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-accent"
                />
              </Field>

              <button
                type="submit"
                disabled={sending}
                className="group relative col-span-full mt-2 inline-flex items-center justify-center gap-3 overflow-hidden bg-accent px-8 py-5 font-mono text-xs uppercase tracking-[0.3em] text-paper transition-colors disabled:opacity-70"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {sending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Submit Booking <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({ label, error, children, className }) {
  return (
    <div className={className}>
      <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
        {label}
      </label>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wide text-accent">{error}</p>}
    </div>
  )
}
