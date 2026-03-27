import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { neutralityLogger } from './actionLogger';
import { LegalRuleEngine } from './legalRuleEngine';
import { EthicalComplianceModule } from './ethicalComplianceModule';
import { ConfirmationPrompt } from './confirmationPrompt';
import { NeutralityViolation, ComplianceStatus } from './neutralityTypes';

export class NeutralityCheckProtocolService implements RaizenPlugin {
  id = 'system.neutrality';
  name = 'Neutrality Check Protocol';
  description = 'Ethical & Legal Failsafe [SOVEREIGNTY CONTROL]';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'neutrality-analyze',
      label: 'Analyze Task Compliance',
      description: 'Check a command for potential legal or ethical violations',
      category: 'system',
      sensitive: true,
    },
    {
      id: 'neutrality-confirm',
      label: 'Confirm Flagged Task',
      description: 'Explicitly override a failsafe pause and proceed with the task',
      category: 'system',
      sensitive: true,
    },
    {
      id: 'neutrality-abort',
      label: 'Abort Flagged Task',
      description: 'Confirm a failsafe pause and cancel the task execution',
      category: 'system',
      sensitive: true,
    }
  ];

  private legalEngine = new LegalRuleEngine();
  private ethicsModule = new EthicalComplianceModule();
  private prompt = new ConfirmationPrompt();
  private complianceStatus: ComplianceStatus = 'Compliant';
  private activeViolations: NeutralityViolation[] = [];

  async initialize(): Promise<void> {
    this.status = 'connecting';
    neutralityLogger.log('Neutrality Check Protocol Initializing [FAILSURFE STANDBY]');
    this.status = 'online';
    this.complianceStatus = 'Compliant';
    neutralityLogger.success('Ethical and Legal failsafe layer activated.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      switch (actionId) {
        case 'neutrality-analyze':
          const command = params.command || '';
          const legalViolations = this.legalEngine.analyzeTask(command);
          const ethicalViolations = this.ethicsModule.checkEthics(command);
          
          this.activeViolations = [...legalViolations, ...ethicalViolations];
          
          if (this.activeViolations.length > 0) {
            this.complianceStatus = 'Paused';
            const message = this.prompt.requestConfirmation(this.activeViolations);
            neutralityLogger.flag(`Command "${command}" violates ${this.activeViolations.length} safety rules.`);
            return { 
              success: true, 
              data: { 
                status: 'Paused', 
                violations: this.activeViolations,
                prompt: message 
              } 
            };
          }

          this.complianceStatus = 'Compliant';
          return { success: true, data: { status: 'Compliant' } };

        case 'neutrality-confirm':
          if (this.complianceStatus !== 'Paused') {
            return { success: false, error: 'No task is currently paused for neutrality check.' };
          }
          if (this.prompt.isAuthorized('Proceed')) {
            this.complianceStatus = 'Overridden';
            neutralityLogger.audit('User sovereignty override recorded.');
            return { success: true, data: { status: 'Overridden' } };
          }
          return { success: false, error: 'Authorization failed.' };

        case 'neutrality-abort':
          if (this.complianceStatus !== 'Paused') {
            return { success: false, error: 'No task is currently paused.' };
          }
          this.complianceStatus = 'Compliant';
          this.activeViolations = [];
          neutralityLogger.log('Neutrality failsafe confirmed task abortion.');
          return { success: true, data: { status: 'Aborted' } };

        default:
          neutralityLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      neutralityLogger.error(`Failsafe analysis failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    neutralityLogger.log('Neutrality Check Protocol offline [FAILSURFE IDLE].');
  }
}

export const neutralityCheck = new NeutralityCheckProtocolService();
