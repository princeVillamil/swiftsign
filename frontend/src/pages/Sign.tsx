import { useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "sonner";
import { Trash2, PenLine, CheckCircle, Link as LinkIcon, RotateCcw } from "lucide-react";
import { useSigningDocument, useSignDocument } from "@/hooks/useDocuments";
import { documentsApi } from "@/api/documents";
import { Button } from "@/components/ui/Button";
import type { SignaturePlacement } from "@/types";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PlacementWithPreview extends SignaturePlacement {
  preview: string; // data URL for the visual overlay
}

export function Sign() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const { data: doc, isLoading, error } = useSigningDocument(token);
  const { mutateAsync: submitSignature, isPending } = useSignDocument(token!);

  const canvasRef = useRef<SignatureCanvas>(null);
  const [numPages, setNumPages] = useState(0);
  const [signerName, setSignerName] = useState("");
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [placements, setPlacements] = useState<PlacementWithPreview[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // Called when the user finishes a stroke on the canvas
  function handleCanvasEnd() {
    if (!canvasRef.current?.isEmpty()) {
      setSignatureDataUrl(canvasRef.current!.toDataURL("image/png"));
    }
  }

  function clearCanvas() {
    canvasRef.current?.clear();
    setSignatureDataUrl(null);
  }

  // Click on a PDF page → place signature at that location
  const handlePageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, pageNumber: number) => {
      if (!signatureDataUrl) {
        toast.info("Draw your signature first, then click the PDF to place it.");
        return;
      }
      const rect = e.currentTarget.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width;
      const yPct = (e.clientY - rect.top) / rect.height;

      setPlacements((prev) => [
        ...prev,
        {
          page: pageNumber,
          xPct: Math.max(0, xPct - 0.125),   // center the sig on the click
          yPct: Math.max(0, yPct - 0.025),
          widthPct: 0.25,
          heightPct: 0.07,
          preview: signatureDataUrl,
        },
      ]);
    },
    [signatureDataUrl]
  );

  function removePlacement(index: number) {
    setPlacements((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit() {
    if (!signerName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!signatureDataUrl) {
      toast.error("Please draw your signature.");
      return;
    }
    if (placements.length === 0) {
      toast.error("Click on the document to place your signature.");
      return;
    }
    try {
      await submitSignature({
        signatureDataUrl,
        signerName: signerName.trim(),
        placements: placements.map(({ preview: _p, ...rest }) => rest),
      });
      navigate("/success");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-20 text-slate-400 text-sm font-medium animate-pulse">
          Loading document securely...
        </div>
      );
    }

    if (error || !doc) {
      return (
        <div className="max-w-md mx-auto mt-16 text-center bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl py-20 px-10 flex flex-col items-center">
          <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mb-5 border border-slate-100">
            <LinkIcon size={28} className="text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1 tracking-tight">Link not found</h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            This signing link is invalid or has expired.
          </p>
        </div>
      );
    }

    if (doc.status === "signed") {
      return (
        <div className="max-w-md mx-auto mt-16 text-center bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl py-20 px-10 flex flex-col items-center">
          <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mb-5 border border-emerald-100">
            <CheckCircle className="text-emerald-500" size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1 tracking-tight">Already signed</h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            This document has already been securely signed and finalized.
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col lg:flex-row gap-8 min-h-0 w-full">
        {/* Left — PDF viewer */}
        <div className="flex-1 min-w-0 overflow-x-auto pb-4">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{doc.title}</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Requested by <span className="text-slate-700">{doc.requesterEmail}</span> · Click the PDF to place your signature
            </p>
          </div>

          <Document
            file={documentsApi.pdfUrl(token!)}
            onLoadSuccess={({ numPages: n }) => setNumPages(n)}
            className="space-y-6"
          >
            {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
              <div
                key={pageNum}
                className="relative cursor-crosshair rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200 bg-white inline-block min-w-full"
                onClick={(e) => handlePageClick(e, pageNum)}
              >
                <Page 
                  pageNumber={pageNum} 
                  width={Math.max(600, Math.min(1000, window.innerWidth - 420))} 
                />

                {/* Signature placement overlays */}
                {placements
                  .filter((p) => p.page === pageNum)
                  .map((p, i) => (
                    <div
                      key={i}
                      className="absolute border-2 border-blue-500 border-dashed rounded-lg bg-blue-50/20 transition-all hover:bg-blue-50/40"
                      style={{
                        left: `${p.xPct * 100}%`,
                        top: `${p.yPct * 100}%`,
                        width: `${p.widthPct * 100}%`,
                        height: `${p.heightPct * 100}%`,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        removePlacement(placements.indexOf(p));
                      }}
                    >
                      <img
                        src={p.preview}
                        alt="Signature placement"
                        className="w-full h-full object-contain p-1 opacity-90"
                      />
                      <button
                        className="absolute -top-2.5 -right-2.5 bg-white rounded-full
                          border border-slate-200 p-1 text-slate-400 hover:text-rose-600 hover:border-rose-200 shadow-sm transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePlacement(placements.indexOf(p));
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
              </div>
            ))}
          </Document>
        </div>

        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="sticky top-24 space-y-5 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 custom-scrollbar">

            {/* Name Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <span className="text-[10px] font-bold uppercase">ID</span>
                </div>
                <label className="text-sm font-semibold text-slate-700">
                  Your full name
                </label>
              </div>
              <input
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                placeholder="e.g. Jane Smith"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400
                  focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
              />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <PenLine size={14} />
                  </div>
                  <label className="text-sm font-semibold text-slate-700">
                    Draw signature
                  </label>
                </div>
                <button
                  onClick={clearCanvas}
                  className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Clear
                </button>
              </div>
              <div
                className={`border-2 rounded-xl overflow-hidden transition-all duration-200
                  ${signatureDataUrl 
                    ? "border-emerald-400 bg-emerald-50/20" 
                    : "border-slate-200 border-dashed bg-slate-50 hover:bg-slate-100"}`}
              >
                <SignatureCanvas
                  ref={canvasRef}
                  penColor="#0f172a"
                  canvasProps={{
                    width: 275,
                    height: 120,
                    className: "block w-full",
                  }}
                  onEnd={handleCanvasEnd}
                />
              </div>
              {signatureDataUrl ? (
                <p className="mt-3 text-xs font-medium text-emerald-600 flex items-center gap-1.5">
                  <CheckCircle size={14} /> Captured — click PDF to place
                </p>
              ) : (
                <p className="mt-3 text-xs font-medium text-slate-400 px-1">
                  Use your mouse, stylus, or finger
                </p>
              )}
            </div>

            {/* Placements summary */}
            {placements.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded flex items-center justify-center text-[10px] font-bold">
                    {placements.length}
                  </span>
                  Locations placed
                </p>
                <div className="space-y-2">
                  {placements.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs font-medium text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100"
                    >
                      <span>Page {p.page}</span>
                      <button
                        onClick={() => removePlacement(i)}
                        className="text-rose-500 hover:text-rose-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="pt-2">
              <Button
                onClick={handleSubmit}
                loading={isPending}
                disabled={!signatureDataUrl || placements.length === 0 || !signerName}
                className="w-full justify-center py-3.5 text-sm font-semibold shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] disabled:shadow-none transition-all"
              >
                Submit signature
              </Button>
              <p className="text-xs text-center font-medium text-slate-400 mt-4 px-2 leading-relaxed">
                By submitting you agree this constitutes a legally binding signature.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <main className="max-w-7xl mx-auto px-4 py-10 w-full flex-1">
        {renderContent()}
      </main>
    </div>
  );
}