import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FolderOpen, Users, ClipboardCheck, FileText, Eye, ClipboardList,
  Sparkles, MessageSquare, Settings,
} from "lucide-react";
import { InternalShell } from "@/components/InternalShell";
import { useStaff } from "@/lib/internal-store";

export const Route = createFileRoute("/internal/dashboard")({
  component: InternalDashboard,
});

const STEPS = [
  { label: "Pre-Assessment", value: "9/9", pct: 100, color: "bg-green-500", text: "text-green-600" },
  { label: "Materi", value: "9/9", pct: 100, color: "bg-green-500", text: "text-green-600" },
  { label: "Assessment", value: "7/9", pct: 78, color: "bg-blue-500", text: "text-blue-600" },
  { label: "Evaluasi", value: "5/9", pct: 56, color: "bg-amber-500", text: "text-amber-600" },
  { label: "Action Plan", value: "2/9", pct: 22, color: "bg-red-400", text: "text-red-500" },
];

const DIST = [
  { label: "Kompeten Unggul", pct: 22, count: 2, bar: "bg-green-500", badge: "bg-green-100 text-green-700" },
  { label: "Kompeten", pct: 56, count: 5, bar: "bg-blue-500", badge: "bg-blue-100 text-blue-700" },
  { label: "Perlu Dev.", pct: 22, count: 2, bar: "bg-red-400", badge: "bg-red-100 text-red-600" },
];

function StatCard({ icon: Icon, value, label, iconBg, iconColor, valueClass = "" }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
      <div className={`${iconBg} rounded-lg p-2.5`}>
        <Icon className={`${iconColor} w-5 h-5`} />
      </div>
      <div>
        <div className={`text-2xl font-bold ${valueClass || "text-slate-900"}`}>{value}</div>
        <div className="text-xs text-slate-500">{label}</div>
      </div>
    </div>
  );
}

function InternalDashboard() {
  const { staff } = useStaff();
  const name = staff?.full_name.split(" ")[0] ?? "Oki";
  return (
    <InternalShell headerTitle="Dashboard">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Selamat pagi, {name}!</h1>
        <p className="text-sm text-slate-500">Senin, 16 Juni 2025 · ACE Batch 3 — BRI Life sedang aktif</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={FolderOpen} value="1" label="Total Kelas Aktif" iconBg="bg-blue-100" iconColor="text-blue-600" />
        <StatCard icon={Users} value="9" label="Peserta Terdaftar" iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <StatCard icon={ClipboardCheck} value="7/9" label="Selesai Assessment" iconBg="bg-amber-100" iconColor="text-amber-600" valueClass="text-amber-600" />
        <StatCard icon={FileText} value="3" label="Laporan Tersimpan" iconBg="bg-violet-100" iconColor="text-violet-600" />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-slate-900">Program Aktif</h2>
        <button className="border border-blue-500 text-blue-600 rounded-lg px-3 py-1.5 text-sm hover:bg-blue-50">
          + Buat Program Baru
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
        <div className="bg-gradient-to-r from-slate-800 to-blue-700 p-5 text-white flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <span className="font-bold text-lg">ACE Batch 3</span>
              <span className="bg-green-400/25 text-green-200 text-xs rounded-full px-2 py-0.5 ml-3">Selesai ✓</span>
            </div>
            <div className="text-white/70 text-sm mt-1">BRI Life · Hotel Harris Sentul · 6–8 Agustus 2025</div>
            <div className="text-white/60 text-xs mt-1">Fasilitator: Oki T. Wikan & Arike Agung Widjaja</div>
          </div>
          <div className="flex items-start mt-2">
            <span className="text-4xl font-bold">9</span>
            <span className="text-white/70 text-sm ml-1 mt-2">peserta</span>
          </div>
        </div>

        <div className="p-5">
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">Progress per Step</div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {STEPS.map((s) => (
              <div key={s.label} className="bg-slate-50 rounded-lg p-3 text-center border border-slate-100">
                <div className="text-xs text-slate-500">{s.label}</div>
                <div className="font-bold text-sm mt-1">{s.value}</div>
                <div className="h-1.5 rounded-full mt-2 bg-slate-200 overflow-hidden">
                  <div className={`h-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                </div>
                <div className={`text-[10px] font-medium mt-1 ${s.text}`}>{s.pct}%</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
            <Link to="/internal/programs/ace-batch-3/participants" className="border border-slate-300 text-slate-600 rounded-lg px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-1.5">
              <Eye className="w-4 h-4" /> Lihat Detail
            </Link>
            <Link to="/internal/programs/ace-batch-3/observation" className="border border-blue-300 text-blue-600 rounded-lg px-4 py-2 text-sm hover:bg-blue-50 flex items-center gap-1.5">
              <ClipboardList className="w-4 h-4" /> Input Observasi
            </Link>
            <Link to="/internal/programs/ace-batch-3/reports" className="bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-4 py-2 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Generate Laporan
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Hasil Akreditasi</h3>
          {DIST.map((d) => (
            <div key={d.label} className="flex items-center gap-3 mb-3">
              <div className="text-sm text-slate-600 w-36">{d.label}</div>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${d.bar}`} style={{ width: `${d.pct}%` }} />
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${d.badge}`}>{d.count}</span>
            </div>
          ))}
          <div className="border-t border-slate-100 mt-4 pt-3 text-center text-slate-600 text-sm font-medium">
            Rata-rata: 77.6 / 100
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-semibold text-slate-900 mb-3">Aksi Cepat</h3>
          {[
            { to: "/internal/programs/ace-batch-3/participants", icon: Eye, ic: "text-blue-600", ib: "bg-blue-100", t: "Lihat semua peserta", s: "9 peserta terdaftar" },
            { to: "/internal/programs/ace-batch-3/coaching", icon: MessageSquare, ic: "text-emerald-600", ib: "bg-emerald-100", t: "Input sesi coaching baru", s: "3 sesi aktif" },
            { to: "/internal/programs/ace-batch-3/reports", icon: FileText, ic: "text-violet-600", ib: "bg-violet-100", t: "Buat laporan AI", s: "Claude Haiku" },
            { to: "/internal/dashboard", icon: Settings, ic: "text-amber-600", ib: "bg-amber-100", t: "Kelola framework", s: "ACE Accreditation" },
          ].map((a, i) => (
            <Link
              key={i}
              to={a.to}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${a.ib}`}>
                <a.icon className={`w-4 h-4 ${a.ic}`} />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-900">{a.t}</div>
                <div className="text-xs text-slate-400">{a.s}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </InternalShell>
  );
}
