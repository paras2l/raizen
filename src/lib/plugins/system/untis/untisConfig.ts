import { ROMAddress } from './untisTypes';

export const untisConfig = {
  romMapping: [
    { start: '0x0000', end: '0x3FFF', segment: 'Apex-Command', immutable: true },
    { start: '0x4000', end: '0x7FFF', segment: 'Decision-Hierarchy', immutable: true },
    { start: '0x8000', end: '0xBFFF', segment: 'Governance-Rules', immutable: true },
    { start: '0xC000', end: '0xFFFF', segment: 'Identity-DNA', immutable: true }
  ] as ROMAddress[],
  integrityAuditMs: 100, // Frequent audits
  hardcodedIdentityPersistence: true,
  autoLockOnTamper: true
};
