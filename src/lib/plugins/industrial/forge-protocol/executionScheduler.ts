import { ProductionJob, MachineAgent } from './forgeTypes';
import { forgeLogger } from './forgeLogger';

export class ExecutionScheduler {
  public schedule(jobs: ProductionJob[], machines: MachineAgent[]): Record<string, string> {
    forgeLogger.log(`Optimizing industrial workload across ${machines.length} machine agents...`);
    
    const assignments: Record<string, string> = {};
    const availableMachines = machines.filter(m => m.status === 'IDLE');

    jobs.forEach((job, index) => {
        if (availableMachines[index]) {
            assignments[job.id] = availableMachines[index].id;
            forgeLogger.log(`Job [${job.id}] assigned to Machine [${availableMachines[index].id}]`);
        }
    });

    return assignments;
  }
}
