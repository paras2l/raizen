export interface CyberIncident {
  id: string;
  type: string;
  detectedAt: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface ForensicEvidence {
  timestamp: string;
  sourceIp: string;
  actionTaken: string;
  rawPayload: string;
  hash: string;
}

export interface ThreatReport {
  incident: CyberIncident;
  evidence: ForensicEvidence[];
  preparedBy: string;
}

export interface LegalDocument {
  title: string;
  type: 'c_and_d' | 'complaint' | 'incident_report';
  body: string;
  status: 'draft' | 'approved' | 'dispatched';
}

export interface LegalConfig {
  autoDraftOnCritical: boolean;
  defaultJurisdiction: string;
  requireMasterCodewordForExport: boolean;
}
