"use client"

import Image from "next/image"
import hero from '@/app/components/hero.jpg'
import { Button } from "@/components/ui/button"

export default function Hero2() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <Image src={hero} alt="Hero Image" className="object-cover grayscale" />
                {/*overlay */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

      {/* <div className="text-center p-6 mt-6">
        <h1 className="text-3xl font-bold text-[#6A5ACD]">Dashboard Penyalur</h1>
        <p className="text-gray-600 mt-2">
          Selamat datang, <strong>Safi</strong>. Di sini kamu bisa kelola bantuan, lihat laporan, dan pantau dampak.
        </p>
      </div> */}

            <div className="relative max-w-3xl text-center">
                {/*headline*/}
                <h1 className="text-4xl md:text-6xl text-white font-extrabold leading-tight drop-shadow-lg">
                    Selamat Datang, <br /> <span className="text-[#6A5ACD]"> Safi Indonesia</span>
                </h1>
                {/*subheadline*/}
                <p className="mt-6 text-lg md:text-xl text-gray-100 drop-shadow">
                    Di sini kamu bisa{" "}
                    <span className="text-[#6A5ACD] font-semibold">kelola bantuan,</span>{" "}
                    <span className="text-[#6A5ACD] font-semibold">lihat laporan,</span> dan{" "}
                    <span className="text-[#6A5ACD] font-semibold">pantau dampak</span>{" "}
                    dari program yang kamu salurkan
                </p>
                {/*call to action button*/}
                <div className="mt-8 mb-8">
                    <Button
                        href="#"
                        className="bg-[#6A5ACD] text-white text-center font-semibold px-8 py-6 rounded-2xl shadow-lg hover:bg-[#80cce5] transition transform hover:scale-105">
                            Salurkan Bantuan
                    </Button>
                    </div>
                </div>
                </section>
    );
}
