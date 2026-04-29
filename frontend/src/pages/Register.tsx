import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function Register() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 p-4 sm:p-8 flex flex-col justify-center">
      
      {/* Top Navigation */}
      <div className="absolute top-8 left-8 z-10">
        <Link to="/" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
      </div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Column: The Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Create your account</h1>
            <p className="text-slate-500">Join thousands of teams securing their workflows.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <form className="space-y-5">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Work Email</label>
                <input type="email" placeholder="you@company.com" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm" />
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] mt-4">
                Create Account
              </button>

              <p className="text-xs text-center text-slate-500 mt-6">
                By clicking "Create Account", you agree to our <a href="#" className="underline hover:text-slate-800">Terms of Service</a> and <a href="#" className="underline hover:text-slate-800">Privacy Policy</a>.
              </p>
            </form>
          </div>
          
          <p className="text-center text-sm text-slate-500 mt-8">
            Already have an account? <Link to="/sign-in" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">Log in</Link>
          </p>
        </div>

        {/* Right Column: Bento Grid Trust Elements (Hidden on mobile) */}
        <div className="hidden lg:grid grid-cols-2 gap-4 lg:pl-12">
          
          {/* Card 1: Security (Dark Mode Card for contrast) */}
          <div className="col-span-2 bg-slate-900 rounded-3xl p-8 text-white shadow-xl flex items-start gap-4">
            <div className="bg-slate-800 p-3 rounded-2xl shrink-0">
              <ShieldCheck className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Cryptographic Security</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                All signatures are AES-256 encrypted and backed by immutable audit trails compliant with eIDAS and ESIGN Act standards.
              </p>
            </div>
          </div>

          {/* Card 2: Speed */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="bg-amber-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Sign in Seconds</h3>
            <p className="text-sm text-slate-500">Remove the friction of legacy portals. Clients sign via secure link instantly.</p>
          </div>

          {/* Card 3: Features List */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="font-bold text-slate-900 mb-4">What's included:</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Unlimited uploads</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Custom branding</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real-time tracking</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}