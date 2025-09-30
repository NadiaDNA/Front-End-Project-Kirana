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

// export default function MediaPartner() {
//     const trackRef = useRef(null);
//     const scrollRef = useRef(0);

//     useEffect (() => {
//         const track = trackRef.current;
//         if (!track) return;

//         // let scrollAmount = 0;
//         let animationFrameId;

//         const scrollLogos = () => {
//             scrollAmount += 0.5; // ke kiri
//             track.style.transform = `translateX(-${scrollAmount}px)`;
            
//             if (scrollRef.current >= track.scrollWidth / 2) {
//                 scrollRef.current = 0;
//             }
//             animationFrameId = requestAnimationFrame(scrollLogos);
//         }
//         animationFrameId = requestAnimationFrame(scrollLogos);

//         return () => cancelAnimationFrame(animationFrameId);
//     },[]);

//     return (
//         <section className="bg-[#FFFFFF] mx-auto px-6 md:px-10 lg:px-12 py-14 md:py-16 lg:py-20">
//             <div className="text-center mb-6">
//                 <h2 className="text-2xl text-[#6A5ACD] font-bold mb-10">Media Partners</h2>
//             </div>

//         <div className="overflow-hidden relative">
//         {/* <div ref={trackRef} className="flex gap-12">
//           <Image src={partners1} alt="Partners 1" className="h-12 object-contain" />
//           <Image src={partners2} alt="Partners 2" className="h-12 object-contain" />
//           <Image src={partners3} alt="Partners 3" className="h-12 object-contain" />
//           <Image src={partners4} alt="Partners 4" className="h-12 object-contain" />
//           <Image src={partners5} alt="Partners 5" className="h-12 object-contain" />
//           <Image src={partners6} alt="Partners 6" className="h-12 object-contain" />
//           <Image src={partners7} alt="Partners 7" className="h-12 object-contain" />
//         </div> */}
//         <div ref={trackRef} className="flex gap-12 will-change-transform">
//           {[...logos, ...logos].map((img, i) => (
//             <Image key={i} src={img} alt={`Partner ${i + 1}`} className="h-20 object-contain" />
//           ))}
//         </div>

//       </div>
//         </section>
//     )
// }


//like html css only
export default function MediaPartner() {
  return (
    <section className="bg-white px-6 py-14">
      <div className="text-center mb-6">
        <h2 className="text-2xl text-[#6A5ACD] font-bold mb-10">Media Partners</h2>
      </div>

      <div className="overflow-hidden">
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