
import React from 'react';
import { X, Shield } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, type }) => {
  if (!isOpen) return null;

  const content = type === 'privacy' 
    ? "Your privacy is paramount. VaultCopy AI follows strict GDPR and CCPA guidelines. We do not sell your data. We only access the Shopify API scopes you explicitly grant. All data processing occurs in isolated environments, and PII is never stored in persistent storage."
    : "By using VaultCopy AI, you agree to our fair use policy. We provide AI-generated content 'as is'. You are responsible for reviewing and approving all content before it is pushed to your live store. We are not liable for any fluctuations in search engine rankings.";

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950/20 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white border border-zinc-100 shadow-[0_48px_96px_-12px_rgba(0,0,0,0.1)] rounded-[2.5rem] animate-in zoom-in duration-300">
          <div className="p-10">
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-zinc-900 tracking-tight">{title}</h3>
                <p className="text-xs font-black uppercase tracking-widest text-indigo-500">Last updated: Jan 2025</p>
              </div>
              <button onClick={onClose} className="p-3 bg-zinc-50 hover:bg-zinc-100 rounded-2xl transition-colors shrink-0">
                <X className="w-6 h-6 text-zinc-400" />
              </button>
            </div>
            <div className="prose prose-zinc max-w-none">
              <p className="text-zinc-500 font-medium leading-relaxed">{content}</p>
            </div>
            <button 
              onClick={onClose}
              className="w-full mt-10 py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 transition-all active:scale-[0.98]"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
