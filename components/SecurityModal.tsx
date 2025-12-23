
import React from 'react';
import { X, ShieldCheck, Lock, Server, Cpu } from 'lucide-react';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950/20 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white border border-zinc-100 shadow-[0_48px_96px_-12px_rgba(0,0,0,0.1)] rounded-[2.5rem] md:rounded-[3rem] animate-in zoom-in duration-300 relative overflow-hidden">
          <div className="relative p-10 md:p-14">
            <button 
              onClick={onClose} 
              className="absolute top-8 right-8 p-3 bg-zinc-50 hover:bg-zinc-100 rounded-2xl transition-colors"
              aria-label="Close security report"
            >
              <X className="w-6 h-6 text-zinc-400" />
            </button>
            
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                <ShieldCheck className="w-4 h-4" /> Bank-Grade Infrastructure
              </div>
              
              <h3 className="text-3xl font-black text-zinc-900 tracking-tight">Security Audit & Encryption</h3>
              
              <div className="space-y-6">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center border border-zinc-100 shrink-0">
                    <Lock className="w-6 h-6 text-zinc-900" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">AES-256 Encryption</h4>
                    <p className="text-zinc-500 text-sm font-medium leading-relaxed">We use AES-256 bank-grade encryption for all data in transit. Your connection is tunnelled via TLS 1.3.</p>
                  </div>
                </div>
                
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center border border-zinc-100 shrink-0">
                    <Cpu className="w-6 h-6 text-zinc-900" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Zero-Persistence Processing</h4>
                    <p className="text-zinc-500 text-sm font-medium leading-relaxed">Your API tokens are processed in a secure memory buffer and are never written to a database. They exist only for the duration of the scan.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center border border-zinc-100 shrink-0">
                    <Server className="w-6 h-6 text-zinc-900" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Isolated Sandboxing</h4>
                    <p className="text-zinc-500 text-sm font-medium leading-relaxed">Each optimization cycle runs in its own ephemeral container, ensuring no cross-contamination between store data.</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="w-full py-5 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
              >
                Verify System Integrity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
