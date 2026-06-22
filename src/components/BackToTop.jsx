import { useState } from "react"
import { ArrowUp } from "lucide-react"
import { useScroll, useMotionValueEvent } from "motion/react"
import { scrollToTop } from "@/lib/smoothScroll"
import { cn } from "@/lib/utils"

export function BackToTop() {
  const [show, setShow] = useState(false)

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 600))

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => scrollToTop()}
      className={cn(
        "group fixed bottom-6 right-6 z-40 inline-flex size-12 items-center justify-center border border-paper/25 bg-ink/80 text-paper backdrop-blur-md transition-all duration-300 hover:border-accent hover:text-accent",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <ArrowUp className="size-5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  )
}
