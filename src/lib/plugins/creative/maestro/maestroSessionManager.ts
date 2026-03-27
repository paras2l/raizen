import { CreativeDNA, EmulatedOutput } from './maestroTypes';
import { maestroLogger } from './maestroLogger';

export class MaestroSessionManager {
  private activeDNAs = new Map<string, CreativeDNA>();
  private activeOutputs = new Map<string, EmulatedOutput>();

  registerDNA(dna: CreativeDNA) {
    this.activeDNAs.set(dna.id, dna);
    maestroLogger.log(`Master DNA added to active repertoire: ${dna.creatorName}`);
  }

  registerOutput(output: EmulatedOutput) {
    this.activeOutputs.set(output.id, output);
    maestroLogger.log(`Emulated output registered: ${output.id}`);
  }

  getActiveDNAs(): CreativeDNA[] {
    return Array.from(this.activeDNAs.values());
  }

  getActiveOutputs(): EmulatedOutput[] {
    return Array.from(this.activeOutputs.values());
  }
}
