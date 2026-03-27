import { Classification } from './aegisTypes';
import { aegisLogger } from './aegisLogger';

export class ThreatFriendClassifier {
  public async determineStatus(signature: string, matches: any[]): Promise<Classification> {
    await aegisLogger.log(`Analyzing intent and historic patterns for [${signature}]...`);
    
    if (matches.some(m => m.score > 0.8 && m.source === 'CONTACTS')) return 'FRIEND';
    return 'NEUTRAL';
  }
}
