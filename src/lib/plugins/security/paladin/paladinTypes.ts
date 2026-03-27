export type ThreatLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type DefenseState = 'Dormant' | 'Active' | 'Locked-Down';

export interface Threat {
  id: string;
  source: string;
  type: 'Intrusion' | 'DDoS' | 'Malware' | 'Phishing' | 'Anomaly';
  level: ThreatLevel;
  timestamp: number;
}

export interface DefensiveAction {
  id: string;
  threatId: string;
  strategy: string;
  status: 'In-Progress' | 'Neutralized' | 'Failed';
}

export interface OffensivePayload {
  id: string;
  target: string;
  vector: 'Packet-Flood' | 'SQL-Injection-Test' | 'Brute-Force-Block' | 'Port-Kill';
  authorizedBy: string;
}

export interface PaladinAction {
  type: 'detect' | 'defend' | 'counter' | 'learn';
  payload: any;
}
