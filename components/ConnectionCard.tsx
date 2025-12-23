
import React, { useState } from 'react';
import { HelpCircle, Store, Key, Zap, Lock, Maximize2, TrendingDown, ShieldCheck, ArrowRight } from 'lucide-react';
import { HelpModal } from './HelpModal';

interface ConnectionCardProps {
  onScan: (url: string, token: string) => void;
  urgencyValue?: number | null;
}

export const ConnectionCard: React.FC<ConnectionCardProps> = ({ onScan, urgencyValue }) => {
  const [url, setUrl] = useState('');
  const [token, setToken] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !token) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onScan(url, token);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-3xl px-6 mx-auto">
        {urgencyValue && (
          <div className="mb-12 p-8 bg-red-50/50 border border-red-100 rounded-[3rem] flex items-center gap-8 animate-in slide-in-from-top duration-700 shadow-xl shadow-red-500/5">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg text-red-500 border border-red-100">
              <TrendingDown className="w-8 h-8" />
            </div>
            <div>
              <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.4em] mb-1">Financial Integrity Alert</p>
              <p className="text-xl font-black text-zinc-900 font-archivo leading-tight">
                Stop losing <span className="text-red-600">${urgencyValue.toLocaleString()} / year</span> <br /> 
                in untapped organic revenue.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-[0_64px_128px_-20px_rgba(0,0,0,0.1)] border border-zinc-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-opacity">
            <Store className="w-48 h-48" />
          </div>

          <div className="flex flex-col items-center mb-16 space-y-6">
            <div className="w-20 h-20 candy-gradient rounded-[2rem] flex items-center justify-center shadow-2xl shadow-orange-200/50 relative">
              <div className="absolute inset-0 bg-white opacity-20 rounded-[2rem] scale-[0.85] animate-ping" />
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-black text-zinc-900 tracking-tight font-archivo uppercase">Terminal Secure Link</h2>
              <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.5em]">Establishing SGE Alpha Handshake</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid md:grid-cols-1 gap-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                  <Store className="w-3.5 h-3.5" /> Shopify Instance Endpoint
                </label>
                <input 
                  type="text" 
                  placeholder="brand.myshopify.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="w-full px-8 py-6 text-lg bg-zinc-50 border border-zinc-100 rounded-3xl focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500/20 outline-none transition-all placeholder:text-zinc-300 font-bold"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center ml-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Key className="w-3.5 h-3.5" /> Admin API Authorization
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(true)}
                    className="text-[10px] font-black text-orange-600 hover:text-orange-700 transition-colors uppercase tracking-widest border-b border-orange-200"
                  >
                    Setup Protocol
                  </button>
                </div>
                <input 
                  type="password" 
                  placeholder="shpat_••••••••••••••••"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                  className="w-full px-8 py-6 text-lg bg-zinc-50 border border-zinc-100 rounded-3xl focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500/20 outline-none transition-all placeholder:text-zinc-300 font-bold"
                />
              </div>
            </div>

            <div className="relative pt-4">
              {!loading && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20">
                  <div className="px-5 py-2 candy-gradient text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-full shadow-2xl animate-bounce border-4 border-white">
                    Initial Scan: 0 Credits Required
                  </div>
                </div>
              )}
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-8 text-2xl font-black text-white bg-zinc-950 rounded-[2.5rem] transition-all disabled:opacity-50 flex items-center justify-center gap-4 shadow-2xl shadow-zinc-900/20 relative overflow-hidden group ${!loading ? 'hover:scale-[1.02] active:scale-95 btn-shimmer-effect' : ''}`}
              >
                {loading ? (
                  <span className="flex items-center gap-4">
                    <RefreshCw className="w-7 h-7 animate-spin text-orange-400" /> 
                    <span className="font-archivo uppercase tracking-widest">Encrypting...</span>
                  </span>
                ) : (
                  <>
                    <Maximize2 className="w-7 h-7 text-white/30 group-hover:text-orange-400 transition-colors" /> 
                    <span className="font-archivo uppercase tracking-widest">Execute Store Scan</span>
                    <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col items-center gap-4 opacity-50">
               <div className="h-px w-20 bg-zinc-100" />
               <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.6em] flex items-center gap-3">
                <Lock className="w-3.5 h-3.5" /> End-to-End Vault Shield
              </p>
            </div>
          </form>
        </div>
      </div>
      <HelpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

const RefreshCw = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);
