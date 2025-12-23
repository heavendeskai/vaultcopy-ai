import React from 'react';
import { AlertTriangle, Zap, Shield, Clock, ArrowRight, Sparkles, Play } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
  onAlertClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick, onAlertClick }) => {
  const scrollToSandbox = () => {
    document.getElementById('sandbox')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="text-center space-y-16 max-w-5xl mx-auto py-20 md:py-32">
      <div className="inline-flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 bg-indigo-50/50 rounded-full border border-indigo-100 shadow-sm backdrop-blur-md">
        <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
        Gemini 2.5 Native • 2026 E-commerce Standard
      </div>

      <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-zinc-900 leading-[0.95] tracking-[-0.04em] font-archivo">
        Autonomous <br />
        <span className="gradient-text">Catalog Alpha.</span>
      </h1>

      <div className="space-y-6 max-w-3xl mx-auto">
        <p className="text-xl md:text-2xl text-zinc-500 font-medium leading-relaxed font-inter">
          The world's first fully-autonomous catalog engine. Built for high-performance commerce. 
          Stop manual optimization—deploy intelligence.
        </p>
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">First 3 Products • Infinite ROI • 0 Cost</p>
      </div>

      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <button 
            onClick={onCtaClick}
            className="group px-16 py-8 text-2xl font-black text-white candy-gradient rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(255,107,107,0.4)] hover:brightness-110 transition-all hover:scale-105 active:scale-95 flex items-center gap-5 btn-shimmer-effect glow-pulse font-archivo uppercase tracking-tight"
          >
            Connect Store <ArrowRight className="w-10 h-10 group-hover:translate-x-2 transition-transform" />
          </button>
          
          <button 
            onClick={scrollToSandbox}
            className="px-10 py-8 text-lg font-black text-zinc-900 bg-white border border-zinc-100 rounded-[2.5rem] hover:bg-zinc-50 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3 shadow-xl shadow-zinc-200/20"
          >
            <Play className="w-5 h-5 text-orange-500" /> Live Sandbox
          </button>
        </div>

        <button 
          onClick={onAlertClick}
          className="group relative inline-flex items-center gap-6 px-12 py-7 bg-white border border-zinc-100 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] hover:shadow-[0_48px_96px_-12px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-2 active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-500 shadow-inner">
            <AlertTriangle className="w-6 h-6" />
          </div>
          
          <span className="text-xl font-bold text-zinc-900 relative z-10 flex flex-col items-start text-left">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-1">Critical Briefing</span>
            The 2026 "SEO Death Trap" Report
          </span>
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 pt-10">
         {[
           { icon: Zap, label: 'Instant Sync', color: 'text-orange-500' },
           { icon: Shield, label: 'Bank-Grade AES', color: 'text-purple-500' },
           { icon: Clock, label: '0s Latency', color: 'text-indigo-500' }
         ].map((item, idx) => (
           <div key={idx} className="flex items-center gap-3 px-6 py-3 bg-white border border-zinc-100 rounded-2xl shadow-sm">
             <item.icon className={`w-4 h-4 ${item.color}`} />
             <span className="text-xs font-black uppercase tracking-widest text-zinc-700">{item.label}</span>
           </div>
         ))}
      </div>
    </div>
  );
};
