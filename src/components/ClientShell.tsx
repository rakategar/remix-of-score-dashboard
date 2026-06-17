import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Diamond, LogOut } from "lucide-react";
import { useClient, setClient } from "@/lib/client-store";
import type { ReactNode } from "react";

export function ClientShell({ children }: { children: ReactNode }) {
  const { client, hydrated } = useClient();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!hydrated || !client) {
    return <div className="min-h-screen bg-[#FAFAFA]" />;
  }

  const navLinks: { label: string; to: string; match: (p: string) => boolean }[] = [
    { label: "Dashboard", to: "/client/dashboard", match: (p) => p === "/client/dashboard" },
    { label: "Program", to: "/client/programs", match: (p) => p.startsWith("/client/programs") },
    { label: "Laporan", to: "/client/programs/ace-batch-3/reports", match: (p) => p.endsWith("/reports") },
  ];
  if (client.role === "manager") {
    navLinks.push({ label: "Direct Reports", to: "/client/manager", match: (p) => p === "/client/manager" });
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
          <Link to="/client/dashboard" className="flex items-center gap-3">
            <Diamond className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-slate-900">SCORE</span>
            <span className="w-px h-5 bg-slate-200" />
            <span className="text-slate-500 text-sm">Client Portal</span>
          </Link>
          <nav className="flex gap-1 ml-4">
            {navLinks.map((l) => {
              const active = l.match(pathname);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={
                    active
                      ? "text-blue-600 font-medium bg-blue-50 rounded-lg px-3 py-1.5 text-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg px-3 py-1.5 text-sm transition-colors"
                  }
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-slate-500 text-sm">{client.organization}</span>
            <span className="w-px h-5 bg-slate-200" />
            <span className="font-medium text-slate-900 text-sm">{client.full_name}</span>
            <div className={`w-8 h-8 ${client.color} text-white text-xs font-bold rounded-full flex items-center justify-center`}>
              {client.initials}
            </div>
            <button
              onClick={() => {
                setClient(null);
                navigate({ to: "/client/login" });
              }}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
