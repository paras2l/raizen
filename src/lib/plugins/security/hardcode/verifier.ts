import { AuthorityLevel } from './types';

export class AuthorityVerifier {
  detect(input: string): { level: AuthorityLevel; codeword?: string } {
    console.log('[HARDCODE-VERIFIER] Scanning mission input for override triggers.');
    
    if (input.startsWith('Master Override:')) {
      const parts = input.split('::');
      return { level: 'MASTER', codeword: parts[1] };
    }

    return { level: 'USER' };
  }
}
