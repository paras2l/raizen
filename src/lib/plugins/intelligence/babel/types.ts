export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'hi' | 'ja' | 'zh' | 'ru';

export interface TranslationResult {
  text: string;
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  confidence: number;
}

export interface LocalizationMap {
  [key: string]: string;
}

export interface LanguagePreferences {
  primary: LanguageCode;
  fallback: LanguageCode;
  autoDetect: boolean;
}

export interface BabelConfig {
  defaultLanguage: LanguageCode;
  enableTonePreservation: boolean;
  lockTechnicalTerms: boolean;
}
