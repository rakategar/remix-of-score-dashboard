import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Eye, MessageSquare, FileText, ClipboardList, Sparkles } from "lucide-react";
import { InternalShell, Breadcrumbs } from "@/components/InternalShell";

export const Route = createFileRoute("/internal/programs/ace-batch-3/")({
  component: ProgramDetail,
});

function ProgramDetail() {
  return (
    <InternalShell headerTitle="ACE Batch 3">
      <Breadcrumbs items={[
        { label: "Dashboard", to: "/internal/dashboard" },
        { label: "ACE Batch 3" },
      ]} />

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-5">
        <div className="bg-gradient-to-r from-slate-800 to-blue-700 p-6 text-white">
          <h1 className="text-2xl font-bold">Affluent Customer Experience — Batch 3</h1>
          <p className="text-white/80 mt-1">BRI Life · Hotel Harris Sentul · 6–8 Agustus 2025</p>
          <p className="text-white/60 text-sm mt-1">Fasilitator: Oki T. Wikan & Arike Agung Widjaja</p>
        </div>
        <div className="p-6">
          <p className="text-slate-700 leading-relaxed">
            Program strategis untuk mempersiapkan Priority Bancassurance Specialist (PBS) sebagai Trusted Insurance
            Advisor di segmen affluent. Pelatihan intensif 3 hari mencakup workshop interaktif, simulasi end-to-end,
            roleplay, coaching clinic, dan akreditasi resmi.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { to: "/internal/programs/ace-batch-3/participants", icon: Users, t: "Peserta", s: "9 peserta terdaftar", ib: "bg-blue-100", ic: "text-blue-600" },
          { to: "/internal/programs/ace-batch-3/observation", icon: ClipboardList, t: "Observasi", s: "Input penilaian per indikator", ib: "bg-emerald-100", ic: "text-emerald-600" },
          { to: "/internal/programs/ace-batch-3/coaching", icon: MessageSquare, t: "Coaching", s: "3 sesi aktif", ib: "bg-rose-100", ic: "text-rose-600" },
          { to: "/internal/programs/ace-batch-3/strategic-notes", icon: FileText, t: "Catatan Strategis", s: "Input untuk AI report", ib: "bg-amber-100", ic: "text-amber-600" },
          { to: "/internal/programs/ace-batch-3/reports", icon: Sparkles, t: "Laporan", s: "Generate dengan AI", ib: "bg-violet-100", ic: "text-violet-600" },
          { to: "/internal/programs/ace-batch-3/participants", icon: Eye, t: "Detail Penuh", s: "Lihat semua data peserta", ib: "bg-slate-100", ic: "text-slate-600" },
        ].map((c) => (
          <Link key={c.t} to={c.to} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow border border-transparent hover:border-blue-200">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${c.ib} mb-3`}>
              <c.icon className={`w-5 h-5 ${c.ic}`} />
            </div>
            <div className="font-semibold text-slate-900">{c.t}</div>
            <div className="text-xs text-slate-500 mt-1">{c.s}</div>
          </Link>
        ))}
      </div>
    </InternalShell>
  );
}
