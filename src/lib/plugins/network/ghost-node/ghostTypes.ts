export type FragmentStatus = 'Active' | 'Dormant' | 'Relocated' | 'Compromised';
export type NodeTier = 'Satellite' | 'Terrestrial-Edge' | 'Dark-Mesh' | 'Quantum-Relay';

export interface GhostFragment {
  id: string;
  moduleId: string;
  hash: string;
  tier: NodeTier;
  status: FragmentStatus;
  lastSync: number;
}

export interface AnonymityProfile {
  ipMasked: boolean;
  locationHidden: boolean;
  macAddressRotated: boolean;
  footprintEraseCount: number;
}

export interface GhostAction {
  type: 'fragment' | 'sync' | 'erase' | 'anonymize';
  payload: any;
}
