import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, BookOpen, BarChart2, Award, Settings, LogOut } from "lucide-react";
import { useUser, setUser } from "@/lib/user-store";
import { toast } from "sonner";
import { Avatar } from "@/components/Avatar";

const navItems = [
  { to: "/dashboard", label: "Beranda", icon: LayoutDashboard },
  { to: "/classes", label: "Kelas Saya", icon: BookOpen },
  { to: "/progress", label: "Progress", icon: BarChart2 },
  { to: "/certificates", label: "Sertifikat", icon: Award },
];

export function Sidebar() {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const handleLogout = () => {
    setUser(null);
    toast.success("Berhasil keluar");
    navigate({ to: "/" });
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-white border-r border-slate-200 flex flex-col z-30">
      <div className="p-4 border-b border-slate-200">
        <div className="text-blue-600 font-bold text-lg flex items-center gap-1.5">
          <span className="text-xl">◈</span> SCORE
        </div>
        <div className="text-xs text-slate-400 mt-0.5">Human Dev Ecosystem</div>
      </div>

      {user && (
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Avatar seed={`user-${user.id}`} initials={user.initials} colorClass={user.avatar} size={36} />
          <div className="min-w-0">
            <div className="font-medium text-sm text-slate-900 truncate">{user.full_name.split(" ").slice(0, 2).join(" ")}</div>
            <div className="text-xs text-slate-500 truncate">PBS · {user.region}</div>
          </div>
        </div>
      )}

      <nav className="p-3 flex-1 overflow-y-auto">
        <div className="text-xs text-slate-400 font-semibold tracking-wider mb-2 px-2">MENU</div>
        {navItems.map((item) => {
          const active = pathname === item.to || (item.to === "/classes" && pathname.startsWith("/class"));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors ${
                active
                  ? "bg-blue-50 text-blue-600 font-medium border-l-2 border-blue-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}

        <div className="text-xs text-slate-400 font-semibold tracking-wider mb-2 mt-6 px-2">AKUN</div>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50 mb-1">
          <Settings className="w-4 h-4" /> Pengaturan
        </button>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50">
          <LogOut className="w-4 h-4" /> Keluar
        </button>
      </nav>
    </aside>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main className="ml-[220px] p-8">{children}</main>
    </div>
  );
}
