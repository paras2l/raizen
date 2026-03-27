import { DesignObjective, SimulationResult, CADModel } from './physicaTypes';
import { physicaLogger } from './physicaLogger';

export class PhysicaSessionManager {
  private activeObjectives = new Map<string, DesignObjective>();
  private simulationResults = new Map<string, SimulationResult>();
  private activeCADModels = new Map<string, CADModel>();

  registerObjective(objective: DesignObjective) {
    this.activeObjectives.set(objective.id, objective);
    physicaLogger.log(`Engineering objective registered: ${objective.id} (${objective.productType})`);
  }

  registerSimulation(result: SimulationResult) {
    this.simulationResults.set(result.id, result);
    physicaLogger.log(`Simulation result stored for ${result.objectiveId}. Status: ${result.status}`);
  }

  registerCAD(model: CADModel) {
    this.activeCADModels.set(model.id, model);
    physicaLogger.log(`CAD model archived: ${model.modelUri}`);
  }

  getActiveObjectives(): DesignObjective[] {
    return Array.from(this.activeObjectives.values());
  }

  getLatestCAD(): CADModel | undefined {
    const models = Array.from(this.activeCADModels.values());
    return models[models.length - 1];
  }
}
