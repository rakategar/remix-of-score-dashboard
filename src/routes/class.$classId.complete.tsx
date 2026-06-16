import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, FileText, Award, Home } from "lucide-react";

export const Route = createFileRoute("/class/$classId/complete")({
  head: () => ({ meta: [{ title: "Program Selesai · SCORE" }] }),
  component: Complete,
});

function Complete() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 relative overflow-hidden">
      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 rounded-full animate-bounce"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 80}%`,
              backgroundColor: ["#2563EB", "#10B981", "#F59E0B", "#EF4444"][i % 4],
              animationDelay: `${i * 0.15}s`,
              animationDuration: `${1.5 + (i % 4) * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-10 text-center relative z-10">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-500 w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Selamat, Nadia!</h1>
        <p className="text-slate-500 mb-8">Anda telah menyelesaikan seluruh tahapan program</p>

        <div className="bg-slate-50 rounded-xl p-6 mb-6">
          <div>
            <span className="text-5xl font-bold text-green-600">91</span>
            <span className="text-xl text-slate-400">/100</span>
          </div>
          <span className="inline-block bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-medium mt-3">
            Kompeten Unggul ★
          </span>
          <p className="text-sm text-slate-500 mt-2">ACE Program Batch 3 · BRI Life</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: FileText, t: "Lihat Profil", s: "Pengembangan" },
            { icon: Award, t: "Unduh", s: "Sertifikat" },
            { icon: Home, t: "Kembali", s: "Dashboard" },
          ].map(({ icon: Icon, t, s }) => (
            <div key={t} className="border border-slate-200 rounded-lg p-4 text-center hover:border-blue-300 transition-colors cursor-pointer">
              <Icon className="w-5 h-5 text-blue-600 mx-auto mb-2" />
              <div className="text-xs font-medium text-slate-700">{t}</div>
              <div className="text-xs text-slate-400">{s}</div>
            </div>
          ))}
        </div>

        <button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all active:scale-95">
          Unduh Individual Profile →
        </button>
        <Link to="/dashboard" className="block text-blue-600 text-sm mt-3 hover:underline">
          Kembali ke Dashboard
        </Link>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mt-6 text-left">
          <p className="text-sm italic text-blue-900">
            "Fasilitator tidak lagi membuat laporan. AI mengolah data dan menghasilkan insight pengembangan."
          </p>
          <p className="text-xs text-blue-400 mt-2">— SCORE System, Primera Karya Sinergia</p>
        </div>
      </div>
    </div>
  );
}
