import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, FileText, FileSearch } from "lucide-react";
import { toast } from "sonner";
import { InternalShell, Breadcrumbs } from "@/components/InternalShell";
import { SAVED_REPORTS } from "@/lib/internal-data";

export const Route = createFileRoute("/internal/programs/ace-batch-3/reports")({
  component: ReportsPage,
});

const REPORT_TYPES = [
  { id: "training_impact", label: "Training Impact Report", desc: "Laporan lengkap untuk klien. 10–15 halaman." },
  { id: "individual_profile", label: "Individual Dev. Profile", desc: "Profil individual per peserta. 1–2 halaman." },
  { id: "executive_summary", label: "Executive Summary", desc: "Ringkasan 1 halaman untuk sponsor." },
];

const SECTIONS = [
  "Executive Summary", "Program Overview", "Profil Peserta", "Learning Outcomes & Key Insights",
  "Hasil Evaluasi Training", "Hasil Akreditasi", "Individual Highlights", "Organizational Insights",
  "Rekomendasi & Next Steps",
];

type PreviewState = "empty" | "loading" | "done";

function ReportsPage() {
  const [type, setType] = useState("training_impact");
  const [preview, setPreview] = useState<PreviewState>("empty");

  const handleGenerate = () => {
    setPreview("loading");
    toast.info("AI sedang menyusun laporan...");
    setTimeout(() => {
      setPreview("done");
      toast.success("Laporan berhasil di-generate!");
    }, 2500);
  };

  return (
    <InternalShell headerTitle="Report Builder">
      <Breadcrumbs items={[
        { label: "Dashboard", to: "/internal/dashboard" },
        { label: "ACE Batch 3", to: "/internal/programs/ace-batch-3/participants" },
        { label: "Laporan" },
      ]} />

      <div className="flex justify-between items-center mb-5 flex-wrap gap-2">
        <h1 className="text-xl font-bold text-slate-900">Report Builder</h1>
        <p className="text-slate-500 text-sm">Generate laporan otomatis menggunakan Claude Haiku</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 flex flex-col">
          <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
            <h3 className="font-semibold text-slate-900 mb-3">Jenis Laporan</h3>
            {REPORT_TYPES.map((t) => {
              const sel = type === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setType(t.id)}
                  className={`block w-full text-left border rounded-xl p-3 cursor-pointer transition-all mb-2 ${
                    sel ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full border-2 ${sel ? "border-blue-600 bg-blue-600" : "border-slate-300"}`} />
                    <span className="font-medium text-sm text-slate-900">{t.label}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 ml-5">{t.desc}</div>
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
            <h3 className="font-semibold text-slate-900 mb-3">Section yang Disertakan</h3>
            {SECTIONS.map((s) => (
              <label key={s} className="flex items-center gap-2 py-1.5 border-b border-slate-50 last:border-0 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-blue-600" />
                <span className="text-sm text-slate-700">{s}</span>
              </label>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
            <h3 className="font-semibold text-slate-900 mb-3">Filter Data</h3>
            {[
              ["Batch", "Batch 3"],
              ["Tanggal", "6–8 Agustus 2025"],
              ["Peserta", "Semua (9 orang)"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm py-2 border-b last:border-0">
                <span className="text-slate-500">{k}</span>
                <span className="text-slate-800 font-medium">{v}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            disabled={preview === "loading"}
            className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-xl h-12 w-full font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4" /> Generate dengan AI
          </button>
          <div className="text-slate-400 text-xs text-center mt-2">claude-haiku-4-5-20251001 · ~15–30 detik</div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-semibold text-slate-900 mb-3">Laporan Tersimpan</h3>
          <div className="mb-5">
            {SAVED_REPORTS.map((r) => (
              <div key={r.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="bg-violet-100 rounded-lg p-2 mr-3">
                    <FileText className="text-violet-600 w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{r.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{r.date} · {r.pages} hal.</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="border text-slate-600 rounded-lg px-3 py-1.5 text-xs hover:bg-slate-50">Preview</button>
                  <button className="border text-slate-600 rounded-lg px-3 py-1.5 text-xs hover:bg-slate-50">Export</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {preview === "empty" && (
              <div className="flex flex-col items-center justify-center h-80 text-center">
                <FileSearch className="text-slate-200 w-16 h-16 mb-4" />
                <div className="text-slate-400 text-sm">Pilih laporan atau generate baru</div>
              </div>
            )}

            {preview === "loading" && (
              <div className="bg-violet-50 border border-violet-100 m-4 rounded-xl p-10 text-center">
                <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full mx-auto animate-spin" />
                <div className="text-violet-700 font-semibold mt-5">AI sedang menyusun laporan...</div>
                <div className="text-violet-400 text-xs mt-2">Menganalisis data 9 peserta · Menulis Executive Summary · Menyusun Insight</div>
                <div className="text-slate-400 text-xs mt-3">claude-haiku-4-5-20251001 · Primera Karya Sinergia</div>
              </div>
            )}

            {preview === "done" && (
              <div className="border border-slate-200 m-4 rounded-xl overflow-hidden">
                <div className="bg-slate-900 text-white p-6 relative">
                  <span className="text-slate-400 text-xs absolute right-6 top-6">prmr•</span>
                  <div className="text-slate-400 text-[10px] tracking-widest uppercase text-center">LAPORAN TRAINING</div>
                  <div className="text-white text-xl font-bold text-center mt-1">ACE Batch 3 — BRI Life</div>
                  <div className="text-slate-400 text-sm text-center mt-1">Affluent Customer Experience Program · 6–8 Agustus 2025</div>
                </div>
                <div className="p-6 text-slate-700 text-sm leading-7 max-h-80 overflow-y-auto">
                  <p><strong>I. Executive Summary</strong></p>
                  <p>Training ACE Batch 3 telah berhasil dilaksanakan selama 3 hari intensif (6–8 Agustus 2025) di Hotel Harris Sentul dengan 9 peserta New Priority Bancassurance Specialist (PBS). Hasil akreditasi: 2 peserta Kompeten Unggul (Nadia: 91, Sahadatu: 88.5), 5 peserta Kompeten, dan 2 peserta Perlu Pengembangan. Rata-rata score: 77.6/100. Kepuasan peserta 93% dengan rata-rata 4.95/5.00.</p>
                  <p className="mt-3"><strong>II. Organizational Insight</strong></p>
                  <p>Tim PBS Batch 3 didominasi tipe kepribadian ESTJ dan ENTJ — kuat dalam eksekusi namun membutuhkan pengembangan dalam fleksibilitas dan empati. Common development area: Product Storyselling dan kemampuan probing emosional dalam sesi MEET.</p>
                  <p className="mt-3"><strong>III. Rekomendasi</strong></p>
                  <ol className="list-decimal pl-5 mt-1 space-y-1">
                    <li>Performance Coaching individual 1 bulan — fokus implementasi ACE di lapangan</li>
                    <li>Peer mentoring: Nadia dan Sahadatu sebagai Role Model mendampingi Juni dan Monika</li>
                    <li>Advanced Module: Wealth Advisory Deep Dive dalam 60 hari</li>
                  </ol>
                  <p className="mt-4 text-xs text-slate-400">[Laporan dihasilkan oleh SCORE AI · claude-haiku-4-5-20251001 · Primera Karya Sinergia]</p>
                </div>
                <div className="bg-slate-50 border-t p-4 flex justify-between items-center">
                  <div className="text-xs text-slate-400">Generated: 16 Jun 2025 · AI: Claude Haiku</div>
                  <div className="flex gap-2">
                    <button className="border rounded-lg px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50">Download PDF</button>
                    <button className="border rounded-lg px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50">Share Link</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </InternalShell>
  );
}
