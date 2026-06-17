import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Diamond } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DEMO_CLIENTS, type ClientUser } from "@/lib/client-data";
import { setClient } from "@/lib/client-store";

export const Route = createFileRoute("/client/login")({
  component: ClientLogin,
});

function ClientLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const pick = (c: ClientUser) => {
    setClient(c);
    toast.success(`Selamat datang, ${c.full_name}`);
    setTimeout(() => navigate({ to: "/client/dashboard" }), 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-6" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <div className="flex items-center gap-2">
          <Diamond className="text-blue-600 w-6 h-6" />
          <span className="font-bold text-xl text-slate-900">SCORE</span>
          <span className="bg-blue-100 text-blue-700 text-xs rounded-full px-2.5 py-1 ml-auto font-medium">Client Portal</span>
        </div>
        <hr className="border-slate-100 my-5" />
        <h1 className="text-2xl font-bold text-slate-900">Selamat Datang</h1>
        <p className="text-slate-500 text-sm mb-6">Portal eksklusif untuk klien dan stakeholder BRI Life</p>

        <div className="space-y-3 mb-5">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full border border-slate-200 rounded-xl h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border border-slate-200 rounded-xl h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button onClick={() => toast.error("Gunakan demo akun di bawah")} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 w-full font-medium">Masuk</button>
        </div>

        <div className="flex items-center gap-3 text-slate-300 text-sm my-5">
          <div className="flex-1 h-px bg-slate-200" /><span>atau akses demo</span><div className="flex-1 h-px bg-slate-200" />
        </div>

        <p className="text-slate-600 text-sm font-medium mb-3">Pilih peran untuk demo:</p>
        <div className="flex flex-col gap-3">
          {DEMO_CLIENTS.map((c) => (
            <button key={c.id} onClick={() => pick(c)} className="border-2 border-slate-100 hover:border-blue-300 hover:shadow-md rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all text-left">
              <div className={`w-12 h-12 ${c.color} text-white text-base font-bold rounded-2xl flex items-center justify-center`}>{c.initials}</div>
              <div className="flex-1">
                <div className="font-semibold text-slate-900 text-sm">{c.full_name}</div>
                <div className="text-slate-500 text-xs mt-0.5">{c.organization}</div>
              </div>
              <div className="ml-auto text-right">
                <span className={
                  c.role === "hr_client" ? "bg-blue-100 text-blue-700 text-xs font-medium rounded-full px-2.5 py-1" :
                  c.role === "sponsor" ? "bg-slate-100 text-slate-700 text-xs font-medium rounded-full px-2.5 py-1" :
                  "bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full px-2.5 py-1"
                }>{c.role_label}</span>
                <div className="text-[10px] text-slate-400 mt-1">
                  {c.access === "full" ? "Akses Penuh" : c.access === "executive" ? "Executive View" : "Direct Reports Only"}
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-xs text-slate-400 text-center mt-5">Butuh akses? Hubungi Primera Karya Sinergia</p>
      </div>
    </div>
  );
}
