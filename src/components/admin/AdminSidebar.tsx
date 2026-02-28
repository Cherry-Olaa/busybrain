// src/components/admin/AdminSidebar.tsx
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  PlusCircle,
  FileText,
  Settings,
  Grid,
  BookOpen,
  UserCog,
  UserCheck,
  UserPlus,
  List,
  Shield,
  LayoutDashboard,
  LogOut
} from "lucide-react";
import cn from "clsx";
// Add Briefcase icon to imports
import { Briefcase } from "lucide-react";


const nav = [
  // Dashboard
  { name: "Dashboard", to: "/admin", icon: Grid },

  // Separator
  { type: "separator", label: "STUDENTS" },
  { name: "Register Student", to: "/admin/register-student", icon: UserPlus },
  { name: "Students List", to: "/admin/students", icon: List },
  { name: "Student Management", to: "/admin/student-management", icon: UserCheck },

  // Separator
  { type: "separator", label: "STAFF" },
  { name: "Create Staff", to: "/admin/create-staff", icon: UserPlus },
  { name: "Staff List", to: "/admin/staff", icon: List },
  { name: "Staff Management", to: "/admin/staff-management", icon: Shield },

  // Separator
  { type: "separator", label: "ACADEMIC" },
  { name: "Class Subjects", to: "/admin/class-subjects", icon: BookOpen },
  { name: "Results", to: "/admin/results", icon: FileText },
  // Add to nav array under ACADEMIC section

  { name: "Job Management", to: "/admin/jobs", icon: Briefcase }, // New
  // Separator
  { type: "separator", label: "SYSTEM" },
  { name: "Settings", to: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const loc = useLocation();

  return (
    <aside
      className="w-64 min-h-screen px-4 py-6 bg-[#041d29] text-white shadow-lg flex flex-col"
      aria-label="Admin sidebar"
    >
      <div className="mb-8 flex items-center gap-3">
        {/* ✅ FIX: Use absolute path from public directory */}
        <img
          src="/logo-watermark.png"
          className='w-10 h-10 transition-transform group-hover:scale-105 rounded-full'
          alt="logo"
        />
        <div>
          <div className="font-bold text-lg">BUSY BRAINS</div>
          <div className="text-xs text-[#9fb6c2]">Administrator Panel</div>
        </div>
      </div>

      <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
        {nav.map((item, index) => {
          if (item.type === "separator") {
            return (
              <div key={`sep-${index}`} className="px-3 pt-4 pb-1">
                <div className="text-xs font-semibold text-[#9fb6c2] uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            );
          }

          const Icon = item.icon;
          const active = loc.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                active ? "bg-[#0b92bf]/15 text-white ring-1 ring-[#0b92bf]/30" : "text-[#cfe7ee] hover:bg-white/5"
              )}
            >
              <Icon className={cn("w-4 h-4", active ? "text-[#0b92bf]" : "text-[#9fb6c2]")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-white/10 mt-4">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-white/5 text-[#cfe7ee] transition-colors flex items-center gap-3"
        >
          <LogOut size={16} className="text-[#9fb6c2]" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}