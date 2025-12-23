
import React, { useState, useEffect } from 'react';
import { STEPS } from '../constants';
import { Loader2, CheckCircle2, Shield, Lock, Search, Cpu, PenTool } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const STEP_ICONS = [
  { component: Shield, animationClass: 'animate-float-subtle' },
  { component: Lock, animationClass: 'animate-rotate-lock' },
  { component: Search, animationClass: 'animate-scan-mini' },
  { component: Cpu, animationClass: 'animate-pulse' },
  { component: PenTool, animationClass: 'animate-tilt-slow' }
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < STEPS.length) {
      // Staggered timing for a premium "working" feel
      const delay = 1200 + Math.random() * 1400;
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => onComplete(), 1000);
      return () => clearTimeout(finishTimer);
    }
  }, [currentStep, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 animate-in fade-in duration-700">
      <div className="w-full max-w-lg p-10 bg-white border border-gray-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] rounded-[2.5rem] relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-50/40 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col items-center mb-10 text-center">
          <div className="relative flex items-center justify-center w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-indigo-50 rounded-[2rem] rotate-6 animate-pulse" />
            <div className="absolute inset-0 bg-indigo-600/5 rounded-[2rem] -rotate-3" />
            <div className="relative flex items-center justify-center w-20 h-20 bg-white border border-indigo-50 shadow-sm rounded-3xl">
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Initializing Vault</h3>
          <p className="text-gray-500 font-medium mt-1">Establishing secure handshake with Shopify Admin.</p>
        </div>

        <div className="space-y-6">
          {STEPS.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const IconData = STEP_ICONS[index];
            const IconComponent = IconData.component;
            
            return (
              <div 
                key={index} 
                className={`flex items-center gap-5 transition-all duration-500 ease-out ${
                  isActive ? 'opacity-100 translate-x-2 scale-[1.02]' : 
                  isCompleted ? 'opacity-100' : 'opacity-20 translate-x-0'
                }`}
              >
                <div className={`flex items-center justify-center w-11 h-11 rounded-2xl border transition-all duration-500 ${
                  isCompleted ? 'bg-emerald-50 border-emerald-100 text-emerald-600 shadow-sm shadow-emerald-50' :
                  isActive ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100' :
                  'bg-gray-50 border-gray-100 text-gray-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <IconComponent className={`w-5 h-5 ${isActive ? IconData.animationClass : ''}`} />
                  )}
                </div>

                <div className="flex flex-col">
                  <span className={`text-base font-bold transition-colors ${
                    isActive ? 'text-indigo-600' : 
                    isCompleted ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step}
                  </span>
                  {isActive && (
                    <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest animate-pulse leading-none mt-1">
                      Processing Assets...
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 space-y-4">
          <div className="flex justify-between items-end text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            <span>System Integrity</span>
            <span className="text-indigo-600">
              {Math.min(Math.round((currentStep / STEPS.length) * 100), 100)}% Complete
            </span>
          </div>
          <div className="overflow-hidden h-3 bg-gray-50 rounded-full border border-gray-100 p-0.5 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full transition-all duration-1000 ease-in-out relative overflow-hidden"
              style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 w-full h-full bg-white/20 animate-shimmer" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-2">
        <p className="text-xs font-bold text-gray-400 flex items-center gap-2 uppercase tracking-widest">
          <Lock className="w-3 h-3" /> AES-256 Bit Encryption Active
        </p>
        <div className="h-4 w-px bg-gray-200" />
        <div className="flex items-center gap-4 grayscale opacity-40 hover:opacity-100 transition-opacity">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-3" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Shopify_logo_2018.svg" alt="Shopify" className="h-4" />
        </div>
      </div>
    </div>
  );
};
