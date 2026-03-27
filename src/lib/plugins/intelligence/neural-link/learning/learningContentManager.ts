import { LearningTopic } from './dreamLearningTypes';

export class LearningContentManager {
  private topics: LearningTopic[] = [];

  public addTopic(topic: LearningTopic) {
    this.topics.push(topic);
    this.topics.sort((a, b) => b.priority - a.priority);
  }

  public getTopTopics(limit = 3): LearningTopic[] {
    return this.topics.slice(0, limit);
  }

  public getTopicById(id: string): LearningTopic | undefined {
    return this.topics.find(t => t.id === id);
  }
}
