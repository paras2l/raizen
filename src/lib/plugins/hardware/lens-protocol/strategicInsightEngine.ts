import { BehavioralSignal, PsychologicalState, StrategicInsight } from './lensTypes';
import { lensLogger } from './lensLogger';

export class StrategicInsightEngine {
  public generateInsights(signals: BehavioralSignal[], state: PsychologicalState): StrategicInsight[] {
    const insights: StrategicInsight[] = [];
    
    if (state.primaryEmotion === 'HESITANT') {
        insights.push({
            id: `INS_${Date.now()}_1`,
            observation: 'Target is exhibiting elevated hesitation markers (Vocal Pitch/Facial Micro-Frown).',
            recommendation: 'Strategic recommendation: Provide immediate reassurance or lower the perceived risk stakes.',
            priority: 'HIGH',
            timestamp: Date.now()
        });
    }

    if (state.primaryEmotion === 'DECEPTIVE') {
        insights.push({
            id: `INS_${Date.now()}_2`,
            observation: 'Detected significant mismatch between verbal output and gestural posture (Defensive).',
            recommendation: 'Tactical Warning: High probability of deception. Counter with direct, verifiable questioning.',
            priority: 'CRITICAL',
            timestamp: Date.now()
        });
    }

    lensLogger.log(`Generated ${insights.length} strategic insights.`);
    return insights;
  }

  public deriveState(signals: BehavioralSignal[]): PsychologicalState {
    const stressIdx = signals.filter(s => s.value.includes('Stress')).reduce((acc, s) => acc + s.intensity, 0);
    
    return {
        primaryEmotion: stressIdx > 0.5 ? 'STRESSED' : 'ENGAGED',
        intensityIndex: stressIdx,
        indicators: signals.map(s => s.value)
    };
  }
}
