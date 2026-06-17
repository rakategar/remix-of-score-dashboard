import { Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle, Download, Eye, Lock, Sparkles, Share2, Star, ChevronRight, FileText, LayoutTemplate, User, Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PROGRAM_DATA, PARTICIPANTS, EVALUATION_DATA, ORG_INSIGHT, REPORTS, MANAGER_DIRECT_REPORT_IDS, type Participant } from "@/lib/client-data";
import { useClient } from "@/lib/client-store";
import { Avatar } from "@/components/Avatar";

export type DetailTab = "overview" | "participants" | "evaluation" | "insight" | "reports";

const tabs: { id: DetailTab; label: string; to: string }[] = [
  { id: "overview", label: "Overview", to: "/client/programs/ace-batch-3" },
  { id: "participants", label: "Peserta", to: "/client/programs/ace-batch-3/participants" },
  { id: "evaluation", label: "Evaluasi", to: "/client/programs/ace-batch-3/evaluation" },
  { id: "insight", label: "AI Insight", to: "/client/programs/ace-batch-3/insight" },
  { id: "reports", label: "Laporan", to: "/client/programs/ace-batch-3/reports" },
];

function CategoryBadge({ c }: { c: Participant["category"] }) {
  if (c === "kompeten_unggul")
    return <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-medium">★ Kompeten Unggul</span>;
  if (c === "kompeten")
    return <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-medium">✓ Kompeten</span>;
  return <span className="bg-amber-100 text-amber-700 rounded-full px-3 py-1 text-xs font-medium">△ Perlu Dev.</span>;
}

function scoreColor(s: number) {
  if (s >= 85) return "text-green-600";
  if (s >= 65) return "text-blue-600";
  return "text-red-600";
}

const avatarColors = ["bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500", "bg-rose-500", "bg-indigo-500", "bg-teal-500", "bg-orange-500", "bg-pink-500"];

export function ProgramDetail({ tab }: { tab: DetailTab }) {
  const { client } = useClient();
  const navigate = useNavigate();
  if (!client) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="text-sm text-slate-500 mb-6">
        <Link to="/client/programs" className="hover:text-slate-700">Program</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">ACE Batch 3</span>
      </div>

      <div className="bg-gradient-to-r from-slate-900 to-blue-800 rounded-3xl p-8 text-white mb-6 flex gap-6">
        <div className="flex-1">
          <span className="bg-white/20 text-white text-xs rounded-full px-3 py-1 inline-block mb-3">Batch 3 · BRI Life · Selesai</span>
          <h1 className="text-3xl font-bold">{PROGRAM_DATA.title}</h1>
          <div className="flex gap-4 text-white/70 text-sm mt-3">
            <span>🏢 {PROGRAM_DATA.client}</span>
            <span>📍 {PROGRAM_DATA.location}</span>
            <span>📅 {PROGRAM_DATA.start_date}–{PROGRAM_DATA.end_date.split(" ")[0]} {PROGRAM_DATA.end_date.split(" ").slice(1).join(" ")}</span>
            <span>⏱ {PROGRAM_DATA.duration}</span>
          </div>
          <div className="text-white/60 text-xs mt-2">Fasilitator: {PROGRAM_DATA.facilitators.join(" · ")}</div>
        </div>
        <div className="ml-auto grid grid-cols-2 gap-3 w-72">
          {[
            { v: "9", l: "Peserta" },
            { v: "77.8%", l: "Lulus" },
            { v: "4.95", l: "Evaluasi" },
            { v: "3", l: "Hari" },
          ].map((m) => (
            <div key={m.l} className="bg-white/10 rounded-2xl p-3 text-center">
              <div className="text-2xl font-bold text-white">{m.v}</div>
              <div className="text-white/60 text-[10px]">{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-2xl p-1 mb-6 w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => navigate({ to: t.to })}
            className={
              tab === t.id
                ? "bg-white rounded-xl shadow-sm text-slate-900 font-medium px-5 py-2 text-sm transition-all"
                : "text-slate-500 hover:text-slate-700 px-5 py-2 text-sm rounded-xl transition-all"
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && <OverviewTab />}
      {tab === "participants" && <ParticipantsTab role={client.role} />}
      {tab === "evaluation" && <EvaluationTab />}
      {tab === "insight" && <InsightTab />}
      {tab === "reports" && <ReportsTab role={client.role} />}
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-3">Tentang Program</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{PROGRAM_DATA.description}</p>
          <h4 className="font-semibold text-slate-900 mt-5 mb-3 text-sm">Tujuan Pembelajaran</h4>
          <div className="flex flex-col gap-2">
            {PROGRAM_DATA.objectives.map((o) => (
              <div key={o} className="flex gap-3">
                <CheckCircle className="text-green-500 w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm">{o}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Distribusi Regional</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-500 text-xs uppercase tracking-wider border-b">
                <th className="text-left py-2 font-semibold">Region</th>
                <th className="text-center py-2 font-semibold">Peserta</th>
                <th className="text-left py-2 font-semibold">Hasil</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Jakarta 1", 4, "1 Kompeten Unggul (Nadia) · 3 Kompeten"],
                ["Jakarta 2", 1, "1 Perlu Pengembangan"],
                ["Jakarta 3", 1, "1 Kompeten"],
                ["Pekanbaru", 1, "1 Kompeten Unggul"],
                ["Malang", 1, "1 Kompeten"],
                ["Yogyakarta", 1, "1 Perlu Pengembangan"],
              ].map(([r, p, h]) => (
                <tr key={r as string} className="border-b border-slate-50">
                  <td className="py-3 text-slate-700">{r}</td>
                  <td className="py-3 text-center text-slate-700 font-medium">{p}</td>
                  <td className="py-3 text-slate-600 text-xs">{h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Rangkuman Akreditasi</h3>
          <div className="text-center py-4">
            <div>
              <span className="text-5xl font-bold text-slate-900">77.6</span>
              <span className="text-2xl text-slate-400">/100</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">Rata-rata Score</div>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            {[
              { l: "Kompeten Unggul (≥85)", n: 2, c: "bg-green-500", w: "22%" },
              { l: "Kompeten (65–84)", n: 5, c: "bg-blue-500", w: "56%" },
              { l: "Perlu Pengembangan (<65)", n: 2, c: "bg-amber-500", w: "22%" },
            ].map((r) => (
              <div key={r.l}>
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>{r.l}</span>
                  <span className="font-semibold text-slate-900">{r.n}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`${r.c} h-full rounded-full`} style={{ width: r.w }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Fasilitator</h3>
          {PROGRAM_DATA.facilitators.map((f) => (
            <div key={f} className="flex items-center gap-3 mb-3 last:mb-0">
              <Avatar
                seed={`fac-${f}`}
                initials={f.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                colorClass="bg-blue-100"
                size={40}
                rounded="rounded-xl"
                textClass="text-blue-600 font-medium text-sm"
              />
              <div>
                <div className="font-medium text-sm text-slate-900">{f}</div>
                <div className="text-xs text-slate-500">Fasilitator Senior</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ParticipantsTab({ role }: { role: string }) {
  const visible = role === "manager"
    ? PARTICIPANTS.filter((p) => MANAGER_DIRECT_REPORT_IDS.includes(p.id))
    : PARTICIPANTS;

  const canDownload = role === "hr_client" || role === "manager";

  return (
    <div>
      {role === "manager" && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4 flex gap-3">
          <Info className="text-blue-500 w-5 h-5 flex-shrink-0" />
          <span className="text-blue-800 text-sm">Anda melihat {visible.length} direct reports dari Jakarta Region yang berada di bawah supervisi Anda.</span>
        </div>
      )}
      {role === "sponsor" && (
        <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 mb-4 flex gap-3">
          <Info className="text-slate-500 w-5 h-5 flex-shrink-0" />
          <span className="text-slate-700 text-sm">Sebagai Business Sponsor, individual profile tidak tersedia untuk diunduh.</span>
        </div>
      )}
      <div className="bg-white rounded-xl border border-slate-100 p-3 flex gap-3 items-center mb-4">
        <input className="flex-1 bg-slate-50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Cari nama peserta..." />
        <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600">
          <option>Semua Status</option>
        </select>
        <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600">
          <option>Urut: Score</option>
        </select>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="px-5 py-3 text-center">#</th>
              <th className="px-5 py-3 text-left">Nama</th>
              <th className="px-5 py-3 text-left">Region</th>
              <th className="px-5 py-3 text-left">MBTI</th>
              <th className="px-5 py-3 text-left">Score</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-right">Unduh Profil</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => (
              <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="px-5 py-4 text-slate-400 text-sm text-center">{p.no}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar
                      seed={`p-${p.id}`}
                      initials={p.full_name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      colorClass={avatarColors[p.no - 1]}
                      size={36}
                      textClass="text-white text-xs font-bold"
                    />
                    <span className="font-semibold text-slate-900 text-sm">{p.full_name}{p.role_model && <span className="text-amber-400 ml-1">★</span>}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-600 text-sm">{p.region}</td>
                <td className="px-5 py-4"><span className="bg-slate-100 text-slate-700 rounded-full px-2.5 py-1 text-xs font-mono">{p.mbti}</span></td>
                <td className={`px-5 py-4 font-bold text-sm ${scoreColor(p.score)}`}>{p.score}</td>
                <td className="px-5 py-4"><CategoryBadge c={p.category} /></td>
                <td className="px-5 py-4 text-right">
                  {canDownload ? (
                    <button
                      onClick={() => toast.success(`Mengunduh profil ${p.full_name.split(" ")[0]}...`)}
                      className="border border-slate-200 text-slate-600 rounded-lg px-3 py-1.5 text-xs hover:bg-slate-50 inline-flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" /> PDF
                    </button>
                  ) : (
                    <span className="text-slate-300 text-xs">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-slate-400 text-xs p-4">Klik tombol PDF untuk mengunduh Individual Profile peserta.</div>
      </div>
    </div>
  );
}

function EvalBar({ label, score }: { label: string; score: number }) {
  const pct = (score / 5) * 100;
  const color = score >= 5 ? "bg-green-500" : score >= 4.8 ? "bg-green-400" : "bg-amber-400";
  const tColor = score >= 5 ? "text-green-600" : score >= 4.8 ? "text-green-500" : "text-amber-600";
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-sm text-slate-600 flex-1">{label}</span>
      <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`${color} h-full rounded-full`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-sm font-bold text-right w-10 ${tColor}`}>{score.toFixed(2)}</span>
    </div>
  );
}

function EvaluationTab() {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900">Hasil Evaluasi Training</h2>
      <p className="text-slate-500 text-sm mb-6">ACE Batch 3 · 9 Peserta</p>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { v: "4.95 / 5.00", l: "Program", c: "text-slate-900", stars: true },
          { v: "4.99 / 5.00", l: "Trainer", c: "text-blue-600" },
          { v: "93%", l: "Kepuasan Peserta", c: "text-green-600" },
          { v: "9.2 / 10", l: "NPS Score", c: "text-violet-600" },
        ].map((m) => (
          <div key={m.l} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
            <div className={`text-3xl font-bold ${m.c}`}>{m.v}</div>
            <div className="text-slate-500 text-sm mt-1">{m.l}</div>
            {m.stars && (
              <div className="flex justify-center gap-0.5 mt-2 text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 fill-current" />)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Bagian A — Persepsi Program</h3>
          {EVALUATION_DATA.program_items.map((i) => <EvalBar key={i.label} {...i} />)}
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Bagian B — Penilaian Trainer</h3>
          {EVALUATION_DATA.trainer_items.map((i) => <EvalBar key={i.label} {...i} />)}
          <hr className="my-5 border-slate-100" />
          <h3 className="font-semibold text-slate-900 mb-3">Umpan Balik Kualitatif</h3>
          <div className="flex flex-col gap-2">
            {EVALUATION_DATA.qualitative.map((q) => (
              <div key={q} className="bg-slate-50 rounded-xl p-3 text-sm text-slate-700 italic border-l-2 border-blue-300">"{q}"</div>
            ))}
          </div>
          <h3 className="font-semibold text-slate-900 mt-4 mb-3">Saran Perbaikan</h3>
          <div className="flex flex-col gap-2">
            {EVALUATION_DATA.improvement.map((q) => (
              <div key={q} className="bg-slate-50 rounded-xl p-3 text-sm text-slate-700 italic border-l-2 border-amber-300">{q}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightTab() {
  const [generated, setGenerated] = useState(true);
  const [loading, setLoading] = useState(false);

  if (!generated) {
    return (
      <div className="bg-white rounded-2xl border border-violet-100 p-10 text-center">
        <Sparkles className="w-12 h-12 text-violet-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Organizational Development Insight</h2>
        <p className="text-violet-600 text-sm mb-6">Powered by Claude Haiku AI · Primera Karya Sinergia</p>
        <button
          disabled={loading}
          onClick={() => {
            setLoading(true);
            toast.info("AI sedang menganalisis data program...");
            setTimeout(() => { setLoading(false); setGenerated(true); toast.success("Insight berhasil dibuat!"); }, 2000);
          }}
          className="bg-violet-600 hover:bg-violet-700 text-white rounded-2xl px-6 py-3 inline-flex items-center gap-2 font-medium disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" /> {loading ? "Menganalisis..." : "Generate Insight dengan AI"}
        </button>
        <p className="text-slate-500 text-sm mt-3">Analisis mendalam berbasis semua data program · ~15 detik</p>
      </div>
    );
  }

  const s = ORG_INSIGHT.sections;
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900">Organizational Development Insight</h2>
      <p className="text-violet-600 text-sm mb-4">Powered by Claude Haiku AI · Primera Karya Sinergia</p>
      <div className="flex items-center gap-3 mb-6 bg-violet-50 border border-violet-100 rounded-2xl p-4">
        <Sparkles className="text-violet-500 w-5 h-5" />
        <span className="font-medium text-violet-900">Dihasilkan oleh SCORE AI</span>
        <span className="bg-violet-100 text-violet-600 rounded-full px-2.5 py-1 text-xs">{ORG_INSIGHT.model}</span>
        <span className="text-violet-400 text-sm ml-auto">{ORG_INSIGHT.generated_at}</span>
      </div>
      <div className="flex flex-col gap-5">
        <InsightSection iconBg="bg-blue-100" iconColor="text-blue-600" icon="ES" title="Executive Summary" titleColor="text-slate-900" border="border-slate-100" body={s.executive_summary} />
        <InsightSection iconBg="bg-green-100" iconColor="text-green-600" icon="CS" title="Capability Strength" titleColor="text-green-900" border="border-green-100" body={s.capability_strength} />
        <InsightSection iconBg="bg-amber-100" iconColor="text-amber-600" icon="CG" title="Capability Gap Analysis" titleColor="text-amber-900" border="border-amber-100" body={s.capability_gap} />
        <div className="bg-white rounded-2xl border border-violet-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center"><Sparkles className="w-4 h-4 text-violet-600" /></div>
            <h3 className="font-semibold text-violet-900">Strategic Recommendations</h3>
          </div>
          <div className="flex flex-col gap-3 mt-3">
            {s.recommendations.map((r, i) => (
              <div key={r} className="flex gap-4 bg-violet-50 rounded-xl p-4">
                <div className="w-8 h-8 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
                <span className="text-slate-700 text-sm leading-relaxed">{r}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Future Development Roadmap</h3>
          {s.roadmap.map((r, i) => (
            <div key={i} className="flex gap-4 mb-4 last:mb-0">
              <div className="w-40 flex-shrink-0 text-right">
                <span className="text-xs text-slate-500 font-medium">{r.period}</span>
              </div>
              <div className="relative flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${r.status === "on_track" ? "bg-green-500" : "bg-slate-300"} mt-1.5`} />
                {i < s.roadmap.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-1" />}
              </div>
              <div className="flex-1 pb-3">
                <div className="text-sm text-slate-700">{r.activity}</div>
                <span className={`text-xs ${r.status === "on_track" ? "text-green-600" : "text-slate-400"}`}>{r.status === "on_track" ? "On Track" : "Planned"}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">💼 ROI & Business Impact Projection</h3>
          <p className="text-slate-700 text-sm leading-7">{s.roi_projection}</p>
          <p className="text-blue-400 text-xs mt-3 italic">*Proyeksi berdasarkan benchmark industri bancassurance pasca ACE training</p>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={() => toast.success("Mengunduh PDF insight...")} className="border border-slate-200 text-slate-600 rounded-xl px-4 py-2.5 text-sm hover:bg-slate-50 flex items-center gap-2">
          <Download className="w-4 h-4" /> Export PDF
        </button>
        <button onClick={() => toast.success("Link disalin!")} className="border border-slate-200 text-slate-600 rounded-xl px-4 py-2.5 text-sm hover:bg-slate-50 flex items-center gap-2">
          <Share2 className="w-4 h-4" /> Share Link
        </button>
      </div>
    </div>
  );
}

function InsightSection({ iconBg, iconColor, icon, title, titleColor, border, body }: { iconBg: string; iconColor: string; icon: string; title: string; titleColor: string; border: string; body: string }) {
  return (
    <div className={`bg-white rounded-2xl border ${border} p-6`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center text-sm font-bold ${iconColor}`}>{icon}</div>
        <h3 className={`font-semibold ${titleColor}`}>{title}</h3>
      </div>
      <p className="text-slate-700 text-sm leading-7">{body}</p>
    </div>
  );
}

function ReportsTab({ role }: { role: string }) {
  const [previewing, setPreviewing] = useState<string | null>(null);
  const iconFor = (t: string) => {
    if (t === "training_impact") return { bg: "bg-blue-100", color: "text-blue-600", Icon: FileText };
    if (t === "executive_summary") return { bg: "bg-slate-100", color: "text-slate-600", Icon: LayoutTemplate };
    if (t === "individual_profile") return { bg: "bg-green-100", color: "text-green-600", Icon: User };
    return { bg: "bg-violet-100", color: "text-violet-600", Icon: Sparkles };
  };
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900">Laporan Tersedia</h2>
      <p className="text-slate-500 text-sm mb-4">ACE Batch 3 · Akses berdasarkan peran Anda</p>
      {role !== "hr_client" && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-5 flex gap-3">
          <Info className="text-amber-500 w-5 h-5 flex-shrink-0" />
          <span className="text-amber-800 text-sm">Beberapa laporan dibatasi berdasarkan peran akses Anda. Hubungi HR BRI Life untuk akses penuh.</span>
        </div>
      )}
      <div className="flex flex-col gap-4">
        {REPORTS.map((r) => {
          const allowed = (r.access as readonly string[]).includes(role);
          const { bg, color, Icon } = iconFor(r.type);
          return (
            <div key={r.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
              <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-900">{r.title}</div>
                <div className="text-slate-500 text-sm mt-1">{r.description}</div>
                <div className="flex gap-3 mt-2 text-xs text-slate-400">
                  <span>📅 {r.date}</span><span>📄 {r.pages} halaman</span><span>💾 {r.size}</span>
                </div>
              </div>
              <div className="ml-auto flex gap-2">
                {allowed ? (
                  <>
                    <button onClick={() => setPreviewing(r.id)} className="border border-slate-200 text-slate-600 rounded-xl px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2">
                      <Eye className="w-4 h-4" /> Preview
                    </button>
                    <button onClick={() => toast.success(`Mengunduh ${r.title}...`)} className="bg-blue-600 text-white rounded-xl px-4 py-2 text-sm hover:bg-blue-700 flex items-center gap-2">
                      <Download className="w-4 h-4" /> Unduh
                    </button>
                  </>
                ) : (
                  <span className="bg-slate-100 text-slate-400 rounded-xl px-4 py-2 text-sm flex items-center gap-2 cursor-not-allowed">
                    <Lock className="w-4 h-4" /> Akses Terbatas
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {previewing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6" onClick={() => setPreviewing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-1">{REPORTS.find((r) => r.id === previewing)?.title}</h3>
            <p className="text-slate-500 text-sm mb-5">Preview laporan (mock).</p>
            <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50 space-y-3 text-sm text-slate-700 leading-relaxed">
              <p><strong>Ringkasan Eksekutif:</strong> {ORG_INSIGHT.sections.executive_summary}</p>
              <p><strong>Kekuatan:</strong> {ORG_INSIGHT.sections.capability_strength}</p>
              <p><strong>Gap:</strong> {ORG_INSIGHT.sections.capability_gap}</p>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setPreviewing(null)} className="border border-slate-200 text-slate-600 rounded-xl px-4 py-2 text-sm hover:bg-slate-50">Tutup</button>
              <button onClick={() => { toast.success("Mengunduh..."); setPreviewing(null); }} className="bg-blue-600 text-white rounded-xl px-4 py-2 text-sm hover:bg-blue-700 inline-flex items-center gap-2">
                <Download className="w-4 h-4" /> Unduh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { CategoryBadge, scoreColor, avatarColors, ChevronRight };
