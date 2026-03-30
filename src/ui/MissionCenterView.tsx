import React from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  MessageCircle, 
  Send, 
  Hash, 
  Shield, 
  Smartphone, 
  Globe, 
  Rss, 
  Cloud, 
  Wand2, 
  Sparkles, 
  History, 
  Zap, 
  Book, 
  Cpu, 
  ShieldCheck, 
  Users, 
  Brain, 
  Satellite, 
  Plus,
  Box,
  Activity,
  Lock
} from 'lucide-react'
import { pluginRegistry } from '../lib/plugins'

import { MissionCenterViewProps } from '../types'

export function MissionCenterView({ isMobile, platform }: MissionCenterViewProps) {
  const plugins = pluginRegistry.getAll();
  
  const getIcon = (pluginId: string) => {
    switch (pluginId) {
      case 'whatsapp': return <MessageCircle size={24} />;
      case 'telegram': return <Send size={24} />;
      case 'discord': return <MessageSquare size={24} />;
      case 'slack': return <Hash size={24} />;
      case 'signal': return <Shield size={24} />;
      case 'imessage': return <Smartphone size={24} />;
      case 'matrix': return <Globe size={24} />;
      case 'nostr': return <Rss size={24} />;
      case 'nextcloud': return <Cloud size={24} />;
      case 'creative.mirage': return <Wand2 size={24} />;
      case 'spatial.mirage': return <Sparkles size={24} />;
      case 'chronos-protocol': return <History size={24} />;
      case 'overclock-protocol': return <Zap size={24} />;
      case 'scholar-protocol': return <Book size={24} />;
      case 'ghost-protocol': return <Cloud size={24} />;
      case 'vault-protocol': return <Lock size={24} />;
      case 'sixth-sense': return <Activity size={24} />;
      default: return <Box size={24} />;
    }
  };

  const missions = [
    { id: 1, title: 'Neural Core Indexing', agent: 'Raizen-OS', status: 'active', progress: 100, detail: 'System-wide cognitive mapping complete.', icon: <Cpu size={24} /> },
    { id: 2, title: 'Security Protocol Audit', agent: 'Defense-V2', status: 'active', progress: 100, detail: 'Admin codeword authorization paths verified. Absolute Sovereignty confirmed.', icon: <ShieldCheck size={24} /> },
    { id: 3, title: 'Autonomous Swarm (Legion)', agent: 'Plugin-Hub', status: 'active', progress: 100, detail: 'Sub-agent mitosis active. Multi-threaded task resolution live.', icon: <Users size={24} /> },
    { id: 4, title: 'Sovereign Intelligence (Paro)', agent: 'Plugin-Hub', status: 'active', progress: 100, detail: 'Independent AI model fully formed. Local inference operational.', icon: <Brain size={24} /> },
    { id: 5, title: 'Alpha-Evolution Layer', agent: 'System', status: 'active', progress: 100, detail: 'Self-mutation protocol active. UI and code-level adaptation enabled.', icon: <Cpu size={24} /> },
    { id: 6, title: 'Reality Synthesis (Mirage)', agent: 'Creative-Core', status: 'active', progress: 100, detail: 'Hyper-fidelity prototyping engine live. Instant visualization enabled.', icon: <Wand2 size={24} /> },
    { id: 7, title: 'Shadow Execution (Chronos)', agent: 'System-Foresight', status: 'active', progress: 100, detail: 'Temporal simulation protocol active. Risk-managed foresight enabled.', icon: <History size={24} /> },
    { id: 8, title: 'Interface Evolution (Flux)', agent: 'Morph-Core', status: 'active', progress: 100, detail: 'Task-aware layout morphology and shortcut synthesis active.', icon: <Zap size={24} /> },
    { id: 9, title: 'Decentralized Command (Constellation)', agent: 'Mesh-Network', status: 'active', progress: 100, detail: 'Decentralized hub redundancy and P2P mesh synchronization enabled.', icon: <Satellite size={24} /> },
    { id: 10, title: 'Autonomous Scholar (Scholar)', agent: 'Intelligence-Core', status: 'active', progress: 100, detail: 'Deep learning autonomy via multi-source synthesis (Web, e-books, YouTube).', icon: <Book size={24} /> },
    ...plugins.map((p: any, i: number) => ({
      id: 100 + i,
      title: `${p.name} Bridge`,
      agent: 'Protocol-Mesh',
      status: 'active',
      progress: 100,
      detail: p.description,
      icon: getIcon(p.id)
    }))
  ];

  return (
    <div className="tab-view" style={{ height: '100%', overflowY: 'auto', paddingBottom: '4rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h2 className="view-title">Mission Center</h2>
        <p className="hero-subtitle" style={{ fontSize: '0.9rem' }}>Universal extension hub and autonomous task tracking.</p>
      </header>

      <div className="section-grid">
        {missions.map(m => (
          <motion.div 
            key={m.id} 
            className="card"
            whileHover={{ scale: 1.02 }}
          >
            <div className="card-header">
              <div className="card-icon-box">
                {m.icon}
              </div>
              <span className={`badge ${m.status}`}>{m.status}</span>
            </div>
            <div className="card-body">
              <h3 className="card-title">{m.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', margin: '0.5rem 0 1rem', lineHeight: 1.4 }}>{m.detail}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.4rem', fontWeight: 600 }}>
                <span style={{ opacity: 0.6 }}>{m.agent}</span>
                <span>{m.progress}%</span>
              </div>
              <div className="progress-bar-container">
                <motion.div 
                  className="progress-fill" 
                  initial={{ width: 0 }}
                  animate={{ width: `${m.progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
        
        <button 
          className="card" 
          aria-label="Register Extension"
          title="Register Extension"
          style={{ borderStyle: 'dashed', background: 'transparent', minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', cursor: 'pointer' }}
        >
          <div className="card-icon-box" style={{ background: 'var(--panel-soft)' }}>
            <Plus size={24} />
          </div>
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Register Extension</span>
        </button>
      </div>
    </div>
  );
}
