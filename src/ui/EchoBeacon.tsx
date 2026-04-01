import React, { useEffect, useCallback } from 'react';
import { echoProtocol } from '../lib/ghost/EchoProtocol';
import { acousticEngine } from '../lib/voice/AcousticEngine';

/**
 * Echo Beacon Component
 * 
 * A headless component that can be embedded in any "public" page 
 * to listen for the Patriarch's voice and report back to the Vanguard Mesh.
 */
export const EchoBeacon: React.FC = () => {

  const handleTranscript = useCallback((transcript: string) => {
    if (transcript.includes('paro the god')) {
      echoProtocol.handleFrequencyDetection({
        sourceId: 'PUBLIC-RECON-' + Math.random().toString(36).substring(7),
        frequencySignature: 'PATRIARCH-SIG-01',
        transcript: transcript
      });
    }
  }, []);

  useEffect(() => {
    acousticEngine.start();
    const removeListener = acousticEngine.addListener(handleTranscript);
    return () => removeListener();
  }, [handleTranscript]);

  return null; // Headless component
};
