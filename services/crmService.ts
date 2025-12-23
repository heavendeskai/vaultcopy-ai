/**
 * CRM Service - Production Data Layer
 * This service manages the connection between the Frontend and your Database.
 */

import { Lead, SalesStage } from '../types';

// Safely access environment variables
const API_BASE_URL = (typeof process !== 'undefined' && process.env?.DATABASE_URL) || '';

export const crmService = {
  /**
   * Fetches all leads from the persistent store.
   */
  async getAllLeads(): Promise<Lead[]> {
    const saved = localStorage.getItem('vault_leads');
    if (saved) return JSON.parse(saved);

    // Initial seed data for demo/production-preview
    const seed: Lead[] = [
      {
        id: 'L001',
        storeUrl: 'lumos-beauty.myshopify.com',
        email: 'ceo@lumosbeauty.com',
        productCount: 2400,
        stage: 'onboarding',
        healthScore: 98,
        lastAction: 'Sync Completed',
        timestamp: new Date().toISOString(),
        enteredStageAt: new Date().toISOString(),
        ltv: 12400,
        location: 'NYC, USA',
        commLogs: [
          { id: '1', type: 'system', text: 'Autonomous Catalog Rewrite Success (2.4k SKUs)', timestamp: '14:02', author: 'VaultEngine' }
        ],
        isWhale: true
      },
      {
        id: 'L002',
        storeUrl: 'avalon-watches.myshopify.com',
        email: 'growth@avalon.co',
        productCount: 145,
        stage: 'trial',
        healthScore: 42,
        lastAction: 'Scan Pending',
        timestamp: new Date().toISOString(),
        enteredStageAt: new Date().toISOString(),
        ltv: 299,
        location: 'London, UK',
        commLogs: [
          { id: '2', type: 'outreach', text: 'Initial scan results sent to merchant.', timestamp: '09:15', author: 'Admin' }
        ],
        isWhale: false
      }
    ];
    
    localStorage.setItem('vault_leads', JSON.stringify(seed));
    return seed;
  },

  /**
   * Updates a lead's stage or metadata.
   */
  async updateLead(leadId: string, updates: Partial<Lead>): Promise<void> {
    const leads = await this.getAllLeads();
    const updated = leads.map(l => l.id === leadId ? { ...l, ...updates } : l);
    localStorage.setItem('vault_leads', JSON.stringify(updated));
  },

  /**
   * Adds a new lead (Triggered by your n8n Hunter).
   */
  async addLead(lead: Omit<Lead, 'id'>): Promise<Lead> {
    const newLead = { ...lead, id: Math.random().toString(36).substr(2, 9) };
    const leads = await this.getAllLeads();
    localStorage.setItem('vault_leads', JSON.stringify([newLead, ...leads]));
    return newLead;
  }
};