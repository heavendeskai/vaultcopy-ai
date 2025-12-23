
import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, RefreshCw, Copy, Check, Zap, AlertCircle, Cpu, Target, Search } from 'lucide-react';
import { generateOptimizedPreview } from '../services/geminiService';

const THINKING_STEPS = [
  "Analyzing semantic depth...",
  "Mapping conversion triggers...",
  "Injecting SGE authority...",
  "Refining brand voice...",
  "Finalizing copy profile..."
];

export const AISandbox: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [optimized, setOptimized] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isOptimizing) {
      interval = setInterval(() => {
        setThinkingStep((prev) => (prev + 1) % THINKING_STEPS.length);
      }, 800);
    } else {
      setThinkingStep(0);
    }
    return () => clearInterval(interval);
  }, [isOptimizing]);

  const handleOptimize = async () => {
    if (!productName || isOptimizing) return;
    setIsOptimizing(true);
    setOptimized('');
    
    const inputDesc = description || `A premium ${productName} designed for high-performance use cases.`;
    
    try {
      // The service now handles its own fallback, so we just wait for the result.
      const result = await generateOptimizedPreview(productName, inputDesc);
      setOptimized(result);
    } catch (err) {
      // Final emergency fallback if even the service fails
      setOptimized(`The ${productName} represents the pinnacle of modern design, offering unparalleled performance for the discerning professional.`);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleCopy = () => {
    if (!optimized) return;
    navigator.clipboard.writeText(optimized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="sandbox" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-32">
      <div className="bg-white rounded-[4rem] border border-zinc-100 shadow-[0_64px_128px_-20px_rgba(0,0,0,0.08)] p-12 md:p-20 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-50/50 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
            <Zap className="w-3.5 h-3.5" /> Zero Friction Demo
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tight font-archivo">Test the <span className="gradient-text">Alpha Engine.</span></h2>
          <p className="text-zinc-500 font-medium max-w-xl mx-auto">See why high-growth brands are ditching manual copywriting for Vault's autonomous engine.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Input Panel */}
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-black text-zinc-400 uppercase tracking-widest ml-2 flex items-center gap-2">
                <Target className="w-3.5 h-3.5" /> Product Identity
              </label>
              <input 
                type="text"
                placeholder="e.g. Stealth-X Minimalist Wallet"
                className="w-full px-8 py-6 text-lg bg-zinc-50 border border-zinc-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/20 transition-all font-bold placeholder:text-zinc-300"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black text-zinc-400 uppercase tracking-widest ml-2 flex items-center gap-2">
                <Search className="w-3.5 h-3.5" /> Current Description (Optional)
              </label>
              <textarea 
                placeholder="Leave blank for an auto-generated baseline..."
                className="w-full h-40 px-8 py-6 text-sm bg-zinc-50 border border-zinc-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/20 transition-all font-medium placeholder:text-zinc-300 resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button 
              onClick={handleOptimize}
              disabled={!productName || isOptimizing}
              className="w-full py-8 candy-gradient text-white font-black text-xl rounded-[2rem] shadow-2xl shadow-orange-500/20 flex items-center justify-center gap-4 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 btn-shimmer-effect font-archivo uppercase tracking-tight group"
            >
              {isOptimizing ? (
                <>
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  <span>Syncing with Alpha...</span>
                </>
              ) : (
                <>
                  <span>Deploy Alpha Sync</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Result Panel */}
          <div className="relative">
            {isOptimizing ? (
              <div className="aspect-square lg:aspect-auto lg:h-[480px] bg-zinc-950 rounded-[3.5rem] flex flex-col items-center justify-center text-center p-12 space-y-8 animate-pulse shadow-2xl">
                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center border border-white/5">
                  <Cpu className="w-10 h-10 text-orange-400 animate-spin" />
                </div>
                <div className="space-y-3">
                  <p className="text-orange-400 font-black uppercase text-xs tracking-[0.3em]">{THINKING_STEPS[thinkingStep]}</p>
                  <p className="text-zinc-500 text-sm font-medium">Reconstructing your catalog identity...</p>
                </div>
              </div>
            ) : !optimized ? (
              <div className="aspect-square lg:aspect-auto lg:h-[480px] bg-zinc-50 border border-dashed border-zinc-200 rounded-[3.5rem] flex flex-col items-center justify-center text-center p-12 space-y-6">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center border border-zinc-100 shadow-sm text-zinc-300">
                  <Sparkles className="w-10 h-10" />
                </div>
                <p className="text-zinc-400 font-bold uppercase text-xs tracking-widest">Waiting for Input...</p>
                <p className="text-zinc-300 text-[10px] font-medium max-w-[200px]">Enter a product name to trigger the Alpha conversion engine.</p>
              </div>
            ) : (
              <div className="p-10 md:p-14 bg-zinc-950 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] space-y-10 relative overflow-hidden animate-in fade-in zoom-in duration-500">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Sparkles className="w-24 h-24 text-white sparkle-animation" />
                </div>
                
                <div className="flex justify-between items-center relative z-10">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-lg text-[9px] font-black text-orange-400 uppercase tracking-widest">SGE Optimized</span>
                    <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-lg text-[9px] font-black text-indigo-400 uppercase tracking-widest">Conversion-Ready</span>
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white/40 hover:text-white"
                  >
                    {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>

                <div className="space-y-6 relative z-10">
                  <h4 className="text-2xl font-black text-white font-archivo leading-tight">
                    {productName} <span className="text-zinc-600 block text-sm mt-1 uppercase tracking-widest">Alpha-V Output Profile</span>
                  </h4>
                  <div className="h-px w-full bg-white/10" />
                  <p className="text-lg text-zinc-300 font-medium leading-relaxed font-inter italic">
                    "{optimized}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-none">Est. Click Delta</p>
                    <p className="text-xl font-black text-emerald-400 font-archivo tracking-tight">+142%</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-none">Topic Authority</p>
                    <p className="text-xl font-black text-indigo-400 font-archivo tracking-tight">9.8/10</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
