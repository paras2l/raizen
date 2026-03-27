import { ScannedObject, CadModel } from './digitizerTypes';
import { digitizerLogger } from './digitizerLogger';

export class DigitizerSessionManager {
  private activeScans: Map<string, ScannedObject> = new Map();
  private modelLibrary: Map<string, CadModel> = new Map();

  public async trackScan(scan: ScannedObject): Promise<void> {
    this.activeScans.set(scan.id, scan);
    await digitizerLogger.log(`Physical-to-Digital synthesis initiated for [${scan.name}].`);
  }

  public getModelLibrary(): CadModel[] {
    return Array.from(this.modelLibrary.values());
  }

  public storeModel(model: CadModel): void {
    this.modelLibrary.set(model.id, model);
  }
}
