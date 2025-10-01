"use client";
import { useRouter } from "next/navigation";

export default function MasukDashboard({ id }) {
  const router = useRouter();
//   const handleClick = () => router.push(`/dashboard/${id}`);

  return (
    <button onClick={() => router.push(`/dashboard/penyalur/${id}`)} className="bg-indigo-600 text-white px-4 py-2 rounded">
      Masuk Dashboard #{id}
    </button>
  );
}
