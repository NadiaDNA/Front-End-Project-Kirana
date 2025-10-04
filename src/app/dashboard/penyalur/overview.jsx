"use client";
import { useEffect } from "react";
import { useBantuanStore } from "@/app/store/bantuanStore";
import { CheckCircle, Users, Target, ClipboardList } from "lucide-react";

export default function Overview() {
  const { bantuanData, setBantuanData } = useBantuanStore();

  // Hitung ringkasan
  const totalPenerima = bantuanData.reduce(
    (sum, item) => sum + (parseInt(item.jumlahOrang) || 0),
    0
  );

  const totalBantuan = bantuanData.length;

  const sudahDiverifikasi = bantuanData.filter(
    (item) =>
      item.status?.toLowerCase() === "diverifikasi" ||
      item.status?.toLowerCase() === "selesai"
  ).length;

  const menungguVerifikasi = bantuanData.filter(
    (item) => item.status?.toLowerCase() === "menunggu"
  ).length;

  return (
    <section className="bg-white shadow-md rounded-xl mt-10 p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-[#6A5ACD]">Ringkasan Bantuan</h1>

      {/* Ringkasan Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Penerima Bantuan */}
        <div className="border rounded-lg p-5 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-[#6A5ACD] mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" /> Penerima
          </h3>
          <p className="text-4xl font-bold text-gray-800">{totalPenerima}</p>
          <p className="text-sm text-gray-500 mt-1">Perempuan penerima manfaat</p>
        </div>

        {/* Dampak Sosial */}
        <div className="border rounded-lg p-5 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-[#6A5ACD] mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" /> Dampak Sosial
          </h3>
          <p className="text-4xl font-bold text-gray-800">87%</p>
          <p className="text-sm text-gray-500 mt-1">Target sosial tercapai</p>
        </div>
      </div>

      {/* Status Ringkas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
        {/* Total Bantuan */}
        <div className="border rounded-lg p-5 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-[#6A5ACD] mb-3 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-purple-600" /> Total Bantuan
          </h3>
          <p className="text-3xl font-bold text-gray-800">{totalBantuan}</p>
          <p className="text-sm text-gray-500 mt-1">Semua kategori</p>
        </div>

        {/* Sudah Diverifikasi */}
        <div className="border rounded-lg p-5 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-[#6A5ACD] mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" /> Sudah Diverifikasi
          </h3>
          <p className="text-3xl font-bold text-gray-800">{sudahDiverifikasi}</p>
          <p className="text-sm text-gray-500 mt-1">Siap disalurkan</p>
        </div>

        {/* Menunggu Verifikasi */}
        <div className="border rounded-lg p-5 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-[#6A5ACD] mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-yellow-600" /> Menunggu Verifikasi
          </h3>
          <p className="text-3xl font-bold text-gray-800">{menungguVerifikasi}</p>
          <p className="text-sm text-gray-500 mt-1">Proses validasi</p>
        </div>
      </div>
    </section>
  );
}
