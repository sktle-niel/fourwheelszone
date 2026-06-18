import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Marquee } from "@/components/Marquee"
import { Services } from "@/components/Services"
import { Statement } from "@/components/Statement"
import { Maintenance } from "@/components/Maintenance"
import { Divider } from "@/components/Divider"
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
        <Marquee />
        <Services />
        <Statement />
        <Maintenance />
        <Divider />
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
