import { Prospect, OutreachDraft } from './avatarTypes';
import { avatarLogger } from './avatarLogger';

export class OutreachDraftGenerator {
  generate(prospect: Prospect, nicheName: string): OutreachDraft {
    avatarLogger.log(`Drafting introduction to ${prospect.name}...`);
    const content = `Hello ${prospect.name}, I noticed your company ${prospect.company} is expanding its footprint in ${nicheName}. I specialize in helping businesses optimize their ${nicheName} strategies. Would love to connect.`;
    
    return {
      id: 'dr-' + Date.now(),
      prospectId: prospect.id,
      content,
      tone: 'professional-warm',
      status: 'pending'
    };
  }
}
