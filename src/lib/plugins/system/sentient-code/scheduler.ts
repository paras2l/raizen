import { SchedulingStrategy, OptimizationConfig } from './types';

export class AdaptiveScheduler {
  getStrategy(load: number): SchedulingStrategy {
    if (load > 0.7) return 'performance';
    if (load < 0.2) return 'power_save';
    return 'balanced';
  }

  planTaskDistribution(taskCount: number, config: OptimizationConfig) {
    const parallelLoad = Math.min(taskCount, config.maxParallelAgents);
    return {
      workerCount: parallelLoad,
      batchSize: config.batchSize,
      strategy: this.getStrategy(parallelLoad / config.maxParallelAgents)
    };
  }
}
