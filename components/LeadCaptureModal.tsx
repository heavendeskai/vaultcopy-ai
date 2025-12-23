
import React, { useState } from 'react';
import { X, Mail, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [revenue, setRevenue] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to webhook/DB here
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-md glass-card border border-white/20 shadow-[0_48px_96px_-12px_rgba(99,102,241,0.2)] rounded-[3rem] animate-in zoom-in duration-300 overflow-hidden">
        <div className="p-10 relative">
          <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-zinc-50 rounded-xl transition-colors">
            <X className="w-6 h-6 text-zinc-400" />
          </button>

          <div className="text-center space-y-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 tracking-tight">Unlock the 2026 Playbook</h3>
            <p className="text-zinc-500 font-medium text-sm">Join 45,000+ merchants scaling with VaultCopy intelligence.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Store Email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  type="email" 
                  required 
                  placeholder="alex@yourbrand.com"
                  className="w-full pl-14 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Monthly Revenue</label>
              <div className="relative group">
                <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300 group-focus-within:text-indigo-500 transition-colors" />
                <select 
                  required
                  className="w-full pl-14 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white appearance-none transition-all"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                >
                  <option value="" disabled>Select range...</option>
                  <option value="0-10k">$0 - $10k</option>
                  <option value="10k-50k">$10k - $50k</option>
                  <option value="50k+">$50k+</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-5 bg-gradient-to-r from-[#6366f1] to-[#ec4899] text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-200 flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all btn-shimmer-effect"
            >
              ACCESS PLAYBOOK <ArrowRight className="w-6 h-6" />
            </button>
          </form>
          
          <p className="mt-6 text-[10px] text-zinc-400 font-bold text-center uppercase tracking-widest opacity-60">
            Secure processing by VaultCopy Identity
          </p>
        </div>
      </div>
    </div>
  );
};
