import { LawRecord } from './legisTypes';
import { legisLogger } from './legisLogger';
import { legisConfig } from './legisConfig';

export class EarlyAlertNotifier {
  sendAlert(law: LawRecord) {
    if (law.confidence >= legisConfig.minConfidenceAlertThreshold) {
      legisLogger.alert(`PREDICTED LAW DETECTED: "${law.title}" in ${law.jurisdiction}. Est. Effectiveness: ${new Date(law.probableEffectiveDate).toLocaleDateString()}. Impact: ${law.impactLevel}/10.`);
      
      // Simulate alert delivery (e.g., to dashboard or secure channel)
      return { sent: true, lawId: law.id };
    }
    return { sent: false };
  }
}
