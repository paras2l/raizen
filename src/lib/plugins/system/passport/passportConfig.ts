import { DigitalJurisdiction } from './passportTypes';

export const passportConfig = {
  defaultJurisdiction: 'GLOBAL' as DigitalJurisdiction,
  preferredJurisdictions: ['CH', 'SG', 'EU'] as DigitalJurisdiction[],
  privacyLevel: 'Maximum',
  autoRotationDays: 30,
  handOffLatencyThreshold: 200, // ms
};
