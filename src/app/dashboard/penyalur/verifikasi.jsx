"use client";

import { useEffect } from "react";
import { useBantuanStore } from "@/app/store/bantuanStore";
import { useRouter } from "next/navigation";
import { CheckCircle, Hourglass, FileText, Archive, Eye } from "lucide-react";

export default function Verifikasi() {
  const { bantuanData, setBantuanData } = useBantuanStore();

  // Ambil data dari API (atau bisa pakai data di store jika sudah fetch di Riwayat)
  useEffect(() => {
    fetch("https://68d0ee14e6c0cbeb39a2e8fa.mockapi.io/ProgramBantuan")
      .then((res) => res.json())
      .then((data) => setBantuanData(data || []))
      .catch((err) => console.error(err));
  }, [setBantuanData]);

  // Ambil 5 data terbaru berdasarkan id terbesar
  const top5Data = [...bantuanData]
    .sort((a, b) => parseInt(b.id) - parseInt(a.id))
    .slice(0, 5);

  // Format tanggal aman
  const formatDate = (value) => {
    if (!value) return "-";
    let date;
    if (typeof value === "number") {
      date = value < 1e12 ? new Date(value * 1000) : new Date(value);
    } else {
      date = new Date(value);
    }
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const router = useRouter();
  

  return (
    <section>
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold text-[#6A5ACD]">Verifikasi Bantuan</h1>
      {top5Data.length > 0 ? (
        top5Data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
          >
            {/* Info */}
            <div className="mb-3 md:mb-0">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#6A5ACD]" />
                {item.judul || item.name}
              </h3>
              <p className="text-sm text-gray-500">
                📅 {formatDate(item.tanggalMulai || item.createdAt)}{" "}
                {item.tanggalAkhir ? `- ${formatDate(item.tanggalAkhir)}` : ""}
              </p>
            </div>

            {/* Status */}
            <div>
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
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">Tidak ada data untuk diverifikasi.</p>
      )}
    </div>
    <div className="text-center pt-6">
            <button className="bg-[#6A5ACD] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#5a4ac0] transition"
             onClick={() => router.push("/riwayat")}>Selengkapnya</button>
    </div>
    </section>
  );
}



// "use client";
// import { CheckCircle, Hourglass, FileText } from "lucide-react";
// import { useRouter } from "next/navigation";


// export default function Verifikasi() {
//   // Dummy data bantuan yang diupload user
//   const bantuanList = [
//     { id: 1, judul: "Bantuan Modal Usaha Warung", tanggal: "20 Sep 2025", status: "menunggu" },
//     { id: 2, judul: "Pelatihan Menjahit untuk Ibu Rumah Tangga", tanggal: "18 Sep 2025", status: "menunggu" },
//     { id: 3, judul: "Beasiswa Pendidikan Anak", tanggal: "15 Sep 2025", status: "verifikasi" },
//     { id: 4, judul: "Paket Sembako Mingguan", tanggal: "14 Sep 2025", status: "verifikasi" },
//     { id: 5, judul: "Pelatihan Formulator Sabun", tanggal: "10 Sep 2025", status: "selesai" },
//     { id: 6, judul: "Beasiswa Perempuan Maju", tanggal: "1 Sep 2025", status: "selesai" },
//   ];
//   const router = useRouter();

//   return (
//     <section className="bg-gray-50 shadow-md mt-10 rounded-xl p-8 space-y-6">
//       <h1 className="text-3xl font-bold text-center mt-10 text-[#6A5ACD]">Status Bantuan Terkini</h1>
//       <p className="text-gray-600 mb-15 text-center">
//         Semua bantuan yang kamu unggah akan diverifikasi oleh tim Kirana sebelum dapat disalurkan.
//       </p>

//       {/* Daftar Bantuan */}
//       <div className="space-y-4">
//         {bantuanList.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center justify-between border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
//           >
//             {/* Info Bantuan */}
//             <div>
//               <h3 className="text-base md:text-lg font-semibold text-gray-800 flex items-center gap-2">
//                 <FileText className="w-5 h-5 text-[#6A5ACD]" />
//                 {item.judul}
//               </h3>
//               <p className="text-sm text-gray-500">Diunggah pada {item.tanggal}</p>
//             </div>

//             {/* Status */}
//             <div className="flex items-center gap-2">
//               {/* {item.status === "verifikasi" ? (
//                 <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
//                   <CheckCircle className="w-4 h-4" /> Diverifikasi
//                 </span>
//               ) : (
//                 <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
//                   <Hourglass className="w-4 h-4" /> Menunggu Verifikasi
//                 </span>
//               )} */}

//                 {item.status === "selesai" ? (
//                 <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium">
//                     <CheckCircle className="w-4 h-4" /> Sudah Disalurkan
//                 </span>
//                 ) : item.status === "verifikasi" ? (
//                     <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
//                         <CheckCircle className="w-4 h-4" /> Diverifikasi
//                     </span>
//                     ) : (
//                     <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
//                         <Hourglass className="w-4 h-4" /> Menunggu Verifikasi
//                         </span>
//                     )
//                 }
//             </div>
//           </div>
//         ))}
//       </div>
//         <div className="text-center pt-6">
//             <button className="bg-[#6A5ACD] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#5a4ac0] transition"
//              onClick={() => router.push("/riwayat")}>Selengkapnya</button>
//         </div>
//     </section>
//   );
// }
