import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import { InternalShell, Breadcrumbs } from "@/components/InternalShell";
import { ALL_PARTICIPANTS, CATEGORY_BADGE } from "@/lib/internal-data";
import { PRE_ASSESSMENT_DATA } from "@/lib/mock-data";

export const Route = createFileRoute("/internal/programs/ace-batch-3/participants/$id")({
  component: ParticipantDetail,
  notFoundComponent: () => (
    <InternalShell><div className="p-8 text-center text-slate-500">Peserta tidak ditemukan.</div></InternalShell>
  ),
});

const TABS = ["Pre-Assessment", "Materi", "Assessment", "Evaluasi", "Action Plan", "Laporan"] as const;
type Tab = (typeof TABS)[number];

const SCORE_ROWS = [
  { name: "Professional Grooming", weight: "15%", score: "4.8/5", weighted: "14.4", note: "Sangat rapi dan profesional", main: true },
  { name: "Penampilan korporat", weight: "10%", score: "5", weighted: "10.0", note: "", main: false },
  { name: "Hygiene & kesegaran", weight: "5%", score: "4", weighted: "4.0", note: "", main: false },
  { name: "Workplace Professionalism", weight: "15%", score: "5/5", weighted: "15.0", note: "", main: true },
  { name: "ACE Process — MEET", weight: "30%", score: "4/5", weighted: "24.0", note: "Terstruktur, probing perlu lebih dalam", main: true },
  { name: "ACE Process — PRESENT", weight: "30%", score: "5/5", weighted: "30.0", note: "Excellent storytelling", main: true },
  { name: "ACE Process — ASK", weight: "10%", score: "4.6/5", weighted: "7.6", note: "", main: true },
];

const ACTION_PLAN = [
  { n: 1, text: "Implementasi framework ACE end-to-end dengan 3 nasabah baru per minggu", status: "in_progress", commitment: "Tinggi" },
  { n: 2, text: "Latihan probing CEO secara mandiri 3x seminggu", status: "completed", commitment: "Tinggi" },
  { n: 3, text: "Buat 3 cerita nasabah untuk 3 tipe Wealth Pillars", status: "not_started", commitment: "Sedang" },
];

const STATUS_STYLE: Record<string, string> = {
  in_progress: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  not_started: "bg-slate-100 text-slate-500",
};
const COMMIT_STYLE: Record<string, string> = {
  Tinggi: "bg-green-100 text-green-700",
  Sedang: "bg-amber-100 text-amber-700",
};

function ParticipantDetail() {
  const { id } = Route.useParams();
  const p = ALL_PARTICIPANTS.find((x) => x.id === id);
  if (!p) throw notFound();
  const cat = CATEGORY_BADGE[p.category];
  const [tab, setTab] = useState<Tab>("Assessment");

  return (
    <InternalShell headerTitle={p.full_name}>
      <Breadcrumbs items={[
        { label: "Dashboard", to: "/internal/dashboard" },
        { label: "ACE Batch 3", to: "/internal/programs/ace-batch-3/participants" },
        { label: "Peserta", to: "/internal/programs/ace-batch-3/participants" },
        { label: p.full_name },
      ]} />

      <div className="bg-white rounded-xl shadow-sm p-6 mb-5">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 ${p.color} text-white text-xl font-bold rounded-full flex items-center justify-center`}>
            {p.initials}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-900">{p.full_name}</h1>
            <p className="text-sm text-slate-500 mt-1">{p.placement} · {p.region}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {[p.mbti, "Eksternal", "PBS", "4 Thn Pengalaman"].map((t) => (
                <span key={t} className="bg-slate-100 text-slate-700 rounded-full px-2.5 py-1 text-xs">{t}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => toast.success("Profil AI berhasil di-generate")}
              className="bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-4 py-2 text-sm flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Generate Profil AI
            </button>
            <button className="border border-slate-300 text-slate-600 rounded-lg px-3 py-2 text-sm hover:bg-slate-50">
              Export PDF
            </button>
          </div>
        </div>

        <div className="mt-4 bg-slate-50 rounded-xl p-4 flex flex-wrap items-center gap-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-green-600">{p.final_score}</span>
            <span className="text-xl text-slate-400">/100</span>
            <span className="text-xs text-slate-500 ml-2">Score Akhir</span>
          </div>
          <div className="w-px h-10 bg-slate-200" />
          <div>
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${cat.cls}`}>{cat.label}</span>
            <div className="text-xs text-slate-500 mt-1">Role Model Batch 3</div>
          </div>
          <div className="w-px h-10 bg-slate-200" />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => {
              const done = i <= p.steps_done;
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${done ? "bg-green-500" : "bg-slate-200"}`}>
                    {done ? <Check className="w-3 h-3 text-white" /> : <span className="text-slate-400 text-[10px]">{i}</span>}
                  </div>
                  <span className="text-[10px] text-slate-400">{["Pre", "Mat", "Ass", "Eva", "Act"][i - 1]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm cursor-pointer whitespace-nowrap ${
                tab === t ? "border-b-2 border-blue-600 text-blue-600 font-medium" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="p-6">
          {tab === "Assessment" && (
            <>
              <div className="flex flex-wrap justify-between items-center mb-5 gap-2">
                <div className="text-xl font-bold text-green-600">Score Akhir: {p.final_score} / 100</div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${cat.cls}`}>{cat.label}</span>
                <span className="text-slate-500 text-sm">Dinilai: 8 Agustus 2025</span>
              </div>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b">
                    <tr className="text-xs font-semibold text-slate-500 uppercase text-left">
                      <th className="px-4 py-3">Komponen</th>
                      <th className="px-4 py-3">Bobot</th>
                      <th className="px-4 py-3">Score</th>
                      <th className="px-4 py-3">Weighted</th>
                      <th className="px-4 py-3">Catatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SCORE_ROWS.map((r, i) => (
                      <tr key={i} className={`border-b ${r.main ? "bg-white font-semibold text-slate-800" : "bg-slate-50/40 text-slate-600 text-xs"}`}>
                        <td className={`px-4 ${r.main ? "py-3" : "py-2.5 pl-8"}`}>{r.name}</td>
                        <td className="px-4">{r.weight}</td>
                        <td className="px-4">{r.score}</td>
                        <td className="px-4">{r.weighted}</td>
                        <td className="px-4">{r.note}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-900 text-white font-bold">
                      <td className="px-4 py-3">TOTAL</td>
                      <td className="px-4">100%</td>
                      <td className="px-4">—</td>
                      <td className="px-4">{p.final_score}</td>
                      <td className="px-4"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="flex items-center">
                  <span className="bg-blue-200 text-blue-800 rounded-full px-2.5 py-1 text-sm font-bold font-mono">{p.mbti}</span>
                  <span className="font-semibold ml-2">{p.mbti} — The Executive</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <div className="text-xs text-slate-500 font-semibold">Kekuatan:</div>
                    <div className="text-sm text-slate-700 mt-1">{p.strength}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold">Area Pengembangan:</div>
                    <div className="text-sm text-slate-700 mt-1">{p.dev_area}</div>
                  </div>
                </div>
                <div className="text-blue-700 font-medium text-sm mt-3">Fokus: {p.focus}</div>
              </div>

              <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl p-4">
                <div className="text-xs text-amber-600 font-semibold mb-2">📝 Catatan Observasi Fasilitator</div>
                <div className="italic text-amber-900 text-sm">{p.observation_notes}</div>
              </div>
            </>
          )}

          {tab === "Pre-Assessment" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { l: "Tantangan Bisnis", v: PRE_ASSESSMENT_DATA.business_challenge },
                { l: "Kebutuhan Belajar", v: PRE_ASSESSMENT_DATA.learning_needs },
                { l: "Kekuatan Dimiliki", v: PRE_ASSESSMENT_DATA.existing_strengths },
                { l: "Area Pengembangan", v: PRE_ASSESSMENT_DATA.development_areas },
              ].map((c) => (
                <div key={c.l} className="bg-slate-50 rounded-lg p-4">
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">{c.l}</div>
                  <div className="text-sm text-slate-700 leading-relaxed">{c.v}</div>
                </div>
              ))}
            </div>
          )}

          {tab === "Materi" && (
            <div className="text-sm text-slate-500">14 topik materi telah dikonfirmasi peserta.</div>
          )}

          {tab === "Evaluasi" && (
            <div className="text-sm text-slate-500">Rating program: ★ 4.95/5 — sangat memuaskan.</div>
          )}

          {tab === "Action Plan" && (
            <div className="space-y-3">
              {ACTION_PLAN.map((a) => (
                <div key={a.n} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4">
                  <div className="text-3xl font-bold text-slate-200">{a.n}</div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900 mb-2">{a.text}</div>
                    <div className="text-xs text-slate-500 mb-2">📅 6 Sep 2025 · 🎯 3 nasabah ter-onboard</div>
                    <div className="flex gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[a.status]}`}>{a.status.replace("_", " ")}</span>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${COMMIT_STYLE[a.commitment]}`}>{a.commitment}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "Laporan" && (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white border rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium text-sm text-slate-900">Individual Profile — {p.full_name}</div>
                    <div className="text-xs text-slate-400">Generated 12 Jun 2025 · 2 hal.</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="border text-slate-600 rounded-lg px-3 py-1.5 text-xs hover:bg-slate-50">Preview</button>
                    <button className="border text-slate-600 rounded-lg px-3 py-1.5 text-xs hover:bg-slate-50">Export PDF</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </InternalShell>
  );
}
