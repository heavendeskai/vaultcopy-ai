
export interface ProductPreview {
  id: string;
  name: string;
  imageUrl: string;
  beforeDescription: string;
  afterDescription: string;
  seoScore: {
    before: number;
    after: number;
  };
}

export enum AppState {
  LANDING = 'LANDING',
  LOADING = 'LOADING',
  PREVIEW = 'PREVIEW',
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

// SalesStage represents the different phases of a lead in the CRM pipeline
export type SalesStage = 'prospecting' | 'qualified' | 'trial' | 'proposal' | 'closed_won' | 'onboarding';

// CommLog tracks individual communication events for a lead
export interface CommLog {
  id: string;
  type: 'email' | 'note' | 'system' | 'outreach';
  text: string;
  timestamp: string;
  author: string;
}

// Lead represents a potential customer or store identified by the system
export interface Lead {
  id: string;
  storeUrl: string;
  email: string;
  productCount: number;
  stage: SalesStage;
  healthScore: number;
  lastAction: string;
  timestamp: string;
  enteredStageAt: string; // ISO String for persistence
  ltv: number;
  location: string;
  commLogs: CommLog[];
  isWhale: boolean;
}
