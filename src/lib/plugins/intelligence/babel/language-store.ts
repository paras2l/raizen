import { LanguageCode, LanguagePreferences } from './types';

export class LanguageMemoryStore {
  private prefs: LanguagePreferences = {
    primary: 'en',
    fallback: 'en',
    autoDetect: true
  };

  getPrefs(): LanguagePreferences {
    return this.prefs;
  }

  updatePrefs(newPrefs: Partial<LanguagePreferences>) {
    this.prefs = { ...this.prefs, ...newPrefs };
    console.log('[BABEL-STORE] Language preferences updated.');
  }
}
