import { Cog } from "lucide-react"

const items = [
  "Brakes",
  "Oil Change",
  "Tires & Batteries",
  "Suspension",
  "Maintenance",
  "Car Diagnostic",
  "Air-con",
  "Welding",
  "Body Shop",
  "Engine Clean",
]

export function Marquee() {
  // Doble ang list para seamless ang loop
  const loop = [...items, ...items]

  return (
    <div className="relative overflow-hidden border-y-2 border-brand-red bg-brand-red py-3">
      <div className="flex w-max animate-marquee items-center">
        {loop.map((label, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-6 text-sm font-extrabold uppercase tracking-widest text-white sm:text-base"
          >
            {label}
            <Cog className="size-4 text-brand-gold" />
          </span>
        ))}
      </div>
    </div>
  )
}
