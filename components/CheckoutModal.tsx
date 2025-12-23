
import React, { useState, useMemo, useEffect } from 'react';
import { X, ShieldCheck, Lock, Zap, Check, ArrowRight, ShoppingBag, BadgeCheck, Sparkles, CreditCard, Loader2 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProducts: {id: string, name: string}[];
  forcedTier?: any;
  onSuccess: () => void;
}

const TIER_PRICES = {
  starter: 299,
  growth: 749,
  enterprise: 2499,
};

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, selectedProducts, forcedTier, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'details' | 'stripe'>('details');

  // Reset step when modal opens/closes
  useEffect(() => {
    if (!isOpen) setStep('details');
  }, [isOpen]);

  const checkoutDetails = useMemo(() => {
    if (forcedTier) {
      return {
        total: forcedTier.price,
        tierName: `${forcedTier.name} Pack`,
        description: forcedTier.limit,
        isBulk: true
      };
    }

    const productCount = selectedProducts.length;
    let total = 0;
    let tierName = '';
    let isBulk = false;
    let description = '';

    if (productCount < 60) {
      total = productCount * 5;
      tierName = 'A-La-Carte Sync';
      isBulk = false;
      description = `${productCount} Items Optimized x $5.00`;
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
      tierName = 'Enterprise Tier';
      isBulk = true;
      description = `Unlimited Catalog Sync`;
    }

    return { total, tierName, isBulk, description };
  }, [selectedProducts, forcedTier]);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // STRIPE INTEGRATION POINT: 
    // In production, you would call your backend to create a Stripe Checkout Session here.
    // example: const session = await createStripeSession(checkoutDetails);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[160] bg-zinc-950/40 backdrop-blur-2xl animate-in fade-in duration-300 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4 md:p-12">
        <div className="w-full max-w-5xl bg-white border border-zinc-100 shadow-[0_64px_128px_-20px_rgba(0,0,0,0.25)] rounded-[3.5rem] animate-in zoom-in duration-500 relative overflow-hidden flex flex-col md:flex-row">
          
          {/* Summary Section */}
          <div className="flex-1 p-8 md:p-16 space-y-12 border-r border-zinc-100 bg-white">
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3 className="text-3xl font-black text-zinc-900 font-archivo tracking-tight uppercase">Order Summary</h3>
              </div>
              <p className="text-zinc-500 font-medium">Review your catalog license before deployment.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Asset Details</span>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Status: Ready</span>
              </div>
              
              <div className="bg-zinc-50/50 rounded-[2.5rem] p-8 border border-zinc-100 min-h-[200px] flex flex-col">
                {forcedTier ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-zinc-100">
                      <Sparkles className="w-8 h-8 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-zinc-900 font-archivo uppercase">{forcedTier.name} License</h4>
                      <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest mt-1">{forcedTier.limit}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-zinc-200/50">
                      <span className="text-sm font-black text-zinc-900 uppercase">Item Selection</span>
                      <span className="text-sm font-black text-zinc-900">{selectedProducts.length} Products</span>
                    </div>
                    <div className="max-h-[120px] overflow-y-auto pr-4 space-y-2 text-left">
                      {selectedProducts.map((p) => (
                        <div key={p.id} className="flex items-center justify-between text-xs font-bold text-zinc-500">
                          <span className="truncate max-w-[200px]">{p.name}</span>
                          <span className="text-emerald-500">$5.00</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-10 bg-zinc-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <BadgeCheck className="w-20 h-20" />
              </div>
              <div className="flex justify-between items-center relative z-10 text-left">
                <div className="space-y-1">
                  <h4 className="text-xl font-black font-archivo uppercase tracking-tight">{checkoutDetails.tierName}</h4>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{checkoutDetails.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-orange-400 font-archivo tracking-tighter">${checkoutDetails.total.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="w-full md:w-[450px] bg-zinc-50 p-8 md:p-16 flex flex-col justify-center space-y-12 border-l border-zinc-100 relative">
             <button 
               onClick={onClose} 
               className="absolute top-10 right-10 p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
             >
               <X className="w-6 h-6" />
             </button>

             <div className="text-center space-y-4">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.5em]">Secure Payment Protocol</p>
                <div className="flex flex-col">
                  <span className="text-7xl font-black text-zinc-900 font-archivo tracking-tighter">${checkoutDetails.total.toLocaleString()}</span>
                  <span className="text-[10px] font-black text-zinc-300 uppercase mt-2 tracking-widest">Initial Investment</span>
                </div>
             </div>

             <div className="space-y-8">
               <div className="space-y-4">
                 <div className="flex items-center gap-3 px-6 py-4 bg-white border border-zinc-200 rounded-2xl shadow-sm text-left">
                   <CreditCard className="w-5 h-5 text-zinc-400" />
                   <div className="flex-1">
                     <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">Payment Method</p>
                     <p className="text-xs font-bold text-zinc-900">Stripe Secure Handshake</p>
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-3 px-6 py-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                   <ShieldCheck className="w-5 h-5 text-emerald-500" />
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Bank-Grade Encryption Active</p>
                 </div>
               </div>

               <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-7 candy-gradient text-white font-black text-xl rounded-3xl shadow-2xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-4 btn-shimmer-effect uppercase tracking-tight font-archivo"
               >
                 {isProcessing ? (
                   <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Processing...</span>
                   </>
                 ) : (
                   <>
                    <span>Execute Payment</span>
                    <ArrowRight className="w-6 h-6" />
                   </>
                 )}
               </button>
               
               <div className="flex flex-col items-center gap-6 pt-4">
                 <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4" />
                    <div className="h-4 w-px bg-zinc-300" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Shopify_logo_2018.svg" alt="Shopify" className="h-5" />
                 </div>
                 <div className="flex items-center gap-2 text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                   <Lock className="w-3 h-3" /> Encrypted by VaultCopy Node 01
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
