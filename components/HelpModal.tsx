
import React from 'react';
import { X, ExternalLink, Settings, ShieldCheck, Copy } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white/40 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white/90 border border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.12)] rounded-[2.5rem] animate-in zoom-in duration-300">
          <div className="flex items-center justify-between p-8 border-b border-gray-100/50">
            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Setup Guide</h3>
              <p className="text-sm font-medium text-gray-500">Connect your store in under 2 minutes.</p>
            </div>
            <button onClick={onClose} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 transition-all shrink-0">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-8 space-y-8">
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-5">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl shadow-sm">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-1">Step 1</p>
                  <p className="font-bold text-gray-900 mb-1 text-lg">Create a Custom App</p>
                  <p className="text-sm font-medium leading-relaxed text-gray-500">
                    Go to your Shopify Admin. Click on <span className="text-gray-900 font-semibold">Settings &gt; App and sales channels &gt; Develop apps &gt; Create an app</span>. Name it 'VaultCopy AI'.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-5">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-purple-500 mb-1">Step 2</p>
                  <p className="font-bold text-gray-900 mb-1 text-lg">Set Permissions</p>
                  <p className="text-sm font-medium leading-relaxed text-gray-500">
                    Click <span className="text-gray-900 font-semibold">Configure Admin API scopes</span>. Scroll to 'Products' and check the boxes for <span className="bg-purple-50 px-1 rounded text-purple-700 font-mono text-xs">write_products</span> and <span className="bg-purple-50 px-1 rounded text-purple-700 font-mono text-xs">read_products</span>.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-5">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl shadow-sm">
                  <Copy className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-1">Step 3</p>
                  <p className="font-bold text-gray-900 mb-1 text-lg">Copy Your Token</p>
                  <p className="text-sm font-medium leading-relaxed text-gray-500">
                    Click <span className="text-gray-900 font-semibold">Install App</span>. Under the API credentials tab, find 'Admin API access token' and click 'Reveal token once'. Copy that code and paste it into the VaultCopy dashboard.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
              <a 
                href="https://help.shopify.com/en/manual/apps/custom-apps" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full gap-2 p-4 text-sm font-bold text-indigo-600 border border-indigo-100 rounded-2xl bg-indigo-50/50 hover:bg-indigo-50 transition-all group"
              >
                Open Shopify Documentation <ExternalLink className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <button 
                onClick={onClose}
                className="w-full py-4 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
