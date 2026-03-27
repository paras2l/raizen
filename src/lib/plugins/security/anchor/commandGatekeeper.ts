import { CommandRisk } from './anchorTypes';
import { anchorLogger } from './anchorLogger';
import { HardwareAuthController } from './hardwareAuthController';

export class CommandGatekeeper {
  constructor(private auth: HardwareAuthController) {}

  async authorizeCommand(commandId: string, risk: CommandRisk, params: any): Promise<boolean> {
    anchorLogger.log(`Intercepting command ${commandId} (Risk: ${risk})...`);

    if (risk === 'Low' || risk === 'Medium') {
      return true; // No hardware auth required for low-risk
    }

    if (this.auth.isSessionValid()) {
      anchorLogger.success(`Command ${commandId} authorized via active session.`);
      return true;
    }

    anchorLogger.gate(`Command ${commandId} requires physical hardware authentication.`);
    
    if (params.emergencyCodeword) {
      return await this.auth.verifyCodeword(params.emergencyCodeword);
    }

    return await this.auth.requestPhysicalTouch();
  }
}
