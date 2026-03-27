import { JargonEntry } from './chameleonTypes';
import { chameleonLogger } from './chameleonLogger';

export class JargonDictionaryBuilder {
  build(rawTerms: string[]): JargonEntry[] {
    chameleonLogger.log(`Building community jargon dictionary for ${rawTerms.length} terms...`);
    
    return [
      { term: "LFG", definition: "Let's Frickin' Go", context: "Excitement/Bullishness", usageFrequency: 100 },
      { term: "WAGMI", definition: "We Are All Gonna Make It", context: "Community optimism", usageFrequency: 85 }
    ];
  }
}
