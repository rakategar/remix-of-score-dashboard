import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle, Eye, EyeOff } from "lucide-react";
import { DEMO_USERS } from "@/lib/mock-data";
import { setUser, getUser, type DemoUser } from "@/lib/user-store";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SCORE — Masuk" },
      { name: "description", content: "Platform pelatihan profesional SCORE oleh Primera Karya Sinergia." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    if (getUser()) navigate({ to: "/dashboard" });
  }, [navigate]);

  const loginAs = (u: DemoUser) => {
    setUser(u);
    toast.success(`Selamat datang, ${u.full_name.split(" ")[0]}!`);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left */}
      <div className="hidden md:flex w-1/2 bg-[#1E3A5F] text-white p-10 flex-col relative">
        <div className="font-bold text-3xl">SCORE</div>
        <div className="flex-1 flex flex-col justify-center max-w-md">
          <div className="text-8xl text-white/20 leading-none mb-4">"</div>
          <p className="text-2xl italic leading-snug">Transforming Potential into Performance.</p>
          <div className="h-px bg-white/20 my-8" />
          <ul className="space-y-4">
            {[
              "Ikuti pelatihan terstruktur & terstandarisasi",
              "Pantau perkembangan kompetensi Anda",
              "Dapatkan sertifikat profesional tervalidasi",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-white/90">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-xs text-white/40">Primera Karya Sinergia © 2025</div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-slate-900">Selamat Datang</h1>
          <p className="text-sm text-slate-500 mb-8">Masuk ke akun SCORE Anda</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginAs(DEMO_USERS[0]);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input type="email" placeholder="nama@email.com" className="w-full h-11 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} placeholder="••••••••" className="w-full h-11 px-3 pr-10 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all active:scale-95">
              Masuk
            </button>
          </form>

          <div className="flex items-center gap-3 my-6 text-slate-400 text-sm">
            <div className="flex-1 h-px bg-slate-200" />
            <span>atau coba demo</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <p className="text-sm text-slate-600 mb-3">Demo Login — Klik untuk langsung masuk</p>
          <div className="space-y-3">
            {DEMO_USERS.map((u) => (
              <button
                key={u.id}
                onClick={() => loginAs(u)}
                className="w-full bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-3 text-left"
              >
                <div className={`w-10 h-10 rounded-full ${u.avatar} text-white flex items-center justify-center font-semibold text-sm flex-shrink-0`}>
                  {u.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-slate-900 truncate">{u.full_name}</div>
                  <div className="text-xs text-slate-500 truncate">{u.position}</div>
                </div>
                <span
                  className={`text-xs font-medium rounded-full px-2 py-0.5 whitespace-nowrap ${
                    u.badge_color === "green" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {u.badge} {u.badge_color === "green" ? "★" : ""}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
