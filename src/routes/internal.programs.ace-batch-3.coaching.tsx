import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { InternalShell, Breadcrumbs } from "@/components/InternalShell";
import { COACHING_SESSIONS, ALL_PARTICIPANTS } from "@/lib/internal-data";
import { Avatar } from "@/components/Avatar";

export const Route = createFileRoute("/internal/programs/ace-batch-3/coaching")({
  component: CoachingPage,
});

const FILTERS = [
  { id: "all", label: "Semua Sesi (3)" },
  { id: "on_track", label: "On Track (1)" },
  { id: "completed", label: "Selesai (1)" },
  { id: "at_risk", label: "At Risk (0)" },
];

const STATUS: Record<string, { label: string; cls: string; accent: string }> = {
  on_track: { label: "● On Track", cls: "bg-blue-100 text-blue-700", accent: "bg-blue-500" },
  completed: { label: "✓ Selesai", cls: "bg-green-100 text-green-700", accent: "bg-green-500" },
};

const MODAL_STATUS = [
  { id: "on_track", label: "On Track", sel: "bg-blue-500 text-white" },
  { id: "delayed", label: "Delayed", sel: "bg-amber-500 text-white" },
  { id: "completed", label: "Completed", sel: "bg-green-500 text-white" },
  { id: "at_risk", label: "At Risk", sel: "bg-red-500 text-white" },
];

function CoachingPage() {
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(false);
  const [modalStatus, setModalStatus] = useState("on_track");

  const list = filter === "all" ? COACHING_SESSIONS : COACHING_SESSIONS.filter((c) => c.progress_status === filter);

  const handleSave = () => {
    toast.success("Sesi coaching berhasil disimpan!");
    setModal(false);
  };

  return (
    <InternalShell headerTitle="Coaching">
      <Breadcrumbs items={[
        { label: "Dashboard", to: "/internal/dashboard" },
        { label: "ACE Batch 3", to: "/internal/programs/ace-batch-3/participants" },
        { label: "Coaching" },
      ]} />

      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Manajemen Coaching</h1>
          <p className="text-slate-500 text-sm">ACE Batch 3</p>
        </div>
        <button
          onClick={() => setModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Tambah Sesi
        </button>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              filter === f.id ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {list.map((s) => {
          const st = STATUS[s.progress_status];
          return (
            <div key={s.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex">
              <div className={`w-1 flex-shrink-0 ${st.accent}`} />
              <div className="p-5 flex flex-col md:flex-row gap-5 flex-1">
                <div className="md:w-44 flex-shrink-0 md:border-r border-slate-100 md:pr-5">
                  <div className="flex items-center gap-2">
                    <Avatar seed={`p-${s.participant_id}`} initials={s.initials} colorClass={s.color} size={40} textClass="text-white text-sm font-bold" />
                    <div className="font-semibold text-slate-900 text-sm">{s.participant_name}</div>
                  </div>
                  <div className="text-slate-500 text-xs mt-2">Sesi #{s.session_number}</div>
                  <div className="text-slate-500 text-xs">{s.session_date}</div>
                  <div className="text-slate-400 text-[11px] mt-2">Coach: Coach Handoko</div>
                  <span className={`inline-block mt-3 rounded-full px-2.5 py-1 text-xs ${st.cls}`}>{st.label}</span>
                </div>
                <div className="flex-1">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Topik:</div>
                  <div className="font-medium text-slate-900 text-sm mb-3">{s.topic}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Challenge:</div>
                      <div className="text-slate-600 text-sm">{s.challenge}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Root Cause:</div>
                      <div className="text-slate-600 text-sm">{s.root_cause}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold mb-1">Agreed Action:</div>
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-900 italic">{s.agreed_action}</div>
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold mt-2">Catatan Coach:</div>
                  <div className="text-slate-500 text-sm">{s.coach_notes}</div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                    <div className="text-xs text-slate-400">{s.next_date ? `📅 Next: ${s.next_date}` : ""}</div>
                    <div className="flex gap-2">
                      <button className="border rounded-lg px-3 py-1 text-xs text-slate-600 hover:bg-slate-50">Edit</button>
                      <button className="border rounded-lg px-3 py-1 text-xs text-slate-600 hover:bg-slate-50">Detail</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {list.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center text-slate-500">Tidak ada sesi untuk filter ini.</div>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg mb-4">Sesi Coaching Baru</h3>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-3 sm:col-span-1">
                <label className="text-xs text-slate-500">Peserta</label>
                <select className="border rounded-lg px-2 py-1.5 text-sm w-full mt-1">
                  {ALL_PARTICIPANTS.map((p) => <option key={p.id}>{p.full_name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500">No. Sesi</label>
                <input type="number" defaultValue={1} className="border rounded-lg px-2 py-1.5 text-sm w-full mt-1" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Tanggal Sesi</label>
                <input type="date" className="border rounded-lg px-2 py-1.5 text-sm w-full mt-1" />
              </div>
            </div>

            <label className="text-xs text-slate-500 mt-3 block">Topik Sesi</label>
            <input className="border rounded-lg px-3 py-2 text-sm w-full mt-1" />

            <label className="text-xs text-slate-500 mt-3 block">Challenge</label>
            <textarea rows={2} className="border rounded-lg px-3 py-2 text-sm w-full mt-1" />

            <label className="text-xs text-slate-500 mt-3 block">Root Cause</label>
            <textarea rows={2} className="border rounded-lg px-3 py-2 text-sm w-full mt-1" />

            <label className="text-xs text-slate-500 mt-3 block">Agreed Action</label>
            <textarea rows={3} className="border rounded-lg px-3 py-2 text-sm w-full mt-1" />

            <label className="text-xs text-slate-500 mt-3 block">Status</label>
            <div className="flex gap-2 mt-1 flex-wrap">
              {MODAL_STATUS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setModalStatus(s.id)}
                  className={`rounded-full px-3 py-1 text-sm cursor-pointer ${modalStatus === s.id ? s.sel : "bg-slate-100 text-slate-600"}`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <label className="text-xs text-slate-500 mt-3 block">Catatan Coach</label>
            <textarea rows={2} className="border rounded-lg px-3 py-2 text-sm w-full mt-1" />

            <label className="text-xs text-slate-500 mt-3 block">Tanggal Next Session</label>
            <input type="date" className="border rounded-lg px-3 py-2 text-sm w-full mt-1" />

            <div className="flex justify-end gap-3 mt-5 pt-4 border-t">
              <button onClick={() => setModal(false)} className="border text-slate-600 rounded-lg px-4 py-2 text-sm">Batal</button>
              <button onClick={handleSave} className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm">Simpan Sesi</button>
            </div>
          </div>
        </div>
      )}
    </InternalShell>
  );
}
