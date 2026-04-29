import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export function Success() {
  return (
    <div className="max-w-lg mx-auto mt-16 sm:mt-24 px-4 w-full">
      <div className="bg-white border border-slate-200 rounded-3xl p-10 sm:p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
          <CheckCircle2 size={40} className="animate-in zoom-in duration-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Document signed!
        </h1>
        
        <p className="text-slate-500 mb-10 text-base leading-relaxed max-w-sm mx-auto">
          Your signature has been securely applied and the requester has been notified. 
          They can now download the finalized PDF.
        </p>
        
        {/* <div className="flex justify-center">
          <Link to="/">
            <Button 
              variant="secondary" 
              className="px-8 py-3.5 text-sm font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-sm hover:shadow transition-all"
            >
              Return to dashboard
            </Button>
          </Link>
        </div> */}
        
      </div>
    </div>
  );
}