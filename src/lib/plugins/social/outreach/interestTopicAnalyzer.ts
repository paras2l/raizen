import { outreachLogger } from './outreachLogger';

export class InterestTopicAnalyzer {
  identifyAlignment(userGoals: string[], targetInterests: string[]): string[] {
    outreachLogger.log("Analyzing topic alignment between user and target...");
    return targetInterests.filter(i => userGoals.some(g => i.includes(g)));
  }
}
