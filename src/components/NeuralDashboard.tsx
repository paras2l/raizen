import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Lock, Activity } from 'lucide-react'

export interface AgentConfig {
  id: string;
  name: string;
  modelId: string;
  apiKey: string;
  provider: string;
}

export function NeuralDashboard({ config }: { config: AgentConfig | null }) {
  return (
    <div className="welcome-hero">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="dashboard-grid"
      >
        <div className="dashboard-header">
          <h1 className="dashboard-hero-title">
            {config ? `Neural Link: ${config.name}` : "System Online"}
          </h1>
          <p className="dashboard-hero-subtitle">
            {config 
              ? `Authorized reasoning via ${config.modelId}`
              : "Raizen S+++ Rank Singularity initialized. Waiting for agent connection."}
          </p>
        </div>

        <div className="stat-card">
          <Zap size={20} color="var(--accent-secondary)" />
          <span className="stat-label">ENGINE STATUS</span>
          <span className="stat-value">{config ? 'LINKED' : 'STANDBY'}</span>
        </div>
        <div className="stat-card">
          <Lock size={20} color="var(--accent-primary)" />
          <span className="stat-label">BOUNDARIES</span>
          <span className="stat-value">PROTECTED</span>
        </div>
        <div className="stat-card">
          <Activity size={20} color="var(--accent-primary)" />
          <span className="stat-label">LATENCY</span>
          <span className="stat-value">24ms</span>
        </div>
        {!config && (
          <div className="stat-card dashboard-info-card">
            <span className="stat-label dashboard-info-label">INITIALIZATION REQUIRED</span>
            <p>Connect an agent to bridge the neural gap and begin autonomy.</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
