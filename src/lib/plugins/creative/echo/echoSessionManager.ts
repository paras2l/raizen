import { VocalProfile } from './echoTypes';
import { echoLogger } from './echoLogger';

export class EchoSessionManager {
  private activeProfiles = new Map<string, VocalProfile>();

  activateProfile(profile: VocalProfile) {
    this.activeProfiles.set(profile.id, profile);
    echoLogger.log(`Vocal profile activated: ${profile.id} (${profile.name})`);
  }

  deactivateProfile(id: string) {
    this.activeProfiles.delete(id);
    echoLogger.log(`Vocal profile deactivated: ${id}`);
  }

  getActiveProfiles(): VocalProfile[] {
    return Array.from(this.activeProfiles.values());
  }
}
