import Lenis from "lenis"

// Single Lenis instance for the whole page. Native scroll position is still
// updated, so Motion's useScroll / parallax keep working (and get smoother).
let lenis = null
let rafId = 0

export function initSmoothScroll() {
  if (typeof window === "undefined" || lenis) return lenis
  // Respect reduced-motion: skip inertia entirely, fall back to native scroll.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null

  lenis = new Lenis({ lerp: 0.1, smoothWheel: true })

  const raf = (time) => {
    if (!lenis) return
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)
  return lenis
}

export function destroySmoothScroll() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = 0
  lenis?.destroy()
  lenis = null
}

// Scroll to an anchor, clearing the fixed navbar. Falls back to native.
export function scrollToHash(hash) {
  const el = typeof hash === "string" ? document.querySelector(hash) : hash
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.1 })
  else el.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function scrollToTop({ immediate = false } = {}) {
  if (lenis) lenis.scrollTo(0, immediate ? { immediate: true } : { duration: 1.1 })
  else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" })
}
