import { ResponseSignal, HazardLevel } from './sovereignTypes';
import { SovereignConfig } from './sovereignConfig';
import { sovereignLogger } from './sovereignLogger';

export class RiskPatternAnalyzer {
  public analyze(signals: ResponseSignal[]): HazardLevel {
    const recent = signals.filter(s => s.timestamp > Date.now() - 3000); // Shorter window for faster reaction
    
    const maxAccel = Math.max(...recent.filter(s => s.source === 'ACCEL').map(s => s.value), 0);
    
    if (maxAccel > SovereignConfig.THRESHOLDS.ACCEL_MAX * 2) return 'CRITICAL';
    if (maxAccel > SovereignConfig.THRESHOLDS.ACCEL_MAX) return 'HIGH';
    
    const unconventionalMovement = recent.filter(s => s.metadata.unconventional).length;
    if (unconventionalMovement > 3) return 'MEDIUM';

    sovereignLogger.log('Tactical pattern analysis synchronized', { maxAccel, signalCount: recent.length });
    return 'LOW';
  }
}
