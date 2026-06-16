import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { InternalShell, Breadcrumbs } from "@/components/InternalShell";
import { STRATEGIC_NOTES_DATA } from "@/lib/internal-data";

export const Route = createFileRoute("/internal/programs/ace-batch-3/strategic-notes")({
  component: StrategicNotesPage,
});

function Field({ label, helper, defaultValue, rows = 3 }: { label: string; helper?: string; defaultValue: string; rows?: number }) {
  return (
    <div className="mb-6">
      <label className="text-sm font-semibold text-slate-800 block mb-1">{label}</label>
      {helper && <div className="text-xs text-slate-400 mb-2">{helper}</div>}
      <textarea
        rows={rows}
        defaultValue={defaultValue}
        className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

function StrategicNotesPage() {
  return (
    <InternalShell headerTitle="Catatan Strategis">
      <Breadcrumbs items={[
        { label: "Dashboard", to: "/internal/dashboard" },
        { label: "ACE Batch 3", to: "/internal/programs/ace-batch-3/participants" },
        { label: "Catatan Strategis" },
      ]} />

      <div className="mb-4">
        <h1 className="text-xl font-bold text-slate-900">Catatan Strategis Program</h1>
        <p className="text-slate-500 text-sm">Insight fasilitator sebagai input AI untuk laporan</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 flex gap-3 items-start">
        <AlertCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="text-amber-800 text-sm">
          Catatan ini digunakan AI untuk menyusun Training Impact Report dan Organizational Insight secara otomatis. Isi dengan data spesifik dan akurat.
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <Field label="Kekuatan Terbesar Tim" helper="Kompetensi atau karakter paling menonjol dari batch ini" rows={4} defaultValue={STRATEGIC_NOTES_DATA.biggest_strength} />
        <Field label="Area Pengembangan Terbesar" helper="Gap kompetensi paling umum" rows={4} defaultValue={STRATEGIC_NOTES_DATA.biggest_dev_area} />
        <Field label="Tantangan Umum Peserta" rows={3} defaultValue={STRATEGIC_NOTES_DATA.common_challenge} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Insight Organisasi" rows={4} defaultValue={STRATEGIC_NOTES_DATA.organizational_insight} />
          <Field label="Rekomendasi" rows={4} defaultValue={STRATEGIC_NOTES_DATA.recommendation} />
        </div>

        <div className="mb-6">
          <label className="text-sm font-semibold text-slate-800 block mb-1">Program Lanjutan yang Disarankan</label>
          <input
            defaultValue={STRATEGIC_NOTES_DATA.suggested_next_program}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center mb-2">
          <span className="text-slate-400 text-xs ml-auto">💾 Tersimpan otomatis</span>
        </div>

        <button
          onClick={() => toast.success("Catatan strategis berhasil disimpan!")}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 w-full font-medium mt-2"
        >
          Simpan Catatan
        </button>
      </div>
    </InternalShell>
  );
}
