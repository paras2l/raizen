import { LearningTopic, ReinforcementSession } from './dreamLearningTypes';
import { dreamLearningLogger } from './dreamLearningLogger';

export class KnowledgeReviewEngine {
  public deliver(session: ReinforcementSession): string {
    const header = `[DREAM-LEARN] ${session.type === 'PRE_SLEEP' ? 'Consolidation' : 'Recall'} Session`;
    const body = session.data.map(d => `- ${d}`).join('\n');
    
    if (session.type === 'POST_SLEEP') {
        dreamLearningLogger.log('Post-sleep review session generated', { topicId: session.topicId });
    }
    
    return `${header}\n${body}`;
  }
}
