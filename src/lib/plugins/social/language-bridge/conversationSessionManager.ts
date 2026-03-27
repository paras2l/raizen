import { bridgeLogger } from './bridgeLogger';

export class ConversationSessionManager {
  logTurn(lang: string) {
    bridgeLogger.log(`Multi-lingual turn logged for language: ${lang}`);
  }
}
