import { useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Eyebrow, MaskReveal } from "@/components/primitives"
import { cars } from "@/lib/site"

export function Cars() {
  const railRef = useRef(null)

  const nudge = (dir) => {
    const el = railRef.current
    if (!el) return
    const amount = Math.min(el.clientWidth * 0.8, 440)
    el.scrollBy({ left: dir * amount, behavior: "smooth" })
  }

  return (
    <section id="vehicles" className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow accent="gold">Vehicles We Service</Eyebrow>
            <h2 className="mt-6 font-display text-5xl uppercase leading-[0.9] tracking-tight sm:text-6xl">
              <MaskReveal>Every Make,</MaskReveal>
              <MaskReveal delay={0.1} className="text-accent">
                Every Model
              </MaskReveal>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/60">
              Sedans, pickups, SUVs and MPVs. If it runs on four wheels, our
              team knows it inside and out.
            </p>
          </div>

          {/* Rail controls (pointer devices) */}
          <div className="hidden gap-3 sm:flex">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Scroll to previous vehicles"
              className="inline-flex size-12 items-center justify-center border border-paper/25 text-paper transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Scroll to next vehicles"
              className="inline-flex size-12 items-center justify-center border border-paper/25 text-paper transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Rail */}
        <div className="relative mt-12">
          <div
            ref={railRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {cars.map((car) => (
              <article
                key={`${car.make}-${car.model}`}
                className="group w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[31%]"
              >
                <div className="relative aspect-[4/3] overflow-hidden border border-paper/12 bg-gradient-to-b from-ink-raised to-ink">
                  <img
                    src={car.img}
                    alt={`${car.make} ${car.model}`}
                    loading="lazy"
                    className="photo-rich absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="stage-vignette absolute inset-0" />
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-paper/15 pt-4 transition-colors duration-300 group-hover:border-accent">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/45">
                      {car.make}
                    </div>
                    <div className="font-display text-2xl uppercase tracking-wide">
                      {car.model}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/55">
                    {car.type}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-ink to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-ink to-transparent" />
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/35">
          And many more makes and models, local and imported.
        </p>
      </div>
    </section>
  )
}
