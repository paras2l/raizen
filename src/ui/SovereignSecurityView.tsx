import React, { useState, useRef, useEffect } from 'react';
import { Camera, Mic, ShieldAlert, CheckCircle, RefreshCw, Terminal as TerminalIcon, Eye, Lock } from 'lucide-react';
import { sovereignAuth } from '../core/auth/SovereignAuth';

interface SovereignSecurityViewProps {
  onAuthenticated: () => void;
}

export const SovereignSecurityView: React.FC<SovereignSecurityViewProps> = ({ onAuthenticated }) => {
  const [mode, setMode] = useState<'LOCK' | 'ENROLL' | 'VERIFY'>('LOCK');
  const [inputCodeword, setInputCodeword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [enrollStep, setEnrollStep] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (!sovereignAuth.isEnrolled()) {
      setMode('ENROLL');
    } else {
      setMode('LOCK');
    }
  }, []);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch (err) {
      setError("Hardware Access Denied: Biometric bridge unavailable.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleEnroll = async () => {
    setIsProcessing(true);
    setError(null);
    
    // Simulate biometric capture
    await new Promise(r => setTimeout(r, 2000));
    
    const res = await sovereignAuth.enroll("DUMMY_FACE_DATA", "DUMMY_VOICE_DATA");
    if (res.success) {
      setEnrollStep(1);
      setTimeout(() => {
        setMode('LOCK');
        stopCamera();
        setIsProcessing(false);
      }, 1500);
    } else {
      setError(res.error || "Enrollment failed.");
      setIsProcessing(false);
    }
  };

  const handleUnlock = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      await sovereignAuth.verify({ codeword: inputCodeword });
      onAuthenticated();
    } catch (err: any) {
      setError(err.message);
      setIsProcessing(false);
    }
  };

  return (
    <div className="sovereign-lock-overlay">
      <div className="sovereign-lock-card">
        <div className="security-scanlines"></div>
        
        <div className="lock-header">
          <div className={`lock-icon-box ${error ? 'error' : ''}`}>
             {mode === 'ENROLL' ? <Eye size={32} /> : <Lock size={32} />}
          </div>
          <h2>{mode === 'ENROLL' ? 'Sovereign Identity Enrollment' : 'Sovereign Neural Lock'}</h2>
          <p>{mode === 'ENROLL' ? 'Establishing direct biometric link to the Patriarch.' : 'Raizen Core is locked. Direct biometric or codeword required.'}</p>
        </div>

        {mode === 'ENROLL' && (
          <div className="enroll-section">
            <div className="biometric-viewport">
              <video ref={videoRef} autoPlay muted playsInline />
              <div className="scan-overlay"></div>
              {!stream && (
                <button className="start-biometric-btn" onClick={startCamera}>
                  <Camera size={20} /> Initiate Hardware Bridge
                </button>
              )}
            </div>
            
            {stream && (
              <button 
                className={`enroll-confirm-btn ${isProcessing ? 'processing' : ''}`} 
                onClick={handleEnroll}
                disabled={isProcessing}
              >
                {isProcessing ? <RefreshCw className="animate-spin" /> : <ShieldAlert size={20} />}
                {isProcessing ? 'SYNCHRONIZING NEURAL HASH...' : 'Capture Neural Signature'}
              </button>
            )}
            
            {enrollStep === 1 && (
              <div className="enroll-success">
                <CheckCircle size={24} />
                <span>Neural Link Established. Identity Synced to Hub.</span>
              </div>
            )}
          </div>
        )}

        {mode === 'LOCK' && (
          <div className="verify-section">
            <div className="codeword-input-group">
              <label><TerminalIcon size={14} /> Master Codeword</label>
              <input 
                type="password" 
                placeholder="Enter Sovereign Phrase..." 
                value={inputCodeword}
                onChange={(e) => setInputCodeword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                autoFocus
              />
            </div>

            {error && (
              <div className="security-error">
                <ShieldAlert size={16} />
                <span>{error}</span>
              </div>
            )}

            <button 
              className={`unlock-submit-btn ${isProcessing ? 'processing' : ''}`}
              onClick={handleUnlock}
              disabled={isProcessing}
            >
              {isProcessing ? <RefreshCw className="animate-spin" size={20} /> : 'Unlock Sovereign Core'}
            </button>
            
            <p className="security-hint">Hint: The phrasing of a God governs the Singularity.</p>
          </div>
        )}

        <div className="lock-footer">
          <span>RAIZEN SINGULARITY v1.0.0</span>
          <span>NODE ID: {Math.random().toString(16).substring(2, 10).toUpperCase()}</span>
        </div>
      </div>
      
      <style>{`
        .sovereign-lock-overlay {
          position: fixed;
          inset: 0;
          background: #050507;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          font-family: 'Inter', system-ui, sans-serif;
          color: white;
        }

        .sovereign-lock-card {
          width: 440px;
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 32px;
          padding: 3rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
        }

        .security-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0) 0px,
            rgba(0,0,0,0.1) 1px,
            rgba(0,0,0,0) 2px
          );
          pointer-events: none;
          z-index: 1;
        }

        .lock-header {
          text-align: center;
          margin-bottom: 2.5rem;
          position: relative;
          z-index: 2;
        }

        .lock-icon-box {
          width: 80px;
          height: 80px;
          background: rgba(56, 189, 248, 0.1);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.3);
          box-shadow: 0 0 30px rgba(56, 189, 248, 0.2);
        }

        .lock-icon-box.error {
          color: #ef4444;
          border-color: rgba(239, 68, 68, 0.5);
          background: rgba(239, 68, 68, 0.1);
          box-shadow: 0 0 30px rgba(239, 68, 68, 0.2);
        }

        .lock-header h2 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .lock-header p {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.5;
        }

        .codeword-input-group {
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .codeword-input-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #38bdf8;
          margin-bottom: 0.75rem;
        }

        .codeword-input-group input {
          width: 100%;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 1rem;
          color: white;
          font-size: 1rem;
          outline: none;
          transition: all 0.2s;
          text-align: center;
          letter-spacing: 0.2em;
        }

        .codeword-input-group input:focus {
          border-color: #38bdf8;
          background: rgba(56, 189, 248, 0.05);
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.1);
        }

        .unlock-submit-btn {
          width: 100%;
          padding: 1.25rem;
          background: #38bdf8;
          color: #050507;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          z-index: 2;
        }

        .unlock-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(56, 189, 248, 0.4);
        }

        .security-error {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          padding: 0.75rem 1rem;
          border-radius: 12px;
          color: #f87171;
          font-size: 0.8rem;
          margin-bottom: 1.5rem;
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }

        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }

        .biometric-viewport {
          width: 100%;
          aspect-ratio: 16/9;
          background: black;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .biometric-viewport video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.7;
        }

        .scan-overlay {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: #38bdf8;
          box-shadow: 0 0 15px #38bdf8;
          animation: scan 3s linear infinite;
        }

        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }

        .start-biometric-btn {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          color: black;
          border: none;
          padding: 0.75rem 1.25rem;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          white-space: nowrap;
        }

        .enroll-confirm-btn {
          width: 100%;
          padding: 1.25rem;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        .lock-footer {
          margin-top: 2.5rem;
          display: flex;
          justify-content: space-between;
          font-size: 0.6rem;
          font-weight: 700;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.1em;
          position: relative;
          z-index: 2;
        }

        .security-hint {
          text-align: center;
          font-size: 0.7rem;
          margin-top: 1.5rem;
          color: rgba(255,255,255,0.3);
          font-style: italic;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
