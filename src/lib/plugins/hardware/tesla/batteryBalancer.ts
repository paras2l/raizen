import { teslaLogger } from './teslaLogger';
import { BatteryUnit } from './teslaTypes';
import { teslaConfig } from './teslaConfig';

export class BatteryBalancer {
  private units: BatteryUnit[] = [];

  constructor() {
    for (const id of teslaConfig.batteryBanks) {
      this.units.push({
        id,
        capacity: 50000,
        chargeLevel: 0.95,
        health: 1.0,
        temp: 22
      });
    }
  }

  async balanceCharge(): Promise<void> {
    teslaLogger.log('Balancing charge levels across all storage units...');
    
    for (const unit of this.units) {
      if (unit.chargeLevel < 1.0) {
        unit.chargeLevel += 0.01;
      }
    }

    teslaLogger.balance(`${this.units.length} banks synchronized. Aggregate charge: 96%`);
  }

  getUnits(): BatteryUnit[] {
    return this.units;
  }
}

export const batteryBalancer = new BatteryBalancer();
