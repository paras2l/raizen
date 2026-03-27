import { EncryptionSession, QuantumKey } from './voidTypes';
import { voidLogger } from './voidLogger';

export class VoidSessionManager {
  private activeSessions: Map<string, EncryptionSession> = new Map();
  private keys: Map<string, QuantumKey> = new Map();

  startProtocol() {
    voidLogger.log('Universal Quantum Encryption protocol active.');
  }

  storeKey(key: QuantumKey) {
    this.keys.set(key.id, key);
    voidLogger.log(`Key ${key.id} stored in secure local vault.`);
  }

  trackSession(session: EncryptionSession) {
    this.activeSessions.set(session.id, session);
    voidLogger.log(`Session ${session.id} secured with node ${session.targetNodeId}.`);
  }

  getLatestKey(): QuantumKey | undefined {
    return Array.from(this.keys.values()).pop();
  }
}
