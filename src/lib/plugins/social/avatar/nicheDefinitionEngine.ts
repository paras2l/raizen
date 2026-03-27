import { Niche } from './avatarTypes';
import { avatarLogger } from './avatarLogger';

export class NicheDefinitionEngine {
  private niches: Niche[] = [];

  defineNiche(name: string, keywords: string[]): Niche {
    const niche: Niche = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description: `Targeting ${name} opportunities.`,
      targetKeywords: keywords,
      idealCustomerProfile: "High-growth tech companies and specialized agencies."
    };
    this.niches.push(niche);
    avatarLogger.log(`Niche defined: ${name}`);
    return niche;
  }

  getNiches(): Niche[] {
    return this.niches;
  }
}
