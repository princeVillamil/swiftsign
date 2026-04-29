import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-slate-900">
      
      <Navbar/>

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-slate-200 py-10 mt-20 text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} SwiftSign Inc. All rights reserved.</p>
          <div className="space-x-6 mt-4 md:mt-0 font-medium">
            <Link to="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-slate-900 transition-colors">Terms</Link>
            <Link to="/security" className="hover:text-slate-900 transition-colors">Security</Link>
          </div>
        </div>
      </footer>
      
    </div>
  );
}