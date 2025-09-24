'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"


export default function Sidebar() {
  return (
    <Sheet className="ml-auto">
      <SheetTrigger className="p-2">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[250px] bg-pink-100">
        <SheetHeader>
          {/* <SheetTitle>User</SheetTitle> */}
            <SheetTitle> 
                <div class="flex justify-center mb-4 mt-6">
                <p class="w-16 h-16 rounded-full bg-[#701A42] text-pink-100 font-bold flex items-center justify-center text-lg border-2 border-white shadow-sm">S</p>
                </div>
            <h1 className="text-lg font-bold text-center text-[#701A42]">Sumiati</h1>
            </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
        <nav className="mt-4 space-y-2">
            <a href="#" className="block px-4 py-2 rounded text-[#701A42] hover:bg-gray-200">Home</a>
            <a href="#" className="block px-4 py-2 rounded text-[#701A42] hover:bg-gray-200">Informasi Bantuan</a>
            <a href="#" className="block px-4 py-2 rounded text-[#701A42] hover:bg-gray-200">Testimoni</a>
            <a href="#" className="block px-4 py-2 rounded text-[#701A42] hover:bg-gray-200">Riwayat Bantuan</a>
        </nav>
        <SheetTitle className="font-bold text-lg text-center mt-8 py-8 w-full text-[#313131]">to<span className="text-[#701A42]">Get</span>Her</SheetTitle>
        </div>
      </SheetContent>
    </Sheet>
  )
}