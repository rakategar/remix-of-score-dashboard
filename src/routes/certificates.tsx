import { createFileRoute, Link } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { AppShell } from "@/components/Sidebar";

export const Route = createFileRoute("/certificates")({
  head: () => ({ meta: [{ title: "Sertifikat · SCORE" }] }),
  component: Certificates,
});

function Certificates() {
  return (
    <AppShell>
      <h1 className="text-2xl font-bold text-slate-900">Sertifikat Saya</h1>
      <p className="text-sm text-slate-500 mt-1 mb-12">Sertifikat profesional yang telah Anda raih</p>

      <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
        <Award className="w-16 h-16 text-slate-200 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-400">Belum Ada Sertifikat</h2>
        <p className="text-sm text-slate-400 mt-2">Selesaikan semua tahapan program untuk mendapatkan sertifikat.</p>
        <Link
          to="/class/$classId/session"
          params={{ classId: "ace-batch-3" }}
          className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-all active:scale-95"
        >
          Lanjutkan ACE Batch 3 →
        </Link>
      </div>
    </AppShell>
  );
}
