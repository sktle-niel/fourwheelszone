import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { StatBar } from "@/components/StatBar"
import { Marquee } from "@/components/Marquee"
import { Services } from "@/components/Services"
import { Cars } from "@/components/Cars"
import { Statement } from "@/components/Statement"
import { Maintenance } from "@/components/Maintenance"
import { Workshop } from "@/components/Workshop"
import { Visit } from "@/components/Visit"
import { BookingForm } from "@/components/BookingForm"
import { Footer } from "@/components/Footer"
import { BackToTop } from "@/components/BackToTop"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <div className="grain min-h-svh bg-ink font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <StatBar />
        <Marquee />
        <Services />
        <Cars />
        <Statement />
        <Maintenance />
        <Workshop />
        <Visit />
        <BookingForm />
      </main>
      <Footer />
      <BackToTop />
      <Toaster theme="dark" position="top-center" />
    </div>
  )
}

export default App
