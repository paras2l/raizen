export type AttackVector = 'malware' | 'intrusion' | 'credential_attack' | 'exfiltration' | 'unknown';
export type SecuritySeverity = 'low' | 'medium' | 'high' | 'critical';

export interface ThreatPattern {
  id: string;
  vector: AttackVector;
  severity: SecuritySeverity;
  signature: string;
  timestamp: string;
}

export interface DefensePatch {
  id: string;
  targetId: string;
  type: 'firewall_rule' | 'ip_block' | 'process_restriction' | 'policy_update';
  rule: any;
  deployedAt: string;
}

export interface SecurityEvent {
  moduleId: string;
  action: string;
  outcome: 'allowed' | 'blocked' | 'flagged';
  metadata: Record<string, any>;
}

export interface GuardianConfig {
  monitorNetwork: boolean;
  autoDeployPatches: boolean;
  syncIntervalMs: number;
}
