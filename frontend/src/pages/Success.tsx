import { CheckCircle2, Download, Eye, ArrowRight, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="p-6 md:p-12 min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#F8FAFC]">
      <div className="max-w-2xl w-full">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 text-center">
          
          {/* Animated Success Icon */}
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-8 mx-auto shadow-[0_8px_20px_rgb(16,185,129,0.12)]">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Document Successfully Signed
          </h1>
          <p className="text-lg text-slate-500 mb-10 max-w-md mx-auto">
            Your signature has been securely applied and the audit trail has been updated. You can now download or view the final document.
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3.5 px-6 font-bold transition-all shadow-[0_4px_14px_0_rgb(37,99,235,0.39)]">
              <Download className="w-5 h-5" />
              Download PDF
            </button>
            <button className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl py-3.5 px-6 font-bold transition-all">
              <Eye className="w-5 h-5" />
              View Document
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 border-t border-slate-50 pt-8">
            <button className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">
              <Share2 className="w-4 h-4" />
              Share with others
            </button>
            <div className="hidden sm:block w-1 h-1 bg-slate-200 rounded-full"></div>
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Return to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Audit Info Helper */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-widest">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Cryptographically Verified Audit Trail Attached
        </div>
      </div>
    </div>
  );
}
