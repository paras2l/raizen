export interface EnvironmentState {
  temperature: number; // Celsius
  humidity: number; // %
  oxygenLevel: number; // %
  co2Level: number; // ppm
  lightIntensity: number; // lux
  colorTemp: number; // Kelvin
}

export interface TerraformingTarget {
  userId: string;
  mode: 'PERFORMANCE' | 'RECOVERY' | 'SLEEP' | 'COGNITIVE_BOOST';
  priority: number;
}

export interface ClimateVector {
  targetTemp: number;
  fanSpeed: number;
  humidityTarget: number;
}

export interface BioCorrelation {
  heartRate: number;
  stressLevel: number;
  oxygenSaturation: number;
  lastSync: number;
}
