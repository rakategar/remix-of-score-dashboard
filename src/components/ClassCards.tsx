import { Link } from "@tanstack/react-router";
import { Check, Lock, Plus, Building2, MapPin, Calendar, User } from "lucide-react";
import { ACTIVE_CLASS } from "@/lib/mock-data";

export function ActiveClassCard() {
  const c = ACTIVE_CLASS;
  const completed = c.steps.filter((s) => s.status === "completed").length;
  const pct = Math.round((completed / c.steps.length) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex hover:shadow-md transition-shadow">
      <div className={`w-48 flex-shrink-0 bg-gradient-to-br ${c.cover_color} p-5 flex flex-col justify-between`}>
        <div className="text-white/60 text-xs font-semibold tracking-widest">ACE</div>
        <div>
          <div className="text-white text-2xl font-bold">{c.batch}</div>
          <div className="text-white/70 text-sm">{c.client}</div>
        </div>
        <div className="self-start">
          <span className="bg-white/20 text-white text-xs rounded-full px-2 py-0.5">{c.duration}</span>
        </div>
      </div>
      <div className="flex-1 p-6">
        <h3 className="font-bold text-slate-900 text-lg">{c.title}</h3>
        <p className="text-slate-500 text-sm mb-4">{c.subtitle}</p>

        <div className="flex gap-4 flex-wrap text-xs text-slate-500 mb-2">
          <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {c.client}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.location}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {c.date}</span>
        </div>
        <div className="text-xs text-slate-500 mb-5 flex items-center gap-1"><User className="w-3 h-3" /> {c.facilitators.join(" & ")}</div>

        <StepIndicator steps={c.steps} />

        <div className="mt-3 mb-5">
          <div className="flex justify-between text-xs text-slate-500 mb-1.5">
            <span>Step {completed + 1} dari 5 — Competency Assessment</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400">{c.enrolled} peserta bergabung</span>
          <Link
            to="/class/$classId/session"
            params={{ classId: c.id }}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 text-sm font-medium transition-all active:scale-95"
          >
            Lanjutkan →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function StepIndicator({ steps }: { steps: readonly { label: string; short: string; status: string }[] }) {
  return (
    <>
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                s.status === "completed"
                  ? "bg-green-500 text-white"
                  : s.status === "current"
                  ? "bg-blue-600 text-white ring-4 ring-blue-100"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {s.status === "completed" ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 ${s.status === "completed" ? "bg-green-300" : "bg-slate-200"}`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-start gap-2 mt-1.5">
        {steps.map((s, i) => (
          <div key={i} className="flex-1 last:flex-none">
            <div
              className={`text-xs truncate ${
                s.status === "completed" ? "text-green-600" : s.status === "current" ? "text-blue-600 font-medium" : "text-slate-400"
              }`}
              style={{ width: 32 }}
            >
              {s.short}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function LockedClassCard({
  klass,
  onClick,
}: {
  klass: { id: string; title: string; subtitle: string; client: string; duration: string; cover_color: string };
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className={`h-32 bg-gradient-to-br ${klass.cover_color} p-4 flex flex-col justify-end`}>
        <div className="text-white font-bold text-base">{klass.title}</div>
        <div className="text-white/70 text-xs">{klass.subtitle}</div>
      </div>
      <div className="p-4">
        <div className="flex gap-2 text-xs text-slate-500 mb-3">
          <span>{klass.client}</span>
          <span>·</span>
          <span>{klass.duration}</span>
        </div>
        <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 border border-amber-200 rounded-full px-2.5 py-1 text-xs">
          <Lock className="w-3 h-3" /> Butuh password trainer
        </div>
        <button className="mt-3 w-full border border-blue-200 text-blue-600 rounded-lg py-2 text-sm hover:bg-blue-50 flex items-center justify-center gap-1.5 transition-colors">
          <Plus className="w-4 h-4" /> Daftar Kelas
        </button>
      </div>
    </div>
  );
}
