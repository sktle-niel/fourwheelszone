import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Marquee } from "@/components/Marquee"
import { Services } from "@/components/Services"
import { SpecializedServices } from "@/components/SpecializedServices"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { Branch } from "@/components/Branch"
import { BookingForm } from "@/components/BookingForm"
import { Footer } from "@/components/Footer"
import { BackToTop } from "@/components/BackToTop"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <div className="min-h-svh bg-brand-dark font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <SpecializedServices />
        <WhyChooseUs />
        <Branch />
        <BookingForm />
      </main>
      <Footer />
      <BackToTop />
      <Toaster theme="dark" richColors position="top-center" />
    </div>
  )
}

export default App
