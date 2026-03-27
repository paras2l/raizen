import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { codeSmithLogger } from './codeSmithLogger';
import { IdeaInterpreter } from './ideaInterpreter';
import { AutoCodeGenerator } from './autoCodeGenerator';
import { TestAutomationEngine } from './testAutomationEngine';
import { DeploymentOrchestrator } from './deploymentOrchestrator';
import { CodeSmithSessionManager } from './codeSmithSessionManager';

export class CodeSmithProtocolService implements RaizenPlugin {
  id = 'codesmith-protocol';
  name = 'CodeSmith Protocol';
  description = 'Instant Software Spawning & Rapid App Creation Suite';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'spawn',
      label: 'Spawn Software',
      description: 'Build, test, and deploy an app from natural language description',
      category: 'creative',
      sensitive: false,
    },
    {
      id: 'status',
      label: 'Production Pulse',
      description: 'View active software spawning sessions and deployment results',
      category: 'creative',
      sensitive: false,
    }
  ];

  private interpreter = new IdeaInterpreter();
  private generator = new AutoCodeGenerator();
  private tester = new TestAutomationEngine();
  private orchestrator = new DeploymentOrchestrator();
  private sessionManager = new CodeSmithSessionManager();

  async initialize(): Promise<void> {
    this.status = 'connecting';
    codeSmithLogger.log('CodeSmith Protocol Initializing [GOD PRO MAX APP SPAWNING]');
    this.status = 'online';
    codeSmithLogger.success('Instant Software Spawning Hub active. Five-minute production target set.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      switch (actionId) {
        case 'spawn':
          const spec = await this.interpreter.parseIdea(params.description || 'Sovereign productivity app');
          this.sessionManager.registerSpec(spec);
          
          const codebase = await this.generator.generateCode(spec);
          this.sessionManager.registerCodebase(codebase);
          
          const testsPassed = await this.tester.runTests(codebase);
          if (!testsPassed) return { success: false, error: 'Software spawning failed during test automation phase.' };
          
          const deployment = await this.orchestrator.deployApp(codebase, params.targets || ['Web', 'iOS']);
          this.sessionManager.registerDeployment(deployment);
          
          return { success: true, data: { spec, codebase, deployment } };

        case 'status':
          return {
            success: true,
            data: {
              activeSpecs: this.sessionManager.getActiveSpecs().length,
              activeDeployments: this.sessionManager.getActiveDeployments().length,
            }
          };

        default:
          codeSmithLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      codeSmithLogger.error(`Software spawning failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    codeSmithLogger.log('CodeSmith Protocol offline.');
  }
}

export const codeSmithProtocol = new CodeSmithProtocolService();
