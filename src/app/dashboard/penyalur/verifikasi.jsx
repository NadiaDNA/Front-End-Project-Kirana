"use client";
import { CheckCircle, Hourglass, FileText } from "lucide-react";

export default function Verifikasi() {
  // Dummy data bantuan yang diupload user
  const bantuanList = [
    { id: 1, judul: "Bantuan Modal Usaha Warung", tanggal: "20 Sep 2025", status: "menunggu" },
    { id: 2, judul: "Pelatihan Menjahit untuk Ibu Rumah Tangga", tanggal: "18 Sep 2025", status: "menunggu" },
    { id: 3, judul: "Beasiswa Pendidikan Anak", tanggal: "15 Sep 2025", status: "verifikasi" },
    { id: 4, judul: "Paket Sembako Mingguan", tanggal: "14 Sep 2025", status: "verifikasi" },
    { id: 5, judul: "Pelatihan Formulator Sabun", tanggal: "10 Sep 2025", status: "selesai" },
    { id: 6, judul: "Beasiswa Perempuan Maju", tanggal: "1 Sep 2025", status: "selesai" },
  ];

  return (
    <section className="bg-gray-50 shadow-md mt-10 rounded-xl p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center mt-10 text-[#6A5ACD]">Status Bantuan Terkini</h1>
      <p className="text-gray-600 mb-15 text-center">
        Semua bantuan yang kamu unggah akan diverifikasi oleh tim Kirana sebelum dapat disalurkan.
      </p>

      {/* Daftar Bantuan */}
      <div className="space-y-4">
        {bantuanList.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
          >
            {/* Info Bantuan */}
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#6A5ACD]" />
                {item.judul}
              </h3>
              <p className="text-sm text-gray-500">Diunggah pada {item.tanggal}</p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              {/* {item.status === "verifikasi" ? (
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                  <CheckCircle className="w-4 h-4" /> Diverifikasi
                </span>
              ) : (
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                  <Hourglass className="w-4 h-4" /> Menunggu Verifikasi
                </span>
              )} */}

                {item.status === "selesai" ? (
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium">
                    <CheckCircle className="w-4 h-4" /> Sudah Disalurkan
                </span>
                ) : item.status === "verifikasi" ? (
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                        <CheckCircle className="w-4 h-4" /> Diverifikasi
                    </span>
                    ) : (
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                        <Hourglass className="w-4 h-4" /> Menunggu Verifikasi
                        </span>
                    )
                }
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
