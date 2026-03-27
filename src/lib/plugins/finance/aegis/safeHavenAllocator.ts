import { aegisLogger } from './aegisLogger';
import { aegisConfig } from './aegisConfig';
import { CrisisEvent, SafeHavenAllocation } from './aegisTypes';

export class SafeHavenAllocator {
  allocate(event: CrisisEvent, totalWealth: number): SafeHavenAllocation[] {
    aegisLogger.log(`Calculating defense protocol for ${event.type} (Severity: ${event.severity})...`);

    const allocations: SafeHavenAllocation[] = aegisConfig.safeHavens.map(haven => {
      const amount = totalWealth * haven.allocation;
      const id = `alloc-${Math.random().toString(36).substr(2, 9)}`;
      
      aegisLogger.allocation(haven.type, amount);
      
      return {
        id,
        assetType: haven.type as any,
        amount,
        destination: `Sovereign-Vault-${haven.type}`,
        status: 'allocated'
      };
    });

    return allocations;
  }
}

export const safeHavenAllocator = new SafeHavenAllocator();
