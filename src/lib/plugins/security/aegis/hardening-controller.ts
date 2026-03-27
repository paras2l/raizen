import { HardeningLevel } from './types';

export class DefenseHardeningController {
  private currentLevel: HardeningLevel = 'standard';

  setHardening(level: HardeningLevel) {
    this.currentLevel = level;
    console.log(`[AEGIS-HARDEN] System defense level upgraded to: ${level.toUpperCase()}`);
  }

  getLevel(): HardeningLevel {
    return this.currentLevel;
  }
}
