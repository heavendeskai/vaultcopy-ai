
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
  const [forcedTier, setForcedTier] = useState<any>(null);
  
  const scanRef = useRef<HTMLDivElement>(null);

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

  const handleSelectTier = (tier: any) => {
    setIsPricingOpen(false);
    if (tier.id === 'alacarte') {
      scrollToScan();
    } else {
      setForcedTier(tier);
      setIsCheckoutOpen(true);
    }
  };

  const handleOpenCheckout = (products: {id: string, name: string}[]) => {
    setForcedTier(null);
    setSelectedProducts(products);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
    setForcedTier(null);
  };

  const navigateToResources = () => {
    setCurrentView('resources');
  };

  const navigateToMain = () => {
    setCurrentView('main');
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
      <PricingModal 
        isOpen={isPricingOpen} 
        onClose={() => setIsPricingOpen(false)} 
        onSelectTier={handleSelectTier}
      />
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => {
          setIsCheckoutOpen(false);
          setForcedTier(null);
        }} 
        selectedProducts={selectedProducts}
        forcedTier={forcedTier}
        onSuccess={handlePaymentSuccess}
      />
      <SuccessModal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
      <SecurityModal isOpen={isSecurityOpen} onClose={() => setIsSecurityOpen(false)} />
      <LegalModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} title="Privacy Policy" type="privacy" />
      <LegalModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} title="Terms of Service" type="terms" />
      <LeadMagnetSlideOver isOpen={isLeadMagnetOpen} onClose={() => setIsLeadMagnetOpen(false)} onMasterclassAction={(action) => action === 'APPLY_WHOLE_STORE' ? scrollToScan() : setIsPricingOpen(true)} />
      <LeadCaptureModal isOpen={isLeadCaptureOpen} onClose={() => setIsLeadCaptureOpen(false)} onSuccess={() => { setIsLeadCaptureOpen(false); setIsLeadMagnetOpen(true); }} />
      
      <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <VaultLogo onClick={navigateToMain} />
            <div className={`hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${isApiLive ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-amber-50 border-amber-100 text-amber-600'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isApiLive ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`} />
              System: {isApiLive ? 'Live Engine' : 'Stable Fallback'}
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={navigateToMain} className={`text-sm font-semibold ${currentView === 'main' ? 'text-orange-600' : 'text-zinc-500'}`}>How it works</button>
            <button onClick={() => setIsPricingOpen(true)} className="text-sm font-semibold text-zinc-500 hover:text-orange-600">Pricing</button>
            <button onClick={navigateToResources} className={`text-sm font-semibold ${currentView === 'resources' ? 'text-orange-600' : 'text-zinc-500'}`}>Resources</button>
            <button onClick={scrollToScan} className="px-6 py-3 text-sm font-bold text-white candy-gradient rounded-full hover:brightness-110 shadow-lg flex items-center gap-2 btn-shimmer-effect">
              Start Free Scan <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pb-32">
        {currentView === 'resources' ? (
          <BlogView onBack={navigateToMain} onOpenLeadCapture={() => setIsLeadCaptureOpen(true)} onSyncClick={scrollToScan} />
        ) : (
          <div className="space-y-12 py-12">
            {state === AppState.LANDING && (
              <>
                <Hero onCtaClick={scrollToScan} onAlertClick={() => setIsSeoModalOpen(true)} />
                <AISandbox />
                <div ref={scanRef} className="scroll-mt-32">
                  <ConnectionCard onScan={handleScan} urgencyValue={lossUrgency} />
                </div>
              </>
            )}
            {state === AppState.LOADING && <LoadingScreen onComplete={handleLoadingComplete} />}
            {state === AppState.PREVIEW && <PreviewSection onOpenCheckout={handleOpenCheckout} />}
          </div>
        )}
      </main>

      <footer className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <VaultLogo onClick={navigateToMain} />
          <p className="mt-6 text-zinc-400 text-xs font-black uppercase tracking-[0.4em]">© 2025-2026 VaultCopy AI. AES-256 Protected.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
