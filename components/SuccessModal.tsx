
import React, { useEffect } from 'react';
import { CheckCircle2, Sparkles, ArrowRight, Zap, Mail, ShieldCheck } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[170] bg-zinc-950/60 backdrop-blur-3xl flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="w-full max-w-xl bg-white border border-white/20 shadow-[0_64px_128px_-20px_rgba(0,0,0,0.5)] rounded-[3.5rem] p-10 md:p-16 text-center space-y-10 animate-in zoom-in duration-500 relative overflow-hidden">
        
        {/* Background Celebration Particles */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <Sparkles className="absolute top-10 left-10 w-8 h-8 text-orange-400 animate-pulse" />
          <Sparkles className="absolute bottom-20 right-20 w-12 h-12 text-purple-400 animate-bounce" />
          <Zap className="absolute top-1/2 right-10 w-6 h-6 text-indigo-400 animate-pulse" />
        </div>

        <div className="relative space-y-6">
          <div className="w-24 h-24 candy-gradient rounded-[2.5rem] mx-auto flex items-center justify-center shadow-2xl shadow-orange-500/40 relative">
            <div className="absolute inset-0 bg-white rounded-[2.5rem] scale-[0.85] opacity-20 animate-ping" />
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-zinc-900 font-archivo tracking-tight">Payment Confirmed</h2>
            <p className="text-zinc-500 font-medium max-w-sm mx-auto">VaultCopy AI is now rewriting your catalog using the Gemini 3.0 SGE framework.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100 flex flex-col items-center gap-2">
            <Mail className="w-6 h-6 text-indigo-500" />
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Email Notification</p>
            <p className="text-xs font-bold text-zinc-900">Once Sync Complete</p>
          </div>
          <div className="p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100 flex flex-col items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Vault Status</p>
            <p className="text-xs font-bold text-zinc-900">Securely Processing</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-5 bg-zinc-900 text-white font-black text-lg rounded-2xl hover:bg-zinc-800 transition-all active:scale-95 flex items-center justify-center gap-3 btn-shimmer-effect font-archivo"
        >
          Return to Dashboard <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">Autonomous Cycle: Active</p>
      </div>
    </div>
  );
};
