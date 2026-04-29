import { useState, useRef } from "react";
import { UploadCloud, FileText, X, Info, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Upload() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  
  // State for drag & drop and form data
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [signerEmail, setSignerEmail] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        if (!documentTitle) setDocumentTitle(droppedFile.name);
      } else {
        alert("Please upload a valid PDF file.");
      }
    }
  };

  // Handle manual file selection
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (!documentTitle) setDocumentTitle(selectedFile.name);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !signerEmail) return;
    
    // In a real app, you would upload to your Bun backend here.
    console.log("Uploading payload:", { file, signerEmail, documentTitle });
    
    // Navigate to a success or placement screen
    alert("Document uploaded successfully!");
    navigate("/documents");
  };

  return (
    <div className="max-w-7xl mx-auto w-full p-4 md:p-8">
      
      {/* --- HEADER --- */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Add Files</h1>
        <p className="text-slate-500 mt-1">Upload a PDF to request a signature.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <form onSubmit={handleSubmit}>
          
          <div className="p-8 sm:p-10">
            {/* --- DRAG & DROP ZONE --- */}
            {!file ? (
              <div 
                className={`relative border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-12 transition-all duration-200 ease-in-out ${
                  dragActive 
                    ? "border-blue-500 bg-blue-50" 
                    : "border-slate-300 bg-slate-50/50 hover:bg-slate-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input 
                  ref={inputRef}
                  type="file" 
                  accept="application/pdf"
                  onChange={handleChange}
                  className="hidden" 
                />
                
                <button 
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-sm shadow-blue-600/20 flex items-center gap-2 transition-colors mb-4 z-10"
                >
                  <UploadCloud className="w-5 h-5" /> Select PDF File
                </button>
                <p className="text-slate-500 font-medium">or drop file here</p>
                
                {/* Invisible overlay to catch drag events smoothly */}
                {dragActive && <div className="absolute inset-0 z-0"></div>}
              </div>
            ) : (
              /* --- FILE SELECTED PREVIEW --- */
              <div className="border border-slate-200 bg-slate-50 rounded-2xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-blue-600">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{file.name}</p>
                    <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-colors"
                  title="Remove file"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* --- OPTIONS / FORM DETAILS --- */}
            <div className="mt-10 border-t border-slate-100 pt-8">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-lg font-bold text-slate-900">Request Details</h2>
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md ml-auto">
                  <Info className="w-3.5 h-3.5" /> This will be tracked in your sent folder.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Document Title</label>
                  <input 
                    type="text" 
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    placeholder="e.g., Q4 Freelance Contract" 
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Signer's Email Address</label>
                  <input 
                    type="email" 
                    value={signerEmail}
                    onChange={(e) => setSignerEmail(e.target.value)}
                    placeholder="client@company.com" 
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --- FOOTER ACTIONS --- */}
          <div className="bg-slate-50 border-t border-slate-200 p-6 sm:px-10 flex items-center justify-between">
            <Link to="/documents" className="text-slate-500 font-medium hover:text-slate-900 transition-colors">
              Cancel
            </Link>
            <button 
              type="submit"
              disabled={!file || !signerEmail}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-medium shadow-sm shadow-blue-600/20 flex items-center gap-2 transition-all"
            >
              Continue to Placement <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}