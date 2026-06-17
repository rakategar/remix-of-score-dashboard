import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, FolderOpen, Users, Eye, MessageSquare, GraduationCap,
  FileText, BarChart2, Settings, Key, LogOut, Bell, Search,
} from "lucide-react";
import { type ReactNode } from "react";
import { useStaff, setStaff } from "@/lib/internal-store";
import { Avatar } from "@/components/Avatar";

function NavItem({ to, icon: Icon, label, active }: { to: string; icon: any; label: string; active?: boolean }) {
  return (
    <Link
      to={to}
      className={`px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm cursor-pointer transition-colors ${
        active ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </Link>
  );
}

function SubNavItem({ to, icon: Icon, label, active }: { to: string; icon: any; label: string; active?: boolean }) {
  return (
    <Link
      to={to}
      className={`pl-8 pr-3 py-2 rounded-lg flex items-center gap-2 text-xs transition-colors ${
        active ? "text-white bg-slate-800" : "text-slate-400 hover:text-white"
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </Link>
  );
}

export function InternalShell({ children, headerTitle = "Dashboard" }: { children: ReactNode; headerTitle?: string }) {
  const { staff } = useStaff();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const is = (p: string) => pathname === p;
  const startsWith = (p: string) => pathname.startsWith(p);

  const handleLogout = () => {
    setStaff(null);
    navigate({ to: "/internal/login" });
  };

  const s = staff ?? { initials: "OW", full_name: "Oki T. Wikan", role_label: "Fasilitator Senior", color: "bg-blue-500" };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 h-full overflow-y-auto flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-slate-700/50">
          <div className="text-white font-bold text-lg">SCORE</div>
          <div className="text-slate-400 text-xs">Internal Portal</div>
        </div>
        <div className="m-3 bg-slate-800 rounded-xl p-4 flex items-center gap-3">
          <Avatar seed={`staff-${s.initials}`} initials={s.initials} colorClass={s.color} size={36} textClass="text-white text-sm font-bold" />
          <div className="min-w-0">
            <div className="text-white font-medium text-sm truncate">{s.full_name}</div>
            <div className="text-slate-400 text-xs truncate">{s.role_label}</div>
          </div>
        </div>

        <div className="p-3 flex-1 flex flex-col">
          <div className="text-slate-500 text-[10px] font-bold tracking-widest uppercase px-3 mb-1">PROGRAM</div>
          <NavItem to="/internal/dashboard" icon={LayoutDashboard} label="Overview" active={is("/internal/dashboard")} />
          <NavItem to="/internal/dashboard" icon={FolderOpen} label="Semua Program" />

          <div className="text-slate-500 text-[10px] font-bold tracking-widest uppercase px-3 mb-1 mt-4">KELAS AKTIF</div>
          <div className="flex items-center gap-2 px-3 py-2 text-slate-300 text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span>ACE Batch 3</span>
          </div>
          <SubNavItem to="/internal/programs/ace-batch-3/participants" icon={Users} label="Peserta (9)" active={startsWith("/internal/programs/ace-batch-3/participants")} />
          <SubNavItem to="/internal/programs/ace-batch-3/observation" icon={Eye} label="Observasi" active={is("/internal/programs/ace-batch-3/observation")} />
          <SubNavItem to="/internal/programs/ace-batch-3/coaching" icon={MessageSquare} label="Coaching" active={is("/internal/programs/ace-batch-3/coaching")} />
          <SubNavItem to="/internal/programs/ace-batch-3/coaching" icon={GraduationCap} label="Mentoring" />
          <SubNavItem to="/internal/programs/ace-batch-3/strategic-notes" icon={FileText} label="Catatan Strategis" active={is("/internal/programs/ace-batch-3/strategic-notes")} />
          <SubNavItem to="/internal/programs/ace-batch-3/reports" icon={BarChart2} label="Laporan" active={is("/internal/programs/ace-batch-3/reports")} />

          <div className="text-slate-500 text-[10px] font-bold tracking-widest uppercase px-3 mb-1 mt-4">PENGATURAN</div>
          <NavItem to="/internal/dashboard" icon={Settings} label="Framework" />
          <NavItem to="/internal/dashboard" icon={Key} label="Kelola Kelas" />

          <div className="mt-auto border-t border-slate-700/50 pt-3 -mx-3 px-3">
            <button
              onClick={handleLogout}
              className="w-full px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-14 px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="font-semibold text-slate-900">{headerTitle}</div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                placeholder="Cari..."
                className="w-60 bg-slate-100 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="relative p-2 rounded-lg hover:bg-slate-100">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">2</span>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-slate-100">{children}</main>
      </div>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <div className="text-sm text-slate-500 mb-4">
      {items.map((it, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-1.5">/</span>}
          {it.to ? (
            <Link to={it.to} className="hover:text-blue-600">{it.label}</Link>
          ) : (
            <span className={i === items.length - 1 ? "text-slate-700 font-medium" : ""}>{it.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
