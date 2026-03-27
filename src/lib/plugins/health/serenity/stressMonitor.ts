import { serenityLogger } from './serenityLogger';
import { serenityConfig } from './serenityConfig';
import { StressProfile, StressLevel } from './serenityTypes';

export class StressMonitor {
  calculateStressLevel(typingErraticism: number, taskSwitching: number): StressProfile {
    serenityLogger.log('Analyzing psychological indicators for mental fatigue...');

    const cognitiveLoad = (typingErraticism * 0.6) + (Math.min(taskSwitching / 10, 1) * 0.4);
    
    let level: StressLevel = 'Low';
    if (cognitiveLoad >= serenityConfig.stressThresholds.burnout) level = 'Burnout-Risk';
    else if (cognitiveLoad >= serenityConfig.stressThresholds.high) level = 'High';
    else if (cognitiveLoad >= serenityConfig.stressThresholds.moderate) level = 'Moderate';

    const profile: StressProfile = {
      id: `stress-${Date.now()}`,
      level,
      cognitiveLoad,
      typingErraticism,
      taskSwitchingFrequency: taskSwitching,
      timestamp: Date.now()
    };

    serenityLogger.stressDetected(level, cognitiveLoad);
    return profile;
  }
}

export const stressMonitor = new StressMonitor();
