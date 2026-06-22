import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Star, StarHalf, ArrowRight, Loader2, ImagePlus, X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/* Read-only star row. Supports half stars for the aggregate average. */
export function Stars({ value, starClass = "size-4", className }) {
  return (
    <div className={cn("flex gap-0.5", className)} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => {
        const full = value >= i
        const half = !full && value >= i - 0.5
        if (half)
          return (
            <StarHalf key={i} strokeWidth={1.5} className={cn(starClass, "fill-gold text-gold")} />
          )
        return (
          <Star
            key={i}
            strokeWidth={1.5}
            className={cn(starClass, full ? "fill-gold text-gold" : "fill-none text-paper/25")}
          />
        )
      })}
    </div>
  )
}

/* Photo strip: the first image shows; the others stay hidden and slide open on
   hover with a transition. Clicking any image opens it in a lightbox preview. */
function ReviewGallery({ images }) {
  const [open, setOpen] = useState(-1)
  const [first, ...rest] = images
  return (
    <div className="group/gallery relative mb-5 flex h-36 gap-1.5 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(0)}
        aria-label="View photo"
        className="relative h-full flex-1 cursor-pointer overflow-hidden bg-ink-soft"
      >
        <img
          src={first}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover/gallery:scale-105"
        />
        {rest.length > 0 && (
          <span className="absolute bottom-2 right-2 bg-ink/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-paper backdrop-blur-sm transition-opacity duration-300 group-hover/gallery:opacity-0">
            +{rest.length}
          </span>
        )}
      </button>
      {rest.map((src, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setOpen(i + 1)}
          aria-label="View photo"
          className="relative h-full w-0 flex-none cursor-pointer overflow-hidden bg-ink-soft opacity-0 transition-all duration-500 ease-out group-hover/gallery:w-20 group-hover/gallery:opacity-100"
        >
          <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
        </button>
      ))}
      {open >= 0 && (
        <Lightbox images={images} index={open} onClose={() => setOpen(-1)} onIndex={setOpen} />
      )}
    </div>
  )
}

/* Full-screen image preview. Close with the X button, a click on the backdrop,
   or Esc; arrow keys / on-screen arrows move between a review's photos. */
function Lightbox({ images, index, onClose, onIndex }) {
  const count = images.length

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowRight") onIndex((index + 1) % count)
      else if (e.key === "ArrowLeft") onIndex((index - 1 + count) % count)
    }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden" // lock background scroll while open
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [index, count, onClose, onIndex])

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm animate-in fade-in-0 duration-200"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center border border-paper/20 bg-ink/60 text-paper/80 transition-colors hover:border-accent hover:text-accent"
      >
        <X className="size-5" />
      </button>

      <img
        src={images[index]}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl shadow-black/60 animate-in zoom-in-95 duration-200"
      />

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation()
              onIndex((index - 1 + count) % count)
            }}
            className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center border border-paper/20 bg-ink/60 text-paper/80 transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation()
              onIndex((index + 1) % count)
            }}
            className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center border border-paper/20 bg-ink/60 text-paper/80 transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronRight className="size-5" />
          </button>
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">
            {index + 1} / {count}
          </span>
        </>
      )}
    </div>,
    document.body
  )
}

export function ReviewCard({ review }) {
  const images = Array.isArray(review.images) ? review.images : []
  return (
    <div
      className={cn(
        "flex h-full flex-col border p-5 sm:p-6",
        review.you ? "border-gold/45 bg-gold/[0.04]" : "border-paper/12"
      )}
    >
      {images.length > 0 && <ReviewGallery images={images} />}
      <Stars value={review.rating} />
      <span className="sr-only">{review.rating} out of 5</span>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-paper/75">{review.text}</p>
      <div className="mt-5 border-t border-paper/10 pt-4">
        <div className="font-display text-lg uppercase tracking-wide">{review.name}</div>
        <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/45">
          {review.vehicle || "Verified customer"}
          {review.you ? " · Your review" : ""}
        </div>
      </div>
    </div>
  )
}

const fieldCx =
  "h-11 w-full border-0 border-b border-paper/20 bg-transparent px-0 font-sans text-base text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-accent disabled:opacity-50 [color-scheme:dark]"

const errorCx = "mt-1.5 font-mono text-[11px] uppercase tracking-wide text-accent"

const MAX_IMAGES = 3
const MAX_IMAGE_BYTES = 5 * 1024 * 1024

// Tap-to-fill comment starters (each well over 6 letters). Users can edit after.
const COMMENT_SUGGESTIONS = [
  "Mabilis at maayos ang serbisyo, salamat!",
  "Magaling at maaasahan ang mga mekaniko dito.",
  "Sulit ang presyo at malinis ang trabaho.",
  "Friendly ang staff at malinaw magpaliwanag.",
  "On-time silang natapos, walang abala.",
  "Solid ang serbisyo, babalik ako ulit.",
]

/* Interactive star + comment form with optional photo attachments (up to 3).
   Calls onSubmit(data) which should return a promise. Throwing an error with
   `.errors` shows field-level messages. */
export function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  // `company` is a honeypot — kept empty by real users, filled by bots.
  const [form, setForm] = useState({ name: "", vehicle: "", comment: "", company: "" })
  const [images, setImages] = useState([]) // [{ file, url }]
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const fileRef = useRef(null)

  // Always revoke the latest preview URLs when the form unmounts.
  const imagesRef = useRef(images)
  useEffect(() => {
    imagesRef.current = images
  }, [images])
  useEffect(() => {
    return () => imagesRef.current.forEach((im) => URL.revokeObjectURL(im.url))
  }, [])

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const addFiles = (e) => {
    const picked = Array.from(e.target.files || [])
    e.target.value = "" // allow re-selecting the same file later
    setErrors((er) => ({ ...er, images: undefined }))
    setImages((cur) => {
      let room = MAX_IMAGES - cur.length
      const accepted = []
      let msg
      for (const file of picked) {
        if (room <= 0) {
          msg = `You can attach up to ${MAX_IMAGES} images.`
          break
        }
        if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
          msg = "Only JPG, PNG or WebP images."
          continue
        }
        if (file.size > MAX_IMAGE_BYTES) {
          msg = "Each image must be 5 MB or smaller."
          continue
        }
        accepted.push({ file, url: URL.createObjectURL(file) })
        room--
      }
      if (msg) setErrors((er) => ({ ...er, images: msg }))
      return [...cur, ...accepted]
    })
  }

  const removeImage = (idx) => {
    setImages((cur) => {
      const next = [...cur]
      const [gone] = next.splice(idx, 1)
      if (gone) URL.revokeObjectURL(gone.url)
      return next
    })
    setErrors((er) => ({ ...er, images: undefined }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const next = {}
    if (!rating) next.rating = "Please pick a rating."
    if (!form.name.trim()) next.name = "Please enter your name."
    if (form.comment.trim().length < 4) next.comment = "Add a short comment."
    setErrors(next)
    if (Object.keys(next).length) return

    setBusy(true)
    try {
      await onSubmit({
        name: form.name.trim(),
        vehicle: form.vehicle.trim(),
        rating,
        comment: form.comment.trim(),
        company: form.company, // honeypot, sent as-is
        images: images.map((im) => im.file),
      })
      images.forEach((im) => URL.revokeObjectURL(im.url))
      setImages([])
      setForm({ name: "", vehicle: "", comment: "", company: "" })
      setRating(0)
      setErrors({})
    } catch (err) {
      if (err?.errors) setErrors(err.errors)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
          Your rating
        </span>
        <div role="radiogroup" aria-label="Your rating" className="mt-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              type="button"
              key={i}
              role="radio"
              aria-checked={rating === i}
              aria-label={`${i} star${i > 1 ? "s" : ""}`}
              disabled={busy}
              onClick={() => {
                setRating(i)
                setErrors((er) => ({ ...er, rating: undefined }))
              }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(0)}
              className="p-1 transition-transform duration-200 hover:scale-110 disabled:opacity-50"
            >
              <Star
                strokeWidth={1.5}
                className={cn(
                  "size-7 transition-colors",
                  i <= (hover || rating) ? "fill-gold text-gold" : "fill-none text-paper/30"
                )}
              />
            </button>
          ))}
        </div>
        {errors.rating && <p className={errorCx}>{errors.rating}</p>}
      </div>

      <div>
        <label htmlFor="rv-name" className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
          Name
        </label>
        <input
          id="rv-name"
          value={form.name}
          onChange={update("name")}
          disabled={busy}
          placeholder="Juan Dela Cruz"
          className={cn("mt-1", fieldCx)}
        />
        {errors.name && <p className={errorCx}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="rv-vehicle" className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
          Vehicle (optional)
        </label>
        <input
          id="rv-vehicle"
          value={form.vehicle}
          onChange={update("vehicle")}
          disabled={busy}
          placeholder="Toyota Vios 2018"
          className={cn("mt-1", fieldCx)}
        />
        {errors.vehicle && <p className={errorCx}>{errors.vehicle}</p>}
      </div>

      <div>
        <label htmlFor="rv-comment" className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
          Comment
        </label>
        <textarea
          id="rv-comment"
          value={form.comment}
          onChange={update("comment")}
          disabled={busy}
          rows={3}
          placeholder="How was the service?"
          className="mt-1 w-full resize-none border-0 border-b border-paper/20 bg-transparent px-0 py-2 font-sans text-base text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-accent disabled:opacity-50"
        />

        {/* Tap a suggestion to use it as your comment (still editable). */}
        <div className="mt-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/35">
            Suggestions — tap to use
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {COMMENT_SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                disabled={busy}
                onClick={() => {
                  setForm((f) => ({ ...f, comment: s }))
                  setErrors((er) => ({ ...er, comment: undefined }))
                }}
                className="max-w-full border border-paper/15 px-3 py-1.5 text-left font-sans text-[12px] leading-snug text-paper/55 transition-colors hover:border-gold/50 hover:text-paper disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {errors.comment && <p className={errorCx}>{errors.comment}</p>}
      </div>

      {/* Optional photos (up to 3) */}
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
          Photos <span className="text-paper/30">(optional, up to {MAX_IMAGES})</span>
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          {images.map((im, i) => (
            <div key={i} className="relative size-16 overflow-hidden border border-paper/15">
              <img src={im.url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                disabled={busy}
                aria-label="Remove image"
                className="absolute right-0 top-0 flex size-5 items-center justify-center bg-ink/80 text-paper transition-colors hover:bg-accent disabled:opacity-50"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
          {images.length < MAX_IMAGES && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={busy}
              className="flex size-16 flex-col items-center justify-center gap-1 border border-dashed border-paper/25 text-paper/45 transition-colors hover:border-gold/50 hover:text-gold disabled:opacity-50"
            >
              <ImagePlus className="size-5" />
              <span className="font-mono text-[9px] uppercase tracking-wider">Add</span>
            </button>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={addFiles}
          className="hidden"
        />
        {errors.images && <p className={errorCx}>{errors.images}</p>}
      </div>

      {/* Honeypot: hidden from people, catches bots that fill every field. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: 0, height: 0, width: 0, overflow: "hidden" }}>
        <label htmlFor="rv-company">Company</label>
        <input
          id="rv-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={update("company")}
        />
      </div>

      <button
        type="submit"
        disabled={busy}
        className="group inline-flex w-full items-center justify-center gap-3 bg-accent px-8 py-4 font-mono text-xs uppercase tracking-[0.3em] text-paper transition-[transform,background-color] duration-300 hover:bg-accent-dark active:scale-[0.99] disabled:opacity-70"
      >
        {busy ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Posting
          </>
        ) : (
          <>
            Post Review
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  )
}
