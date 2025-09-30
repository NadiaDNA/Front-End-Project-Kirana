"use client";

import { Gift, Users, Folder, DollarSign } from "lucide-react";

export default function DeliveredSection() {
  const stats = [
    {
      title: "Total Bantuan",
      value: "1.250",
      icon: <Gift className="w-10 h-10 text-[#6A5ACD]" />,
      desc: "Jumlah bantuan yang sudah didistribusikan.",
    },
    {
      title: "Penerima",
      value: "3.400",
      icon: <Users className="w-10 h-10 text-[#6A5ACD]" />,
      desc: "Perempuan & keluarga yang menerima bantuan.",
    },
    {
      title: "Kategori Bantuan",
      value: "4",
      icon: <Folder className="w-10 h-10 text-[#6A5ACD]" />,
      desc: "Pendidikan, pelatihan, modal usaha, ekonomi.",
    },
    {
      title: "Nilai Total Bantuan",
      value: "Rp 1,2 M",
      icon: <DollarSign className="w-10 h-10 text-[#6A5ACD]" />,
      desc: "Total nilai bantuan yang tersalurkan.",
    },
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#6A5ACD] mb-4">
          Bantuan yang Sudah Tersalurkan
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Transparansi Kirana: setiap bantuan yang disalurkan tercatat dan dapat dipertanggungjawabkan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#F4F4FF] rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition"
          >
            <div className="mb-4">{stat.icon}</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
            <p className="text-gray-500 text-xs mt-2">{stat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
