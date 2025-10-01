"use client";
import { useParams } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import logo from '@/app/components/Main-Logo.png'
import Image from 'next/image'
import Hero2 from "./hero-2";
import Overview from "./overview";
import Verifikasi from "./verifikasi";

export default function DashboardPenyalur() {
  const { id } = useParams();

  return (
    <section>
      {/* Sidebar */}
        <header className="p-4 border-b flex items-center justify-between">
          <div className="ml-5 flex items-center">
            <Image src={logo} alt="Logo" width={40} height={40} className="w-8 h-8" />
            <h1 className="ml-4 text-xl font-bold text-[#6A5ACD]">KIRANA</h1>
          </div>
           <Sidebar />
        </header>
        <Hero2 />
        <Overview />
        <Verifikasi />
      {/* <div className="text-center p-6 mt-6">
        <h1 className="text-3xl font-bold text-[#6A5ACD]">Dashboard Penyalur</h1>
        <p className="text-gray-600 mt-2">
          Selamat datang, <strong>Safi</strong>. Di sini kamu bisa kelola bantuan, lihat laporan, dan pantau dampak.
        </p>
      </div> */}


      {/* Ringkasan Bantuan */}
      {/* <div className="mt-10 p-6">
        <h2 className="text-xl font-semibold text-[#6A5ACD] mb-4">Ringkasan Bantuan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border rounded-lg p-4 shadow">
            <h3 className="text-lg font-bold text-[#6A5ACD]">Total Program</h3>
            <p className="text-gray-600 mt-2">12 program aktif</p>
          </div>
          <div className="bg-white border rounded-lg p-4 shadow">
            <h3 className="text-lg font-bold text-[#6A5ACD]">Penerima Bantuan</h3>
            <p className="text-gray-600 mt-2">1.245 orang</p>
          </div>
          <div className="bg-white border rounded-lg p-4 shadow">
            <h3 className="text-lg font-bold text-[#6A5ACD]">Dampak Tercapai</h3>
            <p className="text-gray-600 mt-2">87% target sosial</p>
          </div>
        </div> */}
      {/* </div> */}
</section>
  );
}
