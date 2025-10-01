"use client";
import { useState } from "react";
import Image from 'next/image'
import logo from '@/app/components/Main-Logo.png'
import Sidebar from "@/app/components/Sidebar";
import { CheckCircle, Hourglass, FileText, Archive, Eye, Pencil } from "lucide-react";

export default function RiwayatBantuan() {
  // Dummy data riwayat
  const bantuanList = [
    { id: 1, judul: "Bantuan Modal Usaha Warung", tanggal: "20 Sep 2025", status: "menunggu" },
    { id: 2, judul: "Pelatihan Menjahit", tanggal: "18 Sep 2025", status: "menunggu" },
    { id: 3, judul: "Beasiswa Pendidikan Anak", tanggal: "15 Sep 2025", status: "verifikasi" },
    { id: 4, judul: "Paket Sembako Mingguan", tanggal: "14 Sep 2025", status: "verifikasi" },
    { id: 5, judul: "Pelatihan Formulator Sabun", tanggal: "10 Sep 2025", status: "selesai" },
    { id: 6, judul: "Beasiswa Perempuan Maju", tanggal: "1 Sep 2025", status: "selesai" },
  ];

  const [filter, setFilter] = useState("semua");

  const filteredList =
    filter === "semua" ? bantuanList : bantuanList.filter((b) => b.status === filter);

  return (
    <section>
        <header className="p-4 border-b flex items-center justify-between">
            <div className="ml-5 flex items-center">
                <Image src={logo} alt="Logo" width={40} height={40} className="w-8 h-8" />
                    <h1 className="ml-4 text-xl font-bold text-[#6A5ACD]">KIRANA</h1>
            </div>
            <Sidebar />
        </header>
    <div className="bg-gray-50 shadow-md mt-10 rounded-xl p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center text-[#6A5ACD]">Riwayat Bantuan</h1>
      <p className="text-gray-600 text-center max-w-2xl mx-auto">
        Berikut adalah semua bantuan yang pernah kamu unggah. 
        Kamu bisa memantau statusnya atau melihat catatan dari admin.
      </p>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-3 flex-wrap">
        {["semua", "menunggu", "verifikasi", "selesai"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === item
                ? "bg-[#6A5ACD] text-white"
                : "bg-white text-gray-600 border hover:bg-gray-100"
            }`}
          >
            {item === "semua" && "Semua"}
            {item === "menunggu" && "Menunggu Verifikasi"}
            {item === "verifikasi" && "Terverifikasi"}
            {item === "selesai" && "Selesai"}
          </button>
        ))}
      </div>

      {/* List Bantuan */}
      <div className="space-y-4">
        {filteredList.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
          >
            {/* Info */}
            <div className="mb-3 md:mb-0">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#6A5ACD]" />
                {item.judul}
              </h3>
              <p className="text-sm text-gray-500">Diunggah pada {item.tanggal}</p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              {item.status === "selesai" && (
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                  <Archive className="w-4 h-4" /> Selesai
                </span>
              )}
              {item.status === "verifikasi" && (
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                  <CheckCircle className="w-4 h-4" /> Diverifikasi
                </span>
              )}
              {item.status === "menunggu" && (
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                  <Hourglass className="w-4 h-4" /> Menunggu Verifikasi
                </span>
              )}

              {/* Action Buttons */}
            <div className="flex gap-2 mt-4 md:mt-0">
                <button className="p-2 rounded-full bg-[#6A5ACD] text-white hover:bg-[#5a4ac0] transition" title="Lihat Detail">
                    <Eye className="w-4 h-4" />
                </button>
            </div>
            </div>
            {/* Action Buttons */}
{/* <div className="flex gap-2 mt-4 md:mt-0">
  <button
    onClick={() => router.push(`/bantuan/${item.id}`)}
    className="p-2 rounded-full bg-[#6A5ACD] text-white hover:bg-[#5a4ac0] transition"
    title="Lihat Detail"
  >
    <Eye className="w-4 h-4" />
  </button>
  <button
    onClick={() => router.push(`/bantuan/${item.id}/edit`)}
    className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
    title="Edit Bantuan"
  >
    <Pencil className="w-4 h-4" />
  </button>
</div> */}
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
