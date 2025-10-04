"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import { useBantuanStore } from '@/app/store/bantuanStore';
import Sidebar from "../components/Sidebar";
import logo from '@/app/components/Main-Logo.png';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  FileText,
  Users,
  AlertCircle,
  Upload,
  ClipboardList,
  CheckCircle,
  Truck,
  Home,
} from "lucide-react";

export default function SalurkanBantuan() {
  const { setBantuanData } = useBantuanStore();

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [jangkauan, setJangkauan] = useState('semua'); // 'semua' atau 'tertentu'
  const [provinsiSelected, setProvinsiSelected] = useState('');
  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    target: [],
    jumlahOrang: "",
    jumlahDanaPerOrang: "",
    totalBayar: 0,
    tanggalMulai: "",
    tanggalAkhir: "",
    syarat: "",
    jangkauan: "semua",
    jangkauanTentu: "",
    bukti: null,
    metode: "",
    nomorRekening: "",
    eWallet: "",
    kontakPenanggungJawab: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  // Load data wilayah Indonesia
  useEffect(() => {
    fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      .then(res => res.json())
      .then(data => setProvinces(data))
      .catch(() => setProvinces([]));
  }, []);

  // Load data dari local storage
  useEffect(() => {
    const savedData = localStorage.getItem('formBantuan');
    if (savedData) {
      setForm(JSON.parse(savedData));
    }
  }, []);

  // Simpan data ke local storage setiap perubahan
  useEffect(() => {
    localStorage.setItem('formBantuan', JSON.stringify(form));
  }, [form]);

  // Validasi step
  const validateStep = () => {
    if (step === 1) {
      return form.judul && form.deskripsi;
    }
    if (step === 2) {
      return (
        form.target.length > 0 &&
        form.jumlahOrang > 0 &&
        form.jumlahDanaPerOrang >= 100000 &&
        form.tanggalMulai &&
        form.tanggalAkhir
      );
    }
    if (step === 3) {
      return true;
    }
    if (step === 4) {
      if (form.metode === "vendor") {
        return form.nomorRekening && form.eWallet;
      }
      if (form.metode === "langsung") {
        return form.kontakPenanggungJawab;
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
      setErrorMsg("")
    } else {
      setErrorMsg("⚠️ Harap lengkapi data sebelum melanjutkan.");
    }
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      setForm(prev => {
        const updatedTarget = checked
          ? [...prev.target, value]
          : prev.target.filter((t) => t !== value);
        return { ...prev, target: updatedTarget };
      });
    } else if (name === "bukti") {
      setForm(prev => ({ ...prev, bukti: files[0] }));
    } else if (name === "jangkauan") {
      setForm(prev => ({ ...prev, jangkauan: value, jangkauanTentu: "" }));
    } else if (name === "provinsiSelected") {
      setProvinsiSelected(value);
      setForm(prev => ({ ...prev, jangkauanTentu: value }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Hitung total bayar otomatis
  useEffect(() => {
    const orang = parseInt(form.jumlahOrang);
    const danaPerOrang = parseFloat(form.jumlahDanaPerOrang);
    if (orang > 0 && danaPerOrang > 0) {
      setForm(prev => ({
        ...prev,
        totalBayar: orang * danaPerOrang,
      }));
    } else {
      setForm(prev => ({ ...prev, totalBayar: 0 }));
    }
  }, [form.jumlahOrang, form.jumlahDanaPerOrang]);

  const progressPercent = (step / 5) * 100;

  // Fungsi kirim data ke API
  const kirimDataKeAPI = () => {
    // Konversi tanggal ke UNIX timestamp
    const tanggalMulaiUnix = Math.floor(new Date(form.tanggalMulai).getTime() / 1000);
    const tanggalAkhirUnix = Math.floor(new Date(form.tanggalAkhir).getTime() / 1000);

    // Struktur data sesuai API
    const dataKirim = {
      judul: form.judul,
      deskripsi: form.deskripsi,
      target: form.target,
      jumlahOrang: parseInt(form.jumlahOrang),
      jumlahDana: parseInt(form.jumlahDanaPerOrang),
      totalBayar: form.totalBayar,
      tanggalMulai: tanggalMulaiUnix,
      tanggalAkhir: tanggalAkhirUnix,
      syarat: form.syarat,
      jangkauan: form.jangkauan,
      jangkauanTentu: form.jangkauan === "tertentu" ? form.jangkauanTentu : "",
      nomorRekening: form.metode === "vendor" ? form.nomorRekening : "",
      kontakPenanggungJawab: form.metode === "langsung" ? form.kontakPenanggungJawab : "",
      status: "Menunggu"
    };

    fetch('https://68d0ee14e6c0cbeb39a2e8fa.mockapi.io/ProgramBantuan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataKirim),
    })
      .then(res => res.json())
      .then(data => {
        setSubmitted(true);
      })
      .catch(() => {
        alert("Gagal kirim data");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    kirimDataKeAPI();
  };

  const vendorOptions = [
    "Rekening BCA - Kirana Indonesia 541042578790",
    "ShopeePay - Kirana Indonesia 081254342578790",
    "Gopay - Kirana Indonesia 081254342578790",
    "Ovo - Kirana Indonesia 081254342578790",
    "Dana - Kirana Indonesia 081254342578790"
  ];

  
  return (
    <section className="p-4 container mx-auto max-w-7xl">
      {/* Header */}
        <header className="p-4 border-b flex items-center justify-between">
          <div className="ml-5 flex items-center">
            <Image src={logo} alt="Logo" width={40} height={40} className="w-8 h-8" />
            <h1 className="ml-4 text-xl font-bold text-[#6A5ACD]">KIRANA</h1>
          </div>
           <Sidebar />
        </header>
      <div className="max-w-3xl mx-auto p-8 bg-gray-50 shadow-md rounded-xl mt-10">
        {errorMsg && (
  <Alert variant="destructive" className="mb-6">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Terjadi Kesalahan</AlertTitle>
    <AlertDescription>{errorMsg}</AlertDescription>
  </Alert>
)}

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
                    <div className="text-sm mb-1 text-gray-600">Masukkan judul program yang menarik</div>
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
                    <div className="text-sm mb-1 text-gray-600">Jelaskan secara lengkap tentang program</div>
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
                    <div className="text-sm mb-1 text-gray-600">Isi jumlah penerima</div>
                    <input
                      type="number"
                      min={1}
                      name="jumlahOrang"
                      value={form.jumlahOrang}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Jumlah Dana per Orang (Rp)</label>
                    <div className="text-sm mb-1 text-gray-600">Isi jumlah dana untuk satu orang minimal Rp 100.000</div>
                    <input
                      type="number"
                      min={100000}
                      name="jumlahDanaPerOrang"
                      value={form.jumlahDanaPerOrang}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                    />
                    {/* Tampilkan total bayar */}
                    <p className="mt-2 text-sm">
                      <span className="block mb-1 font-semibold text-gray-700">Jumlah bayar total (Rp):</span>
                      <span className="text-blue-600 font-bold text-lg">{form.totalBayar.toLocaleString('id-ID')}</span>
                    </p>
                  </div>

                  {/* Durasi */}
                  <div className="mt-4">
                    <p className="mb-2 font-medium">Durasi Program:</p>
                    <div className="flex gap-4 flex-col md:flex-row">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Tanggal Mulai</label>
                        <div className="text-sm mb-1 text-gray-600">Pilih tanggal mulai program</div>
                        <input
                          type="date"
                          name="tanggalMulai"
                          value={form.tanggalMulai}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Tanggal Akhir</label>
                        <div className="text-sm mb-1 text-gray-600">Pilih tanggal selesai program</div>
                        <input
                          type="date"
                          name="tanggalAkhir"
                          value={form.tanggalAkhir}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                        />
                      </div>
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
                    <div className="text-sm mb-1 text-gray-600">Tulis syarat jika ada</div>
                    <textarea
                      name="syarat"
                      value={form.syarat}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                      rows={3}
                    />
                  </div>

                  {/* Wilayah pilihan */}
                  <div className="mt-4">
                    <p className="mb-2 font-medium">Pilih Jangkauan Wilayah:</p>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="jangkauan"
                        value="semua"
                        checked={form.jangkauan === "semua"}
                        onChange={handleChange}
                        className="accent-[#6A5ACD]"
                      />
                      Seluruh Indonesia
                    </label>
                    <label className="flex items-center gap-2 mt-2">
                      <input
                        type="radio"
                        name="jangkauan"
                        value="tertentu"
                        checked={form.jangkauan === "tertentu"}
                        onChange={handleChange}
                        className="accent-[#6A5ACD]"
                      />
                      Wilayah Tertentu
                    </label>
                    {form.jangkauan === "tertentu" && (
                      <select
                        name="provinsiSelected"
                        value={provinsiSelected}
                        onChange={handleChange}
                        className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                      >
                        <option value="">Pilih Provinsi</option>
                        {provinces.map((prov) => (
                          <option key={prov.id} value={prov.name}>{prov.name}</option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Upload gambar pendukung */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">Unggah Gambar Pendukung</label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-100 transition">
                      <Upload className="w-6 h-6 text-gray-400 mx-auto" />
                      <input
                        type="file"
                        name="bukti"
                        onChange={handleChange}
                        className="w-full mt-3"
                      />
                      {form.bukti && (
                        <p className="mt-2 text-sm text-gray-600">File: {form.bukti.name}</p>
                      )}
                    </div>
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
                  {/* Penyaluran melalui vendor */}
                  <div>
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
                    {form.metode === "vendor" && (
                      <div className="mt-2 ml-4">
                        <p className="mb-2 font-semibold">Transfer melalui:</p>
                        {vendorOptions.map((opt) => (
                          <div key={opt} className="mb-2">
                            <input
                              type="radio"
                              name="vendorPlatform"
                              value={opt}
                              checked={form.eWallet === opt}
                              onChange={(e) => setForm(prev => ({ ...prev, eWallet: e.target.value }))}
                              className="accent-[#6A5ACD]"
                            />{" "}
                            {opt}
                          </div>
                        ))}
                        {/* Nomor rekening / e-wallet */}
                        {form.eWallet && (
                          <>
                            <input
                              type="text"
                              placeholder={`tuliskan nomor rekening atau e-wallet`}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                              value={form.nomorRekening}
                              onChange={(e) => setForm(prev => ({ ...prev, nomorRekening: e.target.value }))}
                            />
                            <div className="mt-2 px-4 py-2 bg-[#6A5ACD] text-white rounded-lg hover:bg-purple-700">
                              Silahkan Konfirmasi ke Admin Kirana : 088888888434
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Penyaluran langsung */}
                  <div className="mt-4">
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
                    {form.metode === "langsung" && (
                      <div className="mt-2">
                        <label className="block text-sm font-medium mb-1">Nomor Kontak Penanggung Jawab</label>
                        <input
                          type="text"
                          placeholder="Contoh: 08123456789"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                          value={form.kontakPenanggungJawab}
                          onChange={(e) => setForm(prev => ({ ...prev, kontakPenanggungJawab: e.target.value }))}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 5 - Review & Submit */}
              {step === 5 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-700">Step 5: Recap & Konfirmasi</h2>
                  <div className="bg-gray-100 p-4 rounded-lg space-y-2 text-sm">
                    <p><strong>Judul:</strong> {form.judul}</p>
                    <p><strong>Deskripsi:</strong> {form.deskripsi}</p>
                    <p><strong>Target:</strong> {form.target.join(", ")}</p>
                    <p><strong>Jumlah orang dibantu:</strong> {form.jumlahOrang}</p>
                    <p><strong>Jumlah Dana per orang:</strong> {form.jumlahDanaPerOrang}</p>
                    <p><strong>Total Bayar:</strong> {form.totalBayar.toLocaleString('id-ID')}</p>
                    <p><strong>Durasi:</strong> {form.tanggalMulai} - {form.tanggalAkhir}</p>
                    <p><strong>Syarat:</strong> {form.syarat || "Tidak ada"}</p>
                    <p><strong>Jangkauan Wilayah:</strong> {form.jangkauan === "semua" ? "Seluruh Indonesia" : form.jangkauanTentu}</p>
                    <p><strong>Metode:</strong> {form.metode}</p>
                    {form.metode === "vendor" && (
                      <>
                        <p>Transfer melalui: {form.eWallet}</p>
                        <p>Nomor Rekening/E-wallet: {form.nomorRekening}</p>
                        <p>Silakan kirim konfirmasi ke: <strong>088888888434</strong></p>
                      </>
                    )}
                    {form.metode === "langsung" && (
                      <p>Kontak Penanggung Jawab: {form.kontakPenanggungJawab}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Navigasi */}
              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  >
                    Kembali
                  </button>
                )}
                {step < 5 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto px-6 py-2 bg-[#6A5ACD] text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Lanjut
                  </button>
                )}
                {step === 5 && (
                  <button
                    type="submit"
                    className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
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
