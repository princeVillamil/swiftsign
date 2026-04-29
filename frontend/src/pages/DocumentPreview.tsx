import { useParams, useNavigate } from "react-router-dom";
import { useDocument } from "@/hooks/useDocuments";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { documentsApi } from "@/api/documents";
import { ArrowLeft, Download, Mail, Clock, Calendar, FileText, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Ensure worker is set for preview
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function DocumentPreview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: doc, isLoading, error } = useDocument(id);
  const [numPages, setNumPages] = useState<number>(0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-sm font-medium text-slate-400 animate-pulse">
        Loading document details...
      </div>
    );
  }

  if (error || !doc) {
    return (
      <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Document not found</h2>
        <p className="text-slate-500 mb-6">This document may have been deleted or is inaccessible.</p>
        <Button onClick={() => navigate("/dashboard")} variant="secondary">Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
        
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <Badge status={doc.status} />
              <h1 className="text-2xl font-bold text-slate-900 mt-4 tracking-tight leading-tight">{doc.title}</h1>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                    <Mail size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Signer</p>
                    <p className="text-sm font-medium text-slate-900">{doc.signerEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                    <Calendar size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Created</p>
                    <p className="text-sm font-medium text-slate-900">
                      {new Date(doc.createdAt).toLocaleDateString("en-US", {
                        month: "long", day: "numeric", year: "numeric"
                      })}
                    </p>
                  </div>
                </div>

                {doc.signedAt && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                      <Clock size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-wider">Signed At</p>
                      <p className="text-sm font-medium text-emerald-700">
                        {new Date(doc.signedAt).toLocaleDateString("en-US", {
                          month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit"
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col gap-3">
                {doc.status === "signed" ? (
                  <a href={documentsApi.downloadUrl(doc.id)} target="_blank" rel="noreferrer" className="w-full">
                    <Button className="w-full justify-center gap-2">
                      <Download size={16} /> Download Signed PDF
                    </Button>
                  </a>
                ) : (
                  <p className="text-xs text-center text-slate-400 font-medium bg-slate-50 py-3 rounded-xl border border-slate-100 italic">
                    Awaiting signature before download is available
                  </p>
                )}
              </div>
            </div>

            <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-blue-200">
              <h3 className="font-bold mb-2 flex items-center gap-2 text-sm">
                  <ShieldCheck size={16} /> Audit Trail
              </h3>
              <p className="text-blue-100 text-[11px] leading-relaxed mb-4">
                  This document is secured with cryptographic hashing. Every action is recorded in the permanent audit log.
              </p>
              <div className="space-y-3 opacity-90">
                  <div className="text-[10px] flex gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-300 rounded-full mt-1"></div>
                      <div>
                          <p className="font-bold">Document Uploaded</p>
                          <p className="text-blue-200">{new Date(doc.createdAt).toLocaleTimeString()}</p>
                      </div>
                  </div>
                  {doc.signedAt && (
                      <div className="text-[10px] flex gap-2">
                          <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full mt-1"></div>
                          <div>
                              <p className="font-bold text-emerald-100">Document Signed</p>
                              <p className="text-blue-200">{new Date(doc.signedAt).toLocaleTimeString()}</p>
                          </div>
                      </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: PDF Preview (Scrollable) */}
        <div className="lg:col-span-2 flex flex-col h-[calc(100vh-200px)]">
          <div className="bg-slate-200/50 rounded-[2rem] p-6 border border-slate-200/60 flex flex-col items-center shadow-inner overflow-hidden flex-1">
            <div className="mb-4 w-full flex items-center justify-between px-2">
                <div className="flex items-center gap-2 text-slate-500">
                    <FileText size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Document View</span>
                </div>
                <div className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-slate-600 border border-slate-200 shadow-sm">
                    {numPages} {numPages === 1 ? 'Page' : 'Pages'}
                </div>
            </div>
            
            <div className="w-full overflow-y-auto custom-scrollbar flex-1 flex flex-col items-center gap-6 pb-8">
                <Document
                    file={doc.status === 'signed' ? documentsApi.downloadUrl(doc.id) : null}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    className="flex flex-col items-center gap-6"
                    noData={
                        <div className="py-32 text-center space-y-4">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-slate-300 shadow-sm">
                                <Clock size={32} />
                            </div>
                            <p className="text-sm font-bold text-slate-500">Preview Unavailable</p>
                            <p className="text-xs text-slate-400 max-w-[220px]">For security, only signed documents can be previewed in the management view.</p>
                        </div>
                    }
                >
                    {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
                        <div key={pageNum} className="bg-white shadow-xl rounded-sm overflow-hidden border border-slate-300">
                            <Page 
                                pageNumber={pageNum} 
                                width={600} 
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        </div>
                    ))}
                </Document>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function ShieldCheck({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
    )
}