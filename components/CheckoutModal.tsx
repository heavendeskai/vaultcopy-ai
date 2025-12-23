
import React, { useState, useMemo } from 'react';
import { X, ShieldCheck, CreditCard, Lock, Sparkles, Zap, Globe, Check, ArrowRight, PackageCheck, ShoppingBag, BadgeCheck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProducts: {id: string, name: string}[];
  onSuccess: () => void;
}

const TIER_PRICES = {
  starter: 299,
  growth: 749,
  enterprise: 2499,
};

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, selectedProducts, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const productCount = selectedProducts.length;

  const checkoutDetails = useMemo(() => {
    let total = 0;
    let tierName = '';
    let isBulk = false;
    let description = '';

    if (productCount < 60) {
      total = productCount * 5;
      tierName = 'A La Carte';
      isBulk = false;
      description = `${productCount} Product Optimizations x $5.00`;
    } else if (productCount <= 100) {
      total = TIER_PRICES.starter;
      tierName = 'Starter Pack';
      isBulk = true;
      description = `Up to 100 Products (Flat Fee)`;
    } else if (productCount <= 500) {
      total = TIER_PRICES.growth;
      tierName = 'Growth Pack';
      isBulk = true;
      description = `Up to 500 Products (Flat Fee)`;
    } else {
      total = TIER_PRICES.enterprise;
      tierName = 'Enterprise';
      isBulk = true;
      description = `Unlimited Products`;
    }

    return { total, tierName, isBulk, description };
  }, [productCount]);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate Stripe API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsProcessing(false);
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[160] bg-zinc-950/40 backdrop-blur-2xl animate-in fade-in duration-300 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl bg-white border border-zinc-100 shadow-[0_64px_128px_-20px_rgba(0,0,0,0.2)] rounded-[3.5rem] animate-in zoom-in duration-500 relative overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Panel: Summary & Selection */}
          <div className="flex-1 p-8 md:p-14 space-y-12 border-r border-zinc-100 bg-white">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-zinc-900 font-archivo tracking-tight">Secure Your 2026 SEO Advantage</h3>
                  <p className="text-zinc-500 font-medium italic">Finalizing optimization for {productCount} products.</p>
                </div>
                {checkoutDetails.isBulk && (
                  <div className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-orange-100 animate-pulse">
                    Bulk Savings Applied
                  </div>
                )}
              </div>
            </div>

            {/* Product Summary List */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                <ShoppingBag className="w-3.5 h-3.5" /> Order Summary
              </div>
              <div className="bg-zinc-50 rounded-[2rem] p-6 max-h-[180px] overflow-y-auto border border-zinc-100 divide-y divide-zinc-200/50">
                {selectedProducts.map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between group">
                    <span className="text-sm font-bold text-zinc-700 truncate max-w-[200px]">{p.name}</span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Ready to Sync</span>
                  </div>
                ))}
                {selectedProducts.length === 0 && <p className="text-sm text-zinc-400 font-medium py-2">No products selected.</p>}
              </div>
            </div>

            {/* Line Item Breakdown */}
            <div className="p-8 bg-zinc-900 rounded-[2.5rem] text-white space-y-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Zap className="w-32 h-32" />
              </div>
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <h4 className="text-lg font-black font-archivo uppercase tracking-tight">{checkoutDetails.tierName}</h4>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest">{checkoutDetails.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-orange-400 font-archivo">${checkoutDetails.total.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[10px] font-black text-white/60 uppercase tracking-widest">
                <span className="flex items-center gap-2"><Lock className="w-3 h-3 text-orange-500" /> AES-256 Protected</span>
                <span className="flex items-center gap-2"><BadgeCheck className="w-3 h-3 text-emerald-400" /> Admin API Securely Connected</span>
              </div>
            </div>

            {/* Upgrade & Save Tier Comparison */}
            <div className="space-y-4">
              <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" /> Upgrade & Save
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'A La Carte', val: '$5.00/ea' },
                  { label: 'Starter', val: '$299 (100)' },
                  { label: 'Growth', val: '$749 (500)' }
                ].map((tier, i) => (
                  <div key={i} className="px-4 py-3 bg-white border border-zinc-100 rounded-2xl flex flex-col items-center text-center">
                    <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">{tier.label}</span>
                    <span className="text-xs font-bold text-zinc-900">{tier.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Checkout Action */}
          <div className="w-full md:w-96 bg-zinc-50 p-8 md:p-14 flex flex-col justify-center space-y-12 relative border-l border-zinc-100">
             <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
               <ShieldCheck className="w-48 h-48" />
             </div>
             
             <div className="space-y-8 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-zinc-200 rounded-full shadow-sm mb-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">2025-2026 Verified</span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Investment Total</p>
                  <p className="text-6xl font-black text-zinc-900 font-archivo tracking-tighter">${checkoutDetails.total.toLocaleString()}</p>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">ONE-TIME PAYMENT • NO RECURRING</p>
                </div>
                
                <div className="h-px w-16 bg-zinc-200 mx-auto" />
                
                <div className="space-y-4">
                  {[
                    'Gemini 3.0 Native SGE Rewrite',
                    'Autonomous Shopify Catalog Sync',
                    'High-Intent Metadata Injection'
                  ].map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-center justify-center gap-2 text-xs font-bold text-zinc-500">
                      <div className="w-4 h-4 bg-emerald-50 rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[4]" />
                      </div>
                      {benefit}
                    </div>
                  ))}
                </div>
             </div>

             <div className="space-y-6 relative z-10">
               <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-6 candy-gradient text-white font-black text-xl rounded-2xl shadow-2xl shadow-orange-500/30 flex items-center justify-center gap-4 hover:brightness-110 active:scale-95 transition-all relative overflow-hidden group btn-shimmer-effect font-archivo tracking-tight"
               >
                 {isProcessing ? (
                   <>
                     <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                     <span>Processing...</span>
                   </>
                 ) : (
                   <>
                     <span>Pay ${checkoutDetails.total.toLocaleString()}</span>
                     <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                   </>
                 )}
               </button>
               
               <div className="flex flex-col items-center gap-3">
                 <div className="flex items-center justify-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                   <Lock className="w-3 h-3 text-zinc-400" /> Bank-Grade Security Protocol
                 </div>
                 <div className="flex items-center gap-4 opacity-40 grayscale hover:opacity-100 transition-opacity">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-3" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Shopify_logo_2018.svg" alt="Shopify" className="h-4" />
                 </div>
               </div>
             </div>

             <button 
              onClick={onClose}
              className="text-[10px] font-black text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-[0.2em] mx-auto flex items-center gap-1 group"
             >
               <X className="w-3 h-3 group-hover:rotate-90 transition-transform" /> Cancel Transaction
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
