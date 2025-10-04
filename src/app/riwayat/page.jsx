"use client";

import { useEffect } from "react";
import { useBantuanStore } from "@/app/store/bantuanStore";
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/components/Main-Logo.png";
import Sidebar from "@/app/components/Sidebar";
import { CheckCircle, Hourglass, FileText, Archive, Eye } from "lucide-react";

export default function Riwayat() {
  const { bantuanData, setBantuanData, filterStatus, setFilterStatus } =
    useBantuanStore();

  // Fetch data dari API
  useEffect(() => {
    fetch("https://68d0ee14e6c0cbeb39a2e8fa.mockapi.io/ProgramBantuan")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data dari API:", data);
        setBantuanData(data || []);
      })
      .catch((err) => {
        console.error("Gagal fetch data:", err);
        setBantuanData([]);
      });
  }, [setBantuanData]);

  // Filter data sesuai status
  const filteredData =
    filterStatus === "Semua"
      ? bantuanData
      : bantuanData.filter(
          (item) =>
            (item.status || "").toLowerCase() === filterStatus.toLowerCase()
        );

    // Sort berdasarkan id terbesar dulu
const sortedData = filteredData.sort((a, b) => parseInt(b.id) - parseInt(a.id));

  // helper untuk format tanggal
const formatDate = (value) => {
  if (!value) return "-";

  let date;
  // Jika tipe number: anggap Unix timestamp (detik atau milidetik)
  if (typeof value === "number") {
    // jika timestamp sangat kecil (< 10^12), anggap detik
    date = value < 1e12 ? new Date(value * 1000) : new Date(value);
  } else {
    // string
    date = new Date(value);
  }

  if (isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};


  return (
    <section>
      {/* Header */}
      <header className="p-4 border-b flex items-center justify-between">
        <div className="ml-5 flex items-center">
          <Image
            src={logo}
            alt="Logo"
            width={40}
            height={40}
            className="w-8 h-8"
          />
          <h1 className="ml-4 text-xl font-bold text-[#6A5ACD]">KIRANA</h1>
        </div>
        <Sidebar />
      </header>

      {/* Konten */}
      <div className="bg-gray-50 shadow-md mt-10 rounded-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-[#6A5ACD]">
          Riwayat Pengajuan Bantuan
        </h1>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 flex-wrap">
          {["Semua", "Menunggu", "Verifikasi", "Selesai"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  filterStatus === status
                    ? "bg-[#6A5ACD] text-white"
                    : "bg-white text-gray-600 border hover:bg-gray-100"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>

        {/* List Bantuan */}
        <div className="space-y-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
              >
                {/* Info */}
                <div className="mb-3 md:mb-0">
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#6A5ACD]" />
                    {item.judul || item.name || "Tidak ada judul"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    📅 {formatDate(item.tanggalMulai || item.createdAt)}{" "}
                    {item.tanggalAkhir
                      ? `- ${formatDate(item.tanggalAkhir)}`
                      : ""}
                  </p>
                </div>

                {/* Status */}
                <div className="flex gap-2 mt-4 md:mt-0">
                  {item.status?.toLowerCase() === "menunggu" && (
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium text-sm">
                      <Hourglass className="w-4 h-4" /> Menunggu Verifikasi
                    </span>
                  )}
                  {item.status?.toLowerCase() === "verifikasi" && (
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm">
                      <CheckCircle className="w-4 h-4" /> Diverifikasi
                    </span>
                  )}
                  {item.status?.toLowerCase() === "selesai" && (
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm">
                      <Archive className="w-4 h-4" /> Selesai
                    </span>
                  )}
                

                {/* Action Button */}
                  <Link
                    href={`/detail/${item.id}`} className="p-2 rounded-full bg-[#6A5ACD] text-white hover:bg-[#5a4ac0] transition" title="Lihat Detail">
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Tidak ada data pengajuan.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
