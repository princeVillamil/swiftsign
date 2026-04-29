import { FileText, Download, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useDocuments } from "@/hooks/useDocuments";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { documentsApi } from "@/api/documents";
import type { Document } from "@/types";

function DocumentCard({ doc }: { doc: Document }) {
  // Determine the correct icon based on status
  const Icon =
    doc.status === "signed" ? CheckCircle2
    : doc.status === "expired" ? XCircle
    : Clock;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start justify-between gap-4 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 group">
      
      <div className="flex items-start gap-4">
        {/* Dynamic Icon Container with hover effects */}
        <div className="mt-0.5 w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
          <Icon size={18} className="text-slate-500 group-hover:text-blue-600 transition-colors" />
        </div>
        
        <div>
          <p className="font-semibold text-slate-900 text-sm tracking-tight">{doc.title}</p>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Signer: <span className="text-slate-700">{doc.signerEmail}</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {new Date(doc.createdAt).toLocaleDateString("en-US", {
              month: "short", day: "numeric", year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3">
        <Badge status={doc.status} />
        
        {doc.status === "signed" && (
          <a
            href={documentsApi.downloadUrl(doc.id)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg transition-colors"
          >
            <Download size={14} />
            Download
          </a>
        )}
      </div>
    </div>
  );
}

export function Dashboard() {
  const { data: documents, isLoading, error } = useDocuments();

  return (
    <div className="w-full">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Documents</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Track all signing requests</p>
        </div>
        <Link to="/upload">
          <Button className="shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] transition-all">
            Request signature
          </Button>
        </Link>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-20 text-slate-400 text-sm font-medium animate-pulse">
          Loading documents...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="rounded-2xl bg-rose-50 border border-rose-100 p-5 text-sm font-medium text-rose-700 shadow-sm">
          Failed to load documents. Make sure the backend is running.
        </div>
      )}

      {/* Empty State (Bento Card Style) */}
      {documents && documents.length === 0 && (
        <div className="text-center py-20 bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl flex flex-col items-center">
          <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mb-5 border border-slate-100">
            <FileText size={28} className="text-slate-400" />
          </div>
          <p className="text-base font-bold text-slate-900 mb-1">No documents yet</p>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
            Upload a PDF to request a signature and track its status here.
          </p>
          <Link to="/upload">
            <Button size="sm" className="shadow-sm">Get started</Button>
          </Link>
        </div>
      )}

      {/* Data List */}
      {documents && documents.length > 0 && (
        <div className="space-y-4">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      )}
    </div>
  );
}