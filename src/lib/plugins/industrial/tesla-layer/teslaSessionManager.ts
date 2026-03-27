import { PowerGridState, EnergyHarvest, ArbitrageOpportunity } from './teslaTypes';
import { teslaLogger } from './teslaLogger';

export class TeslaSessionManager {
  private currentState: PowerGridState = {
    production: 0,
    consumption: 0,
    storageLevel: 0,
    gridStatus: 'OFF_GRID',
    lastUpdated: Date.now()
  };
  private arbitrageLedger: ArbitrageOpportunity[] = [];

  public updateState(state: PowerGridState) {
    this.currentState = state;
    teslaLogger.log(`Energy state updated: Production ${state.production}W | Storage ${state.storageLevel}%`);
  }

  public recordArbitrage(opp: ArbitrageOpportunity) {
    this.arbitrageLedger.push(opp);
    teslaLogger.log(`Grid arbitrage action executed: ${opp.action} @ $${opp.gridPrice}/kWh`);
  }

  public getLiveGrid(): PowerGridState {
    return { ...this.currentState };
  }

  public getProfitSummary(): number {
    return this.arbitrageLedger.reduce((sum, current) => sum + current.potentialProfit, 0);
  }
}
