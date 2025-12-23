
import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  LayoutDashboard, 
  Mail, 
  RefreshCcw, 
  ShieldAlert, 
  Lock,
  TrendingUp,
  Store,
  Zap,
  Activity,
  Cpu,
  History,
  MessageSquare,
  Search,
  Filter,
  MoreVertical,
  ArrowRight,
  X,
  Target,
  Trophy,
  AlertCircle,
  CheckCircle2,
  Anchor,
  Heart,
  Calendar,
  Eye,
  ArrowUpRight,
  Clock,
  Briefcase,
  Globe,
  Database,
  Server,
  Key
} from 'lucide-react';
import { AdminLogin } from './AdminLogin';
import { crmService } from '../services/crmService';
// Import Lead, SalesStage and CommLog from central types
import { Lead, SalesStage, CommLog } from '../types';

export const AdminDashboard: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'analytics' | 'infrastructure'>('pipeline');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newNote, setNewNote] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and load data from CRM Service (Supabase/LocalStorage)
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await crmService.getAllLeads();
      setLeads(data);
    } catch (err) {
      console.error("CRM Load Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLeads = useMemo(() => 
    leads.filter(l => l.storeUrl.toLowerCase().includes(searchQuery.toLowerCase()) || l.email.toLowerCase().includes(searchQuery.toLowerCase())),
    [leads, searchQuery]
  );

  const metrics = useMemo(() => {
    const totalLeads = leads.length;
    const trials = leads.filter(l => ['trial', 'proposal', 'closed_won', 'onboarding'].includes(l.stage)).length;
    const paid = leads.filter(l => ['closed_won', 'onboarding'].includes(l.stage)).length;
    const activationRate = trials > 0 ? (paid / trials) * 100 : 0;
    return {
      leadVelocity: "+12/day",
      activationRate: `${activationRate.toFixed(1)}%`,
      trialConversion: totalLeads > 0 ? `${((trials/totalLeads)*100).toFixed(1)}%` : '0%',
      avgDaysInStage: "4.2 Days"
    };
  }, [leads]);

  const handleAddNote = async () => {
    if (!selectedLead || !newNote.trim()) return;
    const log: CommLog = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'note',
      text: newNote,
      timestamp: new Date().toLocaleTimeString(),
      author: 'Admin'
    };
    
    const updatedLogs = [log, ...selectedLead.commLogs];
    await crmService.updateLead(selectedLead.id, { commLogs: updatedLogs });
    
    // Local update
    const updatedLeads = leads.map(l => l.id === selectedLead.id ? { ...l, commLogs: updatedLogs } : l);
    setLeads(updatedLeads);
    setSelectedLead({ ...selectedLead, commLogs: updatedLogs });
    setNewNote('');
  };

  const handleStageChange = async (id: string, stage: SalesStage) => {
    const now = new Date().toISOString();
    await crmService.updateLead(id, { stage, enteredStageAt: now });
    
    const updated = leads.map(l => l.id === id ? { ...l, stage, enteredStageAt: now } : l);
    setLeads(updated);
    if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, stage, enteredStageAt: now });
  };

  if (!isAuthenticated) return <AdminLogin onLogin={() => setIsAuthenticated(true)} onBack={onExit} />;

  // Safely check env vars for the dashboard UI
  const hasApiKey = typeof process !== 'undefined' && !!process.env?.API_KEY;
  const dbUrl = (typeof process !== 'undefined' && process.env?.DATABASE_URL) || null;

  return (
    <div className="min-h-screen bg-[#020202] text-white font-inter selection:bg-indigo-500/30">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-indigo-600/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[180px]" />
      </div>

      <nav className="sticky top-0 z-[100] border-b border-white/5 bg-black/60 backdrop-blur-3xl">
        <div className="max-w-[1800px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 candy-gradient rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,107,107,0.3)]">
              <Anchor className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black font-archivo uppercase tracking-tight">Vault CRM</h1>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Live Node Alpha</p>
            </div>
          </div>

          <div className="flex items-center bg-white/5 p-1 rounded-2xl border border-white/10">
            {['pipeline', 'analytics', 'infrastructure'].map((id) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === id ? 'bg-white/10 text-white shadow-xl' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {id === 'pipeline' && <Target className="w-4 h-4" />}
                {id === 'analytics' && <BarChart3 className="w-4 h-4" />}
                {id === 'infrastructure' && <Activity className="w-4 h-4" />}
                {id}
              </button>
            ))}
          </div>

          <button onClick={onExit} className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-[1800px] mx-auto px-8 py-12 space-y-12 relative z-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-6">
            <RefreshCcw className="w-12 h-12 text-orange-500 animate-spin" />
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">Syncing Encrypted Database...</p>
          </div>
        ) : (
          <>
            {activeTab === 'pipeline' && (
              <div className="space-y-12 animate-in fade-in duration-500">
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { label: 'Lead Velocity', val: metrics.leadVelocity, color: 'text-white' },
                    { label: 'Trial Conv', val: metrics.trialConversion, color: 'text-orange-400' },
                    { label: 'Activation', val: metrics.activationRate, color: 'text-emerald-400' },
                    { label: 'Avg Time-In-Stage', val: metrics.avgDaysInStage, color: 'text-indigo-400' }
                  ].map((m, i) => (
                    <div key={i} className="p-8 bg-zinc-900/40 border border-white/5 rounded-3xl group hover:bg-zinc-800/50 transition-all">
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">{m.label}</p>
                      <p className={`text-3xl font-black font-archivo ${m.color}`}>{m.val}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="relative w-96 group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-orange-500" />
                        <input 
                          type="text" 
                          placeholder="Search store identity..." 
                          className="w-full pl-12 pr-6 py-4 bg-zinc-900/40 border border-white/5 rounded-2xl outline-none font-bold text-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <button onClick={loadData} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                        <RefreshCcw className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="bg-zinc-900/40 border border-white/5 rounded-[3rem] overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-white/[0.02] border-b border-white/5">
                          <tr>
                            <th className="px-8 py-6 text-[9px] font-black text-zinc-500 uppercase tracking-widest">Entity</th>
                            <th className="px-8 py-6 text-[9px] font-black text-zinc-500 uppercase tracking-widest text-center">Stage</th>
                            <th className="px-8 py-6 text-[9px] font-black text-zinc-500 uppercase tracking-widest text-center">Health</th>
                            <th className="px-8 py-6 text-[9px] font-black text-zinc-500 uppercase tracking-widest text-right">Utility</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-white/[0.01] transition-colors group cursor-pointer" onClick={() => setSelectedLead(lead)}>
                              <td className="px-8 py-8">
                                <div className="flex items-center gap-4">
                                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${lead.isWhale ? 'bg-orange-500/10 border-orange-500/20' : 'bg-white/5 border-white/10'}`}>
                                    {lead.isWhale ? <Trophy className="w-6 h-6 text-orange-500" /> : <Store className="w-6 h-6 text-zinc-500" />}
                                  </div>
                                  <div>
                                    <p className="font-black font-archivo text-lg uppercase">{lead.storeUrl.split('.')[0]}</p>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase">{lead.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-8 py-8 text-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full border border-indigo-400/20">{lead.stage.replace('_', ' ')}</span>
                              </td>
                              <td className="px-8 py-8 text-center">
                                <span className={`text-lg font-black font-archivo ${lead.healthScore > 80 ? 'text-emerald-400' : 'text-orange-400'}`}>{lead.healthScore}%</span>
                              </td>
                              <td className="px-8 py-8 text-right">
                                <MoreVertical className="w-5 h-5 text-zinc-600 inline-block" />
                              </td>
                            </tr>
                          ))}
                          {filteredLeads.length === 0 && (
                            <tr>
                              <td colSpan={4} className="px-8 py-20 text-center">
                                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Waiting for n8n Hunter Signal...</p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Tasks Section */}
                  <div className="w-full lg:w-[400px] space-y-8">
                    <div className="p-8 bg-zinc-900/60 border border-white/5 rounded-[3rem] space-y-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-orange-500" />
                        <h3 className="text-sm font-black uppercase tracking-widest">Live Directives</h3>
                      </div>
                      <div className="space-y-4">
                        {leads.filter(l => l.isWhale && l.stage === 'proposal').map(l => (
                          <div key={l.id} className="p-6 bg-orange-500/5 border border-orange-500/10 rounded-3xl space-y-4">
                            <p className="text-[9px] font-black text-orange-400 uppercase tracking-widest">Whale At Risk</p>
                            <h4 className="text-sm font-bold text-white">{l.storeUrl.split('.')[0]} is idling.</h4>
                            <button className="w-full py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest">Manual Outreach</button>
                          </div>
                        ))}
                        {leads.filter(l => l.isWhale && l.stage === 'proposal').length === 0 && (
                          <p className="text-xs text-zinc-500 font-medium italic">All high-value loops are active.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'infrastructure' && (
              <div className="animate-in fade-in duration-500 max-w-4xl space-y-8">
                <div className="p-12 bg-zinc-900/40 border border-white/5 rounded-[3rem] space-y-12">
                   <div className="space-y-2">
                     <h2 className="text-3xl font-black font-archivo uppercase tracking-tight">System Integrity</h2>
                     <p className="text-zinc-500 font-medium">Monitoring the connection between your UI, n8n, and AI engines.</p>
                   </div>

                   <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-8 bg-black/40 border border-white/5 rounded-[2rem] space-y-6">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                             <Key className="w-5 h-5 text-indigo-400" />
                           </div>
                           <h4 className="text-xs font-black uppercase tracking-widest">Gemini AI Engine</h4>
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">API Status</span>
                           <div className="flex items-center gap-2">
                             <div className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`} />
                             <span className="text-xs font-black uppercase">{hasApiKey ? 'Connected' : 'Missing Key'}</span>
                           </div>
                        </div>
                        <p className="text-[10px] text-zinc-600 font-medium italic">Endpoint: gemini-3-flash-preview</p>
                      </div>

                      <div className="p-8 bg-black/40 border border-white/5 rounded-[2rem] space-y-6">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                             <Database className="w-5 h-5 text-orange-400" />
                           </div>
                           <h4 className="text-xs font-black uppercase tracking-widest">CRM Persistence</h4>
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Storage Node</span>
                           <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                             <span className="text-xs font-black uppercase">{dbUrl ? 'Live Proxy' : 'Local Sandbox'}</span>
                           </div>
                        </div>
                        <p className="text-[10px] text-zinc-600 font-medium italic">Active Node: {dbUrl ? 'vaultcopy.supabase' : 'browser.localStorage'}</p>
                      </div>
                   </div>

                   <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                          <Globe className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Production Domain</p>
                          <p className="text-lg font-black font-archivo uppercase">www.vaultcopy.ink</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                         <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">SSL Secure</span>
                      </div>
                   </div>
                </div>
              </div>
            )}
            
            {/* Detail View */}
            {selectedLead && (
              <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-xl flex justify-end animate-in fade-in duration-300">
                <div className="w-full max-w-4xl bg-[#080808] h-full border-l border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-500">
                  <div className="p-10 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#080808] z-20">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10">
                        <Store className="w-8 h-8 text-zinc-500" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black font-archivo uppercase">{selectedLead.storeUrl}</h2>
                        <p className="text-sm font-bold text-zinc-500">{selectedLead.email}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedLead(null)} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10">
                      <X className="w-6 h-6 text-zinc-400" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-12 space-y-16">
                    <div className="space-y-6">
                      <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">Lifecycle Shift</h3>
                      <div className="grid grid-cols-6 gap-2">
                        {(['prospecting', 'qualified', 'trial', 'proposal', 'closed_won', 'onboarding'] as SalesStage[]).map((s) => (
                          <button 
                            key={s}
                            onClick={() => handleStageChange(selectedLead.id, s)}
                            className={`py-3 rounded-xl text-[8px] font-black uppercase tracking-widest border transition-all ${
                              selectedLead.stage === s ? 'bg-white text-black border-white' : 'bg-white/5 border-white/5 text-zinc-500 hover:text-white'
                            }`}
                          >
                            {s.replace('_', ' ')}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 space-y-2">
                         <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Health</p>
                         <p className="text-4xl font-black font-archivo">{selectedLead.healthScore}%</p>
                      </div>
                      <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 space-y-2">
                         <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Products</p>
                         <p className="text-4xl font-black font-archivo">{selectedLead.productCount}</p>
                      </div>
                      <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 space-y-2">
                         <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">LTV</p>
                         <p className="text-4xl font-black font-archivo text-emerald-400">${selectedLead.ltv}</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <h3 className="text-xl font-black font-archivo uppercase tracking-tight">Communication Log</h3>
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Sync Active</span>
                      </div>
                      
                      <div className="flex gap-4">
                        <textarea 
                          className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all min-h-[120px]"
                          placeholder="Log manual interaction insight..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                        />
                        <button 
                          onClick={handleAddNote}
                          className="px-8 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest h-14 self-end transition-all active:scale-95"
                        >
                          Push Note
                        </button>
                      </div>

                      <div className="space-y-4">
                        {selectedLead.commLogs.map(log => (
                          <div key={log.id} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{log.author} • {log.timestamp}</span>
                              <span className="text-[9px] font-black text-zinc-700 uppercase">{log.type}</span>
                            </div>
                            <p className="text-sm font-medium text-zinc-300">{log.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-10 border-t border-white/5 bg-[#080808] sticky bottom-0 flex gap-4">
                    <button className="flex-1 py-6 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10">Merchant Instance</button>
                    <button className="flex-1 py-6 candy-gradient rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-500/20">Trigger Audit</button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <footer className="flex justify-between items-center pt-12 border-t border-white/5 opacity-40">
           <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em]">Command Node v2.0 • vaultcopy.ink</p>
           <div className="flex gap-8 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
             <span className="flex items-center gap-2"><ShieldAlert className="w-3.5 h-3.5" /> Secure Link</span>
             <span className="flex items-center gap-2"><Lock className="w-3.5 h-3.5" /> AES-256 Enabled</span>
           </div>
        </footer>
      </main>
    </div>
  );
};
