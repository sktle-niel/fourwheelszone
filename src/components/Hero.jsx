import { Phone, Wrench, MapPin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

function scrollTo(e, href) {
  e.preventDefault()
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: "smooth" })
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-brand-dark pt-24"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 size-[34rem] rounded-full bg-brand-red/25 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 size-[30rem] rounded-full bg-brand-gold/20 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center">
        {/* Text */}
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            <Wrench className="size-3.5" /> {site.slogan}
          </span>

          <h1 className="mt-6 text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Four <span className="text-brand-red">Wheels</span>
            <br />
            <span className="text-brand-gold">Zone</span> Auto Shop
          </h1>

          <p className="mt-3 text-lg font-semibold uppercase tracking-[0.3em] text-brand-steel">
            {site.tagline}
          </p>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-300 lg:mx-0 sm:text-lg">
            Maaasahan mong talyer dito sa{" "}
            <span className="font-semibold text-white">Tagburos, Puerto Princesa</span>.
            Brakes, oil change, diagnostics, at marami pang serbisyo — alagang
            casa para sa sasakyan mo.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Button
              asChild
              size="lg"
              className="w-full bg-brand-red text-base font-bold uppercase tracking-wide text-white hover:bg-brand-red-dark sm:w-auto"
            >
              <a href="#book" onClick={(e) => scrollTo(e, "#book")}>
                <Phone className="size-5" /> Book a Service
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-2 border-brand-gold/60 bg-transparent text-base font-bold uppercase tracking-wide text-brand-gold hover:bg-brand-gold hover:text-brand-dark sm:w-auto"
            >
              <a href="#services" onClick={(e) => scrollTo(e, "#services")}>
                View Services
              </a>
            </Button>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-400 lg:justify-start">
            <MapPin className="size-4 text-brand-red" />
            {site.branchName}
          </p>
        </div>

        {/* Logo */}
        <div className="relative flex items-center justify-center">
          <div className="absolute size-72 rounded-full bg-gradient-to-br from-brand-red/30 to-brand-gold/20 blur-2xl sm:size-96" />
          <img
            src="/logo.png"
            alt="Four Wheels Zone — Alagang Casa, Repair Service Trusted"
            className="relative w-64 max-w-full animate-float object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] sm:w-80 lg:w-[26rem]"
          />
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#services"
        onClick={(e) => scrollTo(e, "#services")}
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 transition-colors hover:text-brand-gold"
      >
        <ChevronDown className="size-7 animate-bounce" />
      </a>
    </section>
  )
}
