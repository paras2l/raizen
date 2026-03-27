import { SoilMetric, WeatherPattern, IrrigationZone } from './gaiaTypes';
import { gaiaLogger } from './gaiaLogger';

export class GaiaSessionManager {
  private zones: IrrigationZone[] = [];
  private lastWeather: WeatherPattern | null = null;

  public updateZone(metric: SoilMetric) {
    const zone = this.zones.find(z => z.id === metric.zoneId);
    if (zone) {
        zone.moistureLevel = metric.moisture;
    } else {
        this.zones.push({
            id: metric.zoneId,
            status: 'IDLE',
            moistureLevel: metric.moisture,
            targetMoisture: 60
        });
    }
  }

  public setWeather(weather: WeatherPattern) {
    this.lastWeather = weather;
  }

  public getZones(): IrrigationZone[] {
    return this.zones;
  }

  public getWeather(): WeatherPattern | null {
    return this.lastWeather;
  }
}
