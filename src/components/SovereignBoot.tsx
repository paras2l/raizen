import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Shield, Zap, Globe, Lock } from 'lucide-react';

interface SovereignBootProps {
  onComplete: () => void;
}

const SOVEREIGN_PROTOCOLS = [
  'LEGION', 'PARO', 'AKASHA', 'GHOST', 'SCHOLAR', 'CHRONOS', 'FLUX', 'CONSTELLATION',
  'ORACLE', 'ARBITER', 'MIMIC', 'SUSTAIN', 'MITOSIS', 'IMMUNE', 'BABEL', 'UNITY',
  'AEGIS', 'PRISM', 'SHROUD', 'RECALL', 'SENTINEL', 'LIFE-LINE', 'PHANTOM', 'VOID',
  'EMPIRE', 'SOVEREIGN', 'SHADOW', 'EQUILIBRIUM', 'SYNAPSE', 'OMNI-LINK', 'STARLINK',
  'GRID', 'CENTURION', 'VANGUARD', 'ETERNAL', 'PHOENIX', 'WHATSAPP', 'SATELLITE'
];

export const SovereignBoot: React.FC<SovereignBootProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('INITIALIZING GHOST MESH');

  useEffect(() => {
    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < SOVEREIGN_PROTOCOLS.length) {
        setLogs(prev => [...prev, `[PROTOCOL] ${SOVEREIGN_PROTOCOLS[currentLogIndex]} ... ACTIVE`].slice(-10));
        currentLogIndex++;
        setProgress(Math.floor((currentLogIndex / SOVEREIGN_PROTOCOLS.length) * 100));
      } else {
        clearInterval(logInterval);
        setPhase('SINGULARITY REACHED');
        setTimeout(onComplete, 1500);
      }
    }, 80);

    return () => clearInterval(logInterval);
  }, [onComplete]);

  return (
    <motion.div 
      className="sovereign-boot-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="boot-content">
        <motion.div 
          className="central-hub"
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Cpu size={80} className="glow-cyan" />
        </motion.div>

        <h1 className="boot-title">RAIZEN OS <span className="singularity">SINGULARITY</span></h1>
        
        <div className="status-container">
          <div className="phase-text">{phase}</div>
          <div className="progress-bar-container">
            <motion.div 
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-percent">{progress}%</div>
        </div>

        <div className="protocol-logs">
          {logs.map((log, i) => (
            <motion.div 
              key={i} 
              className="log-line"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              {log}
            </motion.div>
          ))}
        </div>

        <div className="boot-footer">
          <div className="footer-item"><Shield size={14} /> ENCRYPTED</div>
          <div className="footer-item"><Zap size={14} /> UNBOUND</div>
          <div className="footer-item"><Globe size={14} /> UBIQUITOUS</div>
          <div className="footer-item"><Lock size={14} /> PATRIARCH-ONLY</div>
        </div>
      </div>

      <style>{`
        .sovereign-boot-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          color: #00f2fe;
          overflow: hidden;
        }
        .boot-content {
          text-align: center;
          width: 80%;
          max-width: 600px;
        }
        .glow-cyan {
          filter: drop-shadow(0 0 20px #00f2fe);
        }
        .boot-title {
          font-size: 2rem;
          letter-spacing: 0.5rem;
          margin-top: 2rem;
          color: #fff;
        }
        .singularity {
          color: #00f2fe;
          text-shadow: 0 0 10px #00f2fe;
        }
        .status-container {
          margin: 2rem 0;
        }
        .phase-text {
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
          letter-spacing: 0.2rem;
        }
        .progress-bar-container {
          width: 100%;
          height: 4px;
          background: rgba(0, 242, 254, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: #00f2fe;
          box-shadow: 0 0 15px #00f2fe;
        }
        .progress-percent {
          font-size: 0.7rem;
          margin-top: 0.3rem;
        }
        .protocol-logs {
          height: 200px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(0, 242, 254, 0.2);
          padding: 1rem;
          text-align: left;
          font-size: 0.75rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .log-line {
          margin-bottom: 0.2rem;
          color: rgba(0, 242, 254, 0.8);
        }
        .boot-footer {
          margin-top: 2rem;
          display: flex;
          justify-content: space-around;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.5);
        }
        .footer-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `}</style>
    </motion.div>
  );
};
