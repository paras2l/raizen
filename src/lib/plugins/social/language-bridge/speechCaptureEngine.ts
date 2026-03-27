import { SpeechSegment } from './bridgeTypes';
import { bridgeLogger } from './bridgeLogger';

export class SpeechCaptureEngine {
  async capture(): Promise<SpeechSegment> {
    bridgeLogger.log("Capturing live audio stream from system interface...");
    
    return {
      id: 'seg-' + Date.now(),
      blob: null,
      timestamp: new Date().toISOString()
    };
  }
}
