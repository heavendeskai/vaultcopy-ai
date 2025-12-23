
import React from 'react';
import { X, AlertTriangle, TrendingDown, Target, Zap, ShieldCheck } from 'lucide-react';

interface SeoDeathTrapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCtaClick: () => void;
}

export const SeoDeathTrapModal: React.FC<SeoDeathTrapModalProps> = ({ isOpen, onClose, onCtaClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-zinc-950/40 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white/95 border border-indigo-100 shadow-[0_48px_96px_-12px_rgba(99,102,241,0.15)] rounded-[2.5rem] md:rounded-[3rem] animate-in zoom-in duration-300 relative">
          <div className="p-8 md:p-14">
            <button 
              onClick={onClose} 
              className="absolute top-8 right-8 p-3 bg-indigo-50 hover:bg-indigo-100 rounded-2xl text-zinc-400 hover:text-indigo-600 transition-all"
              aria-label="Close report"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-black tracking-[0.2em] text-indigo-600 bg-indigo-50 rounded-full border border-indigo-100 uppercase">
                  <AlertTriangle className="w-3.5 h-3.5" /> Critical Industry Report
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
                  The SEO <span className="gradient-text">Death Trap</span>
                </h2>
              </div>

              <div className="grid gap-8">
                <div className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center border border-zinc-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                    <TrendingDown className="w-6 h-6 text-zinc-400 group-hover:text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-zinc-900 mb-1">Fact: The 90% Failure Rate</h4>
                    <p className="text-zinc-500 font-medium leading-relaxed">
                      90% of stores fail because they never rank on Page 1 of Google. Without organic traffic, your acquisition costs eventually exceed your margins.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center border border-zinc-100 group-hover:bg-purple-50 group-hover:border-purple-100 transition-colors">
                    <Target className="w-6 h-6 text-zinc-400 group-hover:text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-zinc-900 mb-1">The Cause: "Thin Content"</h4>
                    <p className="text-zinc-500 font-medium leading-relaxed">
                      Generic or short product descriptions tell Google your store isn't an authority. If your copy looks like everyone else's, you remain invisible.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center border border-zinc-100 group-hover:bg-pink-50 group-hover:border-pink-100 transition-colors">
                    <Zap className="w-6 h-6 text-zinc-400 group-hover:text-pink-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-zinc-900 mb-1">The Solution: VaultCopy AI</h4>
                    <p className="text-zinc-500 font-medium leading-relaxed">
                      VaultCopy AI injects deep, keyword-rich SEO architecture into every product, moving you from 'Ghost Town' to 'Global Brand' in minutes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-100 flex flex-col gap-4">
                <button 
                  onClick={() => { onCtaClick(); onClose(); }}
                  className="w-full py-5 text-xl font-black text-white bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#6366f1] rounded-[1.5rem] transition-all glow-pulse flex items-center justify-center gap-3 shadow-xl shadow-purple-100/50 btn-shimmer-effect hover:scale-[1.02] active:scale-95 group"
                >
                  START MY FREE SCAN <ShieldCheck className="w-6 h-6 transition-transform group-hover:scale-110" />
                </button>
                <p className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-center gap-2">
                  Join 2,400+ successful Shopify merchants
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
