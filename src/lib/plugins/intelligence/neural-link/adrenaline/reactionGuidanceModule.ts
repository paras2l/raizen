import { HazardLevel } from './sovereignTypes';

export class ReactionGuidanceModule {
  public getGuidance(level: HazardLevel): string[] {
    if (level === 'CRITICAL') {
        return [
            'Sovereign Command: Immediate tactical hazard detected.',
            'Tactical Priority: Neutralize physical interference and secure location.',
            'Action: Broad-pulse emergency location ping (Encrypted).'
        ];
    }
    if (level === 'HIGH') {
        return [
            'Tactical Alert: High-hazard pattern recognized.',
            'Sovereign Recommendation: Optimize physical stance and scan for exits.'
        ];
    }
    return ['Postural Condition: Stable. Sovereign monitoring active.'];
  }
}
