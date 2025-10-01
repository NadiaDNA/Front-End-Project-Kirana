"use client";
import { useState } from "react";
import Image from "next/image";

// Data testimoni penerima bantuan
const testimonials = [
  {
    name: "Ibu Sari",
    job: "Penjahit Rumahan",
    text: "Bantuan dari Kirana sangat membantu usaha kecil saya, transparan dan tepat sasaran!",
    avatar: "https://avatar.iran.liara.run/public/93",
  },
  {
    name: "Ibu Ratna",
    job: "Pedagang Sayur",
    text: "Sekarang anak-anak saya bisa sekolah berkat bantuan ini. Terima kasih Kirana!",
    avatar: "https://avatar.iran.liara.run/public/85",
  },
  {
    name: "Ibu Maya",
    job: "Pengrajin Kerajinan Tangan",
    text: "Pelatihan yang diberikan membuat saya punya keahlian baru untuk menambah penghasilan.",
    avatar: "https://avatar.iran.liara.run/public/83",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const nextTesti = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prevTesti = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#6A5ACD] mb-4">
          Testimoni Penerima
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Dengarkan pengalaman nyata dari perempuan yang terbantu oleh Kirana.
        </p>
      </div>

      <div className="relative max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md text-center">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <img
            src={testimonials[current].avatar}
            alt={testimonials[current].name}
            width={80}
            height={80}
            className="rounded-full object-cover shadow-md"
          />
        </div>

        {/* Testimoni */}
        <p className="text-gray-700 mb-4">&quot;{testimonials[current].text}&quot;</p>
        <h3 className="font-semibold text-gray-800">{testimonials[current].name}</h3>
        <p className="text-gray-500 text-sm mb-2">{testimonials[current].job}</p>

        {/* Tombol navigasi */}
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={prevTesti} className="px-4 py-2 bg-[#6A5ACD] text-white rounded-xl">Prev</button>
          <button onClick={nextTesti} className="px-4 py-2 bg-[#6A5ACD] text-white rounded-xl">Next</button>
        </div>
      </div>
    </section>
  );
}
