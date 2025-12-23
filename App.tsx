import React, { useState, useRef, useEffect } from 'react';
import { Hero } from './components/Hero';
import { ConnectionCard } from './components/ConnectionCard';
import { LoadingScreen } from './components/LoadingScreen';
import { PreviewSection } from './components/PreviewSection';
import { SeoDeathTrapModal } from './components/SeoDeathTrapModal';
import { LegalModal } from './components/LegalModal';
import { SecurityModal } from './components/SecurityModal';
import { PricingModal } from './components/PricingModal';
import { CheckoutModal } from './components/CheckoutModal';
import { SuccessModal } from './components/SuccessModal';
import { LeadMagnetSlideOver } from './components/LeadMagnetSlideOver';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { BlogView } from './components/BlogView';
import { AdminDashboard } from './components/AdminDashboard';
import { AISandbox } from './components/AISandbox';
import { AppState } from './types';
import { ChevronRight, Shield, Zap, Download, Image as ImageIcon, Loader2, ArrowLeft, Activity } from 'lucide-react';

const VaultLogo = ({ onClick }: { onClick?: () => void }) => (
  <div className="flex items-center gap-3 group cursor-pointer" onClick={onClick}>
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 bg-indigo-600 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
      <div className="relative w-full h-full bg-gradient-to-br from-[#6366f1] to-[#ec4899] rounded-xl flex items-center justify-center shadow-md border border-white/50 overflow-hidden">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-6 h-6 text-white"
        >
          <path 
            d="M8 9L12 13L16 7" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>
    </div>
    <span className="text-xl font-bold tracking-tight text-zinc-900 font-archivo">
      VaultCopy AI
    </span>
  </div>
);

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.LANDING);
  const [currentView, setCurrentView] = useState<'main' | 'resources' | 'image-assets' | 'admin'>('main');
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);
  const [isLeadCaptureOpen, setIsLeadCaptureOpen] = useState(false);
  const [lossUrgency, setLossUrgency] = useState<number | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<{id: string, name: string}[]>([]);
  
  const scanRef = useRef<HTMLDivElement>(null);

  // System Health Status
  const isApiLive = !!process.env.API_KEY;

  useEffect(() => {
    if (window.location.pathname === '/admin-vault-600k') {
      setCurrentView('admin');
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleScan = () => {
    setState(AppState.LOADING);
  };

  const handleLoadingComplete = () => {
    setState(AppState.PREVIEW);
  };

  const scrollToScan = () => {
    setCurrentView('main');
    setTimeout(() => {
      scanRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleLeadCaptureSuccess = () => {
    setIsLeadCaptureOpen(false);
    setIsLeadMagnetOpen(true);
  };

  const handleMasterclassAction = (action: string, data?: any) => {
    setIsLeadMagnetOpen(false);
    
    switch (action) {
      case 'RECOVER_REVENUE':
        setLossUrgency(data?.lossAmount || null);
        scrollToScan();
        break;
      case 'APPLY_WHOLE_STORE':
        scrollToScan();
        break;
      case 'AUTOMATE_SEMANTIC':
        setIsPricingOpen(true);
        break;
      case 'SHORTCUT_IMAGE_SEO':
        navigateToImageAssets();
        break;
      default:
        break;
    }
  };

  const handleOpenCheckout = (products: {id: string, name: string}[]) => {
    setSelectedProducts(products);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
  };

  const navigateToResources = () => {
    if (currentView === 'resources') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('resources');
    }
  };

  const navigateToMain = () => {
    if (currentView === 'main') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('main');
    }
  };

  const navigateToImageAssets = () => {
    if (currentView === 'image-assets') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('image-assets');
    }
  };

  if (currentView === 'admin') {
    return <AdminDashboard onExit={() => navigateToMain()} />;
  }

  return (
    <div className="min-h-screen selection:bg-orange-100 selection:text-orange-900">
      <SeoDeathTrapModal 
        isOpen={isSeoModalOpen} 
        onClose={() => setIsSeoModalOpen(false)} 
        onCtaClick={scrollToScan}
      />
      <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        selectedProducts={selectedProducts}
        onSuccess={handlePaymentSuccess}
      />
      <SuccessModal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
      <SecurityModal isOpen={isSecurityOpen} onClose={() => setIsSecurityOpen(false)} />
      <LegalModal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
        title="Privacy Policy" 
        type="privacy" 
      />
      <LegalModal 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)} 
        title="Terms of Service" 
        type="terms" 
      />
      <LeadMagnetSlideOver 
        isOpen={isLeadMagnetOpen} 
        onClose={() => setIsLeadMagnetOpen(false)} 
        onMasterclassAction={handleMasterclassAction}
      />
      <LeadCaptureModal 
        isOpen={isLeadCaptureOpen} 
        onClose={() => setIsLeadCaptureOpen(false)} 
        onSuccess={handleLeadCaptureSuccess}
      />
      
      <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <VaultLogo onClick={navigateToMain} />
            
            {/* System Health Badge */}
            <div className={`hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${isApiLive ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-amber-50 border-amber-100 text-amber-600'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isApiLive ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`} />
              System: {isApiLive ? 'Live Engine' : 'Stable Fallback'}
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={navigateToMain} 
              className={`text-sm font-semibold transition-colors ${currentView === 'main' ? 'text-orange-600' : 'text-zinc-500 hover:text-orange-600'}`}
            >
              How it works
            </button>
            <button 
              onClick={() => setIsPricingOpen(true)}
              className="text-sm font-semibold text-zinc-500 hover:text-orange-600 transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={navigateToResources}
              className={`text-sm font-semibold transition-colors ${currentView === 'resources' ? 'text-orange-600' : 'text-zinc-500 hover:text-orange-600'}`}
            >
              Resources
            </button>
            <button 
              onClick={scrollToScan}
              className="px-6 py-3 text-sm font-bold text-white candy-gradient rounded-full hover:brightness-110 transition-all shadow-lg active:scale-95 flex items-center gap-2 btn-shimmer-effect"
            >
              Start Free Scan <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pb-32">
        {currentView === 'resources' && (
          <BlogView 
            onBack={navigateToMain} 
            onOpenLeadCapture={() => setIsLeadCaptureOpen(true)}
            onSyncClick={scrollToScan}
          />
        )}
        
        {currentView === 'image-assets' && (
          <div className="py-20 animate-in fade-in duration-700">
             <div className="text-center space-y-6 mb-16">
               <button onClick={navigateToMain} className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 mx-auto hover:text-zinc-900 transition-colors">
                 <ArrowLeft className="w-4 h-4" /> Dashboard
               </button>
               <h2 className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tight font-archivo">Image Assets Engine</h2>
               <p className="text-zinc-500 font-medium max-w-xl mx-auto">Analyze, optimize, and rank your entire media library in minutes.</p>
             </div>
             
             <div className="max-w-4xl mx-auto bg-white border border-zinc-100 rounded-[3rem] p-20 flex flex-col items-center justify-center text-center space-y-8 shadow-2xl">
               <div className="w-24 h-24 bg-orange-50 rounded-[2rem] flex items-center justify-center relative">
                 <ImageIcon className="w-12 h-12 text-orange-500" />
                 <Loader2 className="absolute -top-2 -right-2 w-8 h-8 text-orange-500 animate-spin" />
               </div>
               <div className="space-y-2">
                 <h3 className="text-2xl font-black text-zinc-900 font-archivo">Analyzing Catalog Media...</h3>
                 <p className="text-zinc-500">Mapping visual semantic layers for Gemini 3.0 SGE ranking.</p>
               </div>
               <div className="w-full max-w-sm h-2 bg-zinc-50 rounded-full overflow-hidden border border-zinc-100">
                 <div className="h-full candy-gradient animate-shimmer w-[65%]" />
               </div>
             </div>
          </div>
        )}

        {currentView === 'main' && (
          <>
            {state === AppState.LANDING && (
              <div className="space-y-12 py-12 animate-in fade-in duration-1000">
                <Hero onCtaClick={scrollToScan} onAlertClick={() => setIsSeoModalOpen(true)} />
                
                <AISandbox />
                
                <div ref={scanRef} className="scroll-mt-32">
                  <ConnectionCard 
                    onScan={handleScan} 
                    urgencyValue={lossUrgency} 
                  />
                </div>
                
                <div className="pt-24 text-center space-y-12">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-zinc-100"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-transparent px-4 text-xs font-black tracking-[0.3em] text-zinc-400 uppercase">Trusted by high-growth brands</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                    <span className="text-4xl font-black text-zinc-300 hover:text-zinc-500 transition-all cursor-default select-none tracking-tighter opacity-80 hover:opacity-100">LUMOS</span>
                    <span className="text-4xl font-black text-zinc-300 hover:text-zinc-500 transition-all cursor-default select-none tracking-tighter opacity-80 hover:opacity-100">AVALON</span>
                    <span className="text-4xl font-black text-zinc-300 hover:text-zinc-500 transition-all cursor-default select-none tracking-tighter opacity-80 hover:opacity-100">ORION.CO</span>
                    <span className="text-4xl font-black text-zinc-300 hover:text-zinc-500 transition-all cursor-default select-none tracking-tighter opacity-80 hover:opacity-100">STELLAR</span>
                  </div>
                </div>
              </div>
            )}

            {state === AppState.LOADING && (
              <LoadingScreen onComplete={handleLoadingComplete} />
            )}

            {state === AppState.PREVIEW && (
              <PreviewSection onOpenCheckout={handleOpenCheckout} />
            )}
          </>
        )}
      </main>

      <footer className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 space-y-8">
              <VaultLogo onClick={navigateToMain} />
              <p className="text-zinc-500 max-w-sm font-medium leading-relaxed text-lg">
                VaultCopy AI: The world's first fully-autonomous catalog optimization engine. Built for high-performance commerce.
              </p>
              <button 
                onClick={() => setIsSecurityOpen(true)}
                className="p-6 text-left bg-zinc-50 rounded-3xl border border-zinc-100 space-y-3 hover:bg-zinc-100 transition-all group"
              >
                <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm uppercase tracking-wider">
                  <Shield className="w-4 h-4 text-orange-500" /> Bank-Grade Encryption
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                  Your Shopify API tokens are encrypted in transit and never stored on our servers. Security is our first, second, and third priority.
                </p>
              </button>
            </div>
            
            <div className="space-y-8">
              <h4 className="font-black text-zinc-900 uppercase tracking-widest text-xs">Product</h4>
              <ul className="space-y-4 text-sm text-zinc-400 font-bold">
                <li><button onClick={navigateToMain} className="hover:text-orange-600 transition-colors">How it Works</button></li>
                <li><button onClick={() => setIsPricingOpen(true)} className="hover:text-orange-600 transition-colors">Pricing</button></li>
                <li><button onClick={() => setIsSecurityOpen(true)} className="hover:text-orange-600 transition-colors">Security Audit</button></li>
                <li><button onClick={scrollToScan} className="hover:text-orange-600 transition-colors">Bulk Sync</button></li>
              </ul>
            </div>
            
            <div className="space-y-8">
              <h4 className="font-black text-zinc-900 uppercase tracking-widest text-xs">Resources</h4>
              <ul className="space-y-4 text-sm text-zinc-400 font-bold">
                <li><button onClick={navigateToResources} className="hover:text-orange-600 transition-colors">Intelligence Hub</button></li>
                <li><button onClick={() => setIsLeadCaptureOpen(true)} className="hover:text-orange-600 transition-colors">2026 Shopify SEO Masterclass</button></li>
                <li><button onClick={() => setIsPrivacyOpen(true)} className="hover:text-orange-600 transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => setIsTermsOpen(true)} className="hover:text-orange-600 transition-colors">Terms of Service</button></li>
                <li className="pt-2">
                  <button 
                    onClick={() => setIsLeadCaptureOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-xl text-xs font-black uppercase tracking-tight hover:bg-orange-100 transition-all"
                  >
                    Free Masterclass <Download className="w-3.5 h-3.5" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-zinc-50 text-center flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-zinc-300 font-black tracking-widest uppercase">© 2025-2026 VaultCopy AI. All Rights Reserved.</p>
            <div className="flex items-center gap-6 opacity-40 grayscale hover:opacity-100 transition-all duration-500">
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Shopify_logo_2018.svg" alt="Shopify" className="h-5" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;