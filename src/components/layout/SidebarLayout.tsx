// src/components/layout/SidebarLayout.tsx
import { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  sidebarWidth?: string;
}

export const SidebarLayout = ({ 
  children, 
  sidebar, 
  sidebarWidth = "w-64" 
}: SidebarLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Fixed Sidebar for Desktop */}
      <aside className={`fixed left-0 top-0 h-full ${sidebarWidth} hidden md:block overflow-y-auto bg-white/95 backdrop-blur-sm border-r-2 border-yellow-200 shadow-xl z-30`}>
        <div className="h-full">
          {sidebar}
        </div>
      </aside>

      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-white/90 backdrop-blur-sm border-2 border-yellow-200 rounded-lg shadow-lg"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" 
          onClick={() => setMobileMenuOpen(false)}
        >
          <aside 
            className={`fixed left-0 top-0 h-full ${sidebarWidth} overflow-y-auto bg-white/95 backdrop-blur-sm border-r-2 border-yellow-200 shadow-xl`}
            onClick={e => e.stopPropagation()}
          >
            <div className="h-full">
              {sidebar}
            </div>
          </aside>
        </div>
      )}

      {/* Main Content - Scrollable */}
      <main className={`min-h-screen ${sidebarWidth} md:ml-64`}>
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};