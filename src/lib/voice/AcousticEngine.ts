import { eventBus } from '../plugins/core/event-bus';

/**
 * Acoustic Engine (Universal Listening Layer)
 * 
 * Manages a singleton SpeechRecognition instance to prevent hardware
 * conflicts between different acoustic components (Synapse, Beacon, etc.).
 */
class AcousticEngine {
  private static instance: AcousticEngine;
  private recognition: any;
  private isRunning = false;
  private listeners: Set<(transcript: string) => void> = new Set();

  private constructor() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('')
          .toLowerCase();
        
        this.listeners.forEach(l => l(transcript));
        eventBus.publish('ACOUSTIC_SIGNAL', { transcript });
      };

      this.recognition.onend = () => {
        if (this.isRunning) this.recognition.start();
      };
    }
  }

  static getInstance(): AcousticEngine {
    if (!AcousticEngine.instance) {
      AcousticEngine.instance = new AcousticEngine();
    }
    return AcousticEngine.instance;
  }

  public start() {
    if (!this.recognition || this.isRunning) return;
    this.isRunning = true;
    try {
      this.recognition.start();
      console.log('[ACOUSTIC_ENGINE] Global Listener Online.');
    } catch (e) {
      console.error('[ACOUSTIC_ENGINE] Failed to start:', e);
    }
  }

  public stop() {
    this.isRunning = false;
    if (this.recognition) this.recognition.stop();
  }

  public addListener(callback: (transcript: string) => void) {
    this.listeners.add(callback);
    return () => { this.listeners.delete(callback); };
  }
}

export const acousticEngine = AcousticEngine.getInstance();
