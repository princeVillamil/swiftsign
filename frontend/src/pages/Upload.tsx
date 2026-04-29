import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Upload as UploadIcon, FileText, CheckCircle2 } from "lucide-react";
import { useUploadDocument } from "@/hooks/useDocuments";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  requesterEmail: z.string().email("Invalid email"),
  signerEmail: z.string().email("Invalid email"),
  file: z
    .instanceof(FileList)
    .refine((f) => f.length > 0, "Please select a PDF")
    .refine(
      (f) => f[0]?.type === "application/pdf",
      "Only PDF files are supported"
    ),
});

type FormValues = z.infer<typeof schema>;

export function Upload() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useUploadDocument();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const selectedFile = watch("file");

  async function onSubmit(values: FormValues) {
    try {
      await mutateAsync({
        file: values.file[0],
        title: values.title,
        requesterEmail: values.requesterEmail,
        signerEmail: values.signerEmail,
      });
      toast.success("Signing request sent! The signer will receive an email.");
      navigate("/dashboard");
    } catch {
      toast.error("Upload failed. Please try again.");
    }
  }

  return (
    <div className="mx-auto w-full pb-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Request a signature</h1>
        <p className="text-slate-500 mt-1">
          Upload a PDF and we'll email the signer a secure link.
        </p>
      </div>

      {/* Bento Form Card */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 sm:p-10 space-y-6">

          {/* File upload (Moved to top for better UX flow, but logic remains exact) */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              PDF document
            </label>
            <label
              className="flex flex-col items-center justify-center w-full p-10 border-2
                border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-blue-400
                transition-all bg-slate-50/50 hover:bg-blue-50/30 group"
            >
              {selectedFile?.[0] ? (
                <div className="flex items-center gap-3 bg-white border border-slate-200 p-4 rounded-xl shadow-sm w-full max-w-sm">
                  <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1 truncate">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {selectedFile[0].name}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {(selectedFile[0].size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                </div>
              ) : (
                <>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm mb-4 group-hover:scale-105 transition-transform">
                    <UploadIcon size={24} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    Click to select a PDF
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    Maximum file size 20 MB
                  </span>
                </>
              )}
              <input
                {...register("file")}
                type="file"
                accept="application/pdf"
                className="hidden"
              />
            </label>
            {errors.file && (
              <p className="mt-2 text-xs font-medium text-rose-600">{errors.file.message as string}</p>
            )}
          </div>

          <div className="border-t border-slate-100 pt-6 grid grid-cols-1 gap-6">
            {/* Document title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Document title
              </label>
              <input
                {...register("title")}
                placeholder="e.g. NDA — Acme Corp"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400
                  focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
              />
              {errors.title && (
                <p className="mt-2 text-xs font-medium text-rose-600">{errors.title.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Your email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Your email
                </label>
                <input
                  {...register("requesterEmail")}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400
                    focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
                />
                {errors.requesterEmail && (
                  <p className="mt-2 text-xs font-medium text-rose-600">{errors.requesterEmail.message}</p>
                )}
              </div>

              {/* Signer email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Signer's email
                </label>
                <input
                  {...register("signerEmail")}
                  type="email"
                  placeholder="signer@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400
                    focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
                />
                {errors.signerEmail && (
                  <p className="mt-2 text-xs font-medium text-rose-600">{errors.signerEmail.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              loading={isPending} 
              className="w-full justify-center py-3.5 text-sm font-semibold shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] transition-all"
            >
              Send signing request
            </Button>
          </div>
          
        </form>
      </div>
    </div>
  );
}