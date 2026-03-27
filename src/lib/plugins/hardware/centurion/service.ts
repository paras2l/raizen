import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { centurionLogger } from './centurionLogger';
import { DeviceScanner } from './deviceScanner';
import { ControlInterface } from './controlInterface';
import { AuthorizationManager } from './authorizationManager';
import { CommandScheduler } from './commandScheduler';
import { CenturionSessionManager } from './centurionSessionManager';
import { AuthorizationToken, ControlCommand } from './centurionTypes';

export class CenturionProtocolService implements RaizenPlugin {
  id = 'hardware.centurion';
  name = 'Centurion Protocol';
  description = 'Universal Physical Sovereignty & Absolute Asset Control';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'centurion-scan',
      label: 'Scan Local/Sat Devices',
      description: 'Detect all controllable assets within network or satellite range',
      category: 'hardware',
      sensitive: false,
    },
    {
      id: 'centurion-takeover',
      label: 'Take Full Command',
      description: 'Take absolute control over a specific device (Requires Verified Auth)',
      category: 'hardware',
      sensitive: true,
    }
  ];

  private scanner = new DeviceScanner();
  private control = new ControlInterface();
  private auth = new AuthorizationManager();
  private scheduler = new CommandScheduler();
  private sessions = new CenturionSessionManager();

  async initialize(): Promise<void> {
    this.status = 'connecting';
    centurionLogger.log('Centurion Protocol Initializing [ZERO-TRUST DORMANCY ACTIVE]');
    this.status = 'online';
    this.sessions.startSession();
    centurionLogger.success('Centurion physical command layer ready.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      switch (actionId) {
        case 'centurion-scan':
          const devices = await this.scanner.scanDevices();
          devices.forEach(d => this.sessions.logDevice(d));
          return { success: true, data: { devices, scanStatus: 'COMPLETE' } };

        case 'centurion-takeover':
          const { deviceId, action, authToken } = params;
          if (!deviceId || !action || !authToken) return { success: false, error: 'DeviceId, Action, and AuthToken required.' };
          
          const verified = await this.auth.verifyAuthorization(authToken as AuthorizationToken);
          if (!verified) return { success: false, error: 'Direct user authorization verification failed.' };
          
          const command: ControlCommand = {
            deviceId,
            action,
            params: params.commandParams || {},
            priority: params.priority || 1,
            expiresAt: Date.now() + 60000,
          };

          this.scheduler.scheduleCommand(command);
          const success = await this.control.sendCommand(command);
          
          return {
            success,
            data: { deviceId, action, status: success ? 'EXECUTED' : 'FAILED' }
          };

        default:
          centurionLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      centurionLogger.error(`Sovereignty failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    centurionLogger.log('Centurion Protocol offline [CHANNELS CLOSED].');
  }
}

export const centurionProtocol = new CenturionProtocolService();
