export type DigitalJurisdiction = 'US' | 'EU' | 'CN' | 'RU' | 'CH' | 'SG' | 'GLOBAL';

export interface DigitalIdentity {
  id: string;
  jurisdiction: DigitalJurisdiction;
  alias: string;
  status: 'Active' | 'Hibernating' | 'Revoked';
  level: 'Resident' | 'Citizen' | 'Diplomat';
}

export interface AccessProfile {
  id: string;
  targetService: string;
  optimizedJurisdiction: DigitalJurisdiction;
  routingPath: string[];
  latencyMs: number;
}

export interface PassportAction {
  type: 'monitor' | 'optimize' | 'comply' | 'presence';
  payload: any;
}
