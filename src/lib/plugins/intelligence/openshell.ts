import { RaizenPlugin, PluginAction, ActionResult } from '../types';
import { auditLedger } from '../../governance';

export class OpenShellPlugin implements RaizenPlugin {
  id = 'intelligence.openshell';
  name = 'OpenShell Interpreter';
  description = 'Stateful, protocol-aware terminal interpreter for agent-driven system control.';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  private shellState: Record<string, string> = {};
  private currentCwd: string = 'C:\\Raizen\\Home';

  actions: PluginAction[] = [
    {
      id: 'exec_interactive',
      label: 'Interactive Exec',
      description: 'Run a command in a stateful shell session.',
      category: 'intelligence',
      sensitive: true
    },
    {
      id: 'query_state',
      label: 'Query Shell State',
      description: 'Get persistent environmental state from the shell.',
      category: 'intelligence',
      sensitive: false
    },
    {
      id: 'reset_session',
      label: 'Reset Shell',
      description: 'Clear all state and return to default CWD.',
      category: 'intelligence',
      sensitive: true
    }
  ];

  async initialize(): Promise<void> {
    this.status = 'online';
    console.log('OpenShell: Ready for agent control.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    const auditEntry = await auditLedger.append('action_result', { 
      pluginId: this.id, 
      actionId, 
      params 
    });

    switch (actionId) {
      case 'exec_interactive':
        return this.execInteractive(params, auditEntry.id);
      case 'query_state':
        return { success: true, data: { cwd: this.currentCwd, env: this.shellState }, auditId: auditEntry.id };
      case 'reset_session':
        this.shellState = {};
        this.currentCwd = 'C:\\Raizen\\Home';
        return { success: true, auditId: auditEntry.id };
      default:
        return { success: false, error: 'Unknown action.', auditId: auditEntry.id };
    }
  }

  private async execInteractive(params: Record<string, any>, auditId: string): Promise<ActionResult> {
    const { command } = params;
    if (!command) return { success: false, error: 'Empty command.', auditId };

    // Simulate shell state changes (e.g. "cd" detection)
    if (command.startsWith('cd ')) {
      this.currentCwd = command.split(' ').slice(1).join(' ').trim();
      return { 
        success: true, 
        data: { output: '', cwd: this.currentCwd }, 
        auditId 
      };
    }

    // Conceptually, this would map to terminal.run_command or similar
    console.log(`OpenShell: [${this.currentCwd}] > ${command}`);
    
    return { 
      success: true, 
      data: { 
        output: `Executed: ${command}\nStatus: Audited Success\nSession: ${auditId.slice(0, 8)}`,
        cwd: this.currentCwd
      }, 
      auditId 
    };
  }
}

export const openShellPlugin = new OpenShellPlugin();
