"use client";

import { useBantuanStore } from "@/app/store/bantuanStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Clock, FileText, Coins, Users, MapPin, X, Globe } from "lucide-react";

export default function BantuanDetailPage({ params }) {
  const { id } = params;
  const { bantuanData } = useBantuanStore();

  const data = bantuanData.find((item) => String(item.id) === id);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const router = useRouter();

  if (!data) {
    return <p className="p-6">Data bantuan tidak ditemukan.</p>;
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        text: newComment,
        author: "User",
        date: new Date().toLocaleString(),
      },
    ]);
    setNewComment("");
  };

  const statusMap = {
    menunggu: { text: "Menunggu verifikasi", color: "bg-yellow-100 text-yellow-700", icon: <Clock className="w-4 h-4 mr-1" /> },
    verifikasi: { text: "Sudah diverifikasi", color: "bg-blue-100 text-blue-700", icon: <FileText className="w-4 h-4 mr-1" /> },
    selesai: { text: "Bantuan sudah tersalurkan", color: "bg-green-100 text-green-700", icon: <CheckCircle className="w-4 h-4 mr-1" /> },
  };
  
  // Fungsi untuk ubah timestamp ke format tanggal Indonesia
const formatTanggal = (timestamp) => {

  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

  return (
    <section className="max-w-3xl mx-auto p-6">
      {/* Card utama */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        {/* Tombol Close */}
        <button
          onClick={() => router.push("/riwayat")}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-red-100 transition"
          aria-label="Kembali ke Riwayat"
        >
          <X className="w-5 h-5 text-gray-600 hover:text-red-600" />
        </button>

        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#6A5ACD] to-indigo-500 text-white">
          <h1 className="text-xl font-semibold opacity-90">Detail Bantuan #{data.id}</h1>
          <p className="text-2xl font-bold">{data.judul}</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Gambar */}
          <div className="w-full">
            <img
              src={data.gambar}
              alt={data.judul}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Deskripsi */}
          <div className="p-4 rounded-lg bg-gray-50 border text-sm text-gray-700">
            <p className="font-semibold mb-1">Deskripsi:</p>
            <p>{data.deskripsi}</p>
          </div>

          {/* Grid info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-purple-50 border">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="font-semibold">Jumlah Orang:</span> {data.jumlahOrang}
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-pink-50 border">
              <Coins className="w-4 h-4 text-pink-600" />
              <span className="font-semibold">Jumlah Dana:</span> Rp.{data.jumlahDana.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 border">
              <Coins className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">Total Biaya:</span> Rp.{data.totalBayar.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border">
              <Globe className="w-4 h-4 text-green-600" />
              <span className="font-semibold">Wilayah:</span> {data.jangkauan}
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-orange-50 border">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span className="font-semibold">Provinsi:</span> {data.jangkauanTentu}
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-indigo-50 border">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span className="font-semibold">Tanggal Mulai:</span> {formatTanggal(data.tanggalMulai)}
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-teal-50 border">
              <Clock className="w-4 h-4 text-teal-600" />
              <span className="font-semibold">Tanggal Akhir:</span> {formatTanggal(data.tanggalAkhir)}
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border">
              <FileText className="w-4 h-4 text-red-600" />
              <span className="font-semibold">Syarat:</span> {data.syarat}
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="font-semibold text-sm mb-2">Status:</p>
            <span
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${statusMap[data.status].color}`}
            >
              {statusMap[data.status].icon}
              {statusMap[data.status].text}
            </span>
          </div>


        </div>

        {/* Komentar */}
        <div className="p-6 border-t">
          <h2 className="text-lg font-semibold mb-3">Diskusi & Pesan Tambahan</h2>

          <div className="space-y-3 mb-4">
            {comments.length > 0 ? (
              comments.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-lg bg-gray-50 border border-gray-200"
                >
                  <p className="text-sm text-gray-700">{c.text}</p>
                  <span className="text-xs text-gray-400">
                    {c.author} • {c.date}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm italic">Belum ada pesan</p>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Tulis pesanmu..."
              className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button
              onClick={handleAddComment}
              className="bg-[#6A5ACD] hover:bg-indigo-700 transition text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
