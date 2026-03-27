export class ThreatKnowledgeBase {
  private base = new Map();

  remember(patternId: string, countermeasure: string) {
    this.base.set(patternId, countermeasure);
    console.log(`[GUARDIAN-KB] Defensive memory updated: ${patternId}`);
  }
}
