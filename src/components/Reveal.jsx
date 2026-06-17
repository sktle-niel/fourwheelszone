import { useReveal } from "@/hooks/useReveal"
import { cn } from "@/lib/utils"

/**
 * Bumabalot sa anumang content para mag fade + slide-up pagpasok sa viewport.
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }) {
  const { ref, visible } = useReveal()

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8",
        className
      )}
    >
      {children}
    </Tag>
  )
}
