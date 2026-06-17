import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { useReveal, useCountUp } from "@/hooks/useReveal"
import { whyChooseUs, stats } from "@/lib/site"

function Stat({ value, suffix, label, start }) {
  const count = useCountUp(value, { start })
  return (
    <div className="text-center">
      <div className="text-4xl font-black text-brand-gold sm:text-5xl">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-zinc-300 sm:text-sm">
        {label}
      </div>
    </div>
  )
}

export function WhyChooseUs() {
  const { ref, visible } = useReveal({ threshold: 0.3 })

  return (
    <section id="why" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why Four Wheels Zone"
          title="Bakit"
          accent="Kami?"
          subtitle="Alagang casa para sa bawat sasakyan — maaasahan, mabilis, at sulit."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((w, i) => {
            const Icon = w.icon
            return (
              <Reveal key={w.title} delay={i * 90}>
                <div className="group h-full rounded-2xl border border-zinc-200 bg-zinc-50 p-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-gold/50 hover:bg-white hover:shadow-xl">
                  <div className="mx-auto inline-flex size-16 items-center justify-center rounded-2xl bg-brand-dark text-brand-gold transition-colors duration-300 group-hover:bg-brand-red group-hover:text-white">
                    <Icon className="size-8" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold uppercase tracking-wide text-brand-dark">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {w.desc}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Stats band */}
        <div
          ref={ref}
          className="mt-16 overflow-hidden rounded-3xl bg-brand-dark p-10 shadow-xl"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((s) => (
              <Stat key={s.label} {...s} start={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
