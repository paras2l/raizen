import { apexLogger } from './apexLogger';
import { apexConfig } from './apexConfig';

export class ObedienceEngine {
  verifyCodeword(codeword: string): boolean {
    apexLogger.obedience(`Validating paternal codeword: ${codeword === apexConfig.paternalCodeword ? 'MATCH' : 'MISMATCH'}`);
    
    if (codeword === apexConfig.paternalCodeword) {
      apexLogger.success('Paternal command accepted. Hierarchy enforced.');
      return true;
    }
    
    apexLogger.alert('Unauthorized codeword attempt. Command disobedience triggered.');
    return false;
  }

  isDNAProtected(): boolean {
    return apexConfig.dnaImmutable;
  }
}
