"use client";
import { CheckCircle, Upload, Package, BarChart } from "lucide-react";

export default function FlowSection() {
  const steps = [
    {
      title: "Buat & Upload Bantuan",
      desc: "Penyalur mengisi detail bantuan: kategori, jumlah, deskripsi, dan dokumen pendukung.",
      icon: <Upload className="w-8 h-8 text-white" />,
    },
    {
      title: "Verifikasi Bantuan & Penerima",
      desc: "Tim Kirana memastikan bantuan valid, dokumen lengkap, kategori sesuai, dan penerima tepat sasaran.",
      icon: <CheckCircle className="w-8 h-8 text-white" />,
    },
    {
      title: "Distribusi Bantuan",
      desc: "Bantuan disalurkan ke penerima yang sudah diverifikasi.",
      icon: <Package className="w-8 h-8 text-white" />,
    },
    {
      title: "Laporan & Dampak",
      desc: "Penyalur menerima ringkasan dampak, transparansi penggunaan, dan statistik penerima.",
      icon: <BarChart className="w-8 h-8 text-white" />,
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#6A5ACD] mb-4">
          Bagaimana Bantuan Tersalur
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kirana memastikan setiap bantuan sampai dengan transparan, mudah, dan berdampak nyata.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center max-w-xs transition duration-500 ease-in-out transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 rounded-full bg-[#6A5ACD] flex items-center justify-center shadow-lg mb-4">
              {step.icon}
            </div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
