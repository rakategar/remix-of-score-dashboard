import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { InternalShell, Breadcrumbs } from "@/components/InternalShell";
import { ALL_PARTICIPANTS } from "@/lib/internal-data";
import { COMPETENCY_FRAMEWORK } from "@/lib/mock-data";

export const Route = createFileRoute("/internal/programs/ace-batch-3/observation")({
  component: ObservationPage,
});

const MBTI = ["ESTJ", "ENTJ", "INFJ", "ESFJ", "ENTP"];

function ObservationPage() {
  const [participantId, setParticipantId] = useState("p1");
  const [mbti, setMbti] = useState("ESTJ");
  const [ratings, setRatings] = useState<Record<string, number>>({
    c1a: 5, c1b: 4, c2a: 5, c2b: 5, c2c: 5, c3a: 4, c3b: 4, c3c: 4, c4a: 5, c4b: 5, c4c: 5, c5a: 5, c5b: 4, c5c: 5,
  });
  const p = ALL_PARTICIPANTS.find((x) => x.id === participantId)!;

  const setRating = (id: string, v: number) => setRatings((r) => ({ ...r, [id]: v }));

  const handleSave = () => toast.success("Observasi berhasil disimpan!");

  const compAvg = (subs: readonly { id: string }[]) => {
    const vals = subs.map((s) => ratings[s.id] ?? 0).filter(Boolean);
    if (!vals.length) return "—";
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  };

  return (
    <InternalShell headerTitle="Observasi Peserta">
      <Breadcrumbs items={[
        { label: "Dashboard", to: "/internal/dashboard" },
        { label: "ACE Batch 3", to: "/internal/programs/ace-batch-3/participants" },
        { label: "Observasi" },
      ]} />

      <div className="mb-5">
        <h1 className="text-xl font-bold text-slate-900">Input Observasi Peserta</h1>
        <p className="text-slate-500 text-sm">ACE Batch 3 · Fasilitator: Oki T. Wikan</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-5 flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-xs text-slate-500 block mb-1">Pilih Peserta</label>
          <select
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm w-56"
          >
            {ALL_PARTICIPANTS.map((p) => <option key={p.id} value={p.id}>{p.full_name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1">Sesi</label>
          <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm">
            <option>Hari 1 — Opening & MEET</option>
            <option>Hari 2 — PRESENT & Simulasi</option>
            <option defaultChecked>Hari 3 — Akreditasi</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1">Tanggal</label>
          <input type="date" defaultValue="2025-08-08" className="border border-slate-300 rounded-lg px-3 py-2 text-sm" />
        </div>
        <button className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm">Muat Data</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pb-20">
        <div className="bg-white rounded-xl shadow-sm p-5 h-fit">
          <h3 className="font-semibold text-slate-900 mb-4">Profil Kepribadian</h3>
          <div className="flex flex-wrap gap-2">
            {MBTI.map((m) => (
              <button
                key={m}
                onClick={() => setMbti(m)}
                className={`rounded-full px-3 py-1 text-xs cursor-pointer ${
                  mbti === m ? "bg-blue-600 text-white font-medium" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <label className="text-xs text-slate-500 block mt-4 mb-1">Kekuatan yang Terlihat</label>
          <textarea rows={3} defaultValue={p.strength} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm w-full focus:ring-2 focus:ring-blue-500" />

          <label className="text-xs text-slate-500 block mt-3 mb-1">Area Pengembangan</label>
          <textarea rows={3} defaultValue={p.dev_area} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm w-full focus:ring-2 focus:ring-blue-500" />

          <div className="border-t border-slate-100 mt-4 mb-4" />

          <label className="text-xs text-slate-500 block mb-1">Catatan Umum</label>
          <textarea rows={4} defaultValue={p.observation_notes} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm w-full focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 lg:col-span-2">
          <div className="flex items-center mb-4">
            <h3 className="font-semibold text-slate-900">Penilaian Kompetensi per Indikator</h3>
            <span className="bg-blue-100 text-blue-700 text-xs rounded-full px-2 py-0.5 ml-auto">Hari 3 — Akreditasi</span>
          </div>

          {COMPETENCY_FRAMEWORK.map((c) => (
            <div key={c.id} className="border border-slate-200 rounded-xl mb-3 overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 flex items-center border-b border-slate-200">
                <span className="font-semibold text-slate-900">{c.name}</span>
                <span className="bg-slate-200 text-slate-600 text-xs rounded-full px-2 py-0.5 ml-2">Bobot: {c.weight}%</span>
                <span className="text-blue-600 font-medium text-sm ml-auto">{compAvg(c.sub)} / 5</span>
                <ChevronDown className="text-slate-400 w-4 h-4 ml-2" />
              </div>
              <div className="px-4 py-4">
                {c.sub.map((s, idx) => (
                  <div key={s.id} className={`${idx < c.sub.length - 1 ? "border-b pb-4 mb-4" : ""}`}>
                    <div className="text-sm font-medium text-slate-800 mb-3">{s.name}</div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((n) => {
                        const sel = ratings[s.id] === n;
                        return (
                          <button
                            key={n}
                            onClick={() => setRating(s.id, n)}
                            className={`w-10 h-10 rounded-lg font-bold text-sm border transition-all ${
                              sel
                                ? "border-blue-500 bg-blue-600 text-white shadow-sm"
                                : "border-slate-200 bg-white text-slate-400 hover:border-blue-300"
                            }`}
                          >
                            {n}
                          </button>
                        );
                      })}
                    </div>
                    <label className="text-xs text-slate-500 mt-2 block">Kekuatan:</label>
                    <input className="bg-slate-50 border rounded-lg px-3 py-1.5 text-sm w-full focus:ring-2 focus:ring-blue-500" />
                    <label className="text-xs text-slate-500 mt-2 block">Dev Area:</label>
                    <input className="bg-slate-50 border rounded-lg px-3 py-1.5 text-sm w-full focus:ring-2 focus:ring-blue-500" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-slate-200 p-4 flex justify-between items-center z-20">
        <div className="text-slate-600 text-sm">Peserta: <strong>{p.full_name}</strong> · Sesi: Hari 3 — Akreditasi</div>
        <div className="flex gap-2">
          <button className="border border-slate-300 text-slate-600 rounded-lg px-4 py-2 text-sm">Simpan Draft</button>
          <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm flex items-center gap-2">
            <Check className="w-4 h-4" /> Simpan Observasi
          </button>
        </div>
      </div>
    </InternalShell>
  );
}
