import { BiometricData } from './equilibriumTypes';
import { equilibriumLogger } from './equilibriumLogger';

export class BiometricSignalListener {
  private lastData?: BiometricData;

  public async onDataReceived(data: BiometricData) {
    this.lastData = data;
    await equilibriumLogger.log('Biometric signal received', {
      hr: data.heartRate,
      hrv: data.hrv,
      ts: data.timestamp
    });
  }

  public getLastSignal(): BiometricData | undefined {
    return this.lastData;
  }
}
