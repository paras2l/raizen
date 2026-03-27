import { ApprovalSession, SignatureSource } from './types';

export class MultiSigValidator {
  isValid(session: ApprovalSession): boolean {
    const required = session.action.requiredSignatures;
    const present = session.collectedSignatures.map(s => s.source);
    
    const missing = required.filter(r => !present.includes(r));
    
    console.log(`[VAULT-VALIDATOR] Multi-sig check: ${present.length}/${required.length} signatures acquired.`);
    return missing.length === 0;
  }
}
