import React, { useEffect, useState, useCallback } from 'react';
import { Mic } from 'lucide-react';
import { acousticEngine } from '../lib/voice/AcousticEngine';

/**
 * Acoustic Synapse Component
 * 
 * An ambient listener that monitors for the "paro the god" voice trigger.
 * When detected, it triggers an immediate session elevation or biometric match.
 */

interface AcousticSynapseProps {
  onTrigger: () => void;
  isActive: boolean;
}

export const AcousticSynapse: React.FC<AcousticSynapseProps> = ({ onTrigger, isActive }) => {
  const [lastTranscript, setLastTranscript] = useState('');
  const [pulse, setPulse] = useState(false);

  const handleTranscript = useCallback((transcript: string) => {
    setLastTranscript(transcript);

    if (transcript.includes('paro the god')) {
      console.log('[ACOUSTIC_SYNAPSE] Master Trigger Detected.');
      setPulse(true);
      setTimeout(() => setPulse(false), 2000);
      onTrigger();
    }
  }, [onTrigger]);

  useEffect(() => {
    if (!isActive) return;
    acousticEngine.start();
    const removeListener = acousticEngine.addListener(handleTranscript);
    return () => removeListener();
  }, [isActive, handleTranscript]);

  if (!isActive) return null;

  return (
    <div className={`acoustic-synapse-indicator ${pulse ? 'active' : ''}`}>
      <div className="synapse-iris">
        <Mic size={14} className="pulse-anim" />
      </div>
      <div className="synapse-label">
        <span>ACOUSTIC BEACON: ACTIVE</span>
        {lastTranscript && <p className="transcript-preview">"{lastTranscript}"</p>}
      </div>

      <style>{`
        .acoustic-synapse-indicator {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1.25rem;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 100px;
          backdrop-filter: blur(10px);
          z-index: 9999;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.8;
        }

        .acoustic-synapse-indicator.active {
          background: rgba(56, 189, 248, 0.2);
          border-color: #38bdf8;
          box-shadow: 0 0 30px rgba(56, 189, 248, 0.3);
          transform: scale(1.05);
          opacity: 1;
        }

        .synapse-iris {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(56, 189, 248, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #38bdf8;
        }

        .synapse-label {
          display: flex;
          flex-direction: column;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.7);
        }

        .transcript-preview {
          margin: 0.25rem 0 0;
          font-size: 0.6rem;
          color: #38bdf8;
          font-style: italic;
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .pulse-anim {
          animation: mic-pulse 2s infinite ease-in-out;
        }

        @keyframes mic-pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
