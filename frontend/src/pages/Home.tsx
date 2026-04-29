import { ArrowRight, FileSignature, ShieldCheck, Zap, UploadCloud, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full">
      
      {/* --- HERO SECTION --- */}
      <section className="max-w-5xl mx-auto px-4 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8 border border-blue-100">
          <Zap className="w-4 h-4" />
          <span>E-Signing 2.0 is here</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
          Getting agreements signed <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
            has never been this easy.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          SwiftSign provides a clean, secure, and legally binding document workflow. Upload, send, and manage your contracts without the clutter.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/upload" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-medium text-lg transition-all shadow-[0_4px_14px_0_rgb(37,99,235,0.39)]"
          >
            Upload Document <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            to="/activities" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 px-8 py-3.5 rounded-full font-medium text-lg transition-all shadow-sm"
          >
            Explore Dashboard
          </Link>
        </div>
      </section>

      {/* --- BENTO GRID SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* BENTO CARD 1: Feature Showcase (Spans 2 columns) */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between group overflow-hidden relative">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <FileSignature className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Document Hub</h2>
              <p className="text-slate-500 max-w-md leading-relaxed">
                Track all your pending, signed, and drafted documents in one beautiful dashboard. Know exactly who needs to sign next.
              </p>
            </div>
            
            {/* Minimalist Mockup Graphic inside the card */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
              {[
                { name: "Freelance_Contract_V2.pdf", status: "Waiting for you", color: "text-amber-600", bg: "bg-amber-50" },
                { name: "NDA_Partnership_Final.docx", status: "Completed", color: "text-emerald-600", bg: "bg-emerald-50" }
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
                  <span className="font-medium text-slate-700">{doc.name}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${doc.color} ${doc.bg}`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BENTO CARD 2: Quick Upload */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 duration-300 cursor-pointer">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Drag & Drop</h2>
            <p className="text-slate-500 text-sm mb-6">
              Upload any PDF securely to prepare it for signature routing.
            </p>
            <Link to="/upload" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
              Start new request <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* BENTO CARD 3: Security */}
          <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col justify-between">
            <div>
              <ShieldCheck className="w-10 h-10 text-blue-400 mb-6" />
              <h2 className="text-xl font-bold mb-3">Bank-Grade Security</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Every signature is cryptographically bound to the document with a comprehensive, tamper-evident audit trail.
              </p>
            </div>
          </div>

          {/* BENTO CARD 4: Speed/Stats (Spans 2 columns) */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-6">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Turnaround in minutes, not days.</h2>
              <p className="text-slate-500 text-sm">
                Automated email routing ensures your clients get notified instantly when it's their turn to sign.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}