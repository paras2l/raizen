import { sentinelLogger } from './sentinelLogger';

export class SmartLockController {
  private lockedSectors: Set<string> = new Set();

  public async lockAll() {
    await sentinelLogger.log('Executing master lockdown of all synchronized access points.');
    // Simulate locking every connected OMNI-Lock
    this.lockedSectors.add('ALL');
    await sentinelLogger.log('Perimeter SEALED. Manual override: DISABLED.');
  }

  public async unlockAll() {
    this.lockedSectors.clear();
    await sentinelLogger.log('Security lockdown lifted. Resuming normal access patterns.');
  }

  public isLocked(sector: string): boolean {
    return this.lockedSectors.has('ALL') || this.lockedSectors.has(sector);
  }
}
