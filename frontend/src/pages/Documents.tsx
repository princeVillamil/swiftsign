import { useState, useMemo } from "react";
import { 
  Search, Filter, Plus, FileText, Clock, CheckCircle2, AlertCircle, 
  ChevronRight, ChevronLeft, ChevronRight as ChevronRightIcon,
  MoreHorizontal
} from "lucide-react";
import { Link } from "react-router-dom";

// 1. Using the strict types
export type DocumentStatus = "all" | "draft" | "pending" | "signed" | "expired" | "rejected";

interface Document {
  id: string;
  title: string;
  status: Exclude<DocumentStatus, "all">;
  requesterEmail: string;
  signerEmail: string;
  createdAt: string;
}

const mockDocuments: Document[] = [
  {
    id: "doc_1",
    title: "Smart Contract Audit Agreement_v2.pdf",
    status: "pending",
    requesterEmail: "you@company.com",
    signerEmail: "auditor@securesmart.io",
    createdAt: "Oct 24, 2024",
  },
  {
    id: "doc_2",
    title: "Freelance Developer Contract.docx",
    status: "signed",
    requesterEmail: "you@company.com",
    signerEmail: "dev@web3.builder",
    createdAt: "Oct 22, 2024",
  },
  {
    id: "doc_3",
    title: "Strategic Partnership NDA.pdf",
    status: "signed",
    requesterEmail: "you@company.com",
    signerEmail: "legal@partner.com",
    createdAt: "Oct 20, 2024",
  },
  {
    id: "doc_4",
    title: "Q4 Marketing Retainer.pdf",
    status: "draft",
    requesterEmail: "you@company.com",
    signerEmail: "agency@marketing.io",
    createdAt: "Oct 19, 2024",
  },
  {
    id: "doc_5",
    title: "Expired Offer Letter.pdf",
    status: "expired",
    requesterEmail: "you@company.com",
    signerEmail: "candidate@email.com",
    createdAt: "Sep 15, 2024",
  },
  {
    id: "doc_6",
    title: "Consulting Agreement.pdf",
    status: "signed",
    requesterEmail: "you@company.com",
    signerEmail: "expert@consultancy.com",
    createdAt: "Oct 18, 2024",
  },
  {
    id: "doc_7",
    title: "Advisor Agreement - Jane Doe.pdf",
    status: "pending",
    requesterEmail: "you@company.com",
    signerEmail: "jane@advisor.io",
    createdAt: "Oct 17, 2024",
  },
  {
    id: "doc_8",
    title: "Office Lease Agreement.pdf",
    status: "signed",
    requesterEmail: "you@company.com",
    signerEmail: "landlord@realestate.com",
    createdAt: "Oct 16, 2024",
  },
  {
    id: "doc_9",
    title: "Equipment Purchase Order.docx",
    status: "draft",
    requesterEmail: "you@company.com",
    signerEmail: "sales@hardware.com",
    createdAt: "Oct 15, 2024",
  },
  {
    id: "doc_10",
    title: "Referral Program Terms.pdf",
    status: "signed",
    requesterEmail: "you@company.com",
    signerEmail: "partner@growth.io",
    createdAt: "Oct 14, 2024",
  }
];

const ITEMS_PER_PAGE = 10;

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DocumentStatus>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and search logic
  const filteredDocuments = useMemo(() => {
    return mockDocuments.filter((doc) => {
      const matchesSearch = 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.signerEmail.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredDocuments.length);
  const paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const renderStatusBadge = (status: Exclude<DocumentStatus, "all">) => {
    switch (status) {
      case "signed":
        return (
          <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-emerald-100">
            <CheckCircle2 className="w-3 h-3" /> Completed
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-amber-100">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case "draft":
        return (
          <span className="flex items-center gap-1.5 bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200">
            <FileText className="w-3 h-3" /> Draft
          </span>
        );
      case "expired":
      case "rejected":
        return (
          <span className="flex items-center gap-1.5 bg-rose-50 text-rose-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-rose-100">
            <AlertCircle className="w-3 h-3" /> {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full p-4 md:p-8">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Documents</h1>
            <p className="text-slate-500 text-sm mt-1">Manage and track your agreements.</p>
          </div>
        </div>
        <Link 
          to="/upload" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] shrink-0"
        >
          <Plus className="w-4 h-4" /> New Document
        </Link>
      </div>

      {/* --- SEARCH & FILTER BAR --- */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search documents..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
          />
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as DocumentStatus)}
              className="appearance-none bg-white border border-slate-200 text-slate-700 pl-4 pr-10 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
            >
              <option value="all">All Statuses</option>
              <option value="signed">Completed</option>
              <option value="pending">Pending</option>
              <option value="draft">Draft</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* --- STREAMLINED LIST --- */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        
        <div className="divide-y divide-slate-100">
          {paginatedDocuments.length > 0 ? (
            paginatedDocuments.map((doc) => (
              <div 
                key={doc.id} 
                className="flex items-center px-6 py-5 hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                
                {/* Signer Info */}
                <div className="w-40 sm:w-48 shrink-0 truncate pr-4">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-1">Signer</span>
                  <span className="text-sm font-semibold text-slate-900">{doc.signerEmail.split('@')[0]}</span>
                </div>

                {/* Document Title */}
                <div className="flex-1 truncate pr-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                      {doc.title}
                    </span>
                  </div>
                </div>

                {/* Date */}
                <div className="w-24 shrink-0 text-right text-xs font-medium text-slate-400 pr-6 hidden sm:block">
                  {doc.createdAt}
                </div>

                {/* Status Badge & Action Indicator */}
                <div className="shrink-0 flex items-center gap-4 w-32 justify-end">
                  {renderStatusBadge(doc.status)}
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
                </div>

              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No documents found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-sm text-slate-500">
            <span>
              Showing <span className="font-semibold text-slate-900">{startIndex + 1}</span> to <span className="font-semibold text-slate-900">{endIndex}</span> of <span className="font-semibold text-slate-900">{filteredDocuments.length}</span> documents
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
