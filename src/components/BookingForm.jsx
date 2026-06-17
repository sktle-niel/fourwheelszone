import { useState } from "react"
import { toast } from "sonner"
import { CalendarCheck, Send, Wrench, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Reveal } from "@/components/Reveal"
import { coreServices, site } from "@/lib/site"

const empty = {
  name: "",
  phone: "",
  vehicle: "",
  service: "",
  date: "",
  message: "",
}

// Dark-styled inputs (Tailwind utilities para tama ang tailwind-merge override)
const inputCx =
  "h-11 w-full rounded-lg border border-white/15 bg-white/5 px-3.5 text-sm text-white shadow-none transition-colors placeholder:text-zinc-500 focus-visible:border-brand-red/70 focus-visible:ring-2 focus-visible:ring-brand-red/30 [color-scheme:dark]"
const textareaCx =
  "min-h-24 w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white shadow-none transition-colors placeholder:text-zinc-500 focus-visible:border-brand-red/70 focus-visible:ring-2 focus-visible:ring-brand-red/30 resize-none"

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
    if (!form.name.trim()) next.name = "Pakilagay ang pangalan."
    if (!/^[0-9+\s-]{7,}$/.test(form.phone.trim()))
      next.phone = "Pakilagay ang valid na numero."
    if (!form.service) next.service = "Pumili ng serbisyo."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      toast.error("Kulang pa ang ilang detalye", {
        description: "Pakicheck ang mga naka-highlight na field.",
      })
      return
    }

    setSending(true)
    // Walang backend — i-simulate ang pag-submit
    setTimeout(() => {
      setSending(false)
      toast.success("Salamat, " + form.name.split(" ")[0] + "! 🎉", {
        description:
          "Na-receive na ang booking mo para sa " +
          form.service +
          ". Tatawagan ka namin sa " +
          form.phone +
          " para kumpirmahin.",
        duration: 6000,
      })
      setForm(empty)
    }, 1200)
  }

  return (
    <section id="book" className="relative overflow-hidden bg-brand-dark py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 size-96 rounded-full bg-brand-red/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 size-96 rounded-full bg-brand-gold/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        {/* Left copy */}
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            <CalendarCheck className="size-3.5" /> Book a Service
          </span>
          <h2 className="mt-5 text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ipa-check ang sasakyan mo{" "}
            <span className="text-brand-red">ngayon na</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-300">
            Mag-iwan ng detalye at babalikan ka namin para i-confirm ang
            appointment. Libre ang konsultasyon — alagang casa talaga!
          </p>

          <div className="mt-8 space-y-3">
            {site.phones.map((p) => (
              <a
                key={p.number}
                href={p.href}
                className="flex items-center gap-3 text-zinc-200 transition-colors hover:text-brand-gold"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-white/5">
                  <Wrench className="size-5 text-brand-red" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-zinc-500">
                    {p.label}
                  </span>
                  <span className="text-lg font-bold">{p.number}</span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={120}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Pangalan *"
                error={errors.name}
                className="sm:col-span-2"
              >
                <Input
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Juan Dela Cruz"
                  className={inputCx}
                />
              </Field>

              <Field label="Numero (Globe/Smart) *" error={errors.phone}>
                <Input
                  value={form.phone}
                  onChange={update("phone")}
                  inputMode="tel"
                  placeholder="09XX XXX XXXX"
                  className={inputCx}
                />
              </Field>

              <Field label="Sasakyan (Make / Model)">
                <Input
                  value={form.vehicle}
                  onChange={update("vehicle")}
                  placeholder="Toyota Vios 2018"
                  className={inputCx}
                />
              </Field>

              <Field label="Serbisyo *" error={errors.service}>
                <select
                  value={form.service}
                  onChange={update("service")}
                  className={inputCx}
                >
                  <option value="">— Pumili —</option>
                  {coreServices.map((s) => (
                    <option key={s.title} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="PMS / Maintenance">PMS / Maintenance</option>
                  <option value="Iba pa">Iba pa</option>
                </select>
              </Field>

              <Field label="Petsa (preferred)">
                <Input
                  type="date"
                  value={form.date}
                  onChange={update("date")}
                  className={inputCx}
                />
              </Field>

              <Field label="Karagdagang detalye" className="sm:col-span-2">
                <Textarea
                  value={form.message}
                  onChange={update("message")}
                  rows={3}
                  placeholder="Anong problema o pakiramdam sa sasakyan?"
                  className={textareaCx}
                />
              </Field>
            </div>

            <Button
              type="submit"
              disabled={sending}
              size="lg"
              className="mt-6 w-full bg-brand-red text-base font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark"
            >
              {sending ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> Sini-send...
                </>
              ) : (
                <>
                  <Send className="size-5" /> I-send ang Booking
                </>
              )}
            </Button>
            <p className="mt-3 text-center text-xs text-zinc-500">
              Sa pag-submit, tatawagan o ite-text ka namin para kumpirmahin ang
              schedule.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ label, error, children, className }) {
  return (
    <div className={className}>
      <Label className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-300">
        {label}
      </Label>
      {children}
      {error && <p className="mt-1 text-xs text-brand-red">{error}</p>}
    </div>
  )
}
