export type AuthMethod = 'YubiKey' | 'TouchID' | 'Codeword' | 'Manual-Bypass';
export type CommandRisk = 'Low' | 'Medium' | 'High' | 'Critical';

export interface AuthSession {
  id: string;
  method: AuthMethod;
  timestamp: number;
  expiry: number;
  status: 'Validated' | 'Expired' | 'Failed';
}

export interface AuditEvent {
  id: string;
  commandId: string;
  risk: CommandRisk;
  authorized: boolean;
  method?: AuthMethod;
  timestamp: number;
}

export interface AnchorAction {
  type: 'verify' | 'gate' | 'audit';
  payload: any;
}
