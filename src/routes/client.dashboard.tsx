import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientShell } from "@/components/ClientShell";
import { useClient } from "@/lib/client-store";
import { PROGRAM_DATA, PARTICIPANTS } from "@/lib/client-data";
import { ArrowRight, ChevronRight, Download, Eye, Sparkles, Star } from "lucide-react";
import { Avatar } from "@/components/Avatar";

export const Route = createFileRoute("/client/dashboard")({
  component: () => <ClientShell><Dashboard /></ClientShell>,
});

function Dashboard() {
  const { client } = useClient();
  if (!client) return null;
  const roleModels = PARTICIPANTS.filter((p) => p.role_model);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="bg-gradient-to-r from-slate-900 to-blue-800 rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full" />
        <div className="absolute -bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full" />
        <div className="relative">
          <span className="bg-white/20 text-white text-xs rounded-full px-3 py-1 mb-4 inline-block">BRI Life × Primera Karya Sinergia</span>
          <h1 className="text-3xl font-bold">Selamat datang, {client.full_name.split(" ").slice(0, 3).join(" ")}</h1>
          <p className="text-white/70 text-sm mt-2">Senin, 16 Juni 2025 · 1 program tersedia untuk Anda</p>
          <div className="flex gap-6 mt-6">
            <div className="bg-white/10 rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-bold">9</div><div className="text-white/70 text-xs">PBS Dilatih</div>
            </div>
            <div className="bg-white/10 rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-bold text-green-300">77.8%</div><div className="text-white/70 text-xs">Tingkat Kelulusan</div>
            </div>
            <div className="bg-white/10 rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-bold text-blue-200">4.95/5</div><div className="text-white/70 text-xs">Kepuasan Peserta</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5 mb-8">
        <KPI title="Program Berjalan" value="1" sub="ACE Batch 3 · Selesai" bottom={<span className="bg-green-100 text-green-700 rounded-full px-2.5 py-1 text-xs">● Selesai</span>} />
        <KPI title="PBS Dilatih" value="9" sub="New Priority Bancassurance Specialist" bottom={
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1"><div className="h-full bg-blue-500" style={{ width: "100%" }} /></div>
        } />
        <KPI title="Lulus Akreditasi" value="7" valueColor="text-green-600" sub="dari 9 peserta · 77.8%" subColor="text-green-600" bottom={<span className="text-xs text-slate-500">2 Kompeten Unggul · 5 Kompeten</span>} />
        <KPI title="Kepuasan Training" value="93%" valueColor="text-blue-600" sub="Rata-rata 4.95 / 5.00" subColor="text-blue-600" bottom={
          <div className="flex gap-0.5 text-amber-400">{[1,2,3,4,5].map((s) => <Star key={s} className="w-3 h-3 fill-current" />)}</div>
        } />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-slate-800 to-blue-700 p-6 text-white flex gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">ACE Batch 3</h2>
            <p className="text-white/80 text-sm mt-1">Affluent Customer Experience (A.C.E) Program & Certification</p>
            <div className="flex gap-4 mt-3 text-white/70 text-xs">
              <span>🏢 BRI Life</span><span>📍 Hotel Harris Sentul</span><span>📅 6–8 Agustus 2025</span><span>⏱ 3 Hari</span>
            </div>
            <div className="text-white/60 text-xs mt-2">Penyelenggara: Primera Karya Sinergia × Telsindo8</div>
          </div>
          <div className="ml-auto text-right flex flex-col items-end">
            <span className="bg-green-400/25 border border-green-400/30 text-green-200 rounded-full px-3 py-1 text-xs">Selesai</span>
            <div className="w-20 h-20 rounded-full border-4 border-white/20 flex flex-col items-center justify-center mt-3">
              <span className="text-2xl font-bold text-white">77.6</span>
              <span className="text-white/60 text-[10px]">avg</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <Box color="green" n="2" label="Kompeten Unggul" sub="Score ≥ 85" star="★★" />
            <Box color="blue" n="5" label="Kompeten" sub="Score 65–84" />
            <Box color="amber" n="2" label="Perlu Pengembangan" sub="Score < 65" />
          </div>
          <div className="mb-6">
            <div className="text-slate-700 font-medium text-sm mb-2">77.8% peserta lulus akreditasi</div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden"><div className="bg-gradient-to-r from-green-400 to-green-500 rounded-full h-full" style={{ width: "78%" }} /></div>
            <div className="text-xs text-slate-500 mt-2">7 dari 9 peserta berhasil lulus standar kompetensi ACE</div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 flex justify-around text-center mb-6">
            <Snap v="4.95 / 5" l="Program" />
            <Snap v="4.99 / 5" l="Trainer" />
            <Snap v="93%" l="Kepuasan" color="text-green-600" />
            <Snap v="9.2 / 10" l="NPS Score" color="text-blue-600" />
          </div>
          <div className="flex gap-3">
            <Link to="/client/programs/ace-batch-3" className="border border-slate-200 text-slate-700 rounded-xl px-5 py-2.5 text-sm hover:bg-slate-50 flex items-center gap-2">
              <Eye className="w-4 h-4" /> Lihat Detail
            </Link>
            <Link to="/client/programs/ace-batch-3/reports" className="border border-blue-200 text-blue-600 rounded-xl px-5 py-2.5 text-sm hover:bg-blue-50 flex items-center gap-2">
              <Download className="w-4 h-4" /> Unduh Laporan
            </Link>
            <Link to="/client/programs/ace-batch-3/insight" className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-5 py-2.5 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> AI Insight
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">★ Role Model Batch 3</h3>
          <div className="flex flex-col gap-3">
            {roleModels.map((rm) => (
              <div key={rm.id} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4 flex items-center gap-4">
                <Avatar
                  seed={`p-${rm.id}`}
                  initials={rm.full_name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  colorClass="bg-green-500"
                  size={48}
                  rounded="rounded-2xl"
                  textClass="text-white font-bold"
                />
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">{rm.full_name}</div>
                  <div className="text-green-600 font-bold text-sm">{rm.score.toFixed(1)} / 100</div>
                  <span className="bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-xs mt-1 inline-block">Kompeten Unggul ★ — Role Model</span>
                </div>
                <ChevronRight className="text-slate-300 w-5 h-5" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Rekomendasi Program Berikutnya</h3>
          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5">
            <div className="font-semibold text-violet-900">Wealth Advisory Deep Dive</div>
            <div className="text-violet-600 text-sm mt-1">Advanced Module — Semester 2 2025</div>
            <p className="text-slate-600 text-sm leading-relaxed mt-2">Modul lanjutan fokus pada estate planning, legacy planning, dan advanced objection handling untuk nasabah UHNWI.</p>
            <p className="text-xs text-violet-400 mt-3">Rekomendasi AI berdasarkan gap kompetensi Batch 3</p>
            <button className="text-violet-600 text-sm font-medium hover:underline mt-2 flex items-center gap-1">
              Diskusikan dengan Primera <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
      {void PROGRAM_DATA}
    </div>
  );
}

function KPI({ title, value, valueColor = "text-slate-900", sub, subColor = "text-slate-500", bottom }: { title: string; value: string; valueColor?: string; sub: string; subColor?: string; bottom: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{title}</div>
      <div className={`text-4xl font-bold mt-2 ${valueColor}`}>{value}</div>
      <div className={`text-sm mt-1 ${subColor}`}>{sub}</div>
      <div className="mt-3">{bottom}</div>
    </div>
  );
}

function Box({ color, n, label, sub, star }: { color: "green" | "blue" | "amber"; n: string; label: string; sub: string; star?: string }) {
  const map = {
    green: ["bg-green-50 border-green-100", "text-green-600", "text-green-700", "text-green-500", "text-green-400"],
    blue: ["bg-blue-50 border-blue-100", "text-blue-600", "text-blue-700", "text-blue-400", ""],
    amber: ["bg-amber-50 border-amber-100", "text-amber-600", "text-amber-700", "text-amber-400", ""],
  }[color];
  return (
    <div className={`flex-1 rounded-2xl p-5 text-center border ${map[0]}`}>
      <div className={`text-4xl font-bold ${map[1]}`}>{n}</div>
      <div className={`text-sm font-medium mt-1 ${map[2]}`}>{label}</div>
      <div className={`text-xs mt-1 ${map[3]}`}>{sub}</div>
      {star && <div className={`mt-1 ${map[4]}`}>{star}</div>}
    </div>
  );
}

function Snap({ v, l, color = "text-slate-900" }: { v: string; l: string; color?: string }) {
  return (
    <div>
      <div className={`text-xl font-bold ${color}`}>{v}</div>
      <div className="text-xs text-slate-500">{l}</div>
    </div>
  );
}
