import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function SystemStatusPanel() {
  const [cpuLoad, setCpuLoad] = useState(12)
  const [memLoad, setMemLoad] = useState(24)

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(Math.floor(Math.random() * 15) + 5)
      setMemLoad(Math.floor(Math.random() * 10) + 20)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="system-status-panel">
      <header className="telemetry-header">
        <h4 className="telemetry-title">NEURAL TELEMETRY</h4>
      </header>
      <div className="stat-card">
        <span className="stat-label">COGNITIVE LOAD</span>
        <span className="stat-value">{cpuLoad}%</span>
        <div className="telemetry-progress-container">
          <motion.div className="progress-fill" animate={{ width: `${cpuLoad}%` }} transition={{ duration: 1 }} />
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-label">MEMORY SYNAPSE</span>
        <span className="stat-value">{memLoad}%</span>
        <div className="telemetry-progress-container">
          <motion.div className="progress-fill" animate={{ width: `${memLoad}%` }} transition={{ duration: 1 }} />
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-label">SECURITY MESH</span>
        <div className="telemetry-status-row">
          <div className="pulse-dot small" />
          <span>Quantum Shield</span>
        </div>
        <div className="telemetry-status-row">
          <div className="pulse-dot small secondary" />
          <span>Active Audit</span>
        </div>
      </div>
    </div>
  )
}
