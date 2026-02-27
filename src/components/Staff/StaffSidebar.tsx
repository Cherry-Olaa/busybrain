import { Link, useLocation } from "react-router-dom";
import { FileText, Grid, Settings as SettingsIcon, BookOpen, Users } from "lucide-react";
import cn from "clsx";

const nav = [
  { name: "Dashboard", to: "/staff", icon: Grid },
  { name: "Results", to: "/staff/results", icon: FileText },
  { name: "Subject Registration", to: "/staff/subject-registration", icon: BookOpen },
  { name: "Settings", to: "/staff/settings", icon: SettingsIcon },
];

export default function StaffSidebar() {
  const loc = useLocation();

  return (
    <aside
      className="w-64 min-h-screen px-4 py-6 bg-[#041d29] text-white shadow-lg flex flex-col"
      aria-label="Staff sidebar"
    >
      <div className="mb-8 flex items-center gap-3">
        {/* Use absolute path from public directory */}
        <img 
          src="/logo-watermark.png" 
          className='w-10 h-10 transition-transform group-hover:scale-105 rounded-full' 
          alt="logo" 
        />
        <div>
          <div className="font-bold">BUSY BRAINS STAFF</div>
          <div className="text-xs text-[#9fb6c2]">Staff Panel</div>
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
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                active 
                  ? "bg-[#0b92bf]/15 text-white ring-1 ring-[#0b92bf]/30" 
                  : "text-[#cfe7ee] hover:bg-white/5"
              )}
            >
              <Icon className={cn("w-4 h-4", active ? "text-[#0b92bf]" : "text-[#9fb6c2]")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-white/10">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-white/5 text-[#cfe7ee]"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}