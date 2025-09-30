"use client"

import Image from "next/image"
import hero from '@/app/components/hero.jpg'
import { Button } from "@/components/ui/button"

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <Image src={hero} alt="Hero Image" className="object-cover grayscale" />
                {/*overlay */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="relative max-w-3xl text-center">
                {/*headline*/}
                <h1 className="text-4xl md:text-6xl text-white font-extrabold leading-tight drop-shadow-lg">
                    Bantu Perempuan, <br /> <span className="text-[#6A5ACD]"> Bawa Perubahan</span>
                </h1>
                {/*subheadline*/}
                <p className="mt-6 text-lg md:text-xl text-gray-100 drop-shadow">
                    Kirana memudahkanmu menyalurkan bantuan secara{" "}
                    <span className="text-[#6A5ACD] font-semibold">transparan</span> dan{" "}
                    <span className="text-[#6A5ACD] font-semibold">tepat sasaran</span>{" "}
                    kepada perempuan & ibu rumah tangga yang membutuhkan.
                </p>
                {/*call to action button*/}
                <div className="mt-8 mb-8">
                    <Button
                        href="#"
                        className="bg-[#6A5ACD] text-white text-center font-semibold px-8 py-6 rounded-2xl shadow-lg hover:bg-[#80cce5] transition transform hover:scale-105">
                            Ayo Bantu Sekarang
                    </Button>
                    </div>
                </div>
                </section>
    );
}
