import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Mic, Cpu, X, Activity } from 'lucide-react';

/**
 * SovereignOverlay: Mini-HUD for background tasking.
 * Stays on top of other applications to provide Raizen's status.
 */
export const SovereignOverlay: React.FC<{ isActive: boolean; lastThought?: string; onDismiss: () => void }> = ({ 
  isActive, 
  lastThought, 
  onDismiss 
}) => {
  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        drag
        initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="sovereign-overlay"
      >
        <div className="overlay-header">
          <div className="overlay-title-box">
            <Activity size={14} className="pulse" />
            <span>RAIZEN SOVEREIGN OVERLAY</span>
          </div>
          <button 
            onClick={onDismiss} 
            aria-label="Dismiss Overlay"
            title="Dismiss Overlay"
            className="overlay-close-btn"
          >
            <X size={14} />
          </button>
        </div>

        <div className="voice-hud">
          <div className="voice-wave">
            {[1, 2, 3, 4, 5].map(i => (
              <motion.div
                key={i}
                animate={{ height: [10, 20, 10] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                className="voice-wave-bar"
              />
            ))}
          </div>
          <div className="thought-text">
            {lastThought || "Listening for command..."}
          </div>
        </div>

        <div className="overlay-footer">
          <div className="core-sync-indicator">
            <Cpu size={10} />
            <span>CORE_SYNC: ONLINE</span>
          </div>
          <span>BEYOND_UI_MODE</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
