import { PowerState, EnergyMetrics, EnergyPolicy } from './types';

export class BatteryStateAnalyzer {
  analyze(metrics: EnergyMetrics, policy: EnergyPolicy): PowerState {
    if (metrics.isCharging) return 'FULL_POWER';
    
    const level = metrics.batteryLevel * 100;
    if (level <= policy.thresholds.critical) return 'CRITICAL_POWER';
    if (level <= policy.thresholds.low) return 'LOW_POWER';
    
    return 'NORMAL';
  }
}
