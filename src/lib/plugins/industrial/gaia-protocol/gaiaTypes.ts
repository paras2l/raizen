export type EnvironmentalMetric = 'SOIL_MOISTURE' | 'SOIL_PH' | 'NPK_LEVELS' | 'WEATHER_EVENT';

export interface SoilMetric {
  zoneId: string;
  moisture: number; // Percentage
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  lastUpdated: number;
}

export interface WeatherPattern {
  id: string;
  type: 'PRECIPITATION' | 'HEATWAVE' | 'FROST' | 'OPTIMAL';
  severity: number; // 0 to 1
  predictedStart: number;
  predictedEnd: number;
}

export interface IrrigationZone {
  id: string;
  status: 'IDLE' | 'WATERING' | 'FERTILIZING' | 'ERROR';
  moistureLevel: number;
  targetMoisture: number;
}

export interface BioProfile {
  id: string;
  focusCrops: string[];
  nutrientBalance: Record<string, number>;
  stressResponseActive: boolean;
}
