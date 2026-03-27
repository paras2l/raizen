import { voidConfig } from './voidConfig';
import { voidLogger } from './voidLogger';
import { QuantumKey } from './voidTypes';

export class QuantumKeyGenerator {
  private currentKey: QuantumKey | null = null;
  private interval: NodeJS.Timeout | null = null;

  async generate(): Promise<QuantumKey> {
    const id = Math.random().toString(36).substring(7);
    const entropy = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    
    const key: QuantumKey = {
      id,
      standard: voidConfig.defaultStandard,
      publicKey: `pqc-pub-${Math.random().toString(36).substring(2)}`,
      privateKey: `pqc-priv-${Math.random().toString(36).substring(2)}`,
      entropy,
      hash: this.calculateHash(entropy),
      timestamp: Date.now(),
      createdAt: Date.now(),
      expiresAt: Date.now() + voidConfig.rotationIntervalMs,
    };

    this.currentKey = key;
    voidLogger.rotation(id);
    return key;
  }

  startRotation(): void {
    if (this.interval) return;
    
    this.interval = setInterval(async () => {
      await this.generate();
    }, voidConfig.rotationIntervalMs);
  }

  stopRotation(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  getCurrentKey(): QuantumKey | null {
    return this.currentKey;
  }

  private calculateHash(data: string): string {
    // Simulate complex quantum hashing
    return btoa(data).substring(0, 32);
  }
}

export const quantumKeyGenerator = new QuantumKeyGenerator();
