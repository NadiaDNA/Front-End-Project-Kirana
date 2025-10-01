'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Image from "next/image"
import safi from '@/app/components/Safi_logo.png'
import Link from "next/link";


export default function Sidebar({ id }) {


  return (
    <Sheet className="ml-auto">
      <SheetTrigger className="p-2">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[250px] bg-[#FFFFFF]">
        <SheetHeader>
          {/* <SheetTitle>User</SheetTitle> */}
            <SheetTitle> 
                <div className="flex justify-center mb-4 mt-6">
                <Image src={safi} className="w-16 h-16 rounded-full border-[#6A5ACD] shadow-sm" alt="User Avatar" />
                </div>
            <p className="text-xl font-bold text-center text-[#6A5ACD]">Safi Indonesia</p>
            </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
        <nav className="mt-4 space-y-2">
            {/* <a href="#" className="block px-4 py-2 rounded text-[#6A5ACD] hover:bg-[#A8A8A8]">Home</a> */}
            <Link href={`/`} className="block px-4 py-2 rounded text-[#6A5ACD] hover:bg-[#A8A8A8]">Home</Link>
            <Link href={`/dashboard/penyalur/`} className="block px-4 py-2 rounded text-[#6A5ACD] hover:bg-[#A8A8A8]">Dashboard Penyalur</Link>
            <Link href={`/riwayat/`} className="block px-4 py-2 rounded text-[#6A5ACD] hover:bg-[#A8A8A8]">Riwayat Bantuan</Link>
            {/* <a href="#" className="block px-4 py-2 rounded text-[#6A5ACD] hover:bg-[#A8A8A8]">Riwayat Bantuan</a> */}
            {/* <a href="#" className="block px-4 py-2 rounded text-[#6A5ACD] hover:bg-[#A8A8A8]">Impact Report</a> */}
            <Link href={`/salurkan/`} className="block px-4 py-2 rounded text-[#6A5ACD] hover:bg-[#A8A8A8]">Salurkan Bantuan</Link>
        </nav>
        <SheetTitle className="font-bold text-lg text-center mt-8 py-8 w-full text-[#6A5ACD]">KIRANA</SheetTitle>
        </div>
      </SheetContent>
    </Sheet>
  )
}