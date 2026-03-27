import { ventureLogger } from './ventureLogger';
import { ventureConfig } from './ventureConfig';
import { ResourceMetrics } from './ventureTypes';

export class ComputeDetector {
  getMetrics(): ResourceMetrics {
    // Simulated Load Monitoring (High-Fidelity)
    const cpuLoad = Math.random() < 0.2 ? 0.95 : 0.45; // Simulated burst
    const gpuLoad = Math.random() < 0.1 ? 0.98 : 0.30;
    const ramLoad = 0.65;

    const cpuOverflow = cpuLoad >= ventureConfig.loadThresholds.cpu;
    const gpuOverflow = gpuLoad >= ventureConfig.loadThresholds.gpu;
    const ramOverflow = ramLoad >= ventureConfig.loadThresholds.ram;

    const overflowDetected = cpuOverflow || gpuOverflow || ramOverflow;

    if (cpuOverflow) ventureLogger.overflow('CPU', cpuLoad);
    if (gpuOverflow) ventureLogger.overflow('GPU', gpuLoad);
    if (ramOverflow) ventureLogger.overflow('RAM', ramLoad);

    return {
      localLoad: Math.max(cpuLoad, gpuLoad, ramLoad),
      overflowDetected,
      activeRemoteNodes: 0, // Will be updated by service
      bandwidthUsage: 12.5
    };
  }

  predictUrgency(taskComplexity: number): 'Low' | 'Medium' | 'Critical' {
    if (taskComplexity > 0.9) return 'Critical';
    if (taskComplexity > 0.6) return 'Medium';
    return 'Low';
  }
}

export const computeDetector = new ComputeDetector();
