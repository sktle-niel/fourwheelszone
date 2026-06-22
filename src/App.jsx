import { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { initSmoothScroll, destroySmoothScroll, scrollToTop } from "@/lib/smoothScroll"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Marquee } from "@/components/Marquee"
import { Services } from "@/components/Services"
import { Cars } from "@/components/Cars"
import { Statement } from "@/components/Statement"
import { Maintenance } from "@/components/Maintenance"
import { Workshop } from "@/components/Workshop"
import { Reviews } from "@/components/Reviews"
import { Visit } from "@/components/Visit"
import { BookingForm } from "@/components/BookingForm"
import { ReviewsPage } from "@/components/ReviewsPage"
import { Footer } from "@/components/Footer"
import { BackToTop } from "@/components/BackToTop"
import { Toaster } from "@/components/ui/sonner"

function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Services />
      <Cars />
      <Statement />
      <Maintenance />
      <Workshop />
      <Reviews />
      <Visit />
      <BookingForm />
    </main>
  )
}

// Jump to the top on every route change (instant, not a smooth glide).
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    scrollToTop({ immediate: true })
  }, [pathname])
  return null
}

function App() {
  useEffect(() => {
    initSmoothScroll()
    return () => destroySmoothScroll()
  }, [])

  return (
    <div className="grain min-h-svh bg-ink font-sans antialiased">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<ReviewsPage />} />
      </Routes>
      <Footer />
      <BackToTop />
      <Toaster theme="dark" position="top-center" />
    </div>
  )
}

export default App
