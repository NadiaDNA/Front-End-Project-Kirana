"use client"

import Image from "next/image"
import dashboard from '@/app/components/dashboard.png'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default function Hero2() {
    const router = useRouter();
    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <Image src={dashboard} alt="Dashboard Image" className="object-cover opacity-35" priority/>
                {/*overlay */}
                <div className="absolute inset-0"></div>
            </div>

            <div className="relative max-w-3xl text-center">
                {/*headline*/}
                <h1 className="text-4xl md:text-6xl text-[#6A5ACD] font-extrabold leading-tight drop-shadow-lg">
                    Selamat Datang, <br /> <span className="text-gray-800"> Safi Indonesia</span>
                </h1>
                {/*subheadline*/}
                <p className="mt-6 text-lg md:text-xl text-gray-800 drop-shadow">
                    Di sini kamu bisa{" "}
                    <span className="text-[#6A5ACD] font-semibold">kelola bantuan,</span>{" "}
                    <span className="text-[#6A5ACD] font-semibold">lihat laporan,</span> dan{" "}
                    <span className="text-[#6A5ACD] font-semibold">pantau dampak</span>{" "}
                    dari program yang kamu salurkan
                </p>
                {/*call to action button*/}
                <div className="mt-8 mb-8">
                    <Button
                        onClick={() => router.push("/salurkan")}
                        className="bg-[#6A5ACD] text-white text-center font-semibold px-8 py-6 rounded-2xl shadow-lg hover:bg-[#80cce5] transition transform hover:scale-105">
                            Salurkan Bantuan
                    </Button>
                    </div>
                </div>
                </section>
    );
}
