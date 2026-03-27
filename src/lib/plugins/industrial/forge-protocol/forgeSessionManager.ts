import { ProductionJob, MachineAgent, FabricationStatus } from './forgeTypes';
import { forgeLogger } from './forgeLogger';

export class ForgeSessionManager {
  private jobs: ProductionJob[] = [];
  private machines: MachineAgent[] = [];

  public registerMachine(machine: MachineAgent) {
    this.machines.push(machine);
  }

  public addJob(job: ProductionJob) {
    this.jobs.push(job);
  }

  public getStatus(): FabricationStatus {
    const states: Record<string, MachineAgent['status']> = {};
    this.machines.forEach(m => states[m.id] = m.status);

    return {
        activeJobs: this.jobs.filter(j => j.status === 'EXECUTING').length,
        machineStates: states,
        inventoryAlerts: []
    };
  }

  public getActiveJobs(): ProductionJob[] {
    return this.jobs.filter(j => j.status !== 'COMPLETED');
  }

  public getMachines(): MachineAgent[] {
    return this.machines;
  }
}
