const items = [
  "Brakes",
  "Oil Change",
  "Tires & Batteries",
  "Suspension",
  "Diagnostics",
  "Air-Conditioning",
  "Welding",
  "Body Shop",
  "Engine Cleaning",
  "Transmission",
]

export function Marquee() {
  const loop = [...items, ...items]

  return (
    <div className="relative overflow-hidden border-y border-paper/12 bg-ink py-5">
      <div className="flex w-max animate-marquee items-center">
        {loop.map((label, i) => (
          <span key={i} className="flex items-center gap-7 pl-7">
            <span className="font-display text-xl uppercase tracking-wide text-paper/80 sm:text-2xl">
              {label}
            </span>
            <span
              className={
                "size-1.5 rotate-45 " + (i % 2 ? "bg-gold" : "bg-accent")
              }
            />
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  )
}
