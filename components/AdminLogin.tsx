
import React, { useState } from 'react';
import { Lock, ShieldCheck, ArrowRight, Eye, EyeOff, X, Terminal } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'vault-admin-2026') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center p-8 overflow-hidden">
      {/* Brand DNA Visuals */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] candy-gradient rounded-full blur-[160px] opacity-10 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[160px] opacity-10" />
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

      <div className="w-full max-w-lg relative z-10 space-y-12 animate-in zoom-in duration-700">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2.5rem] mx-auto flex items-center justify-center relative shadow-2xl group overflow-hidden">
            <div className="absolute inset-0 candy-gradient opacity-0 group-hover:opacity-10 transition-opacity" />
            <Terminal className="w-10 h-10 text-orange-500 glow-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-white font-archivo tracking-tight uppercase leading-none">Access Restricted</h2>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">Authentication Protocol Required</p>
          </div>
        </div>

        <div className={`p-12 bg-white/5 border rounded-[3rem] shadow-[0_64px_128px_-20px_rgba(0,0,0,1)] transition-all duration-500 ${error ? 'border-red-500/50 bg-red-500/5 shake' : 'border-white/10'}`}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Personnel Passcode</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-16 pr-16 py-6 bg-black border border-white/5 rounded-2xl font-bold text-white outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/40 transition-all placeholder:text-zinc-800 text-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-6 candy-gradient text-white font-black text-xl rounded-2xl flex items-center justify-center gap-4 hover:brightness-110 active:scale-95 transition-all shadow-2xl shadow-orange-500/20 btn-shimmer-effect uppercase tracking-[0.1em] font-archivo"
            >
              Enter Terminal <ArrowRight className="w-7 h-7" />
            </button>
          </form>

          {error && (
            <p className="mt-6 text-center text-[10px] font-black text-red-400 uppercase tracking-[0.3em] animate-bounce">
              Access Denied • Credentials Mismatch
            </p>
          )}
        </div>

        <button 
          onClick={onBack}
          className="w-full py-4 text-[10px] font-black text-zinc-500 hover:text-zinc-300 uppercase tracking-[0.5em] transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          <X className="w-3.5 h-3.5" /> Return to Merchant Portal
        </button>

        <div className="pt-12 text-center">
          <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.6em] flex items-center justify-center gap-3">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" /> Encrypted Session Active
          </p>
        </div>
      </div>
    </div>
  );
};
