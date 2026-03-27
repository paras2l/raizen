import { LanguageCode } from './types';

export class LanguageDetector {
  detect(text: string): LanguageCode {
    console.log(`[BABEL-DETECTOR] Analyzing input for linguistic markers: "${text.substring(0, 20)}..."`);
    
    if (text.toLowerCase().includes('hola')) return 'es';
    if (text.toLowerCase().includes('bonjour')) return 'fr';
    if (text.toLowerCase().includes('namaste')) return 'hi';
    
    return 'en';
  }
}
