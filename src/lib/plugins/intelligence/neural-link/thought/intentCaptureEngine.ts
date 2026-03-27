import { ProgrammingIntent } from './thoughtCodeTypes';
import { thoughtCodeLogger } from './thoughtCodeLogger';

export class IntentCaptureEngine {
  public capture(input: string, source: 'SPOKEN' | 'WRITTEN' | 'WORKFLOW'): ProgrammingIntent {
    const intent: ProgrammingIntent = {
      id: `INTENT_${Date.now()}`,
      source,
      conceptualInput: input,
      timestamp: Date.now()
    };
    
    thoughtCodeLogger.log('Programming intent captured', { id: intent.id, source });
    return intent;
  }
}
