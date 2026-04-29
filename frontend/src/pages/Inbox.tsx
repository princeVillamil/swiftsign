import { Search, Inbox as InboxIcon, ChevronRight } from "lucide-react";

// Simplified Mock Data
const inboxItems = [
  {
    id: "msg_1",
    sender: "Sarah Jenkins",
    documentTitle: "Q4 Marketing Retainer Agreement.pdf",
    time: "10:42 AM",
    isUnread: true,
    requiresAction: "Sign",
  },
  {
    id: "msg_2",
    sender: "Legal Dept (Acme Corp)",
    documentTitle: "Mutual NDA - Project Phoenix.pdf",
    time: "Yesterday",
    isUnread: true,
    requiresAction: "Sign",
  },
  {
    id: "msg_3",
    sender: "David Chen",
    documentTitle: "Freelance Developer Contract.docx",
    time: "Oct 24",
    isUnread: false,
    requiresAction: "View",
  },
  {
    id: "msg_4",
    sender: "HR Team",
    documentTitle: "Updated Employee Handbook 2024.pdf",
    time: "Oct 22",
    isUnread: false,
    requiresAction: "View",
  }
];

export default function Inbox() {
  return (
    <div className="max-w-7xl mx-auto w-full p-4 md:p-8">
      
      {/* --- MINIMAL HEADER --- */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
          <InboxIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Inbox</h1>
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
          placeholder="Search by sender or document name..." 
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
        />
      </div>

      {/* --- STREAMLINED LIST --- */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        
        <div className="divide-y divide-slate-100">
          {inboxItems.map((item) => (
            <div 
              key={item.id} 
              className={`flex items-center px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer group ${item.isUnread ? 'bg-slate-50/50' : ''}`}
            >
              
              {/* Unread Dot */}
              <div className="w-4 shrink-0 mr-2">
                {item.isUnread && (
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                )}
              </div>

              {/* Sender */}
              <div className={`w-48 shrink-0 truncate pr-4 text-sm ${item.isUnread ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}`}>
                {item.sender}
              </div>

              {/* Document Title */}
              <div className={`flex-1 truncate pr-4 text-sm ${item.isUnread ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
                {item.documentTitle}
              </div>

              {/* Time */}
              <div className="w-24 shrink-0 text-right text-xs font-medium text-slate-400 pr-6 hidden sm:block">
                {item.time}
              </div>

              {/* Action Indicator */}
              <div className="shrink-0 flex items-center gap-3">
                {item.requiresAction === "Sign" ? (
                  <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-lg">
                    Sign
                  </span>
                ) : (
                  <span className="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    View
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}