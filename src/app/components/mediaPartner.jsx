"use client"

// import { useEffect, useRef } from "react";
import Image from "next/image"
import partners1 from '@/app/components/partners/partners-1.png';
import partners2 from "@/app/components/partners/partners-2.png";
import partners3 from "@/app/components/partners/partners-3.png";
import partners4 from "@/app/components/partners/partners-4.png";
import partners5 from "@/app/components/partners/partners-5.png";
import partners6 from "@/app/components/partners/partners-6.png";
import partners7 from "@/app/components/partners/partners-7.png";

const logos = [
  partners1,
  partners2,
  partners3,
  partners4,
  partners5,
  partners6,
  partners7,
];

//like html css only
export default function MediaPartner() {
  return (
    <section className="bg-white px-6 py-14">
      <div className="text-center mb-6">
        <h2 className="text-2xl text-[#6A5ACD] font-bold mb-10">Media Partners</h2>
      </div>

      <div className="overflow-hidden w-full">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{
            animation: "scroll 30s linear infinite",
          }}
        >
          {[...logos, ...logos].map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Partner ${i + 1}`}
              className="h-20 w-auto object-contain"
            />
          ))}
        </div>

        {/* Inline keyframes */}
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </section>
  );
}