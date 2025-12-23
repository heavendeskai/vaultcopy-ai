
import React from 'react';
import { Sparkles, ShieldCheck, Zap, Globe } from 'lucide-react';
import { ProductPreview } from './types';

export const STEPS = [
  "Connecting to Shopify...",
  "Authenticating API Gateway...",
  "Analyzing Brand Voice...",
  "Scoping Catalog Structure...",
  "Drafting 3 Previews..."
];

export const MOCK_PREVIEWS: ProductPreview[] = [
  {
    id: '1',
    name: 'Vault S-Series Smart Safe',
    imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=400',
    beforeDescription: 'A strong steel safe for your home. It has a digital lock and weighs 20kg. Good for jewelry and passports.',
    afterDescription: 'Secure your legacy with the military-grade S-Series. Engineered for peace of mind, this smart-integrated fortress utilizes biometric encryption and heavy-gauge reinforced steel to ensure your most valuable assets remain untouchable. Designed for those who refuse to compromise on security.',
    seoScore: { before: 42, after: 98 }
  },
  {
    id: '2',
    name: 'Minimalist Card Holder',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=400',
    beforeDescription: 'A small leather wallet that holds cards. It is slim and fits in your pocket easily.',
    afterDescription: 'Reclaim your pocket space with the ultimate EDC essential. Crafted from premium full-grain Italian leather, our Slim-Line Holder combines a razor-thin silhouette with RFID-blocking technology. It\'s not just a wallet; it\'s a performance upgrade for your everyday life.',
    seoScore: { before: 31, after: 95 }
  },
  {
    id: '3',
    name: 'Professional Espresso Maker',
    imageUrl: 'https://images.unsplash.com/photo-1517706130032-9dc362f64060?auto=format&fit=crop&q=80&w=400',
    beforeDescription: 'Coffee machine for home use. Makes espresso and has a steam wand for milk. Easy to clean.',
    afterDescription: 'Master the art of the perfect pull. Our Pro-Series Espresso Station brings barista-level precision to your kitchen. Featuring dual PID temperature control and a commercial-grade rotary pump, it extracts every nuance of flavor from your beans, delivering a rich, mahogany crema every single morning.',
    seoScore: { before: 55, after: 99 }
  }
];

export const MOCK_CATALOG = [
  { id: '1', name: 'Vault S-Series Smart Safe', score: 42, img: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=100' },
  { id: '2', name: 'Minimalist Card Holder', score: 31, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=100' },
  { id: '3', name: 'Professional Espresso Maker', score: 55, img: 'https://images.unsplash.com/photo-1517706130032-9dc362f64060?auto=format&fit=crop&q=80&w=100' },
  { id: '4', name: 'Carbon Fiber Key Clip', score: 28, img: 'https://images.unsplash.com/photo-1544816153-199d8bbbe1f8?auto=format&fit=crop&q=80&w=100' },
  { id: '5', name: 'Leather Tech Folio', score: 39, img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=100' },
  { id: '6', name: 'Anodized Water Flask', score: 44, img: 'https://images.unsplash.com/photo-1602143399827-bd95ef68c3be?auto=format&fit=crop&q=80&w=100' },
  { id: '7', name: 'Premium Desk Mat', score: 51, img: 'https://images.unsplash.com/photo-1616628188502-413f2fe46e5e?auto=format&fit=crop&q=80&w=100' },
  { id: '8', name: 'Wireless Charging Hub', score: 33, img: 'https://images.unsplash.com/photo-1586816832793-e177ad1c73ca?auto=format&fit=crop&q=80&w=100' },
  { id: '9', name: 'MagSafe Leather Case', score: 47, img: 'https://images.unsplash.com/photo-1605341052601-0951b69396f4?auto=format&fit=crop&q=80&w=100' },
  { id: '10', name: 'Active EDC Backpack', score: 38, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=100' },
];

export const TRUST_BADGES = [
  { icon: <ShieldCheck className="w-5 h-5" />, text: "One-time payment" },
  { icon: <Zap className="w-5 h-5" />, text: "3-Minute Sync" },
  { icon: <Globe className="w-5 h-5" />, text: "No subscription" }
];
