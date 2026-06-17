import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { DEMO_STAFF, ROLE_BADGE } from "@/lib/internal-data";
import { setStaff } from "@/lib/internal-store";
import { Avatar } from "@/components/Avatar";

export const Route = createFileRoute("/internal/login")({
  component: InternalLogin,
});

function InternalLogin() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);

  const handlePick = (s: (typeof DEMO_STAFF)[number]) => {
    setStaff(s);
    toast.success(`Selamat datang, ${s.full_name.split(" ")[0]}!`);
    navigate({ to: "/internal/dashboard" });
  };

  return (
    <div className="flex h-screen">
      {/* Left panel */}
      <div className="hidden md:flex md:w-3/5 bg-slate-900 relative overflow-hidden flex-col p-10">
        <div>
          <div className="text-white font-bold text-lg">SCORE Internal</div>
          <div className="text-slate-400 text-xs">Staff Portal</div>
        </div>

        <div className="flex-1 flex items-center">
          <div className="relative">
            <div className="absolute -top-12 -left-12 w-[200px] h-[200px] rounded-full bg-slate-700/30" />
            <div className="absolute -top-4 left-32 w-[150px] h-[150px] rounded-full bg-slate-700/30" />
            <div className="absolute top-24 left-8 w-[100px] h-[100px] rounded-full bg-slate-700/30" />

            <div className="relative z-10 max-w-md">
              <div className="text-slate-400 text-xs tracking-widest uppercase">PLATFORM MANAJEMEN</div>
              <h1 className="text-white text-4xl font-bold mt-1 leading-tight">Human Development</h1>
              <h1 className="text-blue-400 text-4xl font-bold leading-tight">Ecosystem.</h1>
              <div className="border-t border-slate-700 mt-6 mb-4" />
              <div className="flex gap-3 flex-wrap">
                <span className="bg-white/10 text-white text-sm rounded-full px-4 py-1.5">9 Peserta Terlatih</span>
                <span className="bg-white/10 text-white text-sm rounded-full px-4 py-1.5">93% Kepuasan</span>
                <span className="bg-white/10 text-white text-sm rounded-full px-4 py-1.5">3 Laporan AI</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-slate-600 text-xs">Primera Karya Sinergia © 2025</div>
      </div>

      {/* Right panel */}
      <div className="flex-1 bg-white flex items-center justify-center p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-slate-900">Staff Login</h2>
          <p className="text-slate-500 text-sm mb-8">Akses khusus untuk tim internal Primera</p>

          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Email</label>
          <input
            type="email"
            placeholder="staff@primera.id"
            className="w-full mt-1 mb-4 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Password</label>
          <div className="relative mt-1 mb-4">
            <input
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 rounded-lg font-medium transition-colors">
            Masuk
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 border-t border-slate-200" />
            <span className="text-slate-400 text-sm">demo staff login</span>
            <div className="flex-1 border-t border-slate-200" />
          </div>

          <div className="text-slate-600 text-sm mb-3">Pilih akun untuk demo:</div>
          <div className="flex flex-col gap-2">
            {DEMO_STAFF.map((s) => (
              <button
                key={s.id}
                onClick={() => handlePick(s)}
                className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all text-left"
              >
                <Avatar seed={`staff-${s.id}`} initials={s.initials} colorClass={s.color} size={40} textClass="text-white text-sm font-bold" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-slate-900">{s.full_name}</div>
                  <div className="text-slate-500 text-xs">{s.role_label}</div>
                </div>
                <span className={`ml-auto text-[10px] font-medium rounded-full px-2 py-1 ${ROLE_BADGE[s.role]}`}>
                  {s.role_label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
