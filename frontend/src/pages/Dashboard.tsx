import { FileText, Cloud, Edit, ShieldCheck, Share2 } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 md:p-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center mt-4 md:mt-12">
        
        {/* Circular Hero Icon */}
        <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-8 shadow-[0_8px_30px_rgb(37,99,235,0.12)]">
          <FileText className="w-12 h-12" />
        </div>
        
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">SwiftSign Documents</h1>
        <p className="text-lg text-slate-500 mb-16 max-w-lg">
          Securely upload, prepare, sign, and manage your critical agreements in one unified workspace.
        </p>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
          
          <FeatureCard 
            icon={Cloud}
            title="Import with Integrations"
            desc="Save time by pulling files directly from Google Drive, Dropbox, and secure local storage."
          />
          <FeatureCard 
            icon={Edit}
            title="Prepare & Form Fill"
            desc="Simplify workflows by placing signature fields, text boxes, and dates directly onto your PDF."
          />
          <FeatureCard 
            icon={ShieldCheck}
            title="Cryptographic Signatures"
            desc="Apply legally binding e-signatures backed by comprehensive, tamper-evident audit trails."
          />
          <FeatureCard 
            icon={Share2}
            title="Route & Collaborate"
            desc="Send documents to multiple signers in a specific order without printing or scanning."
          />
          
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <Icon className="w-6 h-6 text-slate-700" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      </div>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
