import { useEffect, useRef, useState } from "react"

/**
 * Reveal-on-scroll. Nagdadagdag ng visible state kapag pumasok na
 * sa viewport ang element. Ginagamit para sa fade/slide-up animations.
 */
export function useReveal({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(node)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, once])

  return { ref, visible }
}

/**
 * Animated count-up para sa stats. Magsisimula kapag start === true.
 */
export function useCountUp(target, { duration = 1600, start = false } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    let raf
    const startTime = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])

  return value
}
