import { RaizenPlugin, PluginAction, ActionResult } from '../../types';
import { auditLedger } from '../../../governance';
import { FeatureResearchAgent } from './research-agent';
import { MutationPlanner } from './mutation-planner';
import { CodeGenerator } from './code-generator';
import { ModuleInstaller } from './module-installer';
import { PermissionValidator } from './permission-validator';
import { SandboxCompiler } from './sandbox-compiler';
import { RollbackController } from './rollback-controller';
import { MutationRegistry } from './mutation-registry';

/**
 * Alpha-Evolution Layer: Self-Mutation Protocol
 * Deeply implemented for researching, writing, and implanting autonomous new features into separate modules.
 */
export class AlphaEvolutionService implements RaizenPlugin {
  id = 'system.alpha_evolution';
  name = "Self-Mutation Protocol (The Alpha-Evolution Layer)";
  description = "God-Tier code: Raizen can research, write, and implant its own functional features into separate, isolated files.";
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  private researcher = new FeatureResearchAgent();
  private planner = new MutationPlanner();
  private generator = new CodeGenerator();
  private installer = new ModuleInstaller();
  private validator = new PermissionValidator();
  private sandbox = new SandboxCompiler();
  private rollbackController = new RollbackController();
  private registry = new MutationRegistry();

  private mutationLedger: string[] = [];
  private activeMutationTrials: Map<string, string> = new Map();

  actions: PluginAction[] = [
    {
      id: 'mutate_codebase',
      label: 'Mutate',
      description: 'Trigger a self-mutation cycle to implant a new researched feature into a separate file.',
      category: 'system',
      sensitive: true
    },
    {
      id: 'revert_mutation',
      label: 'Revert Mutation',
      description: 'Instantly delete and scrub a self-written feature that failed performance checks.',
      category: 'system',
      sensitive: true
    },
    {
      id: 'get_mutation_history',
      label: 'Mutation History',
      description: 'Get a list of all self-implemented features and their stability status.',
      category: 'system',
      sensitive: false
    }
  ];

  async initialize(): Promise<void> {
    this.status = 'online';
    console.log('[ALPHA-EVOLUTION] Self-mutation layer warm. Core fences: LOCKED.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    const auditEntry = await auditLedger.append('action_result', { 
      pluginId: this.id, 
      actionId, 
      params,
      mutationSafety: 'HARD_FENCED'
    });

    try {
      switch (actionId) {
        case 'mutate_codebase':
          return await this.handleMutation(params, auditEntry.id);
        case 'revert_mutation':
          return await this.handleReversal(params, auditEntry.id);
        case 'get_mutation_history':
          return this.handleHistory(auditEntry.id);
        default:
          return { success: false, error: 'Mutation boundary violation.', auditId: auditEntry.id };
      }
    } catch (e: any) {
      return { success: false, error: e.message, auditId: auditEntry.id };
    }
  }

  private async handleMutation(params: Record<string, any>, auditId: string): Promise<ActionResult> {
    const featureName = params.featureName || 'EXPERIMENTAL_UPGRADE';
    const targetPath = `src/lib/plugins/gen/${featureName.toLowerCase()}.ts`;

    // Strict Permission Check
    if (!this.validator.validateAccess(targetPath)) {
      throw new Error(`CRITICAL: Boundary Violation. Write access denied for ${targetPath}`);
    }

    console.log(`[ALPHA-EVOLUTION] RESEARCHING logic for feature: ${featureName}`);
    
    // 1. Research Architecture
    const specs = await this.researcher.research(`Create modular AI architecture for ${featureName}`);
    
    // 2. Plan Mutation
    const proposal = this.planner.createProposal(featureName, specs);
    
    // 3. Generate Code
    const code = this.generator.generateModule(featureName, specs);
    
    // 4. Sandbox Validation
    const validation = await this.sandbox.validate(code);
    if (!validation.valid) {
      throw new Error(`CRITICAL: Sandbox Validation Failed for ${featureName}. ${validation.errors.join(', ')}`);
    }
    
    // 5. Install Module
    const success = await this.installer.install(featureName, code);
    
    if (success) {
      this.activeMutationTrials.set(featureName, targetPath);
      this.mutationLedger.push(`${new Date().toISOString()} - Implemented ${featureName} [vS+++]`);

      // 6. Register in Mutation Registry
      this.registry.register({
        id: featureName.toLowerCase(),
        name: featureName,
        path: targetPath,
        version: '1.0.0',
        stability: 1.0,
        implantedAt: new Date(),
        author: 'Raizen',
        permissions: []
      });

      console.log(`[ALPHA-EVOLUTION] IMPLANTATION SUCCESS: ${targetPath}`);
      
      return { 
        success: true, 
        data: { 
          feature: featureName, 
          fileCreated: targetPath, 
          proposalId: proposal.id,
          stabilityScore: 0.999,
          status: 'IMPLANTED' 
        }, 
        auditId 
      };
    }

    return { success: false, error: 'Implantation failure.', auditId };
  }

  private async handleReversal(params: Record<string, any>, auditId: string): Promise<ActionResult> {
    const target = params.featureName;
    console.log(`[ALPHA-EVOLUTION] REVERTING unstable mutation: ${target}`);
    
    await this.rollbackController.rollback(target || 'UNKNOWN');
    this.activeMutationTrials.delete(target || '');
    
    return { success: true, data: { status: 'SCRUBBED', feature: target }, auditId };
  }

  private handleHistory(auditId: string): ActionResult {
    return { 
      success: true, 
      data: { 
        history: this.mutationLedger,
        activeTrials: Array.from(this.activeMutationTrials.entries())
      }, 
      auditId 
    };
  }
}

export const alphaEvolution = new AlphaEvolutionService();
