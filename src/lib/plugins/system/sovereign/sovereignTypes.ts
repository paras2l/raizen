export type TaskMode = 'Coding' | 'Gaming' | 'Business' | 'Stealth' | 'Deep-Work' | 'Standby';

export interface AssetStatus {
  id: string;
  name: string;
  type: 'Digital' | 'Physical' | 'Network' | 'Social';
  status: 'Online' | 'Offline' | 'Busy' | 'Alert';
  lastSeen: number;
}

export interface UserProfile {
  name: string;
  preferences: Record<string, any>;
  lastInteraction: number;
  loyaltyLevel: number; // Maxes at 100%
}

export interface SessionMission {
  id: string;
  title: string;
  mode: TaskMode;
  startTime: number;
  endTime?: number;
  status: 'Active' | 'Paused' | 'Completed';
}

export interface SovereignAction {
  type: 'set-mode' | 'asset-scan' | 'friend-sync' | 'session-start';
  payload: any;
}
