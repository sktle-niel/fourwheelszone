// Base URL of the PHP API. Set VITE_API_BASE in .env (e.g. the API subdomain
// https://api.fourwheelszone.com, or http://localhost:8000 for local dev).
// Defaults to a relative /api when the API is served from the same host.
const RAW = import.meta.env.VITE_API_BASE
const API_BASE = RAW ? RAW.replace(/\/$/, "") : "/api"
const ENDPOINT = `${API_BASE}/reviews.php`

export async function fetchReviews({ rating, limit, sort } = {}) {
  const qs = new URLSearchParams()
  if (rating) qs.set("rating", String(rating))
  if (limit) qs.set("limit", String(limit))
  if (sort) qs.set("sort", sort)
  const url = qs.toString() ? `${ENDPOINT}?${qs}` : ENDPOINT
  const res = await fetch(url, { headers: { Accept: "application/json" } })
  if (!res.ok) throw new Error(`GET reviews failed (${res.status})`)
  return res.json() // { reviews, count, average, distribution }
}

export async function postReview(data) {
  // Sent as multipart/form-data so optional images can ride along. We do NOT
  // set Content-Type — the browser adds the multipart boundary itself.
  const fd = new FormData()
  fd.append("name", data.name ?? "")
  fd.append("vehicle", data.vehicle ?? "")
  fd.append("rating", String(data.rating ?? ""))
  fd.append("comment", data.comment ?? "")
  fd.append("company", data.company ?? "") // honeypot
  if (Array.isArray(data.images)) {
    for (const file of data.images.slice(0, 3)) fd.append("images[]", file)
  }

  const res = await fetch(ENDPOINT, { method: "POST", body: fd })
  const body = await res.json().catch(() => ({}))

  if (res.status === 422) {
    const err = new Error("Validation failed")
    err.errors = body.errors || {}
    throw err
  }
  if (res.status === 429) {
    const err = new Error(body.error || "Too many requests. Please slow down.")
    err.rateLimited = true
    throw err
  }
  if (!res.ok) throw new Error(body.error || `POST review failed (${res.status})`)
  return body // { review, count, average, distribution }
}
