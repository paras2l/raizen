import { AcousticSignal, AudioZoneMode } from './zoneTypes';
import { ZoneConfig } from './zoneConfig';
import { zoneLogger } from './zoneLogger';

export class FrequencyModulator {
  public generateSignal(mode: AudioZoneMode): AcousticSignal {
    const config = ZoneConfig.MODES[mode];
    
    const signal: AcousticSignal = {
        id: `SIG_${mode}_${Date.now()}`,
        frequency: config.freq,
        gain: -20, // Low-volume subtle influence
        duration: 0, // Continuous
        type: config.type
    };

    zoneLogger.log(`Modulating ${mode} signal signature: ${signal.frequency}Hz (${signal.type})`);
    return signal;
  }
}
