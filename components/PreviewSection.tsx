
import React, { useState, useMemo } from 'react';
import { MOCK_PREVIEWS, MOCK_CATALOG, TRUST_BADGES } from '../constants';
import { Sparkles, ArrowRight, Star, ArrowUpRight, Check, ListChecks, ShoppingCart, Lock, Info, Circle, CheckCircle2, Layers } from 'lucide-react';
import { PricingModal } from './PricingModal';

interface PreviewSectionProps {
  onOpenCheckout?: (products: {id: string, name: string}[]) => void;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({ onOpenCheckout }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['1', '2', '3']));
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isUpgraded, setIsUpgraded] = useState(false);

  const toggleProduct = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const toggleAll = () => {
    const allIdsArray = [...MOCK_PREVIEWS.map(p => p.id), ...MOCK_CATALOG.map(p => p.id)];
    if (selectedIds.size === allIdsArray.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(allIdsArray));
    }
  };

  const selectedProductList = useMemo(() => {
    const all = [...MOCK_PREVIEWS, ...MOCK_CATALOG];
    return all
      .filter(p => selectedIds.has(p.id))
      .map(p => ({ id: p.id, name: p.name }));
  }, [selectedIds]);

  const pricing = useMemo(() => {
    const count = selectedIds.size;
    
    // Free credits handling
    if (count <= 3 && !isUpgraded) {
      return { total: 0, label: 'Free Trial', tier: 'Trial' };
    }
    
    let total = count * 5;
    let tier = 'A-La-Carte';
    
    if (count >= 60 && count <= 100) {
      total = 299;
      tier = 'Starter';
    } else if (count > 100 && count <= 500) {
      total = 749;
      tier = 'Growth';
    } else if (count > 500) {
      total = 2499;
      tier = 'Enterprise';
    }
    
    return { total, label: tier, tier };
  }, [selectedIds, isUpgraded]);

  return (
    <section className="py-20 space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative pb-48">
      <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />

      {/* Credit Progress Bar */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white border border-zinc-100 rounded-3xl p-6 shadow-xl shadow-orange-50/20 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 candy-gradient" />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 candy-gradient rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">Status</p>
                <p className="text-xs font-bold text-zinc-900 uppercase tracking-widest">{pricing.tier === 'Trial' ? 'Free Credits Applied' : `${pricing.tier} Tier Active`}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-black text-orange-600 leading-none">
                {pricing.tier === 'Trial' ? `${Math.min(selectedIds.size, 3)}/3` : 'PREMIUM'}
              </p>
              <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mt-1">Credits Used</p>
            </div>
          </div>
          <div className="h-2 bg-zinc-50 rounded-full overflow-hidden border border-zinc-100">
            <div 
              className="h-full candy-gradient transition-all duration-700" 
              style={{ width: pricing.tier === 'Trial' ? `${(Math.min(selectedIds.size, 3) / 3) * 100}%` : '100%' }}
            />
          </div>
          <p className="text-[10px] text-zinc-400 font-bold flex items-center gap-1.5">
            <Info className="w-3 h-3 text-orange-400" /> Selective sync allows you to optimize specific items or your whole catalog.
          </p>
        </div>
      </div>

      {/* Previews Heading */}
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center px-4 py-2 text-[10px] font-black text-orange-600 bg-orange-50 rounded-full border border-orange-100 uppercase tracking-[0.2em]">
            <Layers className="w-3.5 h-3.5 mr-2" /> Selective Sync Active
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight font-archivo">Verify & Sync Previews</h2>
          <p className="max-w-xl text-lg text-zinc-500 font-medium font-inter">
            Select the high-converting copy versions you want to push to Shopify.
          </p>
        </div>
        
        <button 
          onClick={toggleAll}
          className="px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all active:scale-95"
        >
          {selectedIds.size === (MOCK_PREVIEWS.length + MOCK_CATALOG.length) ? 'Deselect All' : 'Select All Products'}
        </button>
      </div>

      {/* Previews List */}
      <div className="grid gap-20 max-w-5xl mx-auto px-4">
        {MOCK_PREVIEWS.map((product) => {
          const isSelected = selectedIds.has(product.id);
          return (
            <div key={product.id} className="grid md:grid-cols-12 gap-8 items-start group relative">
              <button 
                onClick={() => toggleProduct(product.id)}
                className={`absolute -left-4 md:-left-6 top-0 z-20 w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-90 border-2 ${
                  isSelected ? 'candy-gradient border-white text-white' : 'bg-white border-zinc-100 text-zinc-300 hover:text-orange-400 hover:border-orange-100'
                }`}
              >
                {isSelected ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
              </button>

              <div className="md:col-span-4 lg:col-span-3">
                <div className={`aspect-square overflow-hidden rounded-[2.5rem] border-2 transition-all group-hover:-translate-y-1 shadow-2xl ${isSelected ? 'border-orange-200' : 'border-zinc-100'}`}>
                  <img src={product.imageUrl} alt={product.name} className={`object-cover w-full h-full transition-all duration-700 ${!isSelected ? 'grayscale opacity-40' : ''}`} />
                </div>
                <h4 className={`mt-6 text-xl font-black font-archivo transition-colors ${isSelected ? 'text-zinc-900' : 'text-zinc-300'}`}>{product.name}</h4>
              </div>

              <div className="md:col-span-8 lg:col-span-9 grid md:grid-cols-2 gap-4">
                <div className={`p-8 bg-zinc-50 border border-zinc-100 rounded-[2.5rem] transition-all ${!isSelected ? 'opacity-40 grayscale' : ''}`}>
                  <div className="flex justify-between items-center mb-6">
                    <span className="px-3 py-1 text-[9px] font-black tracking-[0.2em] text-zinc-400 uppercase bg-white rounded border border-zinc-100">Original</span>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-500 italic font-medium font-inter">"{product.beforeDescription}"</p>
                </div>

                <div className={`p-8 bg-zinc-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group/card transition-all ${!isSelected ? 'opacity-20 blur-[2px]' : ''}`}>
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                    <Sparkles className="w-16 h-16 sparkle-animation" />
                  </div>
                  <div className="flex justify-between items-center mb-6 relative z-10">
                    <span className="px-3 py-1 text-[9px] font-black tracking-[0.2em] text-orange-300 uppercase bg-white/5 rounded border border-white/10">Optimized</span>
                    <div className="flex items-center text-[10px] font-black text-orange-400 uppercase tracking-widest">
                      SEO: {product.seoScore.after}% <ArrowUpRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed font-bold font-inter relative z-10">{product.afterDescription}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Price Calculator Bar */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[80] w-[95%] max-w-2xl animate-in slide-in-from-bottom-12 duration-700">
        <div className="bg-zinc-950/90 backdrop-blur-2xl border border-white/10 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.5)] rounded-[2.2rem] p-5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 px-4">
            <div className="flex flex-col">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-2">Selected Delta</p>
              <p className="text-xl font-black text-white font-archivo leading-none">
                {selectedIds.size} <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Products</span>
              </p>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <div className="flex flex-col">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-2">Investment</p>
              <p className="text-xl font-black text-white font-archivo leading-none">
                <span className="text-emerald-400">${pricing.total.toFixed(2)}</span>
                <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest ml-2">({pricing.label})</span>
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => onOpenCheckout?.(selectedProductList)}
            className="w-full sm:w-auto px-10 py-5 candy-gradient text-white font-black text-base uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3 hover:brightness-110 hover:scale-105 active:scale-95 btn-shimmer-effect font-archivo"
          >
            Purchase Credits <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Catalog Checklist */}
      <div className="max-w-5xl mx-auto px-4 space-y-10 relative mt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-600 font-black text-xs uppercase tracking-widest">
              <LinkChecks className="w-4 h-4" /> Ready for Autonomous Optimization
            </div>
            <h3 className="text-3xl font-black text-zinc-900 font-archivo">Complete Catalog</h3>
            <p className="text-zinc-500 font-medium">We found {MOCK_CATALOG.length} total products requiring optimization.</p>
          </div>
        </div>

        <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-zinc-200">
          {MOCK_CATALOG.map((product) => {
            const isSelectedInList = selectedIds.has(product.id);
            return (
              <div 
                key={product.id}
                onClick={() => toggleProduct(product.id)}
                className={`flex items-center gap-6 p-5 rounded-2xl border transition-all cursor-pointer group ${
                  isSelectedInList 
                    ? 'bg-orange-50/40 border-orange-200 shadow-md' 
                    : 'bg-white border-zinc-100 hover:border-zinc-200'
                }`}
              >
                <div className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-xl transition-all ${
                  isSelectedInList ? 'candy-gradient text-white shadow-lg shadow-orange-200' : 'bg-zinc-50 text-zinc-300 border border-zinc-100'
                }`}>
                  {isSelectedInList ? <Check className="w-4 h-4 stroke-[4]" /> : <Circle className="w-4 h-4" />}
                </div>
                <img src={product.img} alt="" className="w-14 h-14 rounded-xl object-cover border border-zinc-100" />
                <div className="flex-1">
                  <p className={`text-lg font-black font-archivo transition-colors ${isSelectedInList ? 'text-zinc-900' : 'text-zinc-400'}`}>
                    {product.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const LinkChecks = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
