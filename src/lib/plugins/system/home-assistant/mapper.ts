import { MissionMode, MissionModeTarget } from './types';

export class MissionModeMapper {
  private modeDefinitions: Record<MissionMode, MissionModeTarget[]> = {
    normal: [],
    deep_work: [
      { entity_id: 'light.office', domain: 'light', service: 'turn_on', data: { brightness_pct: 30, color_temp: 400 } },
      { entity_id: 'lock.front_door', domain: 'lock', service: 'lock', data: {} },
      { entity_id: 'climate.office', domain: 'climate', service: 'set_temperature', data: { temperature: 22 } }
    ],
    focus: [
      { entity_id: 'light.office', domain: 'light', service: 'turn_on', data: { brightness_pct: 80, color_temp: 250 } },
      { entity_id: 'switch.white_noise', domain: 'switch', service: 'turn_on', data: {} }
    ],
    sleep: [
      { entity_id: 'light.entire_house', domain: 'light', service: 'turn_off', data: {} },
      { entity_id: 'lock.all_doors', domain: 'lock', service: 'lock', data: {} },
      { entity_id: 'climate.bedroom', domain: 'climate', service: 'set_temperature', data: { temperature: 19 } }
    ],
    away: [
      { entity_id: 'light.entire_house', domain: 'light', service: 'turn_off', data: {} },
      { entity_id: 'lock.all_doors', domain: 'lock', service: 'lock', data: {} },
      { entity_id: 'climate.main_zone', domain: 'climate', service: 'set_preset_mode', data: { preset_mode: 'eco' } }
    ],
    relax: [
      { entity_id: 'light.living_room', domain: 'light', service: 'turn_on', data: { brightness_pct: 40, rgb_color: [255, 150, 50] } },
      { entity_id: 'scene.ambient_evening', domain: 'scene', service: 'turn_on', data: {} }
    ]
  };

  getTargetsForMode(mode: MissionMode): MissionModeTarget[] {
    return this.modeDefinitions[mode] || [];
  }
}
