// src/components/Student/StudentSidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { 
  Grid, 
  FileText, 
  BookOpen, 
  Settings as SettingsIcon,
  Gamepad2,
  Star
} from "lucide-react";
import cn from "clsx";

const nav = [
  { name: "Dashboard", to: "/dashboard-student", icon: Grid },
//   { name: "My Results", to: "/student/results", icon: FileText },
  { name: "Fun Games", to: "/student/games", icon: Gamepad2, highlight: true }, // New
//   { name: "Subjects", to: "/student/subjects", icon: BookOpen },
//   { name: "Settings", to: "/student/settings", icon: SettingsIcon },
];

export default function StudentSidebar() {
  const loc = useLocation();

  return (
    <aside className="w-64 min-h-screen px-4 py-6 bg-gradient-to-b from-amber-500 to-yellow-500 text-white shadow-lg flex flex-col">
      <div className="mb-8 flex items-center gap-3">
        <img src="/logo-watermark.png" className='w-10 h-10 rounded-full border-2 border-white' alt="logo" />
        <div>
          <div className="font-bold text-lg">Student Zone</div>
          <div className="text-xs text-white/80">Learning is Fun!</div>
        </div>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = loc.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-300",
                active 
                  ? "bg-white text-amber-600 shadow-lg" 
                  : "text-white/90 hover:bg-white/20",
                item.highlight && "relative overflow-hidden"
              )}
            >
              {item.highlight && (
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 animate-pulse opacity-20"></span>
              )}
              <Icon className={cn("w-4 h-4", active ? "text-amber-600" : "text-white")} />
              <span className="relative z-10">{item.name}</span>
              {item.highlight && <Star className="w-3 h-3 text-yellow-300 absolute right-2 top-1/2 -translate-y-1/2 animate-spin-slow" />}
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-white/20">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-white/20 text-white/90"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}