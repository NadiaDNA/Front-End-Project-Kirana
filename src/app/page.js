import "./globals.css"
import Sidebar from "./components/Sidebar"
import logo from '@/app/components/Main-Logo.png'
import Image from 'next/image'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-pink-100">
        <header className="p-4 border-b flex items-center justify-between">
          <div className="ml-5 flex items-center">
            <Image src={logo} alt="Logo" width={40} height={40} className="w-10 h-10" />
            <h1 className="ml-4 text-xl font-bold text-[#313131]">to<span className="text-[#701A42]">Get</span>Her</h1>
          </div>
           <Sidebar />
        </header>
        <main className="p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
