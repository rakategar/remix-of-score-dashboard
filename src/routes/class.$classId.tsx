import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Building2, MapPin, Calendar, Clock, CheckCircle } from "lucide-react";
import { AppShell } from "@/components/Sidebar";
import { ACTIVE_CLASS } from "@/lib/mock-data";

export const Route = createFileRoute("/class/$classId")({
  head: () => ({ meta: [{ title: "ACE Batch 3 · SCORE" }] }),
  component: ClassDetail,
});

const TABS = ["Informasi", "Materi", "Progress", "Sertifikat"] as const;

function ClassDetail() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Informasi");
  const c = ACTIVE_CLASS;

  return (
    <AppShell>
      <Link to="/dashboard" className="text-blue-600 text-sm flex items-center gap-1 mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
      </Link>

      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-800 to-blue-700 rounded-2xl p-8 text-white mb-6 flex items-center">
        <div className="flex-1">
          <span className="inline-block bg-white/20 rounded-full px-3 py-1 text-xs mb-3">{c.batch}</span>
          <h1 className="text-2xl font-bold mb-1">{c.title}</h1>
          <p className="text-white/70 mb-5">{c.subtitle}</p>
          <div className="grid grid-cols-2 gap-3 text-sm text-white/80 max-w-md">
            <span className="flex items-center gap-2"><Building2 className="w-4 h-4" /> {c.client}</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {c.location}</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {c.date}</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 3 Hari Intensif</span>
          </div>
        </div>
        <div className="ml-auto w-24 h-24 rounded-full bg-white/10 border-2 border-white/30 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">91</span>
          <span className="text-white/60 text-xs">Score</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm cursor-pointer ${
              tab === t ? "border-b-2 border-blue-600 text-blue-600 font-medium" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Informasi" && <InfoTab />}
      {tab !== "Informasi" && (
        <div className="bg-white rounded-xl p-12 text-center text-slate-400 shadow-sm">
          Tab {tab} — Lihat di halaman Progress / Sertifikat untuk detail lengkap.
        </div>
      )}

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-[220px] right-0 bg-white border-t shadow-lg p-4 flex justify-between items-center z-20">
        <div className="text-slate-600 text-sm">Step 3: Competency Assessment</div>
        <Link
          to="/class/$classId/session"
          params={{ classId: c.id }}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-all active:scale-95"
        >
          Lanjutkan Sesi →
        </Link>
      </div>
      <div className="h-20" />
    </AppShell>
  );
}

function InfoTab() {
  const c = ACTIVE_CLASS;
  return (
    <div className="flex gap-6 flex-col lg:flex-row">
      <div className="flex-1 space-y-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-3 text-slate-900">Deskripsi Program</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{c.description}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-3 text-slate-900">Tujuan Pembelajaran</h3>
          <ul className="space-y-3">
            {c.objectives.map((o, i) => (
              <li key={i} className="flex gap-3">
                <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full lg:w-72 space-y-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4 text-slate-900">Fasilitator</h3>
          {c.facilitators.map((f) => (
            <div key={f} className="flex items-center gap-3 mb-3 last:mb-0">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-medium text-sm flex items-center justify-center">
                {f.split(" ").map((s) => s[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div className="font-medium text-sm">{f}</div>
                <div className="text-xs text-slate-500">Fasilitator Senior</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4 text-slate-900">Informasi Kelas</h3>
          {[
            ["Penyelenggara", c.organizer],
            ["Klien", c.client],
            ["Peserta", `${c.enrolled}/${c.max_participants}`],
            ["Lokasi", c.location],
            ["Tanggal", c.date],
            ["Durasi", c.duration],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm py-2 border-b border-slate-50 last:border-0">
              <span className="text-slate-500">{k}</span>
              <span className="text-slate-900 font-medium text-right">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
