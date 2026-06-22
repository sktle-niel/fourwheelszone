import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { fetchReviews, postReview } from "@/lib/reviewsApi"

const EMPTY_AGG = { count: 0, average: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } }

/* Loads reviews straight from the API — no seed/dummy data. An empty database
   shows an empty state; a failed request shows an error state. submit() POSTs a
   new review and prepends the row the server returns. */
export function useReviews({ rating, limit, sort } = {}) {
  const [list, setList] = useState([])
  const [agg, setAgg] = useState(EMPTY_AGG)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError(false)
    fetchReviews({ rating, limit, sort })
      .then((d) => {
        if (!alive) return
        setList(Array.isArray(d.reviews) ? d.reviews : [])
        setAgg({
          count: Number(d.count) || 0,
          average: Number(d.average) || 0,
          distribution: d.distribution || EMPTY_AGG.distribution,
        })
      })
      .catch(() => {
        if (!alive) return
        setList([])
        setAgg(EMPTY_AGG)
        setError(true)
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [rating, limit, sort])

  const submit = useCallback(async (data) => {
    try {
      const { review, count, average, distribution } = await postReview(data)
      setList((l) => [{ ...review, you: true }, ...l])
      setAgg({ count, average, distribution })
      setError(false)
      toast.success("Thanks for your review!", {
        description: "Your rating has been saved.",
      })
    } catch (err) {
      // 422 carries field errors for the form; anything else is a network/server
      // problem worth a toast. Re-throw so the form can stop its busy state.
      if (!err?.errors) {
        toast.error("Couldn't submit your review", {
          description: err?.rateLimited
            ? err.message
            : "Please check your connection and try again.",
        })
      }
      throw err
    }
  }, [])

  return { list, agg, loading, error, submit }
}
