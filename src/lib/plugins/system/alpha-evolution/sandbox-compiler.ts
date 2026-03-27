import { SandboxResult } from './types';

export class SandboxCompiler {
  async validate(code: string): Promise<SandboxResult> {
    console.log('[ALPHA-SANDBOX] Running validation suite on generated module...');
    
    const hasForbiddenWords = ['fs.unlink', 'child_process', 'eval'].some(w => code.includes(w));
    
    return {
      valid: !hasForbiddenWords,
      errors: hasForbiddenWords ? ['Forbidded core access detected.'] : [],
      vulnerabilities: []
    };
  }
}
