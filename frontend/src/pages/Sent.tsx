import { Search, Send, ChevronRight, Clock, CheckCircle2, Eye, AlertCircle } from "lucide-react";

// Simplified Mock Data for Sent Items
const sentItems = [
  {
    id: "sent_1",
    recipient: "Alex Morgan",
    documentTitle: "Freelance Services Agreement_v3.pdf",
    date: "10:15 AM",
    status: "waiting", // waiting, viewed, signed, expired
  },
  {
    id: "sent_2",
    recipient: "Acme Corp Legal",
    documentTitle: "Mutual NDA - Project Phoenix.pdf",
    date: "Yesterday",
    status: "viewed",
  },
  {
    id: "sent_3",
    recipient: "David Chen",
    documentTitle: "Q4 Scope of Work.docx",
    date: "Oct 24",
    status: "signed",
  },
  {
    id: "sent_4",
    recipient: "Sarah Jenkins",
    documentTitle: "Standard Employment Offer.pdf",
    date: "Oct 15",
    status: "expired",
  }
];

export default function Sent() {
  
  // Helper to render clean, minimalist status indicators
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "waiting":
        return (
          <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-amber-100">
            <Clock className="w-3 h-3" /> Waiting
          </span>
        );
      case "viewed":
        return (
          <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-blue-100">
            <Eye className="w-3 h-3" /> Viewed
          </span>
        );
      case "signed":
        return (
          <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-emerald-100">
            <CheckCircle2 className="w-3 h-3" /> Signed
          </span>
        );
      case "expired":
        return (
          <span className="flex items-center gap-1.5 bg-rose-50 text-rose-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-rose-100">
            <AlertCircle className="w-3 h-3" /> Expired
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full p-4 md:p-8">
      
      {/* --- MINIMAL HEADER --- */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
          <Send className="w-6 h-6 ml-0.5" /> {/* Slight margin to visually center the send arrow */}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sent</h1>
          <p className="text-slate-500 text-sm mt-1">Track documents you've requested others to sign.</p>
        </div>
      </div>

      {/* --- SIMPLE SEARCH --- */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input 
          type="text" 
          placeholder="Search by recipient or document name..." 
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
        />
      </div>

      {/* --- STREAMLINED LIST --- */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        
        <div className="divide-y divide-slate-100">
          {sentItems.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              
              {/* Recipient */}
              <div className="w-40 sm:w-48 shrink-0 truncate pr-4">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-0.5">To</span>
                <span className="text-sm font-semibold text-slate-900">{item.recipient}</span>
              </div>

              {/* Document Title */}
              <div className="flex-1 truncate pr-4 text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                {item.documentTitle}
              </div>

              {/* Date (Hidden on very small screens) */}
              <div className="w-24 shrink-0 text-right text-xs font-medium text-slate-400 pr-6 hidden sm:block">
                {item.date}
              </div>

              {/* Status Badge & Action Indicator */}
              <div className="shrink-0 flex items-center gap-4 w-32 justify-end">
                {renderStatusBadge(item.status)}
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
              </div>

            </div>
          ))}
        </div>

        {/* Empty State Fallback (Optional, shown if list is empty) */}
        {sentItems.length === 0 && (
          <div className="px-6 py-12 text-center">
            <Send className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">You haven't sent any signature requests yet.</p>
          </div>
        )}

      </div>
    </div>
  );
}