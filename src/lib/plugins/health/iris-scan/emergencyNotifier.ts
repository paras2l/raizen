import { irisLogger } from './irisLogger';
import { irisConfig } from './irisConfig';
import { TriageReport } from './irisTypes';

export class EmergencyNotifier {
  async notifyResponders(report: TriageReport): Promise<boolean> {
    if (!irisConfig.emergencyProtocol.directAlertEnabled) return false;

    irisLogger.log(`Linking with local emergency services [Radius: ${irisConfig.emergencyProtocol.firstResponderRadiusKm}km]...`);

    // Simulated Emergency Alert Transmission
    irisLogger.success(`Uplink established. Transmitting Triage Report ${report.id}...`);
    
    // Transmission Simulation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    irisLogger.reportTransmitted(report.id);
    return true;
  }
}

export const emergencyNotifier = new EmergencyNotifier();
