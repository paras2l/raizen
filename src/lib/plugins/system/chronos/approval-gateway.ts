import { ApprovalStatus } from './types';

export class SimulationApprovalGateway {
  private status: ApprovalStatus = 'PENDING';

  approve() {
    this.status = 'APPROVED';
    console.log('[CHRONOS-GATEWAY] Simulation SIGNED OFF by user. Proceeding to real-world commit.');
  }

  reject() {
    this.status = 'REJECTED';
    console.log('[CHRONOS-GATEWAY] Timeline DISCARDED. No changes made to system.');
  }

  getStatus(): ApprovalStatus {
    return this.status;
  }
}
