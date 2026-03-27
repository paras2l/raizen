import { SensorStatus } from './sanctuaryTypes';
import { sanctuaryLogger } from './sanctuaryLogger';
import { sanctuaryConfig } from './sanctuaryConfig';

export class CameraMicrophoneGate {
  private status: SensorStatus = 'Bypassed';

  gateSensors(active: boolean): void {
    if (active) {
      if (sanctuaryConfig.blockCamera) sanctuaryLogger.sensor('Camera access severed.');
      if (sanctuaryConfig.blockMicrophone) sanctuaryLogger.sensor('Microphone input shunted.');
      if (sanctuaryConfig.blockBiosensors) sanctuaryLogger.sensor('Biosensor data streams isolated.');
      this.status = 'Gated';
    } else {
      sanctuaryLogger.log('Sensors restored to standard operational mode.');
      this.status = 'Bypassed';
    }
  }

  getStatus(): SensorStatus {
    return this.status;
  }
}
