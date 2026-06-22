import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4 text-gold" />
        ),
        info: (
          <InfoIcon className="size-4 text-paper" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4 text-gold" />
        ),
        error: (
          <OctagonXIcon className="size-4 text-accent" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin text-paper" />
        ),
      }}
      style={
        {
          // Force a dark, on-brand surface so toasts are always legible on the
          // dark site (the default popover token is white in the light root).
          "--normal-bg": "var(--color-ink-raised)",
          "--normal-text": "var(--color-paper)",
          "--normal-border": "color-mix(in srgb, var(--color-paper) 16%, transparent)",
          "--border-radius": "0px",
        }
      }
      toastOptions={{
        classNames: {
          toast: "border !bg-ink-raised !text-paper font-sans shadow-2xl shadow-black/50",
          title: "!text-paper text-sm font-semibold tracking-wide",
          description: "!text-paper-dim text-[13px] leading-relaxed",
          actionButton: "!bg-accent !text-paper",
          cancelButton: "!bg-ink-soft !text-paper-dim",
        },
      }}
      {...props} />
  );
}

export { Toaster }
