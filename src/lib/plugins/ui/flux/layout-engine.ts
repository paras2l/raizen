import { LayoutTemplate, UIContext } from './types';

export class LayoutEngine {
  private templates: Map<string, LayoutTemplate> = new Map([
    ['CODING', { id: 'dev_mode', name: 'Developer', panels: ['editor', 'terminal', 'assistant'], activeTools: ['debugger', 'git'] }],
    ['WRITING', { id: 'focus_mode', name: 'Writer', panels: ['editor', 'assistant'], activeTools: ['thesaurus'] }],
    ['IDLE', { id: 'dashboard_mode', name: 'Dashboard', panels: ['ledger', 'assistant'], activeTools: [] }]
  ]);

  getTemplate(context: UIContext): LayoutTemplate {
    console.log(`[FLUX-LE] Selecting optimal layout for: ${context}`);
    return this.templates.get(context) || this.templates.get('IDLE')!;
  }
}
