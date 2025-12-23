
import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Target, Zap, BookOpen, Layers, Image as ImageIcon, ChevronRight, Calculator, Download, ArrowRight, MousePointer2, RefreshCw, CheckCircle2, Loader2 } from 'lucide-react';

interface LeadMagnetSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  onMasterclassAction?: (action: string, data?: any) => void;
}

export const LeadMagnetSlideOver: React.FC<LeadMagnetSlideOverProps> = ({ isOpen, onClose, onMasterclassAction }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Loss Calculator State
  const [visitors, setVisitors] = useState<number>(5000);
  const [convRate, setConvRate] = useState<number>(1.5);
  const aov = 85; // Fixed AOV for simplicity

  // Title Generator State
  const [productInput, setProductInput] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);

  // Image Slider State
  const [sliderValue, setSliderValue] = useState(50);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(progress);
      }
    };
    const current = containerRef.current;
    if (isOpen && current) {
      current.addEventListener('scroll', handleScroll);
    }
    return () => current?.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const calculateLoss = () => {
    // Logic: Assume poor SEO costs 30% of potential traffic
    const potentialMonthlyRevenue = (visitors / 0.7) * (convRate / 100) * aov;
    const currentMonthlyRevenue = visitors * (convRate / 100) * aov;
    return Math.max(0, potentialMonthlyRevenue - currentMonthlyRevenue);
  };

  const handleGenerateTitle = () => {
    if (!productInput) return;
    setIsGeneratingTitle(true);
    setGeneratedTitle('');
    
    setTimeout(() => {
      const templates = [
        `The Ultimate ${productInput}: Performance Grade & Built to Last`,
        `Master the ${productInput} Experience - Exclusive 2026 Edition`,
        `${productInput} Pro-Series | High-Converting Design for Modern Living`
      ];
      setGeneratedTitle(templates[Math.floor(Math.random() * templates.length)]);
      setIsGeneratingTitle(false);
    }, 1500);
  };

  const lossAmount = calculateLoss();
  const lossPercentage = (lossAmount / (visitors * (convRate / 100) * aov + lossAmount)) * 100;

  return (
    <>
      <div 
        className={`fixed inset-0 z-[110] bg-zinc-950/40 backdrop-blur-md transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div 
        className={`fixed top-0 right-0 z-[120] h-full w-full max-w-4xl bg-[#fafafa] shadow-[-40px_0_80px_-20px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-hidden flex flex-col`}
      >
        {/* Progress Bar Top */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-zinc-100 z-[130]">
          <div 
            className="h-full candy-gradient transition-all duration-300" 
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Sticky Header */}
        <div className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-md border-b border-zinc-100 z-[125]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-white shadow-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-zinc-900 font-archivo tracking-tight uppercase">2026 SEO Masterclass</h4>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{Math.round(scrollProgress)}% Completed</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 bg-zinc-50 hover:bg-zinc-100 rounded-2xl transition-all hover:rotate-90"
          >
            <X className="w-6 h-6 text-zinc-400" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Main Dashboard Content */}
          <div 
            ref={containerRef}
            className="flex-1 overflow-y-auto p-8 md:p-14 space-y-24 scroll-smooth pb-32"
          >
            {/* Intro Section */}
            <section id="intro" className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                <Sparkles className="w-3 h-3" /> Industry Alpha
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-zinc-900 tracking-tighter leading-[1.05] font-archivo">
                The Anatomy of <br />
                <span className="gradient-text">Search Dominance</span>
              </h2>
              <p className="text-xl text-zinc-500 font-medium leading-relaxed max-w-2xl font-inter">
                This isn't just a guide. It's the technical blueprint for the 10% of merchants who win. Everything else is just noise.
              </p>
            </section>

            {/* Loss Calculator Component */}
            <section id="calculator" className="space-y-10">
              <div className="p-10 bg-white border border-zinc-100 rounded-[3rem] shadow-xl shadow-zinc-200/50 space-y-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[100px] -z-10" />
                <div className="flex flex-col md:flex-row gap-10 items-center">
                  <div className="flex-1 space-y-8">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black text-zinc-900 font-archivo">Revenue Loss Calculator</h3>
                      <p className="text-zinc-500 font-medium">Quantify the cost of generic product copy and weak SEO.</p>
                    </div>

                    <div className="grid gap-6">
                      <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Monthly Visitors</label>
                        <input 
                          type="range" min="1000" max="100000" step="1000"
                          value={visitors} onChange={(e) => setVisitors(Number(e.target.value))}
                          className="w-full accent-orange-500"
                        />
                        <div className="flex justify-between font-black text-zinc-900 text-sm">
                          <span>{visitors.toLocaleString()}</span>
                          <span className="text-zinc-300">100k+</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Conversion Rate (%)</label>
                        <input 
                          type="range" min="0.1" max="10" step="0.1"
                          value={convRate} onChange={(e) => setConvRate(Number(e.target.value))}
                          className="w-full accent-purple-500"
                        />
                        <div className="flex justify-between font-black text-zinc-900 text-sm">
                          <span>{convRate}%</span>
                          <span className="text-zinc-300">10%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-80 p-8 bg-zinc-900 rounded-[2.5rem] text-center space-y-6 shadow-2xl">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Estimated Annual Loss</p>
                    <div className="space-y-2">
                      <span className="text-4xl font-black text-white font-archivo">
                        ${(lossAmount * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-500 transition-all duration-500" 
                          style={{ width: `${Math.min(lossPercentage * 3, 100)}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-xs font-bold text-red-400">🚨 Critical Performance Gap Identified</p>
                    <button 
                      onClick={() => onMasterclassAction?.('RECOVER_REVENUE', { lossAmount: lossAmount * 12 })}
                      className="w-full py-4 candy-gradient text-white font-black text-sm uppercase tracking-widest rounded-xl hover:brightness-110 transition-all active:scale-95"
                    >
                      Recover My Revenue
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Module 1: H1 Formula */}
            <section id="module-1" className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-orange-100 rounded-[1.5rem] flex items-center justify-center text-orange-600 font-black text-2xl">
                  01
                </div>
                <div>
                  <h3 className="text-3xl font-black text-zinc-900 font-archivo tracking-tight">The H1 Formula: BAU Architecture</h3>
                  <p className="text-zinc-500 font-medium italic">Benefit-Action-Urgency: The framework of the 1%.</p>
                </div>
              </div>

              <div className="p-10 bg-zinc-50 border border-zinc-100 rounded-[3rem] space-y-8">
                <p className="text-zinc-600 font-medium leading-relaxed">
                  Stop using names as titles. Use hooks as titles. Your H1 should answer the "Why" before the "What".
                </p>

                <div className="bg-white p-8 rounded-[2rem] border border-zinc-200 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                      <RefreshCw className={`w-5 h-5 text-orange-500 ${isGeneratingTitle ? 'animate-spin' : ''}`} />
                    </div>
                    <h4 className="text-lg font-black text-zinc-900 font-archivo">Try the BAU Generator</h4>
                  </div>
                  <div className="flex gap-3">
                    <input 
                      type="text"
                      placeholder="Enter a generic product name..."
                      className="flex-1 px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-orange-500/20"
                      value={productInput}
                      onChange={(e) => setProductInput(e.target.value)}
                      disabled={isGeneratingTitle}
                    />
                    <button 
                      onClick={handleGenerateTitle}
                      disabled={isGeneratingTitle || !productInput}
                      className="px-8 py-4 bg-zinc-900 text-white font-black rounded-2xl hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                    >
                      {isGeneratingTitle ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      {isGeneratingTitle ? 'Generating...' : 'Optimize'}
                    </button>
                  </div>
                  {generatedTitle && (
                    <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl animate-in zoom-in duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Success: Optimized BAU Formula</p>
                      </div>
                      <p className="text-lg font-black text-zinc-900 font-archivo">{generatedTitle}</p>
                    </div>
                  )}
                </div>

                <div className="pt-6">
                  <button 
                    onClick={() => onMasterclassAction?.('APPLY_WHOLE_STORE')}
                    className="flex items-center gap-3 text-orange-600 font-black text-sm uppercase tracking-widest hover:gap-4 transition-all"
                  >
                    Apply this to my whole store <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* Module 2: Topic Clusters */}
            <section id="module-2" className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-purple-100 rounded-[1.5rem] flex items-center justify-center text-purple-600 font-black text-2xl">
                  02
                </div>
                <div>
                  <h3 className="text-3xl font-black text-zinc-900 font-archivo tracking-tight">The Semantic Loop</h3>
                  <p className="text-zinc-500 font-medium italic">Building topical authority through structured clusters.</p>
                </div>
              </div>

              <div className="p-10 bg-white border border-zinc-100 rounded-[3rem] shadow-sm flex flex-col items-center text-center space-y-10">
                <div className="max-w-md space-y-4">
                  <h4 className="text-xl font-black text-zinc-900 font-archivo">Don't Rank Keywords. Rank Topics.</h4>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                    Google 2026 prioritizes Semantic Depth. Your store must demonstrate a "loop" of information that satisfies both human intent and AI scrapers.
                  </p>
                </div>

                {/* Topic Cluster Map Visualization */}
                <div className="relative w-full aspect-video flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Background loops */}
                    <div className="w-64 h-64 rounded-full border border-dashed border-purple-200 animate-[spin_20s_linear_infinite]" />
                    <div className="absolute w-48 h-48 rounded-full border border-dashed border-orange-200 animate-[spin_15s_linear_infinite_reverse]" />
                  </div>
                  
                  {/* Pillar */}
                  <div className="relative z-10 p-6 candy-gradient rounded-[2rem] shadow-2xl text-white font-black font-archivo text-xl uppercase tracking-widest">
                    Pillar Asset
                  </div>

                  {/* Nodes */}
                  <div className="absolute top-10 left-10 p-4 bg-white border border-zinc-100 rounded-2xl shadow-lg text-xs font-bold text-zinc-600 animate-bounce">Intent Cluster</div>
                  <div className="absolute bottom-10 right-10 p-4 bg-white border border-zinc-100 rounded-2xl shadow-lg text-xs font-bold text-zinc-600 animate-pulse delay-75">Variant SEO</div>
                  <div className="absolute top-1/2 left-4 p-4 bg-white border border-zinc-100 rounded-2xl shadow-lg text-xs font-bold text-zinc-600 animate-float-subtle">SGE Snippet</div>
                </div>
                
                <button 
                  onClick={() => onMasterclassAction?.('AUTOMATE_SEMANTIC')}
                  className="w-full py-5 bg-zinc-950 text-white font-black rounded-2xl flex items-center justify-center gap-4 hover:bg-zinc-800 transition-all btn-shimmer-effect"
                >
                  Automate My Semantic Loop <Zap className="w-4 h-4 text-orange-400" />
                </button>
              </div>
            </section>

            {/* Module 3: Image SEO Slider */}
            <section id="module-3" className="space-y-8">
               <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-100 rounded-[1.5rem] flex items-center justify-center text-emerald-600 font-black text-2xl">
                  03
                </div>
                <div>
                  <h3 className="text-3xl font-black text-zinc-900 font-archivo tracking-tight">Invisible Authority: Image Alt-Text</h3>
                  <p className="text-zinc-500 font-medium italic">Turning image search into a traffic funnel.</p>
                </div>
              </div>

              <div className="p-10 bg-zinc-50 border border-zinc-100 rounded-[3rem] space-y-10">
                <div className="relative h-80 rounded-[2.5rem] overflow-hidden border border-zinc-200 bg-zinc-200 shadow-2xl">
                  {/* Slider Backgrounds */}
                  <img src="https://images.unsplash.com/photo-1544816153-199d8bbbe1f8?auto=format&fit=crop&q=80&w=800" alt="" className="absolute inset-0 w-full h-full object-cover" />
                  
                  {/* The Comparison Slider */}
                  <div 
                    className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-center p-10 pointer-events-none transition-all"
                    style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
                  >
                    <div className="px-4 py-1 bg-white/20 border border-white/40 rounded text-white text-[10px] font-black uppercase tracking-widest mb-4">Optimized Alt-Text</div>
                    <p className="text-2xl font-black text-white font-archivo">"Military-Grade Carbon Fiber Key Clip for EDC Minimalists (Secure Quick-Release)"</p>
                  </div>

                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 pointer-events-none"
                    style={{ clipPath: `inset(0 0 0 ${sliderValue}%)` }}
                  >
                    <div className="px-4 py-1 bg-black/20 border border-black/40 rounded text-black text-[10px] font-black uppercase tracking-widest mb-4">Generic Alt-Text</div>
                    <p className="text-2xl font-black text-zinc-900/40 font-archivo italic">"key_clip_red_final.jpg"</p>
                  </div>

                  {/* Slider Control */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <input 
                      type="range" min="0" max="100" 
                      value={sliderValue} onChange={(e) => setSliderValue(Number(e.target.value))}
                      className="w-full h-full opacity-0 cursor-ew-resize"
                    />
                    <div className="absolute top-0 bottom-0 w-1 bg-white z-30 pointer-events-none shadow-xl" style={{ left: `${sliderValue}%` }}>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center">
                        <MousePointer2 className="w-5 h-5 text-zinc-900" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                  <p className="text-zinc-500 text-sm font-medium max-w-sm">
                    VaultCopy scans your entire media library and injects intent-based descriptors that rank in Image Search.
                  </p>
                  <button 
                    onClick={() => onMasterclassAction?.('SHORTCUT_IMAGE_SEO')}
                    className="px-10 py-5 candy-gradient text-white font-black rounded-2xl flex items-center gap-3 hover:brightness-110 transition-all active:scale-95 shadow-xl shadow-orange-500/20"
                  >
                    Short-cut my Image SEO <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar: The Vault */}
          <div className="hidden lg:flex w-80 bg-white border-l border-zinc-100 flex-col p-8 space-y-10 z-[120]">
            <div className="space-y-2">
              <h5 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Your Resources</h5>
              <h4 className="text-xl font-black text-zinc-900 font-archivo">The Vault</h4>
            </div>

            <div className="space-y-4">
              <button className="w-full p-5 bg-zinc-50 border border-zinc-100 rounded-2xl text-left space-y-2 group hover:border-orange-200 transition-all">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-zinc-100 text-zinc-400 group-hover:text-orange-500 transition-colors">
                  <Download className="w-4 h-4" />
                </div>
                <p className="text-xs font-black text-zinc-900 uppercase tracking-widest">2026 Keyword Cheat Sheet</p>
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">PDF • 4.2 MB</p>
              </button>

              <button className="w-full p-5 bg-zinc-50 border border-zinc-100 rounded-2xl text-left space-y-2 group hover:border-purple-200 transition-all">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-zinc-100 text-zinc-400 group-hover:text-purple-500 transition-colors">
                  <Layers className="w-4 h-4" />
                </div>
                <p className="text-xs font-black text-zinc-900 uppercase tracking-widest">Metadata Master Template</p>
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">XLSX • 1.1 MB</p>
              </button>
            </div>

            <div className="mt-auto pt-8 border-t border-zinc-50 space-y-6">
              <div className="p-6 bg-zinc-900 rounded-[2rem] space-y-4 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 candy-gradient rounded-full -mr-12 -mt-12 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity" />
                 <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em]">Partner Alpha</p>
                 <h6 className="text-white font-bold leading-tight">Apply this whole strategy in 1-click.</h6>
                 <button 
                  onClick={() => onMasterclassAction?.('APPLY_WHOLE_STORE')}
                  className="w-full py-3 bg-white text-zinc-900 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-orange-50 transition-colors"
                 >
                   Free Sync
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
