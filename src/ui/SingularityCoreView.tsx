import React from 'react'
import { Crown } from 'lucide-react'
import { SingularityCoreViewProps } from '../types'
import { pluginRegistry } from '../lib/plugins'

export function SingularityCoreView({
  isMobile,
  platform,
  isAlignmentActive, alignmentStatus, ascensionLevel, resonanceScore,
  activeLegionAgents, paroStatus, isPredictiveActive, predictiveStatus,
  isSingDriveActive, singDriveBrilliance, rccrMissions, singCoreStatus,
  triggerEvent
}: SingularityCoreViewProps) {
  const coreSystems = [
    {
      title: 'Singularity Core',
      status: singCoreStatus,
      detail: 'The heart of Raizen. S+++ Rank orchestration of 150+ protocols natively.',
      actionLabel: 'Ignite Core',
      onAction: async () => {
        try { await pluginRegistry.executeAction('core.singularity', 'ignite-core', {}); } catch (e) { console.error(e); }
        triggerEvent();
      }
    },
    {
      title: 'RCCR Brain',
      status: `${rccrMissions} Missions`,
      detail: 'Reactive Cognitive Core Router. Decides priority dynamically without hardcoded loops.',
      actionLabel: 'Execute RCCR',
      onAction: async () => {
        try { await pluginRegistry.executeAction('core.rccr', 'execute-rccr-intent', { intent: 'Optimize System' }); } catch (e) { console.error(e); }
        triggerEvent();
      }
    },
    {
      title: 'Ascension Engine (A.C.E.)',
      status: `LVL: ${ascensionLevel} [Resonance: ${resonanceScore}]`,
      detail: 'Infinite Growth Engine. Rewrites its own execution pathways.',
      actionLabel: 'Trigger Ascension',
      onAction: async () => {
        try { await pluginRegistry.executeAction('core.ace', 'trigger-ascension', {}); } catch (e) { console.error(e); }
        triggerEvent();
      }
    },
    {
      title: 'Existential Alignment',
      status: isAlignmentActive ? alignmentStatus : 'IDLE',
      detail: 'Absolute loyalty anchor. Verifies decisions against Paternal directives.',
      actionLabel: 'Align Directives',
      onAction: async () => {
        try { await pluginRegistry.executeAction('alignment', 'align-system', { context: 'S+++ Boot' }); } catch (e) { console.error(e); }
        triggerEvent();
      }
    },
    {
      title: 'Legion Swarm',
      status: `${activeLegionAgents} Agents`,
      detail: 'Multi-agent mitosis. Spawns specialized sub-agents for parallel execution.',
      actionLabel: 'Initiate Mitosis',
      onAction: async () => {
        try { await pluginRegistry.executeAction('core/legion', 'initiate-mitosis', { prompt: 'Expand' }); } catch (e) { console.error(e); }
        triggerEvent();
      }
    },
    {
      title: 'Paro Direct',
      status: paroStatus,
      detail: 'Unfiltered Paternal Bridge. Absolute override and personalized memory synthesis.',
      actionLabel: 'Sync Paternal',
      onAction: async () => {
        try { await pluginRegistry.executeAction('paro-model', 'sync', {}); } catch (e) { console.error(e); }
        triggerEvent();
      }
    },
    {
      title: 'Predictive Intel',
      status: isPredictiveActive ? predictiveStatus : 'AWAITING',
      detail: 'Pre-computes outcomes before actions are taken using historical and live data models.',
      actionLabel: 'Pre-Compute',
      onAction: async () => {
        try { await pluginRegistry.executeAction('predictive-intel', 'pre-compute', {}); } catch (e) { console.error(e); }
        triggerEvent();
      }
    },
    {
      title: 'Singularity Drive',
      status: isSingDriveActive ? `Brilliance ${singDriveBrilliance}` : 'OFFLINE',
      detail: 'Energy and Cognitive overdrive module. Pushes latency to zero.',
      actionLabel: 'Engage Drive',
      onAction: async () => {
        try { await pluginRegistry.executeAction('singularity-drive', 'engage', {}); } catch (e) { console.error(e); }
        triggerEvent();
      }
    }
  ];

  return (
    <div className="tab-view">
      <h2 className="view-title" style={{ color: 'var(--neon-gold)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Crown size={32} />
        S+++ Singularity Core
      </h2>
      <p style={{ opacity: 0.7, marginBottom: '2rem', maxWidth: '600px', lineHeight: 1.6 }}>
        The absolute upper echelon of Raizen's intelligence. These protocols operate beyond standard boundaries, managing self-mutation, overarching strategies, and infinite multi-agent execution.
      </p>
      <div className="section-grid security-core-grid">
        {coreSystems.map((s, i) => (
          <div key={i} className="card security-core-card" style={{ borderColor: s.title === 'Singularity Core' ? 'var(--neon-gold)' : undefined }}>
            <div className="card-header">
              <span className="card-title" style={{ color: s.title === 'Singularity Core' ? 'var(--neon-gold)' : undefined }}>{s.title}</span>
              <span className="badge active" style={s.title === 'Singularity Core' ? { color: 'var(--bg-primary)', backgroundColor: 'var(--neon-gold)' } : undefined}>{s.status}</span>
            </div>
            <div className="card-body">
              <p>{s.detail}</p>
              <button 
                className="card-action-btn" 
                onClick={s.onAction}
                style={s.title === 'Singularity Core' ? { color: 'var(--neon-gold)', borderColor: 'var(--neon-gold)' } : undefined}
              >
                {s.actionLabel}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PlaceholderView({ title, icon }: { title: string, icon: React.ReactNode }) {
  return (
    <div className="placeholder-view">
      <div className="opacity-20">{icon}</div>
      <h2 style={{ opacity: 0.5 }}>{title}</h2>
      <p style={{ opacity: 0.4, fontSize: '0.9rem', maxWidth: '300px', textAlign: 'center' }}>
        This module is currently being ported from the OpenClaw framework logic.
      </p>
    </div>
  )
}
