import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Eye, MessageSquare, FileText } from "lucide-react";
import { InternalShell, Breadcrumbs } from "@/components/InternalShell";
import { ALL_PARTICIPANTS, CATEGORY_BADGE } from "@/lib/internal-data";
import { Avatar } from "@/components/Avatar";

export const Route = createFileRoute("/internal/programs/ace-batch-3/participants/")({
  component: ParticipantsPage,
});

function ScoreCell({ score }: { score: number }) {
  const cls = score >= 85 ? "text-green-600" : score >= 65 ? "text-blue-600" : "text-red-500";
  return <span className={`text-sm font-bold ${cls}`}>{score}</span>;
}

function StepsDots({ done }: { done: number }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`w-3 h-3 rounded-full mx-0.5 ${i <= done ? "bg-green-400" : "bg-slate-200"}`}
        />
      ))}
    </div>
  );
}

function ParticipantsPage() {
  const [q, setQ] = useState("");
  const list = ALL_PARTICIPANTS.filter((p) => p.full_name.toLowerCase().includes(q.toLowerCase()));

  return (
    <InternalShell headerTitle="Peserta">
      <Breadcrumbs items={[
        { label: "Dashboard", to: "/internal/dashboard" },
        { label: "ACE Batch 3", to: "/internal/programs/ace-batch-3/participants" },
        { label: "Peserta" },
      ]} />

      <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex flex-wrap gap-3 items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari nama peserta..."
          className="flex-1 min-w-[200px] bg-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-600">
          <option>Semua Status</option>
          <option>Kompeten Unggul</option>
          <option>Kompeten</option>
          <option>Perlu Dev.</option>
        </select>
        <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-600">
          <option>Semua Region</option>
          <option>Jakarta 1</option>
          <option>Jakarta 2</option>
          <option>Jakarta 3</option>
        </select>
        <button className="border border-slate-300 text-slate-600 rounded-lg px-3 py-2 text-sm hover:bg-slate-50 flex items-center gap-1.5">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-left">
                <th className="px-4 py-3 w-10 text-center">#</th>
                <th className="px-4 py-3">Nama & Penempatan</th>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3">MBTI</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Status Akreditasi</th>
                <th className="px-4 py-3">Steps</th>
                <th className="px-4 py-3 text-center">Coaching</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => {
                const cat = CATEGORY_BADGE[p.category];
                return (
                  <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="text-slate-400 text-sm text-center px-4 py-3">{p.no}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar seed={`p-${p.id}`} initials={p.initials} colorClass={p.color} size={36} textClass="text-white text-sm font-medium" />
                        <div>
                          <div className="font-medium text-slate-900 text-sm">{p.full_name}</div>
                          <div className="text-xs text-slate-400">{p.placement}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-slate-600 px-4 py-3">{p.region}</td>
                    <td className="px-4 py-3">
                      <span className="bg-slate-100 text-slate-700 rounded-full px-2 py-0.5 text-xs font-mono">{p.mbti}</span>
                    </td>
                    <td className="px-4 py-3"><ScoreCell score={p.final_score} /></td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${cat.cls}`}>{cat.label}</span>
                    </td>
                    <td className="px-4 py-3"><StepsDots done={p.steps_done} /></td>
                    <td className="px-4 py-3 text-center text-sm">
                      {p.coaching > 0 ? p.coaching : <span className="text-slate-300">-</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Link to="/internal/programs/ace-batch-3/participants/$id" params={{ id: p.id }} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link to="/internal/programs/ace-batch-3/coaching" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500">
                          <MessageSquare className="w-4 h-4" />
                        </Link>
                        <Link to="/internal/programs/ace-batch-3/reports" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500">
                          <FileText className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 text-xs text-slate-500">Menampilkan {list.length} dari {ALL_PARTICIPANTS.length} peserta</div>
      </div>
    </InternalShell>
  );
}
