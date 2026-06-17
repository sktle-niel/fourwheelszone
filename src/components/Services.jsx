import { Check } from "lucide-react"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { coreServices, repairList, capabilities } from "@/lib/site"

export function Services() {
  return (
    <section id="services" className="relative bg-zinc-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What We Do"
          title="Our"
          accent="Services"
          subtitle="Kompletong serbisyo para sa sasakyan mo — mula sa simpleng oil change hanggang sa kumplikadong engine diagnostics."
        />

        {/* Core service cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.title} delay={i * 80}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-red/40 hover:shadow-xl hover:shadow-brand-red/10">
                  {/* corner accent */}
                  <div className="absolute -right-10 -top-10 size-24 rounded-full bg-brand-red/5 transition-all duration-300 group-hover:scale-150 group-hover:bg-brand-red/10" />
                  <div className="relative">
                    <div className="inline-flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red to-brand-red-dark text-white shadow-lg shadow-brand-red/30 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-7" />
                    </div>
                    <h3 className="mt-5 text-xl font-extrabold uppercase tracking-wide text-brand-dark">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                      {s.desc}
                    </p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* Full checklist + capabilities */}
        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="h-full rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-extrabold uppercase tracking-wide text-brand-dark">
                Complete Auto Repair Checklist
              </h3>
              <div className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {repairList.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                      <Check className="size-4" />
                    </span>
                    <span className="text-sm font-medium text-zinc-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={120}>
            <div className="h-full rounded-2xl border border-zinc-200 bg-brand-dark p-8 text-white shadow-sm">
              <h3 className="text-lg font-extrabold uppercase tracking-wide text-brand-gold">
                Iba pang kaya namin
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {capabilities.map((c) => {
                  const Icon = c.icon
                  return (
                    <div key={c.label} className="flex items-center gap-2.5">
                      <Icon className="size-5 shrink-0 text-brand-red" />
                      <span className="text-xs font-semibold text-zinc-200">
                        {c.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
