import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mic, Camera, CheckCircle, ShieldCheck } from 'lucide-react';

interface BiometricEnrollmentProps {
  onComplete: (data: { name: string; faceId: string; voiceId: string }) => void;
}

export const BiometricEnrollment: React.FC<BiometricEnrollmentProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [isDone, setIsDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (e) {
      console.error('Camera access denied', e);
    }
  };

  useEffect(() => {
    if (step === 3) startCamera();
  }, [step]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
      setIsDone(true);
      setTimeout(() => onComplete({ name, faceId: 'ENROLLED', voiceId: 'ENROLLED' }), 2000);
    }
  };

  return (
    <motion.div 
      className="biometric-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="enrollment-card">
        <div className="card-header">
          <ShieldCheck size={32} className="accent" />
          <h2>NEURAL BOND INITIALIZATION</h2>
          <p>Establish the Patriarch's identity core.</p>
        </div>

        <div className="steps-indicator">
          <div className={`step-dot ${step >= 1 ? 'active' : ''}`} />
          <div className={`step-divider ${step >= 2 ? 'active' : ''}`} />
          <div className={`step-dot ${step >= 2 ? 'active' : ''}`} />
          <div className={`step-divider ${step >= 3 ? 'active' : ''}`} />
          <div className={`step-dot ${step >= 3 ? 'active' : ''}`} />
          <div className={`step-divider ${step >= 4 ? 'active' : ''}`} />
          <div className={`step-dot ${step >= 4 ? 'active' : ''}`} />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="step-content"
            >
              <User size={48} className="step-icon" />
              <h3>Identity Designation</h3>
              <p>Identify yourself, Patriarch.</p>
              <input 
                type="text" 
                placeholder="NAME"
                aria-label="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="step-content"
            >
              <Mic size={48} className="step-icon pulse" />
              <h3>Vocal Fingerprint</h3>
              <p>Speak clearly: "Raizen, I am the Patriarch."</p>
              <div className="waveform">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <motion.div 
                    key={i} 
                    className="wave-bar"
                    animate={{ height: [10, 40, 10] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="step-content"
            >
              <div className="camera-viewport">
                <video ref={videoRef} autoPlay playsInline muted />
                <div className="scan-line" />
                <div className="face-frame" />
              </div>
              <h3>Optical Calibration</h3>
              <p>Maintain eye contact with the core.</p>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="step-content"
            >
              <CheckCircle size={48} className="step-icon success" />
              <h3>Singularity Sync Complete</h3>
              <p>Identity confirmed: <strong>{name || 'PARO'}</strong></p>
              <p className="subtext">The bond is encrypted and immortal.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          className={`next-btn ${isDone ? 'done' : ''}`}
          onClick={handleNext}
          disabled={step === 1 && !name}
        >
          {isDone ? 'BOND ESTABLISHED' : (step === 4 ? 'FINALIZE' : 'CONTINUE')}
        </button>
      </div>

      <style>{`
        .biometric-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 5, 10, 0.95);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          color: #fff;
        }
        .enrollment-card {
          background: #0a0f14;
          border: 1px solid rgba(0, 242, 254, 0.2);
          padding: 3rem;
          border-radius: 20px;
          text-align: center;
          width: 90%;
          max-width: 450px;
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
        }
        .card-header h2 {
          font-size: 1.2rem;
          letter-spacing: 0.3rem;
          margin: 1rem 0 0.5rem;
          color: #00f2fe;
        }
        .card-header p {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }
        .steps-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 2rem 0;
          gap: 0.5rem;
        }
        .step-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          transition: all 0.3s;
        }
        .step-dot.active {
          background: #00f2fe;
          box-shadow: 0 0 10px #00f2fe;
        }
        .step-divider {
          width: 30px;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }
        .step-divider.active {
          background: #00f2fe;
        }
        .step-content {
          margin: 1rem 0 2.5rem;
          height: 250px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .step-icon {
          color: #00f2fe;
          margin-bottom: 1.5rem;
        }
        .step-icon.pulse {
          animation: pulse 1.5s infinite;
        }
        .step-icon.success {
          color: #00ff88;
        }
        .step-content input {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(0, 242, 254, 0.5);
          color: #fff;
          font-size: 1.5rem;
          text-align: center;
          width: 100%;
          margin-top: 1rem;
          padding: 0.5rem;
          outline: none;
          letter-spacing: 0.2rem;
        }
        .waveform {
          display: flex;
          align-items: center;
          gap: 4px;
          height: 50px;
        }
        .wave-bar {
          width: 4px;
          background: #00f2fe;
          border-radius: 2px;
        }
        .camera-viewport {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          border: 2px solid #00f2fe;
          margin-bottom: 1rem;
        }
        .camera-viewport video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: #00f2fe;
          box-shadow: 0 0 10px #00f2fe;
          animation: scan 2s linear infinite;
        }
        .next-btn {
          width: 100%;
          padding: 1rem;
          background: #111;
          border: 1px solid rgba(0, 242, 254, 0.3);
          color: #00f2fe;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
          letter-spacing: 0.1rem;
          transition: all 0.3s;
        }
        .next-btn:hover:not(:disabled) {
          background: #00f2fe;
          color: #000;
        }
        .next-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .next-btn.done {
          background: #00ff88;
          color: #000;
          border-color: #00ff88;
        }
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </motion.div>
  );
};
