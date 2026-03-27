import { reputationLogger } from './reputationLogger';

export class NameVariantDetector {
  getVariants(baseName: string): string[] {
    reputationLogger.log(`Detecting variants for: ${baseName}...`);
    return [baseName, baseName.replace(' ', ''), baseName.split(' ')[0]];
  }
}
