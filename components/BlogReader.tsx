
import React, { useEffect, useState, useRef } from 'react';
import { X, Clock, Zap, ArrowRight, Share2, Bookmark } from 'lucide-react';
import { PostData } from './BlogView';

interface BlogReaderProps {
  post: PostData | null;
  isOpen: boolean;
  onClose: () => void;
  onSyncClick: () => void;
}

export const BlogReader: React.FC<BlogReaderProps> = ({ post, isOpen, onClose, onSyncClick }) => {
  const [internalScrollY, setInternalScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setInternalScrollY(containerRef.current.scrollTop);
      }
    };
    
    const currentContainer = containerRef.current;
    if (isOpen && currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll, { passive: true });
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!post || !isOpen) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-white animate-in slide-in-from-bottom duration-500 overflow-y-auto h-screen scroll-smooth"
    >
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-[230] w-full h-16 bg-white/90 backdrop-blur-xl border-b border-zinc-100 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-zinc-50 rounded-xl transition-all active:scale-90"
          >
            <X className="w-6 h-6 text-zinc-400 hover:text-zinc-900" />
          </button>
          <div className="hidden md:block h-4 w-px bg-zinc-200" />
          <span className="hidden md:block text-xs font-black uppercase tracking-widest text-zinc-400 truncate max-w-[300px]">
            Intelligence Briefing: {post.tag}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-zinc-50 rounded-xl text-zinc-400 hover:text-zinc-900 transition-colors" title="Share Article">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-zinc-50 rounded-xl text-zinc-400 hover:text-zinc-900 transition-colors" title="Save to Vault">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hero Header with Correct Parallax */}
      <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden bg-zinc-950">
        <div 
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateY(${internalScrollY * 0.4}px)` }}
        >
          <img 
            src={post.img} 
            alt={post.title}
            className="w-full h-[120%] object-cover opacity-70 scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200`;
            }}
          />
        </div>
        {/* Deeper gradient for better text/card blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
      </div>

      {/* Main Article Layer */}
      <article className="relative max-w-[800px] mx-auto px-6 -mt-40 pb-40">
        <div className="bg-white rounded-[3.5rem] p-8 md:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-zinc-50 space-y-12">
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-xs font-black text-indigo-600 uppercase tracking-widest">
              <span className="px-2 py-1 bg-indigo-50 rounded">{post.tag}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-200" />
              <span className="flex items-center gap-1 text-zinc-400"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-200" />
              <span className="text-zinc-400">{post.date}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-zinc-900 leading-[1.05] tracking-tighter font-archivo">
              {post.title}
            </h1>
          </header>

          <div className="space-y-12 text-lg md:text-xl text-zinc-600 font-medium leading-[1.7] font-inter">
            {/* Lead Summary with Premium styling */}
            <div className="relative">
              <div className="absolute -left-8 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
              <p className="text-zinc-900 font-bold text-2xl md:text-3xl leading-snug font-archivo tracking-tight">
                {post.summary}
              </p>
            </div>
            
            {post.sections.map((section, idx) => (
              <div 
                key={idx} 
                className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both" 
                style={{ animationDelay: `${(idx + 1) * 150}ms` }}
              >
                <h2 className="text-3xl font-black text-zinc-900 pt-6 font-archivo tracking-tight">
                  {section.heading}
                </h2>
                <p className="text-zinc-600">
                  {section.text}
                </p>
                {idx === 1 && (
                  <div className="my-14 p-10 bg-indigo-50/30 rounded-[2.5rem] border border-indigo-100/50 space-y-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:bg-indigo-500/10" />
                    <h3 className="text-xl font-black text-indigo-900 flex items-center gap-2 font-archivo uppercase tracking-wider">
                      <Zap className="w-5 h-5 text-indigo-600 animate-pulse" /> Intelligence Alpha Note
                    </h3>
                    <p className="text-lg text-indigo-950/80 font-bold italic leading-relaxed">
                      "By 2026, autonomous search engines will treat static content as archived data. Fresh, dynamically updated catalogs are no longer an option—they are the prerequisite for digital survival."
                    </p>
                  </div>
                )}
              </div>
            ))}

            <div className="pt-16 border-t border-zinc-100 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-full text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-8">
                End of Intelligence Report
              </div>
              <br />
              <button 
                onClick={onClose}
                className="font-black text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest text-sm flex items-center gap-2 mx-auto group"
              >
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                Return to Intelligence Hub
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Sticky Bottom Right CTA - Redefined for better visibility */}
      <div className="fixed bottom-8 right-8 z-[240] animate-in slide-in-from-right duration-700 delay-500">
        <button 
          onClick={() => { onClose(); onSyncClick(); }}
          className="group relative flex items-center gap-4 px-8 py-5 bg-zinc-950 text-white rounded-[1.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 btn-shimmer-effect overflow-hidden"
        >
          <div className="relative z-10 flex items-center gap-3">
            <Zap className="w-5 h-5 text-indigo-400 group-hover:scale-125 transition-transform" />
            <span className="font-black text-xs uppercase tracking-[0.2em]">Sync Your Store Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
};
