import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/Sidebar";
import { ActiveClassCard, LockedClassCard } from "@/components/ClassCards";
import { PasswordModal } from "@/components/PasswordModal";
import { AVAILABLE_CLASSES } from "@/lib/mock-data";

export const Route = createFileRoute("/classes")({
  head: () => ({ meta: [{ title: "Kelas Saya · SCORE" }] }),
  component: Classes,
});

function Classes() {
  const [modalKlass, setModalKlass] = useState<(typeof AVAILABLE_CLASSES)[number] | null>(null);
  return (
    <AppShell>
      <h1 className="text-2xl font-bold text-slate-900">Kelas Saya</h1>
      <p className="text-sm text-slate-500 mt-1 mb-6">Semua program pelatihan Anda</p>

      <h2 className="font-semibold text-slate-900 mb-4">Kelas Aktif</h2>
      <ActiveClassCard />

      <h2 className="font-semibold text-slate-900 mt-8 mb-4">Kelas Tersedia</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {AVAILABLE_CLASSES.map((k) => (
          <LockedClassCard key={k.id} klass={k} onClick={() => setModalKlass(k)} />
        ))}
      </div>

      {modalKlass && <PasswordModal klass={modalKlass} onClose={() => setModalKlass(null)} />}
    </AppShell>
  );
}
