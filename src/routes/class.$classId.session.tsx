import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Info, Lock, Star, Trash2, Plus } from "lucide-react";
import { AppShell } from "@/components/Sidebar";
import { ACTIVE_CLASS, COMPETENCY_FRAMEWORK, PRE_ASSESSMENT_DATA, LEARNING_TOPICS } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/class/$classId/session")({
  head: () => ({ meta: [{ title: "Sesi Pelatihan · SCORE" }] }),
  component: Session,
});

const RATING_LABELS: Record<number, string> = {
  1: "Kurang Baik", 2: "Cukup", 3: "Baik", 4: "Sangat Baik", 5: "Luar Biasa",
};

function Session() {
  const [activeStep, setActiveStep] = useState(2); // 0-indexed; start at competency
  const [step3Done, setStep3Done] = useState(false);
  const [step4Done, setStep4Done] = useState(false);

  const steps = useMemo(() => {
    return ACTIVE_CLASS.steps.map((s, i) => {
      let status = s.status;
      if (i === 2 && step3Done) status = "completed";
      if (i === 3) status = step3Done ? (step4Done ? "completed" : "current") : "locked";
      if (i === 4) status = step4Done ? "current" : "locked";
      if (i === 2 && !step3Done) status = "current";
      return { ...s, status };
    });
  }, [step3Done, step4Done]);

  return (
    <AppShell>
      {/* Stepper */}
      <div className="bg-white rounded-xl shadow-sm py-5 px-6 mb-6 sticky top-0 z-10">
        <div className="flex items-center max-w-3xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => {
                  if (s.status !== "locked") setActiveStep(i);
                }}
                className="flex flex-col items-center gap-1.5 flex-shrink-0"
                disabled={s.status === "locked"}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    s.status === "completed"
                      ? "bg-green-500 text-white"
                      : s.status === "current"
                      ? "bg-blue-600 text-white ring-4 ring-blue-100"
                      : "bg-slate-100 text-slate-400"
                  } ${i === activeStep ? "scale-110" : ""} transition-transform`}
                >
                  {s.status === "completed" ? <Check className="w-5 h-5" /> : i + 1}
                </div>
                <span
                  className={`text-xs ${
                    s.status === "completed" ? "text-green-600" : s.status === "current" ? "text-blue-600 font-medium" : "text-slate-400"
                  }`}
                >
                  {s.short}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-6 ${s.status === "completed" ? "bg-green-300" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto pb-12">
        {activeStep === 0 && <Step1 onNext={() => setActiveStep(1)} />}
        {activeStep === 1 && <Step2 onNext={() => setActiveStep(2)} />}
        {activeStep === 2 && (
          <Step3
            done={step3Done}
            onSubmit={() => {
              setStep3Done(true);
              toast.success("Assessment berhasil disimpan!");
              setActiveStep(3);
            }}
          />
        )}
        {activeStep === 3 && (
          <Step4
            unlocked={step3Done}
            onSubmit={() => {
              setStep4Done(true);
              toast.success("Evaluasi tersimpan!");
              setActiveStep(4);
            }}
          />
        )}
        {activeStep === 4 && <Step5 unlocked={step4Done} />}
      </div>
    </AppShell>
  );
}

function Step1({ onNext }: { onNext: () => void }) {
  const fields: [string, string][] = [
    ["Tantangan Bisnis Saat Ini", PRE_ASSESSMENT_DATA.business_challenge],
    ["Kebutuhan Pembelajaran", PRE_ASSESSMENT_DATA.learning_needs],
    ["Kekuatan yang Sudah Dimiliki", PRE_ASSESSMENT_DATA.existing_strengths],
    ["Area yang Perlu Dikembangkan", PRE_ASSESSMENT_DATA.development_areas],
  ];
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Step 1 — Pre-Assessment</h2>
          <p className="text-sm text-slate-500">Diisi sebelum pelatihan dimulai</p>
        </div>
        <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-medium">Selesai ✓</span>
      </div>
      {fields.map(([label, val]) => (
        <div key={label} className="mb-5">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</div>
          <div className="bg-slate-50 rounded-lg p-4 text-slate-700 text-sm leading-relaxed border border-slate-100">{val}</div>
        </div>
      ))}
      <button onClick={onNext} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-all active:scale-95">
        Lanjut ke Step 2 →
      </button>
    </div>
  );
}

function Step2({ onNext }: { onNext: () => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Step 2 — Konfirmasi Materi</h2>
        </div>
        <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-medium">Selesai ✓</span>
      </div>
      <p className="text-sm text-slate-500 mb-4">Anda telah mengkonfirmasi pemahaman terhadap 14 topik materi berikut:</p>
      <div className="grid grid-cols-1 gap-2">
        {LEARNING_TOPICS.map((t) => (
          <div key={t.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <Check className="text-green-500 w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="text-slate-700 text-sm flex-1">{t.topic}</span>
            <span className="text-xs text-green-600 font-medium">Dipahami</span>
          </div>
        ))}
      </div>
      <button onClick={onNext} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-all active:scale-95">
        Lanjut ke Step 3 →
      </button>
    </div>
  );
}

function Step3({ done, onSubmit }: { done: boolean; onSubmit: () => void }) {
  const [scores, setScores] = useState<Record<string, number>>({});

  const allSubs = COMPETENCY_FRAMEWORK.flatMap((c) => c.sub.map((s) => ({ ...s, parent: c.id, parentWeight: c.weight })));
  const allRated = allSubs.every((s) => scores[s.id] > 0);

  const groupScore = (c: (typeof COMPETENCY_FRAMEWORK)[number]) => {
    const totalW = c.sub.reduce((a, s) => a + s.weight, 0);
    const got = c.sub.reduce((a, s) => a + (scores[s.id] || 0) * s.weight, 0);
    return totalW ? got / totalW : 0;
  };

  const totalScore = COMPETENCY_FRAMEWORK.reduce((acc, c) => acc + (groupScore(c) / 5) * 100 * (c.weight / 100), 0);

  const badge =
    totalScore >= 85 ? { text: "Kompeten Unggul ★", cls: "bg-green-100 text-green-700" }
    : totalScore >= 65 ? { text: "Kompeten ✓", cls: "bg-blue-100 text-blue-700" }
    : totalScore > 0 ? { text: "Perlu Pengembangan", cls: "bg-red-100 text-red-600" }
    : null;

  const totalColor = totalScore >= 85 ? "text-green-600" : totalScore >= 65 ? "text-blue-600" : "text-red-500";

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Step 3 — Competency Assessment</h2>
            <p className="text-sm text-slate-500">Self-assessment dengan skala 1–5</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-sm font-medium ${done ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
            {done ? "Selesai ✓" : "Sedang Berlangsung"}
          </span>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex gap-3">
          <Info className="text-blue-500 w-5 h-5 flex-shrink-0" />
          <p className="text-sm text-blue-900">
            Lakukan penilaian mandiri terhadap kompetensi Anda. Setiap indikator dinilai dengan skala 1-5. Score akhir akan dihitung otomatis berdasarkan bobot masing-masing komponen.
          </p>
        </div>

        {COMPETENCY_FRAMEWORK.map((c) => {
          const gs = groupScore(c);
          return (
            <div key={c.id} className="bg-white rounded-xl border border-slate-100 mb-4 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-900">{c.name}</span>
                  <span className="bg-slate-200 text-slate-600 rounded-full px-2 py-0.5 text-xs">Bobot: {c.weight}%</span>
                </div>
                <span className="text-sm font-medium text-blue-600">Skor: {gs.toFixed(1)} / 5.0</span>
              </div>
              <div className="px-6 py-4">
                {c.sub.map((s, idx) => {
                  const sel = scores[s.id] || 0;
                  return (
                    <div key={s.id} className={`${idx < c.sub.length - 1 ? "border-b border-slate-100 pb-6 mb-6" : ""}`}>
                      <div className="font-medium text-slate-800 text-sm mb-1">{s.name}</div>
                      <div className="text-xs text-slate-400 mb-3">Bobot: {s.weight}%</div>
                      <div className="flex gap-2 mb-3">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            onClick={() => setScores((p) => ({ ...p, [s.id]: n }))}
                            className={`flex-1 border rounded-lg py-3 text-center cursor-pointer transition-all ${
                              sel === n
                                ? "border-blue-500 bg-blue-50 text-blue-700 font-bold shadow-sm"
                                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            <div className="text-lg font-bold">{n}</div>
                            <div className="text-[10px] leading-tight">{RATING_LABELS[n]}</div>
                          </button>
                        ))}
                      </div>
                      {sel > 0 && (
                        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-amber-800 leading-relaxed">
                          <strong>Skor {sel}:</strong> {(s.rubric as Record<number, string>)[sel]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border-t-2 border-slate-100 shadow-lg p-6 rounded-xl">
        <h3 className="font-bold mb-4 text-slate-900">Rangkuman Score</h3>
        {COMPETENCY_FRAMEWORK.map((c) => {
          const gs = groupScore(c);
          const contrib = (gs / 5) * 100 * (c.weight / 100);
          return (
            <div key={c.id} className="flex justify-between py-2 border-b border-slate-50 text-sm">
              <span className="text-slate-600">{c.name}</span>
              <span className="text-slate-900 font-medium">
                {gs.toFixed(1)} × {c.weight}% = {contrib.toFixed(2)}
              </span>
            </div>
          );
        })}
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-slate-900">SCORE AKHIR</span>
          <span className={`text-4xl font-bold ${totalColor}`}>{totalScore.toFixed(1)}</span>
        </div>
        {badge && (
          <div className="mt-3">
            <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${badge.cls}`}>{badge.text}</span>
          </div>
        )}
        <button
          onClick={onSubmit}
          disabled={!allRated}
          title={!allRated ? "Nilai semua indikator terlebih dahulu" : ""}
          className={`w-full h-12 mt-6 rounded-xl font-medium transition-all ${
            allRated ? "bg-blue-600 hover:bg-blue-700 text-white active:scale-95" : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          Simpan & Lanjut ke Evaluasi →
        </button>
      </div>
    </div>
  );
}

const PROGRAM_QUESTIONS = [
  "Tujuan pelatihan disampaikan dengan jelas di awal sesi",
  "Materi pelatihan relevan dengan pekerjaan saya sebagai PBS",
  "Pelatihan membantu saya memahami peran sebagai Trusted Advisor",
  "Urutan dan alur penyampaian materi mudah dipahami",
  "Contoh kasus dan simulasi membantu saya belajar",
  "Durasi pelatihan sesuai dengan kebutuhan pembelajaran",
  "Media dan alat bantu belajar (slide, video, worksheet) efektif",
  "Lokasi & fasilitas pelatihan mendukung proses belajar",
  "Saya merasa lebih percaya diri setelah mengikuti pelatihan ini",
  "Secara keseluruhan, saya puas dengan pelatihan ini",
];

const TRAINER_QUESTIONS = [
  "Penguasaan Materi Pelatihan",
  "Gaya penyampaian menarik & mudah dipahami",
  "Mendorong partisipasi aktif peserta",
  "Memberikan contoh dan studi kasus yang relevan",
  "Memberikan umpan balik personal yang membantu",
  "Membangun suasana kelas yang positif dan inspiratif",
];

function StarRow({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} onClick={() => onChange(n)} type="button">
          <Star className={`w-7 h-7 transition-colors ${n <= value ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />
        </button>
      ))}
    </div>
  );
}

function Step4({ unlocked, onSubmit }: { unlocked: boolean; onSubmit: () => void }) {
  const [a, setA] = useState<number[]>(Array(10).fill(0));
  const [b, setB] = useState<number[]>(Array(6).fill(0));

  if (!unlocked) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
        <Lock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="font-semibold text-slate-700">Selesaikan Assessment terlebih dahulu</h3>
        <p className="text-sm text-slate-500 mt-1">Step ini akan terbuka setelah Step 3 disubmit.</p>
      </div>
    );
  }

  const avg = (arr: number[]) => {
    const filled = arr.filter((n) => n > 0);
    return filled.length ? (filled.reduce((a, b) => a + b, 0) / filled.length).toFixed(2) : "0.00";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Step 4 — Evaluasi Training</h2>
        <p className="text-sm text-slate-500">Berikan penilaian Anda terhadap program dan trainer</p>
      </div>

      <section>
        <h3 className="font-semibold text-slate-800 mb-4">Bagian A: Persepsi terhadap Program</h3>
        {PROGRAM_QUESTIONS.map((q, i) => (
          <div key={i} className="mb-5">
            <p className="text-sm text-slate-700 mb-2 font-medium">{i + 1}. {q}</p>
            <StarRow value={a[i]} onChange={(v) => setA((p) => p.map((x, idx) => (idx === i ? v : x)))} />
          </div>
        ))}
        <p className="text-blue-600 font-semibold mt-2 text-sm">Rata-rata Bagian A: {avg(a)} / 5.00</p>
      </section>

      <section>
        <h3 className="font-semibold text-slate-800 mb-4">Bagian B: Penilaian Trainer</h3>
        {TRAINER_QUESTIONS.map((q, i) => (
          <div key={i} className="mb-5">
            <p className="text-sm text-slate-700 mb-2 font-medium">{i + 1}. {q}</p>
            <StarRow value={b[i]} onChange={(v) => setB((p) => p.map((x, idx) => (idx === i ? v : x)))} />
          </div>
        ))}
        <p className="text-blue-600 font-semibold mt-2 text-sm">Rata-rata Bagian B: {avg(b)} / 5.00</p>
      </section>

      <section>
        <h3 className="font-semibold text-slate-800 mb-4">Bagian C: Umpan Balik Kualitatif</h3>
        {[
          "Hal paling bermanfaat yang saya pelajari dari pelatihan ini:",
          "Saran saya untuk perbaikan pelatihan berikutnya:",
          "Materi atau topik tambahan yang saya harap bisa disertakan:",
        ].map((label, i) => (
          <div key={i} className="mb-4">
            <label className="text-sm font-medium text-slate-700 block mb-1.5">{label}</label>
            <textarea rows={3} className="w-full border border-slate-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        ))}
      </section>

      <button onClick={onSubmit} className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all active:scale-95">
        Simpan & Lanjut ke Action Plan →
      </button>
    </div>
  );
}

type ActionItem = { id: number; plan: string; date: string; indicator: string; commitment: "Rendah" | "Sedang" | "Tinggi" | "" };

function Step5({ unlocked }: { unlocked: boolean }) {
  const navigate = useNavigate();
  const [items, setItems] = useState<ActionItem[]>([
    { id: 1, plan: "", date: "", indicator: "", commitment: "" },
    { id: 2, plan: "", date: "", indicator: "", commitment: "" },
    { id: 3, plan: "", date: "", indicator: "", commitment: "" },
  ]);
  const [loading, setLoading] = useState(false);

  if (!unlocked) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
        <Lock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="font-semibold text-slate-700">Selesaikan Evaluasi terlebih dahulu</h3>
      </div>
    );
  }

  const addItem = () => setItems((p) => [...p, { id: Date.now(), plan: "", date: "", indicator: "", commitment: "" }]);
  const removeItem = (id: number) => setItems((p) => p.filter((i) => i.id !== id));
  const update = (id: number, k: keyof ActionItem, v: string) =>
    setItems((p) => p.map((i) => (i.id === id ? { ...i, [k]: v } : i)));

  const finish = () => {
    setLoading(true);
    setTimeout(() => navigate({ to: "/class/$classId/complete", params: { classId: "ace-batch-3" } }), 800);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <h2 className="text-xl font-bold text-slate-900">Step 5 — Action Plan</h2>
      <p className="text-sm text-slate-500 mb-6">Tuliskan rencana tindak lanjut Anda. Action plan yang baik: spesifik, terukur, dan realistis.</p>

      {items.map((item, idx) => (
        <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-5 mb-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-slate-700">Rencana Aksi #{idx + 1}</span>
            {items.length > 1 && (
              <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Rencana Tindakan</label>
              <textarea
                rows={2}
                value={item.plan}
                onChange={(e) => update(item.id, "plan", e.target.value)}
                placeholder="Contoh: Implementasi framework ACE dengan 5 nasabah baru per minggu..."
                className="w-full border border-slate-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Target Penyelesaian</label>
                <input type="date" value={item.date} onChange={(e) => update(item.id, "date", e.target.value)} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Indikator Keberhasilan</label>
                <input
                  value={item.indicator}
                  onChange={(e) => update(item.id, "indicator", e.target.value)}
                  placeholder="3 nasabah baru ter-onboard..."
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Tingkat Komitmen</label>
              <div className="flex gap-2">
                {(["Rendah", "Sedang", "Tinggi"] as const).map((lvl) => {
                  const active = item.commitment === lvl;
                  const cls =
                    !active ? "bg-slate-100 text-slate-600"
                    : lvl === "Rendah" ? "bg-red-100 text-red-700"
                    : lvl === "Sedang" ? "bg-amber-100 text-amber-700"
                    : "bg-green-100 text-green-700";
                  return (
                    <button key={lvl} onClick={() => update(item.id, "commitment", lvl)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${cls}`}>
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ))}

      <button onClick={addItem} className="w-full border-2 border-dashed border-blue-200 text-blue-600 rounded-xl py-3 text-sm hover:bg-blue-50 flex items-center justify-center gap-1.5 transition-colors mb-6">
        <Plus className="w-4 h-4" /> Tambah Rencana Aksi
      </button>

      <div className="mt-6">
        <label className="font-semibold text-slate-700 block mb-2">Pernyataan Komitmen</label>
        <textarea rows={3} placeholder="Saya berkomitmen untuk..." className="w-full border border-slate-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1 block">Nama Coach/Mentor untuk Follow-up</label>
          <input className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1 block">Tanggal Check-in Berikutnya</label>
          <input type="date" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <button
        onClick={finish}
        disabled={loading}
        className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium mt-6 transition-all active:scale-95 disabled:opacity-50"
      >
        {loading ? "Memproses…" : "Selesaikan Program ✓"}
      </button>
    </div>
  );
}
