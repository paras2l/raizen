import { BehavioralHistory, PersonaMode } from './types';

export class PersonaSessionManager {
  private history: BehavioralHistory[] = [];

  logTransition(context: string, mode: PersonaMode) {
    this.history.push({
      timestamp: new Date().toISOString(),
      context,
      personaUsed: mode
    });
    console.log(`[MIMIC-SESSION] Persona history logged: ${mode} during ${context}`);
  }

  getHistory(): BehavioralHistory[] {
    return this.history;
  }
}
