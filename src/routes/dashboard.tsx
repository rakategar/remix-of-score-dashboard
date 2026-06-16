import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bell, BookOpen, TrendingUp, Award } from "lucide-react";
import { AppShell } from "@/components/Sidebar";
import { ActiveClassCard, LockedClassCard } from "@/components/ClassCards";
import { PasswordModal } from "@/components/PasswordModal";
import { AVAILABLE_CLASSES } from "@/lib/mock-data";
import { useUser } from "@/lib/user-store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · SCORE" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user, hydrated } = useUser();
  const [modalKlass, setModalKlass] = useState<(typeof AVAILABLE_CLASSES)[number] | null>(null);

  useEffect(() => {
    if (hydrated && !user && typeof window !== "undefined") {
      window.location.href = "/";
    }
  }, [hydrated, user]);

  if (!user) return null;

  return (
    <AppShell>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Selamat datang kembali, {user.full_name.split(" ")[0]}! 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">Senin, 16 Juni 2025 · SLP Jakarta Rawamangun</p>
        </div>
        <button className="relative p-2 rounded-lg hover:bg-slate-100">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">1</span>
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <StatCard icon={BookOpen} iconBg="bg-blue-100" iconColor="text-blue-600" label="Kelas Diikuti" value="1" sub="Program aktif" />
        <StatCard icon={TrendingUp} iconBg="bg-green-100" iconColor="text-green-600" label="Progress" value="40%" valueColor="text-green-600" sub="2 dari 5 step selesai" bar={40} />
        <StatCard icon={Award} iconBg="bg-purple-100" iconColor="text-purple-600" label="Sertifikat" value="0" sub="Selesaikan semua step" />
      </div>

      {/* Active class */}
      <Section title="Kelas Aktif" linkTo="/classes" />
      <ActiveClassCard />

      {/* Available */}
      <Section title="Kelas Tersedia" linkTo="/classes" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {AVAILABLE_CLASSES.map((k) => (
          <LockedClassCard key={k.id} klass={k} onClick={() => setModalKlass(k)} />
        ))}
      </div>

      {modalKlass && <PasswordModal klass={modalKlass} onClose={() => setModalKlass(null)} />}
    </AppShell>
  );
}

function Section({ title, linkTo }: { title: string; linkTo: string }) {
  return (
    <div className="flex justify-between items-center mb-4 mt-8">
      <h2 className="font-semibold text-slate-900 text-lg">{title}</h2>
      <Link to={linkTo} className="text-blue-600 text-sm hover:underline">Lihat Semua →</Link>
    </div>
  );
}

function StatCard({
  icon: Icon, iconBg, iconColor, label, value, valueColor = "text-slate-900", sub, bar,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string; iconColor: string; label: string; value: string; valueColor?: string; sub: string; bar?: number;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className={`${iconBg} rounded-lg p-2.5`}>
        <Icon className={`${iconColor} w-5 h-5`} />
      </div>
      <div className="flex-1">
        <div className="text-slate-500 text-sm">{label}</div>
        <div className={`text-3xl font-bold ${valueColor}`}>{value}</div>
        <div className="text-xs text-slate-400 mt-0.5">{sub}</div>
        {bar !== undefined && (
          <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: `${bar}%` }} />
          </div>
        )}
      </div>
    </div>
  );
}
