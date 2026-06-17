import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ClientShell } from "@/components/ClientShell";
import { useClient } from "@/lib/client-store";
import { MANAGER_DIRECT_REPORT_IDS, MANAGER_FEEDBACK_ITEMS, PARTICIPANTS } from "@/lib/client-data";
import { ClipboardList, Info, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/client/manager")({
  component: () => <ClientShell><ManagerView /></ClientShell>,
});

function ManagerView() {
  const { client, hydrated } = useClient();
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState(MANAGER_FEEDBACK_ITEMS);
  const [openFor, setOpenFor] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated && client && client.role !== "manager") {
      navigate({ to: "/client/dashboard" });
    }
  }, [hydrated, client, navigate]);

  if (!client || client.role !== "manager") return null;

  const reports = PARTICIPANTS.filter((p) => MANAGER_DIRECT_REPORT_IDS.includes(p.id));
  const colors = ["bg-blue-500", "bg-violet-500", "bg-emerald-500", "bg-amber-500"];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-slate-900">Direct Reports Saya</h1>
      <p className="text-slate-500 text-sm mb-6">Manager Regional Jakarta · {reports.length} PBS dalam program ACE Batch 3</p>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 flex gap-3">
        <Info className="text-blue-500 w-5 h-5 flex-shrink-0" />
        <span className="text-blue-800 text-sm">Anda melihat data {reports.length} PBS dari Jakarta Region yang berada di bawah supervisi Anda. Data peserta dari region lain tidak ditampilkan.</span>
      </div>

      <div className="flex flex-col gap-4">
        {reports.map((p, i) => {
          const fb = feedbacks.find((f) => f.participant_id === p.id);
          const cat = p.category === "kompeten_unggul" ? { l: "★ Kompeten Unggul", c: "bg-green-100 text-green-700" } :
                      p.category === "kompeten" ? { l: "✓ Kompeten", c: "bg-blue-100 text-blue-700" } :
                      { l: "△ Perlu Dev.", c: "bg-amber-100 text-amber-700" };
          const sc = p.score >= 85 ? "text-green-600" : p.score >= 65 ? "text-blue-600" : "text-amber-600";
          return (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex hover:shadow-md transition-shadow">
              <div className="w-48 flex-shrink-0 border-r border-slate-100 p-5">
                <div className={`w-12 h-12 ${colors[i]} text-white font-bold rounded-2xl flex items-center justify-center mb-3`}>
                  {p.full_name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <div className="font-bold text-slate-900 text-sm">{p.full_name}</div>
                <div className={`text-2xl font-bold mt-2 ${sc}`}>{p.score}</div>
                <span className={`${cat.c} rounded-full px-2.5 py-0.5 text-[11px] font-medium mt-2 inline-block`}>{cat.l}</span>
              </div>
              <div className="flex-1 p-5 border-r border-slate-100">
                <div className="text-xs text-slate-500 font-semibold uppercase mb-3">Kekuatan & Pengembangan</div>
                <div className="mb-3">
                  <span className="bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-[11px]">💪 Kekuatan</span>
                  <p className="text-slate-700 text-sm mt-1">{p.strength}</p>
                </div>
                <div>
                  <span className="bg-amber-100 text-amber-700 rounded-full px-2 py-0.5 text-[11px]">📈 Dev Area</span>
                  <p className="text-slate-600 text-sm mt-1">{p.dev_area}</p>
                </div>
              </div>
              <div className="w-72 flex-shrink-0 p-5">
                <div className="text-xs text-slate-500 font-semibold uppercase mb-3">Manager Feedback</div>
                {fb?.feedback_given ? (
                  <>
                    <div className="flex gap-1 mb-2 text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`w-4 h-4 ${(fb.rating ?? 0) >= s ? "fill-current" : "text-slate-200"}`} />
                      ))}
                    </div>
                    <div className="text-xs text-slate-500">Learning Application:</div>
                    <div className="text-slate-700 text-sm">{fb.learning_application}</div>
                    <div className="text-xs text-slate-500 mt-2">Performance:</div>
                    <div className="text-slate-700 text-sm">{fb.performance_improvement}</div>
                    <div className="text-xs text-slate-400 mt-2">Feedback: {fb.feedback_date}</div>
                  </>
                ) : (
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center">
                    <ClipboardList className="text-slate-300 w-8 h-8 mx-auto mb-2" />
                    <div className="text-slate-400 text-sm mb-2">Belum ada feedback</div>
                    <button onClick={() => setOpenFor(p.id)} className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-700">Isi Feedback</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {openFor && (
        <FeedbackModal
          participant={reports.find((p) => p.id === openFor)!}
          onClose={() => setOpenFor(null)}
          onSubmit={(data) => {
            setFeedbacks((prev) => prev.map((f) => f.participant_id === openFor ? { ...f, ...data, feedback_given: true, feedback_date: new Date().toLocaleDateString("id-ID") } : f));
            toast.success("Feedback berhasil disimpan!");
            setOpenFor(null);
          }}
        />
      )}
    </div>
  );
}

function FeedbackModal({ participant, onClose, onSubmit }: { participant: typeof PARTICIPANTS[number]; onClose: () => void; onSubmit: (d: { learning_application: string; behavior_change: string; performance_improvement: string; rating: number }) => void }) {
  const [la, setLa] = useState("");
  const [bc, setBc] = useState("");
  const [pi, setPi] = useState("");
  const [rating, setRating] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-7 max-h-[90vh] overflow-y-auto">
        <h3 className="font-bold text-xl text-slate-900">Isi Manager Feedback</h3>
        <div className="flex items-center gap-2 mt-2 mb-5">
          <div className="w-8 h-8 bg-blue-500 text-white font-bold rounded-full flex items-center justify-center text-xs">
            {participant.full_name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
          </div>
          <span className="text-sm font-medium text-slate-700">{participant.full_name}</span>
        </div>

        <label className="text-sm font-medium text-slate-700">Learning Application</label>
        <textarea rows={3} value={la} onChange={(e) => setLa(e.target.value)} placeholder="Bagaimana PBS menerapkan pembelajaran ACE dalam pekerjaan sehari-hari?" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm mt-1 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <label className="text-sm font-medium text-slate-700">Perubahan Perilaku</label>
        <textarea rows={2} value={bc} onChange={(e) => setBc(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm mt-1 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <label className="text-sm font-medium text-slate-700">Peningkatan Performa</label>
        <textarea rows={2} value={pi} onChange={(e) => setPi(e.target.value)} placeholder="Contoh hasil konkret yang terukur (nasabah baru, closing rate, dll)" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm mt-1 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <label className="text-sm font-medium text-slate-700">Rating Keseluruhan</label>
        <div className="flex gap-1 mt-2 mb-5">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} onClick={() => setRating(s)}>
              <Star className={`w-10 h-10 ${rating >= s ? "text-amber-400 fill-current" : "text-slate-200"}`} />
            </button>
          ))}
        </div>

        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="border border-slate-200 text-slate-700 rounded-xl px-4 py-2 text-sm hover:bg-slate-50">Batal</button>
          <button onClick={() => onSubmit({ learning_application: la, behavior_change: bc, performance_improvement: pi, rating })} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-sm">Simpan Feedback</button>
        </div>
      </div>
    </div>
  );
}
