import { SupportedLanguage } from './thoughtCodeTypes';

export const ThoughtCodeConfig = {
  MODES: {
    STRICT: { validateSyntax: true, consistencyCheck: true },
    FAST: { validateSyntax: false, consistencyCheck: false }
  },
  DEFAULT_LANGUAGE: 'TypeScript' as SupportedLanguage,
  MAX_MODULE_COMPLEXITY: 10,
  HISTORY_LIMIT: 100
};
