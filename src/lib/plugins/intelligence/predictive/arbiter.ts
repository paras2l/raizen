export type TaskRisk = 'NORMAL' | 'CRITICAL';

export interface ArbiterRule {
  pattern: RegExp | string;
  risk: TaskRisk;
  reason: string;
}

export class ArbiterLogic {
  private rules: ArbiterRule[] = [
    { pattern: /delete|remove|wipe|format|destroy/i, risk: 'CRITICAL', reason: 'Destructive system action detected.' },
    { pattern: /agent|persona|patriarch/i, risk: 'CRITICAL', reason: 'Core identity modification detected.' },
    { pattern: /security|firewall|codeword|auth/i, risk: 'CRITICAL', reason: 'Security bypass or elevation detected.' },
    { pattern: /buy|pay|send money|transaction|finance/i, risk: 'CRITICAL', reason: 'Financial commitment detected.' },
    { pattern: /protocol|registry|hardcode/i, risk: 'CRITICAL', reason: 'System architecture mutation detected.' },
  ];

  /**
   * Evaluates the risk of a potential task payload.
   */
  evaluate(text: string, actionId?: string): { risk: TaskRisk; reason?: string; persona: 'ASSISTANT' | 'GUARDIAN' | 'SCHOLAR' } {
    // 1. Check known high-risk actions
    if (actionId && this.isCriticalAction(actionId)) {
      return { risk: 'CRITICAL', reason: `High-risk protocol action: ${actionId}`, persona: 'GUARDIAN' };
    }

    // 2. Scan text for dangerous patterns
    for (const rule of this.rules) {
      if (typeof rule.pattern === 'string' ? text.includes(rule.pattern) : rule.pattern.test(text)) {
        return { risk: 'CRITICAL', reason: rule.reason, persona: 'GUARDIAN' };
      }
    }

    return { risk: 'NORMAL', persona: 'ASSISTANT' };
  }

  private isCriticalAction(actionId: string): boolean {
    const criticals = [
      'system:wipe',
      'system:delete-agent',
      'governance:change-codeword',
      'security:disable-firewall',
      'core.singularity:self-destruct'
    ];
    return criticals.includes(actionId);
  }
}

export const arbiter = new ArbiterLogic();
