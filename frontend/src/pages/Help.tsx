import { BookOpen, FileUp, MousePointer2, Mail, Download, ShieldCheck } from "lucide-react";

export default function Help() {
  const steps = [
    {
      title: "Upload your Document",
      description: "Click 'New Document' and upload any PDF file. We support documents up to 10MB.",
      icon: FileUp,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Configure Request",
      description: "Enter the signer's email address and a clear title for the document so they know what they're signing.",
      icon: Mail,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      title: "Place Signatures",
      description: "The signer will receive an email. They can simply click anywhere on the document to place their signature.",
      icon: MousePointer2,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      title: "Download & Save",
      description: "Once signed, you'll be notified via email. You can download the legally binding, stamped PDF from your dashboard.",
      icon: Download,
      color: "text-amber-600",
      bg: "bg-amber-50"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">User Documentation</h1>
        <p className="text-slate-500 mt-2 text-lg">Learn how to use SwiftSign to get your documents signed in seconds.</p>
      </div>

      {/* Quick Start Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {steps.map((step, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className={`${step.bg} ${step.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6`}>
              <step.icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Security Section */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="text-blue-400" size={32} />
            <h2 className="text-2xl font-bold tracking-tight">Enterprise-Grade Security</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-blue-400 mb-2 text-sm uppercase tracking-wider">Data Protection</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                All documents are encrypted at rest and during transit. Your signature is securely 
                stamped directly onto the PDF structure, ensuring it cannot be easily removed or altered.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-blue-400 mb-2 text-sm uppercase tracking-wider">Audit Trail</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Every document maintains a detailed timestamp of when it was created and when it was signed, 
                providing a reliable record for your business needs.
              </p>
            </div>
          </div>
        </div>
        {/* Abstract background element */}
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* FAQ */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-6">
            <h4 className="font-bold text-slate-900 mb-2">Can I sign on my mobile phone?</h4>
            <p className="text-slate-500 text-sm">Yes! SwiftSign is fully responsive. Signers can use their finger on a touchscreen for a more natural signature experience.</p>
          </div>
          <div className="border-b border-slate-200 pb-6">
            <h4 className="font-bold text-slate-900 mb-2">What file formats are supported?</h4>
            <p className="text-slate-500 text-sm">Currently, we support PDF files as they are the industry standard for secure, immutable documents.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-2">How long do signing links last?</h4>
            <p className="text-slate-500 text-sm">For security reasons, all signing links automatically expire after 7 days if they haven't been signed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}