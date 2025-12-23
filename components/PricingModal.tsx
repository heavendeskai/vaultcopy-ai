
import React from 'react';
import { X, Check, Zap, Globe, Sparkles, ArrowRight, DollarSign } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTier?: (tier: any) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, onSelectTier }) => {
  if (!isOpen) return null;

  const tiers = [
    {
      id: 'starter',
      name: 'Starter',
      price: 299,
      limit: 'Up to 100 products',
      desc: 'Essential for boutique stores starting their optimization journey.',
      icon: <Zap className="w-5 h-5" />,
      color: 'bg-white border-zinc-100',
      accentColor: 'text-orange-500',
      btnClass: 'bg-zinc-900 text-white hover:bg-zinc-800'
    },
    {
      id: 'growth',
      name: 'Growth',
      price: 749,
      limit: 'Up to 500 products',
      desc: 'Maximum performance for scaling brands with large catalogs.',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'bg-zinc-900 text-white border-transparent',
      accentColor: 'text-orange-400',
      featured: true,
      btnClass: 'candy-gradient text-white hover:brightness-110 shadow-lg shadow-orange-500/20'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 2499,
      limit: 'Unlimited Products',
      desc: 'Full-autonomous multi-store management and priority sync.',
      icon: <Globe className="w-5 h-5" />,
      color: 'bg-white border-zinc-100',
      accentColor: 'text-purple-500',
      btnClass: 'bg-zinc-900 text-white hover:bg-zinc-800'
    }
  ];

  const handleSelect = (tier: any) => {
    if (onSelectTier) {
      onSelectTier(tier);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-zinc-950/40 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4 md:p-12">
        <div className="w-full max-w-6xl bg-white border border-zinc-100 shadow-[0_48px_96px_-12px_rgba(0,0,0,0.15)] rounded-[3rem] animate-in zoom-in duration-300 relative overflow-hidden">
          
          <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-orange-400/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="p-8 md:p-16 relative z-10">
            <div className="flex justify-between items-start mb-14">
              <div className="space-y-2 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                  <DollarSign className="w-3 h-3" /> Catalog Investment
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tight font-archivo uppercase">Transparent Pricing</h3>
                <p className="text-zinc-500 font-medium max-w-md">No subscriptions. Pay once per optimization cycle or lock in store-wide bulk deals.</p>
              </div>
              <button 
                onClick={onClose} 
                className="p-4 bg-zinc-50 hover:bg-zinc-100 rounded-2xl transition-all hover:rotate-90 group"
              >
                <X className="w-6 h-6 text-zinc-400 group-hover:text-zinc-900" />
              </button>
            </div>

            {/* A-La-Carte Selector */}
            <button 
              onClick={() => handleSelect({ id: 'alacarte', name: 'A-La-Carte', price: 5, isPerProduct: true })}
              className="w-full mb-12 p-10 bg-zinc-50 border border-zinc-100 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-orange-400 hover:bg-white transition-all text-left shadow-sm hover:shadow-xl hover:shadow-orange-500/5 active:scale-[0.99]"
            >
              <div className="flex items-center gap-8">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-zinc-100 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-zinc-900 font-archivo">A-La-Carte Flexible Sync</h4>
                  <p className="text-sm font-medium text-zinc-500">Ideal for small merchants with specific SKU needs.</p>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-zinc-900">$5.00</span>
                  <span className="text-zinc-400 font-bold uppercase text-xs tracking-widest">Per Product</span>
                </div>
                <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest mt-2 group-hover:translate-x-2 transition-transform flex items-center gap-2">
                  Select Custom Amount <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </button>
            
            <div className="grid md:grid-cols-3 gap-8">
              {tiers.map((tier, idx) => (
                <div 
                  key={idx} 
                  className={`p-12 rounded-[3rem] border transition-all hover:-translate-y-2 flex flex-col relative ${tier.color} ${tier.featured ? 'shadow-[0_40px_80px_-15px_rgba(255,107,107,0.2)]' : 'shadow-sm'}`}
                >
                  {tier.featured && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 candy-gradient text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg border-4 border-white">
                      Recommended
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tier.featured ? 'bg-white/10 text-white' : 'bg-orange-50 text-orange-500 border border-orange-100'}`}>
                      {tier.icon}
                    </div>
                    <span className={`font-black uppercase tracking-widest text-sm ${tier.featured ? 'text-white/60' : 'text-zinc-400'}`}>{tier.name}</span>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black">${tier.price}</span>
                      <span className={`text-xs font-bold uppercase tracking-widest ${tier.featured ? 'text-white/40' : 'text-zinc-300'}`}>One-Time</span>
                    </div>
                    <p className={`mt-3 font-black uppercase text-[10px] tracking-widest ${tier.featured ? 'text-orange-300' : 'text-orange-500'}`}>{tier.limit}</p>
                  </div>
                  
                  <p className={`text-sm mb-10 font-medium leading-relaxed ${tier.featured ? 'text-zinc-400' : 'text-zinc-500'}`}>{tier.desc}</p>
                  
                  <ul className="space-y-5 mb-12 flex-1">
                    {[
                      'Dynamic SEO Architecture',
                      'Gemini 3.0 SGE Optimization',
                      'Instant Store Sync',
                      '24/7 Security Shield'
                    ].map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-4 text-xs font-bold">
                        <Check className={`w-5 h-5 shrink-0 ${tier.featured ? 'text-orange-400' : 'text-orange-500'}`} /> 
                        <span className={tier.featured ? 'text-white/80' : 'text-zinc-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleSelect(tier)}
                    className={`w-full py-6 font-black text-sm uppercase tracking-widest rounded-[1.5rem] transition-all btn-shimmer-effect active:scale-95 shadow-xl ${tier.btnClass}`}
                  >
                    Select {tier.name}
                  </button>
                </div>
              ))}
            </div>

            <p className="mt-16 text-center text-[10px] font-black text-zinc-300 uppercase tracking-[0.6em] flex items-center justify-center gap-6">
              <span className="h-px w-12 bg-zinc-100" />
              AES-256 Protected • SSL SECURE • STRIPE READY
              <span className="h-px w-12 bg-zinc-100" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
