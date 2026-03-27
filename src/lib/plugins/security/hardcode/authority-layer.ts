import { AuthorityLevel } from './types';

export class CommandAuthorityLayer {
  evaluate(level: AuthorityLevel): boolean {
    console.log(`[HARDCODE-LAYER] Validating mission authority: ${level}`);
    return level === 'MASTER';
  }
}
