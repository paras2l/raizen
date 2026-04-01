import React, { useEffect, useState, useCallback } from 'react';
import { echoProtocol } from '../lib/ghost/EchoProtocol';

/**
 * Echo Beacon Component
 * 
 * A headless component that can be embedded in any "public" page 
 * to listen for the Patriarch's voice and report back to the Vanguard Mesh.
 */
export const EchoBeacon: React.FC = () => {
  const [isBeaconActive, setIsBeaconActive] = useState(true);

  const handleSpeechResult = useCallback((event: any) => {
    const transcript = Array.from(event.results)
      .map((result: any) => result[0].transcript)
      .join('')
      .toLowerCase();

    if (transcript.includes('paro the god')) {
      echoProtocol.handleFrequencyDetection({
        sourceId: 'PUBLIC-RECON-' + Math.random().toString(36).substring(7),
        frequencySignature: 'PATRIARCH-SIG-01',
        transcript: transcript
      });
    }
  }, []);

  useEffect(() => {
    if (!isBeaconActive) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onend = () => {
      if (isBeaconActive) recognition.start();
    };
    recognition.onresult = handleSpeechResult;

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [isBeaconActive, handleSpeechResult]);

  return null; // Headless component
};
