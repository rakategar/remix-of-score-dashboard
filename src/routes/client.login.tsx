import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { DEMO_CLIENTS, type ClientUser } from "@/lib/client-data";
import { setClient } from "@/lib/client-store";
import { Avatar } from "@/components/Avatar";

export const Route = createFileRoute("/client/login")({
  head: () => ({
    meta: [
      { title: "SCORE Client Portal — Masuk" },
      { name: "description", content: "Portal eksklusif klien & stakeholder untuk monitoring program SCORE." },
    ],
  }),
  component: ClientLogin,
});

function ClientLogin() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);

  const pick = (c: ClientUser) => {
    setClient(c);
    toast.success(`Selamat datang, ${c.full_name.split(" ")[0]}!`);
    setTimeout(() => navigate({ to: "/client/dashboard" }), 200);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Left panel */}
      <div className="md:w-1/2 bg-[#1E3A5F] text-white p-8 md:p-10 flex flex-col relative">
        <div>
          <div className="font-bold text-2xl md:text-3xl">SCORE</div>
          <div className="text-white/50 text-xs mt-1">Client Portal</div>
        </div>
        <div className="flex-1 flex flex-col justify-center max-w-md py-10 md:py-0">
          <div className="text-6xl md:text-8xl text-white/20 leading-none mb-2 md:mb-4">"</div>
          <p className="text-xl md:text-2xl italic leading-snug">
            Transparency in development. <br className="hidden md:block" />
            Insight that drives growth.
          </p>
          <div className="h-px bg-white/20 my-6 md:my-8" />
          <ul className="space-y-3 md:space-y-4">
            {[
              "Monitor progress & dampak program training secara real-time",
              "Akses laporan eksekutif, evaluasi, dan AI insight",
              "Kelola direct reports & beri feedback pasca training",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-white/90">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-xs text-white/40 hidden md:block">Primera Karya Sinergia © 2025</div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-bold text-slate-900">Selamat Datang</h1>
            <span className="bg-blue-100 text-blue-700 text-[10px] rounded-full px-2 py-1 font-semibold uppercase tracking-wider">
              Client
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-7">Masuk ke portal stakeholder BRI Life</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.error("Gunakan demo akun di bawah");
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="nama@brilife.co.id"
                className="w-full h-11 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full h-11 px-3 pr-10 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all active:scale-95"
            >
              Masuk
            </button>
          </form>

          <div className="flex items-center gap-3 my-6 text-slate-400 text-sm">
            <div className="flex-1 h-px bg-slate-200" />
            <span>atau coba demo</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <p className="text-sm text-slate-600 mb-3">Pilih peran — klik untuk masuk</p>
          <div className="space-y-3">
            {DEMO_CLIENTS.map((c) => (
              <button
                key={c.id}
                onClick={() => pick(c)}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-3 text-left"
              >
                <Avatar seed={`client-${c.id}`} initials={c.initials} colorClass={c.color} size={40} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-slate-900 truncate">{c.full_name}</div>
                  <div className="text-xs text-slate-500 truncate">{c.organization}</div>
                </div>
                <span
                  className={`text-[10px] font-medium rounded-full px-2 py-0.5 whitespace-nowrap ${
                    c.role === "hr_client"
                      ? "bg-blue-100 text-blue-700"
                      : c.role === "sponsor"
                      ? "bg-slate-100 text-slate-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {c.role_label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
