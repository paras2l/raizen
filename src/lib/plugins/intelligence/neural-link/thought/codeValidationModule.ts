import { GeneratedCode, ValidationReport } from './thoughtCodeTypes';

export class CodeValidationModule {
  public validate(code: GeneratedCode): ValidationReport {
    const errors: string[] = [];
    if (!code.content.includes('export')) errors.push('Missing exports');
    
    return {
      isValid: errors.length === 0,
      errors,
      consistencyScore: errors.length === 0 ? 1.0 : 0.5
    };
  }
}
