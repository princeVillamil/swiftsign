import { Link } from "react-router-dom";

export default function Navbar() {
  return (
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/60">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="bg-blue-600 text-white font-bold text-sm w-8 h-8 flex items-center justify-center rounded-lg shadow-sm">
                SS
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">SwiftSign</span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Link to="/sign-in" className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:block">
              Log in
            </Link>
            <Link 
              to="/register" 
              className="bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-medium py-2 px-5 rounded-full shadow-sm shadow-blue-600/20"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>
  );
}
