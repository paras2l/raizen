import { SyncDelta } from './types';

export class ConflictResolver {
  resolve(local: SyncDelta, remote: SyncDelta): SyncDelta {
    console.log(`[VECTOR-SYNC] Resolving collision on memory unit: ${local.id}`);
    
    // Last-Write-Wins logic
    const localTime = new Date(local.timestamp).getTime();
    const remoteTime = new Date(remote.timestamp).getTime();

    return remoteTime > localTime ? remote : local;
  }
}
