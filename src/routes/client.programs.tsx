import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientShell } from "@/components/ClientShell";
import { PROGRAM_DATA } from "@/lib/client-data";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/client/programs")({
  component: () => <ClientShell><ProgramsList /></ClientShell>,
});

function ProgramsList() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="text-sm text-slate-500 mb-6">Program</div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Daftar Program</h1>
      <p className="text-slate-500 text-sm mb-6">Program training yang tersedia untuk organisasi Anda</p>

      <Link to="/client/programs/ace-batch-3" className="block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-slate-800 to-blue-700 p-6 text-white w-72 h-full">
            <span className="bg-white/20 text-white text-xs rounded-full px-3 py-1 inline-block mb-3">Selesai</span>
            <div className="text-xl font-bold">ACE Batch 3</div>
            <div className="text-white/70 text-xs mt-1">{PROGRAM_DATA.start_date} – {PROGRAM_DATA.end_date}</div>
          </div>
          <div className="flex-1 p-6">
            <div className="font-semibold text-slate-900">{PROGRAM_DATA.title}</div>
            <div className="text-slate-500 text-sm mt-1">{PROGRAM_DATA.subtitle}</div>
            <div className="flex gap-6 mt-4 text-sm">
              <div><span className="text-slate-400">Peserta:</span> <strong>9</strong></div>
              <div><span className="text-slate-400">Lulus:</span> <strong className="text-green-600">77.8%</strong></div>
              <div><span className="text-slate-400">Evaluasi:</span> <strong>4.95/5</strong></div>
              <div><span className="text-slate-400">Lokasi:</span> {PROGRAM_DATA.location}</div>
            </div>
          </div>
          <ChevronRight className="text-slate-300 w-6 h-6 mr-6" />
        </div>
      </Link>
    </div>
  );
}
