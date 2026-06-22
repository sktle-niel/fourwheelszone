import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Reveal, MaskReveal } from "@/components/primitives"
import { useReviews } from "@/lib/useReviews"
import { Stars, ReviewCard, ReviewForm } from "@/components/reviewsUI"
import { cn } from "@/lib/utils"

// All ratings, plus an "All" option. Counts come from the global distribution.
const FILTERS = [5, 4, 3, 2, 1]

export function ReviewsPage() {
  const [rating, setRating] = useState(0) // 0 = all
  const { list, agg, loading, error, submit } = useReviews({ rating: rating || undefined })

  const average = Number(agg?.average) || 0
  const count = Number(agg?.count) || 0
  const dist = agg?.distribution || {}

  return (
    <main className="bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-36">
        {/* Back link */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-paper/55 transition-colors hover:text-gold"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back home
        </Link>

        {/* Header + aggregate */}
        <div className="mt-8 flex flex-col gap-8 border-b border-paper/12 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="font-display text-5xl uppercase leading-[0.9] tracking-tight sm:text-7xl">
            <MaskReveal>Customer</MaskReveal>
            <MaskReveal delay={0.1} className="text-accent">
              Reviews
            </MaskReveal>
          </h1>
          <div className="flex items-center gap-4">
            <span className="font-display text-6xl leading-none text-gold">
              {average.toFixed(1)}
            </span>
            <div>
              <Stars value={average} starClass="size-5" />
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
                Based on {count} {count === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          {/* Filters + list */}
          <div className="lg:col-span-8">
            {/* Rating filter */}
            <div className="flex flex-wrap gap-2">
              <FilterButton
                active={rating === 0}
                onClick={() => setRating(0)}
                label="All"
                n={count}
              />
              {FILTERS.map((r) => (
                <FilterButton
                  key={r}
                  active={rating === r}
                  onClick={() => setRating(r)}
                  label={`${r} ★`}
                  n={Number(dist[r] ?? dist[String(r)] ?? 0)}
                />
              ))}
            </div>

            <div className="mt-8">
              {loading ? (
                <div className="flex items-center gap-3 py-16 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
                  <Loader2 className="size-4 animate-spin" /> Loading reviews
                </div>
              ) : error ? (
                <div className="border border-paper/12 p-8 text-sm leading-relaxed text-paper/55">
                  Reviews are temporarily unavailable. Please refresh and try
                  again in a moment.
                </div>
              ) : list.length === 0 ? (
                <div className="border border-paper/12 p-8">
                  <p className="font-display text-2xl uppercase tracking-wide">
                    No reviews here
                  </p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper/55">
                    {rating
                      ? "No reviews with this rating yet. Try another filter."
                      : "Be the first to leave a review using the form."}
                  </p>
                </div>
              ) : (
                <ul className="grid gap-5 sm:grid-cols-2">
                  {list.map((r, i) => (
                    <Reveal as="li" key={r.id} delay={Math.min(i, 6) * 0.04}>
                      <ReviewCard review={r} />
                    </Reveal>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Submit a review */}
          <div className="lg:col-span-4">
            <div className="border border-paper/15 p-6 sm:p-8 lg:sticky lg:top-24">
              <h2 className="font-display text-2xl uppercase tracking-wide">
                Leave a Review
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-paper/55">
                Serviced your car with us? Rate your experience and help other
                drivers choose with confidence.
              </p>
              <div className="mt-7">
                <ReviewForm onSubmit={submit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function FilterButton({ active, onClick, label, n }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors",
        active
          ? "border-gold bg-gold/10 text-gold"
          : "border-paper/15 text-paper/55 hover:border-paper/40 hover:text-paper"
      )}
    >
      {label}
      <span className={cn("text-[10px]", active ? "text-gold/70" : "text-paper/35")}>
        {n}
      </span>
    </button>
  )
}
