import { Link, useLocation } from "react-router-dom";
import { FileText, Upload, PenLine } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  const navLinks = [
    { to: "/", label: "Dashboard", icon: FileText },
    { to: "/upload", label: "Upload", icon: Upload },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex flex-col">
      {/* SaaS Minimalist Header with backdrop blur */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo Block */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-lg shadow-sm group-hover:bg-blue-700 transition-colors">
              <PenLine size={16} />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">
              eSign
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const isActive = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all duration-200
                    ${isActive
                      ? "bg-blue-50 text-blue-700 font-semibold shadow-[0_2px_10px_rgb(37,99,235,0.05)]"
                      : "text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-100"
                    }`}
                >
                  <Icon 
                    size={16} 
                    className={`transition-colors ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`} 
                  />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-10 w-full flex-1">
        {children}
      </main>
    </div>
  );
}