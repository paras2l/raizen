import { BackupState } from './backupTypes';
import { backupLogger } from './backupLogger';

export class BackupSessionManager {
  private state: BackupState = {
    healthy: true,
    lastSync: Date.now(),
    totalSize: 0
  };

  public updateStats(sizeChange: number) {
    this.state.totalSize += sizeChange;
    this.state.lastSync = Date.now();
    backupLogger.log('Backup synchronization completed', { totalSize: this.state.totalSize });
  }

  public getHealth() {
    return { ...this.state };
  }
}
