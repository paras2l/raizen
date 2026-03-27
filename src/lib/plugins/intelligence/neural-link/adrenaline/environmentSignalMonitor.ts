import { ResponseSignal } from './sovereignTypes';
import { sovereignLogger } from './sovereignLogger';

export class EnvironmentSignalMonitor {
  private signals: ResponseSignal[] = [];

  public async trackSignal(source: ResponseSignal['source'], value: number, metadata: any) {
    const signal: ResponseSignal = {
      id: `SIG_${Date.now()}`,
      source,
      value,
      metadata,
      timestamp: Date.now()
    };
    
    this.signals.push(signal);
    if (this.signals.length > 100) this.signals.shift();
    
    if (value > 15) { // Elevated threshold for sovereign response
        await sovereignLogger.log('Tactical signal spike detected', { source, value });
    }
    
    return signal;
  }

  public getSignals() {
    return [...this.signals];
  }
}
