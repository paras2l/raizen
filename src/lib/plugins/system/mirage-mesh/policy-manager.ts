import { PrivacyPreference } from './types';

export class PrivacyPolicyManager {
  private prefs: PrivacyPreference = {
    anonymityLevel: 'high',
    blockThirdParty: true,
    neutralizeHeaders: true
  };

  getPreferences(): PrivacyPreference {
    return this.prefs;
  }
}
