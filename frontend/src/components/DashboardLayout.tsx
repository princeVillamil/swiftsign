import { 
  ChevronDown, Plus, LayoutDashboard, Inbox, Send, FileText, 
  LayoutTemplate, Building2, Printer, FolderPlus, 
  Settings, Bell, Zap 
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">
      
      {/* --- LEFT SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-10">
        
        {/* User Account Dropdown */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center font-bold text-sm shadow-sm">
              JS
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 leading-none">Burner Acc</p>
              <p className="text-xs text-slate-500 mt-1">Personal Dashboard</p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
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
          <NavItem to="/documents" icon={FileText} label="Documents" active={location.pathname === '/documents'} />
          {/* <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" active={location.pathname === '/dashboard'} /> */}
          <NavItem to="/inbox" icon={Inbox} label="Inbox" active={location.pathname === '/inbox'} />
          <NavItem to="/sent" icon={Send} label="Sent" active={location.pathname === '/sent'} />
          
          <div className="my-4 border-t border-slate-100"></div>

          {/* <NavItem to="/folders" icon={FolderPlus} label="Add Folders" active={location.pathname === '/folders'} />
          <div className="px-3 py-2.5 mt-2 text-center text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border-dashed">
            Create New Organization
          </div> */}
        </nav>

        {/* Bottom Settings */}
        <div className="p-3 border-t border-slate-100">
          <NavItem to="/settings" icon={Settings} label="Settings" active={location.pathname === '/settings'} />
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0 z-0 shadow-sm shadow-slate-100/50">
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-slate-900 text-lg tracking-tight">SwiftSign</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-medium">
              {location.pathname.split('/').pop()?.charAt(0).toUpperCase()}{location.pathname.split('/').pop()?.slice(1) || 'Dashboard'}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs px-3 py-1.5 rounded-full transition-colors">
              UPGRADE <Zap className="w-3.5 h-3.5 fill-current" />
            </button>
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                4
              </span>
            </button>
            <div className="w-9 h-9 rounded-full bg-slate-800 text-white border-2 border-white shadow-sm flex items-center justify-center font-bold text-sm ml-2">
              B
            </div>
          </div>
        </header>

        {/* Page Content (Scrollable) */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
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
          ? "bg-blue-50 text-blue-700" 
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
