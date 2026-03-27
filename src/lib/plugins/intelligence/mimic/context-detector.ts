import { ContextTone, PersonaMode } from './types';

export class ContextToneDetector {
  detect(taskUrgency: number, systemRisk: string, topic: string): ContextTone {
    console.log(`[MIMIC-DETECTOR] Analyzing task: ${topic} (Urgency: ${taskUrgency}, Risk: ${systemRisk})`);
    return {
      urgency: taskUrgency,
      risk: systemRisk as any,
      topic,
      userEmotion: 'neutral'
    };
  }

  determineMode(context: ContextTone): PersonaMode {
    if (context.risk === 'CRITICAL') return 'AUTHORITATIVE';
    if (context.urgency > 0.8) return 'EMERGENCY';
    
    const creativeTopics = ['design', 'art', 'music', 'creative', 'startup'];
    if (creativeTopics.some(t => context.topic.toLowerCase().includes(t))) return 'CREATIVE';
    
    const analyticalTopics = ['code', 'data', 'math', 'debug', 'research'];
    if (analyticalTopics.some(t => context.topic.toLowerCase().includes(t))) return 'ANALYTICAL';
    
    if (context.urgency > 0.5) return 'PROFESSIONAL';
    return 'CASUAL';
  }
}
