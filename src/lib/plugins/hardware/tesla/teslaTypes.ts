export type GridStatus = 'Independent' | 'Synchronizing' | 'Selling-Surplus' | 'Offline' | 'Emergency-Backup';
export type EnergySource = 'Solar' | 'Wind' | 'Nuclear' | 'Battery-Pack';

export interface BatteryUnit {
  id: string;
  capacity: number;
  chargeLevel: number; // 0.0 to 1.0
  health: number;
  temp: number;
}

export interface EnergyState {
  generationRate: number; // Watts
  consumptionRate: number;
  batteryStatus: number; // Aggregate %
  gridStatus: GridStatus;
  profitGeneratedToday: number;
}

export interface MarketAction {
  id: string;
  action: 'SELL' | 'BUY' | 'HOLD';
  pricePoint: number;
  quantity: number;
  timestamp: number;
}
