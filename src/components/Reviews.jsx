import { Loader2, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Reveal, MaskReveal } from "@/components/primitives"
import { useReviews } from "@/lib/useReviews"
import { Stars, ReviewCard, ReviewForm } from "@/components/reviewsUI"

export function Reviews() {
  // Homepage shows the 6 best reviews (highest rating + most substantial).
  const { list, agg, loading, error, submit } = useReviews({ limit: 6, sort: "top" })
  const average = Number(agg?.average) || 0
  const count = Number(agg?.count) || 0

  return (
    <section id="reviews" className="relative bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24 lg:py-32">
        {/* Header + aggregate (live from the database) */}
        <div className="flex flex-col gap-8 border-b border-paper/12 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight sm:text-6xl">
            <MaskReveal>What Drivers</MaskReveal>
            <MaskReveal delay={0.1} className="text-accent">
              Say
            </MaskReveal>
          </h2>

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
          {/* Top reviews + "show more" */}
          <div className="lg:col-span-7">
            {loading ? (
              <div className="flex items-center gap-3 py-16 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
                <Loader2 className="size-4 animate-spin" /> Loading reviews
              </div>
            ) : error ? (
              <div className="border border-paper/12 p-8 text-sm leading-relaxed text-paper/55">
                Reviews are temporarily unavailable. Please refresh the page or
                try again in a moment.
              </div>
            ) : list.length === 0 ? (
              <div className="border border-paper/12 p-8">
                <p className="font-display text-2xl uppercase tracking-wide">
                  No reviews yet
                </p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper/55">
                  Be the first to share your experience — use the form to leave a
                  review.
                </p>
              </div>
            ) : (
              <>
                <ul className="grid gap-5 sm:grid-cols-2">
                  {list.map((r, i) => (
                    <Reveal as="li" key={r.id} delay={Math.min(i, 5) * 0.05}>
                      <ReviewCard review={r} />
                    </Reveal>
                  ))}
                </ul>

                {count > 6 && (
                  <div className="mt-8">
                    <Link
                      to="/reviews"
                      className="group inline-flex items-center gap-3 border border-paper/25 px-7 py-4 font-mono text-xs uppercase tracking-[0.3em] text-paper transition-colors hover:border-gold hover:text-gold"
                    >
                      Show all reviews
                      <span className="text-paper/45 transition-colors group-hover:text-gold/70">
                        ({count})
                      </span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Submit a review */}
          <div className="lg:col-span-5">
            <div className="border border-paper/15 p-6 sm:p-8 lg:sticky lg:top-24">
              <h3 className="font-display text-2xl uppercase tracking-wide">
                Leave a Review
              </h3>
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
    </section>
  )
}
