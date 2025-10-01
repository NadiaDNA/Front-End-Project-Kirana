import "./globals.css"
import Sidebar from "./components/Sidebar"
import logo from '@/app/components/Main-Logo.png'
import Image from 'next/image'
import HeroSection from "./components/HeroSection"
import MediaPartner from "./components/mediaPartner"
import FlowSection from "./components/flowSection"
import DeliveredSection from "./components/delieredSection"
import Testimonials from "./testimonials"



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FFFFFF]">
        <header className="p-4 border-b flex items-center justify-between">
          <div className="ml-5 flex items-center">
            <Image src={logo} alt="Logo" width={40} height={40} className="w-8 h-8" />
            <h1 className="ml-4 text-xl font-bold text-[#6A5ACD]">KIRANA</h1>
          </div>
           <Sidebar />

        </header>

        <main className="p-4">
          <HeroSection />
          <MediaPartner />
          <FlowSection />
          <DeliveredSection />
          <Testimonials />
          {children}
        </main>
      </body>
    </html>
  )
}
