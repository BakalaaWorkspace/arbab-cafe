import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MenuSection } from "@/components/menu-section"
function App() {
  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <HeroSection />
      <MenuSection />
    </main>
  )
}

export default App