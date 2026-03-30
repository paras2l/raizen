import { pluginRegistry } from '../plugins';
import { enforceSovereignty } from './security';
import { parseIntent } from './intentParser';
import { reasoningEngine } from './reasoningEngine';
import { writeMemory } from './memory';

export interface CommandResponse {
  message: string;
  activatedPlugins: string[];
  status: 'success' | 'blocked' | 'critical_confirmation';
  level: number;
  data?: any;
}

class SingularityCore {
  private level: number = 1;
  private experience: number = 0;

  async processCommand(userMessage: string, appState: any): Promise<CommandResponse> {
    // 1. Sovereignty Check
    const securityResult = enforceSovereignty(userMessage, appState);
    if (securityResult.blocked) {
      return { 
        message: securityResult.response || "Security Protocol Sync Correctly.", 
        activatedPlugins: [], 
        status: 'blocked',
        level: this.level
      };
    }

    // 2. Intent Parsing (Dynamic context lookup for 200+ protocols)
    const intent = await parseIntent(userMessage);

    // 3. Recursive Reasoning (Planning multi-protocol chains)
    const coordinatedPlan = await reasoningEngine.generatePlan(intent, this.level);
    
    // Passive Mode Detection (No-UI Command)
    if (appState.isPassive) {
      coordinatedPlan.responseTemplate = `[PASSIVE_SYSTEM] ${coordinatedPlan.responseTemplate}`;
    }

    // 4. Autonomous Execution
    const executionResults = [];
    for (const action of coordinatedPlan.actions) {
      const result = await pluginRegistry.executeAction(action.pluginId, action.actionId, action.params);
      executionResults.push({ pluginId: action.pluginId, result });
    }

    // 5. Experience Gain & Self-Evolution
    this.gainExperience(coordinatedPlan.actions.length * 10);
    // 4. Evolution Triggers
    if (this.experience >= 100) {
      await this.evolve();
      // Spectral Mesh Pulse
      await pluginRegistry.executeAction('security.void', 'void-rotate-keys', {});
      await pluginRegistry.executeAction('security.chimera', 'chimera-shard-core', { shardCount: 12 });
    }

    // 5. Memory Update
    await writeMemory(userMessage, coordinatedPlan, executionResults);

    // 6. Voice Feedback (If requested)
    if (appState.isVoice) {
      await pluginRegistry.executeAction('communication.echo', 'speak', { message: coordinatedPlan.responseTemplate });
    }

    return {
      message: coordinatedPlan.responseTemplate || "Mission accomplished. All protocols synchronized.",
      activatedPlugins: coordinatedPlan.actions.map(a => a.pluginId),
      status: 'success',
      level: this.level,
      data: { executionResults }
    };
  }

  private gainExperience(amount: number) {
    this.experience += amount;
    console.log(`[EVOLUTION] Raizen gained ${amount} EXP. Total: ${this.experience}/100`);
  }

  private async evolve() {
    this.level++;
    this.experience = 0;
    console.log(`[EVOLUTION] RAIZEN LEVELED UP TO LEVEL ${this.level}!`);
    
    // Trigger recursive improvement protocols
    await pluginRegistry.executeAction('system.alpha-evolution', 'optimize-heuristics', { level: this.level });
    await pluginRegistry.executeAction('intelligence.recursive-improvement', 'self-mutate', { depth: this.level });
  }

  getLevel(): number {
    return this.level;
  }
}

export const singularityCore = new SingularityCore();
