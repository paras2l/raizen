export class AgentThrottleController {
  private activeCount: number = 0;

  throttle(limit: number) {
    console.log(`[SUSTAIN-THROTTLE] Throttling AI agent swarm to max ${limit} workers.`);
    this.activeCount = limit;
  }

  getActiveLimit(): number {
    return this.activeCount;
  }
}
