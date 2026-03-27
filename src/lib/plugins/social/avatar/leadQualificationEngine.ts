import { Prospect } from './avatarTypes';
import { avatarLogger } from './avatarLogger';

export class LeadQualificationEngine {
  qualify(prospects: Prospect[]): Prospect[] {
    avatarLogger.log(`Qualifying ${prospects.length} prospects...`);
    return prospects.map(p => ({
      ...p,
      status: p.score > 0.8 ? 'qualified' : 'ignored'
    }));
  }
}
