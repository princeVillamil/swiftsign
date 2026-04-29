import { 
  ChevronDown, Plus, LayoutDashboard, Inbox, Send, FileText, 
  Clock, Settings, Bell, Zap, BookOpen 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/upload') return 'New Request';
    if (path === '/help') return 'Documentation';
    
    // Capitalize last segment
    const lastPart = path.split('/').pop() || '';
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">
      
      {/* --- LEFT SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-10">
        
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-3">
          <div className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-lg shadow-sm">
            <LayoutDashboard size={18} />
          </div>
          <span className="font-extrabold text-slate-900 text-lg tracking-tight">SwiftSign</span>
          </Link>
        </div>

        {/* Primary CTA */}
        <div className="p-4">
          <Link 
            to="/upload"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2.5 flex items-center justify-center gap-2 font-medium shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] transition-all"
          >
            <Plus className="w-5 h-5" /> New Document
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <NavItem to="/dashboard" icon={FileText} label="Dashboard" active={location.pathname === '/dashboard'} />
          
          <div className="my-4 border-t border-slate-100"></div>
          
          <NavItem to="/help" icon={BookOpen} label="Help & Docs" active={location.pathname === '/help'} />
        </nav>

        {/* Footer Info */}
        <div className="p-6 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SwiftSign v1.0 Demo</p>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shrink-0 z-0 shadow-sm shadow-slate-100/50">
          <div className="flex items-center gap-2.5">
            <span className="text-slate-500 font-semibold tracking-tight">
              {getPageTitle()}
            </span>
          </div>
        </header>

        {/* Page Content (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active?: boolean }) {
  return (
    <Link 
      to={to}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors group ${
        active 
          ? "bg-blue-50 text-blue-700 font-semibold shadow-[0_2px_10px_rgb(37,99,235,0.05)]" 
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <Icon className={`w-5 h-5 transition-colors ${
        active ? "text-blue-600" : "text-slate-400 group-hover:text-blue-600"
      }`} />
      <span className="text-sm">{label}</span>
    </Link>
  );
}
