import { HazardLevel, TacticalAlert } from './sovereignTypes';
import { sovereignLogger } from './sovereignLogger';

export class AlertGenerationEngine {
  public generate(level: HazardLevel): TacticalAlert | null {
    if (level === 'LOW') return null;

    const alert: TacticalAlert = {
      id: `ALRT_${Date.now()}`,
      level,
      message: this.getMessage(level),
      suggestions: this.getSuggestions(level),
      timestamp: Date.now()
    };

    sovereignLogger.alert(alert.id, level);
    return alert;
  }

  private getMessage(level: HazardLevel): string {
    switch (level) {
      case 'CRITICAL': return 'URGENT: IMPACT DETECTED. SOVEREIGN PROTOCOLS ACTIVE. OPTIMIZING REACTION TIME.';
      case 'HIGH': return 'TACTICAL ALERT: Unusual physical signals identified. Accelerating awareness.';
      case 'MEDIUM': return 'Advisory: Tactical pattern anomaly recognized. Maintaining posture.';
      default: return 'Monitoring sovereign field.';
    }
  }

  private getSuggestions(level: HazardLevel): string[] {
    if (level === 'CRITICAL') return ['Execute evasive maneuvers', 'Broad-pulse location', 'Initiate emergency SOS'];
    if (level === 'HIGH') return ['Scan surroundings', 'Notify alpha contact'];
    return ['Postural stability maintained'];
  }
}
