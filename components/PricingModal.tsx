
import React from 'react';
import { X, Check, Zap, Globe, Sparkles, ArrowRight } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const tiers = [
    {
      name: 'Starter',
      price: '$299',
      limit: 'Up to 100 products',
      desc: 'Essential for boutique stores starting their optimization journey.',
      icon: <Zap className="w-5 h-5" />,
      color: 'bg-white border-zinc-100',
      accentColor: 'text-orange-500',
      btnClass: 'bg-zinc-900 text-white hover:bg-zinc-800'
    },
    {
      name: 'Growth',
      price: '$749',
      limit: 'Up to 500 products',
      desc: 'Maximum performance for scaling brands with large catalogs.',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'bg-zinc-900 text-white border-transparent',
      accentColor: 'text-orange-400',
      featured: true,
      btnClass: 'candy-gradient text-white hover:brightness-110 shadow-lg shadow-orange-500/20'
    },
    {
      name: 'Enterprise',
      price: '$2,499',
      limit: 'Unlimited Products',
      desc: 'Full-autonomous multi-store management and priority sync.',
      icon: <Globe className="w-5 h-5" />,
      color: 'bg-white border-zinc-100',
      accentColor: 'text-purple-500',
      btnClass: 'bg-zinc-900 text-white hover:bg-zinc-800'
    }
  ];

  return (
    <div className="fixed inset-0 z-[150] bg-zinc-950/20 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl bg-white border border-zinc-100 shadow-[0_48px_96px_-12px_rgba(0,0,0,0.1)] rounded-[3rem] animate-in zoom-in duration-300 relative overflow-hidden">
          
          {/* Brand Splashes */}
          <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-orange-400/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/15 rounded-full blur-[140px] pointer-events-none" />

          <div className="p-8 md:p-16 relative z-10">
            <div className="flex justify-between items-start mb-14">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                  <DollarSign className="w-3 h-3" /> Catalog Investment
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight font-archivo">Transparent Pricing</h3>
                <p className="text-zinc-500 font-medium max-w-md">No subscriptions. Pay once per optimization cycle or lock in store-wide bulk deals.</p>
              </div>
              <button 
                onClick={onClose} 
                className="p-3 bg-zinc-50 hover:bg-zinc-100 rounded-2xl transition-all hover:rotate-90"
              >
                <X className="w-6 h-6 text-zinc-400" />
              </button>
            </div>

            {/* A-La-Carte Promo */}
            <div className="mb-12 p-8 bg-zinc-50/50 border border-zinc-100 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-orange-200 transition-colors">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-zinc-100 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-zinc-900 font-archivo">A-La-Carte Flexible Sync</h4>
                  <p className="text-sm font-medium text-zinc-500">Ideal for small merchants with under 60 SKUs.</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-zinc-900">$5.00</span>
                <span className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest">Per Product</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {tiers.map((tier, idx) => (
                <div 
                  key={idx} 
                  className={`p-10 rounded-[2.5rem] border transition-all hover:-translate-y-2 flex flex-col relative ${tier.color} ${tier.featured ? 'shadow-[0_40px_80px_-15px_rgba(255,107,107,0.2)]' : 'shadow-sm'}`}
                >
                  {tier.featured && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 candy-gradient text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                      Recommended for Growth
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tier.featured ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-500'}`}>
                      {tier.icon}
                    </div>
                    <span className={`font-black uppercase tracking-widest text-xs ${tier.featured ? 'text-white/60' : 'text-zinc-400'}`}>{tier.name}</span>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black">{tier.price}</span>
                      <span className={`text-xs font-bold uppercase ${tier.featured ? 'text-white/40' : 'text-zinc-300'}`}>Flat Fee</span>
                    </div>
                    <p className={`mt-2 font-bold ${tier.featured ? 'text-orange-300' : 'text-orange-500'}`}>{tier.limit}</p>
                  </div>
                  
                  <p className={`text-sm mb-10 font-medium leading-relaxed ${tier.featured ? 'text-zinc-400' : 'text-zinc-500'}`}>{tier.desc}</p>
                  
                  <ul className="space-y-4 mb-10 flex-1">
                    {[
                      'Dynamic SEO Architecture',
                      'Gemini 3.0 SGE Optimization',
                      'Instant Store Sync',
                      '24/7 Security Shield'
                    ].map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-sm font-bold">
                        <Check className={`w-4 h-4 ${tier.accentColor}`} /> 
                        <span className={tier.featured ? 'text-white/80' : 'text-zinc-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-5 font-black text-sm uppercase tracking-widest rounded-2xl transition-all btn-shimmer-effect active:scale-95 ${tier.btnClass}`}>
                    Activate {tier.name}
                  </button>
                </div>
              ))}
            </div>

            <p className="mt-14 text-center text-xs font-black text-zinc-400 uppercase tracking-[0.4em] flex items-center justify-center gap-4">
              <span className="h-px w-8 bg-zinc-100" />
              Secure • Instant • One-Time
              <span className="h-px w-8 bg-zinc-100" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DollarSign = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
