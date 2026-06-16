import { useState } from "react";
import { X, LockKeyhole, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

type Klass = { id: string; title: string; client: string };

export function PasswordModal({ klass, onClose }: { klass: Klass; onClose: () => void }) {
  const [show, setShow] = useState(false);
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    toast.success("Berhasil! Selamat datang di kelas.");
    navigate({ to: "/class/$classId", params: { classId: klass.id } });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <LockKeyhole className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-center text-slate-900">Masuk ke Kelas</h3>
        <p className="text-slate-500 text-sm text-center mb-1">{klass.title}</p>
        <p className="text-slate-400 text-xs text-center mb-6">{klass.client} · Hotel Harris Sentul</p>
        <div className="h-px bg-slate-100 mb-5" />
        <form onSubmit={submit}>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Password Kelas</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Masukkan password dari trainer"
              className="w-full h-11 px-3 pr-10 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium mt-5 transition-all active:scale-95">
            Masuk ke Kelas
          </button>
        </form>
        <p className="text-xs text-slate-400 text-center mt-4">Belum punya password?</p>
        <p className="text-xs text-slate-400 text-center">Hubungi trainer Anda saat sesi offline berlangsung.</p>
      </div>
    </div>
  );
}
