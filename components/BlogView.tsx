
import React, { useState } from 'react';
import { ArrowLeft, Clock, Zap, ChevronRight, Mail, Sparkles, BookOpen, BarChart3, Search, Target, ArrowRight } from 'lucide-react';
import { BlogReader } from './BlogReader';

export interface PostSection {
  heading: string;
  text: string;
}

export interface PostData {
  title: string;
  date: string;
  readTime: string;
  tag: string;
  img: string;
  summary: string;
  sections: PostSection[];
}

interface BlogViewProps {
  onBack: () => void;
  onOpenLeadCapture: () => void;
  onSyncClick: () => void;
}

const POSTS: PostData[] = [
  {
    title: "Case Study: Lumos Beauty Increased Organic Reach by 420% in 14 Days",
    date: "Jan 08, 2026",
    readTime: "8 min read",
    tag: "Case Study",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    summary: "How a high-growth cosmetics brand transformed 2,400 generic descriptions into a Page 1 organic traffic engine in just two weeks.",
    sections: [
      {
        heading: "The Problem: The SEO Death Trap",
        text: "Lumos Beauty, a high-growth cosmetics brand, faced a common 'SEO Death Trap': a catalog of 2,400 products with generic, 20-word descriptions. Despite a premium product line, their Google visibility was stagnant."
      },
      {
        heading: "The Conflict: Invisible to Search",
        text: "Because their 'Thin Content' couldn't compete with larger retailers, they were forced into a high-CAC cycle of paid ads. Every product launch felt like shouting into a void."
      },
      {
        heading: "The Execution: Autonomous Overhaul",
        text: "VaultCopy AI was deployed to perform a full autonomous catalog overhaul. In under 15 minutes, our engine analyzed their brand voice and injected high-intent, SGE-optimized copy into every single product page."
      },
      {
        heading: "The Result: 420% Growth",
        text: "Within two weeks, Lumos saw a 420% surge in organic reach, leading to their most profitable January in company history. They successfully transitioned from ghost town to global brand."
      }
    ]
  },
  {
    title: "How Gemini 2.5 is Redefining E-commerce Product Copy",
    date: "Jan 12, 2026",
    readTime: "4 min read",
    tag: "AI Tech",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    summary: "In the rapidly evolving landscape of autonomous commerce, VaultCopy AI stands at the forefront of the generative revolution using Gemini 2.5.",
    sections: [
      {
        heading: "The Technology: Cognitive Commerce",
        text: "We are entering the era of 'Cognitive Commerce,' powered by the integration of Gemini 2.5 into the VaultCopy engine. This isn't just a marginal improvement; it's a paradigm shift in how machines understand consumer desire."
      },
      {
        heading: "The Difference: Deep Psychology",
        text: "Unlike older AI models that simply 'spun' text, Gemini 2.5 understands deep buyer psychology and searcher intent. It identifies 'Pain-Point triggers' automatically, adjusting copy to answer the specific questions shoppers are asking Google in 2026."
      },
      {
        heading: "The Speed Advantage",
        text: "Our system processes thousands of SKU updates with this level of nuance in minutes, a task that would take a human copywriting team months. By adopting Gemini 2.5 today, VaultCopy users stay ahead of Google’s evolving Search Generative Experience (SGE)."
      }
    ]
  },
  {
    title: "The Death of Static Descriptions: Why Dynamic Cataloging is the Future",
    date: "Jan 10, 2026",
    readTime: "6 min read",
    tag: "Strategy",
    img: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800",
    summary: "The 'Set and Forget' model of product descriptions is officially dead. Discover why your catalog needs to be a living, breathing asset.",
    sections: [
      {
        heading: "The Industry Shift",
        text: "The 'Set and Forget' model of product descriptions is officially dead. In the 2026 search economy, static copy becomes 'stale' to search engines within weeks. In a world where trends move at speed, static text is a liability."
      },
      {
        heading: "The Concept: Dynamic Cataloging",
        text: "Dynamic Cataloging is the process of continuously updating product data to reflect seasonal trends, consumer sentiment, and inventory velocity. Your catalog needs to be a living, breathing asset."
      },
      {
        heading: "The VaultCopy Solution",
        text: "Our autonomous engine acts as a 24/7 digital merchandiser, ensuring your descriptions are always optimized for the current market demand. Stores that treat their catalog as an asset will dominate the 2026 Shopify landscape."
      }
    ]
  }
];

export const BlogView: React.FC<BlogViewProps> = ({ onBack, onOpenLeadCapture, onSyncClick }) => {
  const [readingPost, setReadingPost] = useState<PostData | null>(null);

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12 animate-in fade-in duration-700">
      <BlogReader 
        post={readingPost} 
        isOpen={!!readingPost} 
        onClose={() => setReadingPost(null)}
        onSyncClick={onSyncClick}
      />

      {/* Premium Header */}
      <div className="text-center space-y-4 px-4">
        <button 
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors"
        >
          <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" /> Return to Dashboard
        </button>
        <h2 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight font-archivo">Intelligence Hub</h2>
        <p className="text-zinc-500 font-medium max-w-xl mx-auto font-inter">Strategy, tech, and performance alpha for the modern Shopify merchant.</p>
      </div>

      {/* SEO Masterclass Section */}
      <div className="mx-4 p-px candy-gradient rounded-[2.5rem] shadow-2xl shadow-orange-100/30 overflow-hidden">
        <div className="bg-white rounded-[2.45rem] p-8 md:p-14 flex flex-col items-center text-center space-y-10 relative">
          
          <div className="space-y-6 max-w-lg">
            <h3 className="text-4xl md:text-5xl font-black text-zinc-900 leading-tight font-archivo tracking-tight">
              The 2026 Shopify <br />
              <span className="text-transparent bg-clip-text candy-gradient">SEO Masterclass</span>
            </h3>
            <p className="text-lg text-zinc-500 font-medium font-inter leading-relaxed">
              Unlock the exact H1 formulas and Image Alt-Text hacks we use to drive $10M+ in organic revenue for our clients.
            </p>
          </div>

          <button 
            onClick={onOpenLeadCapture}
            className="w-full max-w-sm py-6 candy-gradient text-white font-black text-xl rounded-2xl flex items-center justify-center gap-4 hover:brightness-110 transition-all hover:scale-[1.02] active:scale-95 btn-shimmer-effect shadow-xl shadow-orange-100/50 font-archivo"
          >
            Get the Free SEO Masterclass <ArrowRight className="w-6 h-6 ml-2" />
          </button>
          
          <div className="flex flex-col items-center gap-4">
            <div className="flex -space-x-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-zinc-200 overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?u=v${i}`} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">JOINED BY 12,400+ MERCHANTS</p>
          </div>

          {/* Dashboard Visual Mockup */}
          <div className="w-full max-w-md bg-zinc-50 border border-zinc-100 rounded-3xl p-6 md:p-8 shadow-inner relative overflow-hidden group/visual">
             <div className="relative z-10 bg-white rounded-2xl shadow-xl border border-zinc-100 flex flex-col overflow-hidden">
                <div className="p-3 border-b border-zinc-50 bg-zinc-50/30 flex justify-between items-center">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="px-2 py-0.5 bg-white border border-zinc-100 rounded text-[7px] font-black text-zinc-400 uppercase tracking-widest">REPORT: Q1_2026</div>
                </div>

                <div className="p-5 space-y-6 text-left">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">ORGANIC TRAFFIC DELTA</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-zinc-900 font-archivo">+420%</span>
                      <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                        <Zap className="w-2.5 h-2.5 fill-emerald-500" /> Viral
                      </span>
                    </div>
                    <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden mt-2">
                      <div className="h-full candy-gradient w-[85%] rounded-full shadow-[0_0_8px_rgba(255,107,107,0.3)]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">H1 STRATEGY APPLIED</p>
                    <div className="space-y-1.5">
                      <div className="h-1.5 w-full bg-indigo-50 rounded-full" />
                      <div className="h-1.5 w-3/4 bg-indigo-50 rounded-full" />
                    </div>
                  </div>

                  <div className="h-12 flex items-end gap-1 pt-2">
                    {[30, 45, 25, 60, 85, 100].map((h, i) => (
                      <div 
                        key={i} 
                        className={`flex-1 rounded-t-md transition-all duration-700 ${i === 5 ? 'candy-gradient' : 'bg-zinc-100'}`} 
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Latest Feed */}
      <div className="space-y-8 px-4 pt-8">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-6">
          <h3 className="text-xl font-black text-zinc-900 tracking-tight font-archivo uppercase tracking-widest">Latest Feed</h3>
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">3 UPDATES</span>
        </div>
        
        <div className="grid gap-6">
          {POSTS.map((post, i) => (
            <div 
              key={i} 
              onClick={() => setReadingPost(post)}
              className="group flex flex-col md:flex-row gap-6 p-6 bg-white border border-zinc-100 rounded-[2rem] hover:border-orange-200 transition-all hover:shadow-[0_20px_40px_-15px_rgba(255,107,107,0.05)] cursor-pointer"
            >
              <div className="md:w-1/3 aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-50">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800`;
                  }}
                />
              </div>
              <div className="md:w-2/3 flex flex-col justify-center space-y-3">
                <div className="flex items-center gap-3 text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                  <span className="text-orange-500">{post.tag}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-200" />
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-lg font-black text-zinc-900 group-hover:text-orange-600 transition-colors font-archivo">{post.title}</h3>
                <p className="text-zinc-500 text-sm font-medium line-clamp-2 font-inter leading-relaxed">{post.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
