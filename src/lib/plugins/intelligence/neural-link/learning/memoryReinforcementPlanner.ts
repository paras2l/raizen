import { LearningTopic, ReinforcementSession, SleepPhase } from './dreamLearningTypes';
import { DreamLearningConfig } from './dreamLearningConfig';
import { dreamLearningLogger } from './dreamLearningLogger';

export class MemoryReinforcementPlanner {
  public plan(topic: LearningTopic, sleep: SleepPhase): ReinforcementSession[] {
    const preSleep: ReinforcementSession = {
      topicId: topic.id,
      type: 'PRE_SLEEP',
      scheduledTime: sleep.detectedAt + (DreamLearningConfig.REINFORCEMENT.PRE_SLEEP_WINDOW_MINS * 60000),
      data: [`Overview: ${topic.name}`, `Core: ${topic.content.slice(0, 50)}`]
    };

    const postSleep: ReinforcementSession = {
      topicId: topic.id,
      type: 'POST_SLEEP',
      scheduledTime: sleep.expectedWakeAt + (DreamLearningConfig.REINFORCEMENT.POST_SLEEP_WINDOW_MINS * 60000),
      data: [`Recall: ${topic.name}`, `Synthesis: ${topic.content.slice(0, 30)}...`]
    };

    dreamLearningLogger.log('Learning reinforcement scheduled', { topicId: topic.id });
    return [preSleep, postSleep];
  }
}
