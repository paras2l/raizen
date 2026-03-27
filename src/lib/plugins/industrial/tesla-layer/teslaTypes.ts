export type GridComponent = 'SOLAR_ARRAY' | 'BATTERY_STORAGE' | 'EV_CHARGER' | 'HOUSE_LOAD';

export interface PowerGridState {
  production: number; // Watts
  consumption: number; // Watts
  storageLevel: number; // Percentage
  gridStatus: 'OFF_GRID' | 'EXPORTING' | 'IMPORTING';
  lastUpdated: number;
}

export interface EnergyHarvest {
  id: string;
  source: GridComponent;
  yield: number; // Wh
  efficiency: number; // 0 to 1
  timestamp: number;
}

export interface ArbitrageOpportunity {
  id: string;
  gridPrice: number; // USD per kWh
  action: 'SELL' | 'BUY' | 'HOLD';
  potentialProfit: number;
  expiresAt: number;
}

export interface BatteryHealth {
  cycles: number;
  temperature: number;
  capacityRetention: number; // 0 to 1
}
