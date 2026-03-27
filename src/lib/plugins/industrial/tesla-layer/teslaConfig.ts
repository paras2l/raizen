export const TeslaConfig = {
  THRESHOLDS: {
    VOLTAGE_MIN: 220,
    VOLTAGE_MAX: 240,
    BATTERY_RESERVE: 20, // Keep 20% for emergencies
    ARBITRAGE_MIN_PROFIT: 0.15 // USD per kWh
  },
  SENSORS: {
    REFRESH_RATE: 1000, // 1 second
    PRECISION: 0.01 // Watts
  },
  OFF_GRID_PRIORITY: true,
  TESLA_VERSION: '4.4.4-POWER-PRO'
};
