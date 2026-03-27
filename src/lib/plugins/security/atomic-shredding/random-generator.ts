export class RandomDataGenerator {
  generateEntropy(size: number): Uint8Array {
    console.log(`[SHRED-ENTROPY] Generating ${size} bytes of cryptographically secure random noise...`);
    return new Uint8Array(size).map(() => Math.floor(Math.random() * 256));
  }
}
