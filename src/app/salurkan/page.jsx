"use client";
import { useState } from "react";
import logo from '@/app/components/Main-Logo.png'
import Image from 'next/image'
import {
  FileText,
  Users,
  DollarSign,
  Upload,
  ClipboardList,
  CheckCircle,
  Truck,
  Home,
} from "lucide-react";

export default function SalurkanBantuan() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    target: [],
    jumlahOrang: "",
    jumlahDana: "",
    tanggalMulai: "",
    tanggalAkhir: "",
    syarat: "",
    jangkauan: "",
    bukti: null,
    metode: "",
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((prev) => {
        const updatedTarget = checked
          ? [...prev.target, value]
          : prev.target.filter((t) => t !== value);
        return { ...prev, target: updatedTarget };
      });
    } else {
      setForm({
        ...form,
        [name]: files ? files[0] : value,
      });
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Program Bantuan:", form);
    setSubmitted(true);
  };

  // Progress % calculation
  const progressPercent = (step / 5) * 100;

  return (
    <section>
      {/* Header */}
      <header className="p-4 border-b flex items-center justify-between bg-white shadow-sm">
        <div className="ml-5 flex items-center">
          <Image src={logo} alt="Logo" width={40} height={40} className="w-8 h-8" />
          <h1 className="ml-4 text-xl font-bold text-[#6A5ACD]">KIRANA</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto p-8 bg-gray-50 shadow-md rounded-xl mt-10">
        {/* Thank You Page */}
        {submitted ? (
          <div className="text-center space-y-6 py-10">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-800">Terima kasih sudah berpartisipasi!</h2>
            <p className="text-gray-600">Bantuanmu akan segera diverifikasi oleh admin.</p>
            <div className="flex justify-center gap-4 mt-6">
              <a
                href="/"
                className="flex items-center gap-2 px-6 py-2 bg-[#6A5ACD] text-white rounded-lg hover:bg-purple-700 transition"
              >
                <Home className="w-4 h-4" /> Kembali ke Home
              </a>
              <a
                href="/riwayat"
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <ClipboardList className="w-4 h-4" /> Lihat Bantuan Saya
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div
                className="bg-[#6A5ACD] h-2 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <h1 className="text-3xl font-bold text-[#6A5ACD] mb-6 text-center">
              Salurkan Bantuan
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
                    <FileText className="w-5 h-5 text-[#6A5ACD]" />
                    Step 1: Judul & Deskripsi
                  </h2>
                  <div>
                    <label className="block text-sm font-medium mb-1">Judul Program</label>
                    <input
                      type="text"
                      name="judul"
                      value={form.judul}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Deskripsi Program</label>
                    <textarea
                      name="deskripsi"
                      value={form.deskripsi}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
                    <Users className="w-5 h-5 text-[#6A5ACD]" />
                    Step 2: Target, Jumlah & Durasi
                  </h2>

                  <div>
                    <p className="mb-2 font-medium">Target Penerima:</p>
                    <div className="flex flex-col gap-2">
                      {["Ibu Rumah Tangga", "Pelajar", "UMKM", "Lansia"].map((opt) => (
                        <label key={opt} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            value={opt}
                            checked={form.target.includes(opt)}
                            onChange={handleChange}
                            className="accent-[#6A5ACD]"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Jumlah Orang Dibantu</label>
                    <input
                      type="number"
                      name="jumlahOrang"
                      value={form.jumlahOrang}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Jumlah Dana (Rp)</label>
                    <div className="flex items-center border rounded-lg px-3">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        name="jumlahDana"
                        value={form.jumlahDana}
                        onChange={handleChange}
                        className="w-full px-2 py-2 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">Tanggal Mulai</label>
                      <input
                        type="date"
                        name="tanggalMulai"
                        value={form.tanggalMulai}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">Tanggal Akhir</label>
                      <input
                        type="date"
                        name="tanggalAkhir"
                        value={form.tanggalAkhir}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
                    <ClipboardList className="w-5 h-5 text-[#6A5ACD]" />
                    Step 3: Syarat, Area & Bukti
                  </h2>
                  <div>
                    <label className="block text-sm font-medium mb-1">Syarat Khusus (opsional)</label>
                    <textarea
                      name="syarat"
                      value={form.syarat}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Jangkauan Area</label>
                    <input
                      type="text"
                      name="jangkauan"
                      value={form.jangkauan}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                    />
                  </div>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-100 transition">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto" />
                    <input
                      type="file"
                      name="bukti"
                      value={form.gambar}
                      onChange={handleChange}
                      className="w-full mt-3"
                    />
                    <p className="text-sm text-gray-500 mt-2">Upload bukti transfer/gambar pendukung</p>
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
                    <Truck className="w-5 h-5 text-[#6A5ACD]" />
                    Step 4: Metode Penyaluran
                  </h2>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="metode"
                      value="vendor"
                      checked={form.metode === "vendor"}
                      onChange={handleChange}
                      className="accent-[#6A5ACD]"
                    />
                    Penyaluran melalui vendor/mitra
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="metode"
                      value="langsung"
                      checked={form.metode === "langsung"}
                      onChange={handleChange}
                      className="accent-[#6A5ACD]"
                    />
                    Penyaluran langsung di tempat
                  </label>
                </div>
              )}

              {/* STEP 5 */}
                     {/* STEP 5 */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Step 5: Recap & Konfirmasi</h2>
            <div className="bg-gray-100 p-4 rounded-lg space-y-2">
              <p><strong>Judul:</strong> {form.judul}</p>
              <p><strong>Deskripsi:</strong> {form.deskripsi}</p>
              <p><strong>Target:</strong> {form.target.length > 0 ? form.target.join(", ") : "Belum dipilih"}</p>
              <p><strong>Jumlah yang akan dibantu:</strong> {form.jumlahOrang}</p>
              <p><strong>Jumlah dana:</strong> {form.jumlahDana}</p>
              <p><strong>Durasi:</strong> {form.tanggalMulai} - {form.tanggalAkhir}</p>
              <p><strong>Syarat:</strong> {form.syarat || "Tidak ada"}</p>
              <p><strong>Jangkauan:</strong> {form.jangkauan}</p>
              <p><strong>Gambar:</strong> {form.bukti ? form.bukti.name : "Belum diunggah"}</p>
              <p><strong>Metode:</strong> {form.metode || "Belum dipilih"}</p>
            </div>
          </div>
        )}
    
    

              

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  >
                    Kembali
                  </button>
                )}

                {step <= 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto px-6 py-2 bg-[#6A5ACD] text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Lanjut
                  </button>
                ) : (
                  <button type="submit" className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    Konfirmasi & Submit
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
