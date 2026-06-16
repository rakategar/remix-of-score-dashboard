import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/Sidebar";
import { ActiveClassCard } from "@/components/ClassCards";
import { COMPETENCY_FRAMEWORK, ACTIVE_CLASS } from "@/lib/mock-data";

export const Route = createFileRoute("/progress")({
  head: () => ({ meta: [{ title: "Progress · SCORE" }] }),
  component: Progress,
});

const MOCK_SCORES: Record<string, number> = { c1: 95, c2: 90, c3: 80, c4: 0, c5: 0 };

function Progress() {
  return (
    <AppShell>
      <h1 className="text-2xl font-bold text-slate-900">Progress Saya</h1>
      <p className="text-sm text-slate-500 mt-1 mb-6">Pantau perkembangan kompetensi Anda</p>

      <ActiveClassCard />

      <h2 className="font-semibold text-slate-900 mt-8 mb-4">Hasil Assessment Kompetensi</h2>
      <div className="space-y-4">
        {COMPETENCY_FRAMEWORK.map((c) => {
          const score = MOCK_SCORES[c.id] ?? 0;
          const color = score >= 85 ? "bg-green-500" : score >= 65 ? "bg-blue-500" : score > 0 ? "bg-amber-500" : "bg-slate-300";
          const badgeColor = score >= 85 ? "bg-green-100 text-green-700" : score >= 65 ? "bg-blue-100 text-blue-700" : score > 0 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500";
          return (
            <div key={c.id} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-slate-900">{c.name}</span>
                <span className={`text-xs font-medium rounded-full px-2.5 py-1 ${badgeColor}`}>{score}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${score}%` }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                {c.sub.map((s) => (
                  <div key={s.id} className="text-xs text-slate-500 flex justify-between bg-slate-50 rounded p-2">
                    <span className="truncate">{s.name}</span>
                    <span className="font-medium ml-2">{score > 0 ? `${Math.round((score / 100) * 5 * 10) / 10}/5` : "Belum dinilai"}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="font-semibold text-slate-900 mt-8 mb-4">Timeline Penyelesaian</h2>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-l-2 border-slate-200 ml-4 pl-6">
          {ACTIVE_CLASS.steps.map((s, i) => {
            const dot = s.status === "completed" ? "bg-green-500" : s.status === "current" ? "bg-blue-600 ring-4 ring-blue-100" : "bg-slate-200";
            return (
              <div key={s.id} className="relative mb-6 last:mb-0">
                <div className={`absolute -left-8 top-1 w-4 h-4 rounded-full ${dot}`} />
                <div className="font-medium text-sm text-slate-900">Step {i + 1} — {s.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {s.status === "completed" ? "Selesai · 14 Juni 2025" : s.status === "current" ? "Sedang berlangsung" : "Belum dimulai"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
