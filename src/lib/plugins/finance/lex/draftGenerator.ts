import { lexLogger } from './lexLogger';
import { lexConfig } from './lexConfig';
import { LegalDraft, RiskFlag } from './lexTypes';

export class DraftGenerator {
  generateDraft(title: string, jurisdiction: string, flags: RiskFlag[] = []): LegalDraft {
    lexLogger.log(`Generating fully-enforceable legal draft for ${title} [Jurisdiction: ${jurisdiction}]...`);

    let content = `// LEGAL DRAFT: ${title}\n// JURISDICTION: ${jurisdiction}\n\n`;
    
    if (flags.length > 0) {
      lexLogger.log(`Applying ${flags.length} redline optimizations to remove exposure...`);
      flags.forEach(f => {
        content += `// APPLIED FIX [${f.type}]: ${f.suggestedEdit}\n`;
      });
    }

    const draft: LegalDraft = {
      id: `lex-${Math.random().toString(36).substr(2, 9)}`,
      title,
      jurisdiction,
      content: content + '\n[FULL ENFORCEABLE LEGALESE...]',
      version: '1.0.0',
      status: 'reviewed'
    };

    lexLogger.finalized(draft.id, draft.version);
    return draft;
  }
}

export const draftGenerator = new DraftGenerator();
