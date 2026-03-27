export interface NanoBot {
  id: string;
  type: 'ASSEMBLER' | 'FIXER' | 'REINFORCER';
  status: 'IDLE' | 'REPAIRING' | 'RECHARGING';
  location: { lat: number; lng: number; componentId: string };
  energyLevel: number;
}

export interface SmartMaterial {
  id: string;
  type: 'MEMORY_METAL' | 'SELF_HEALING_POLYMER' | 'PIEZO_CERAMIC';
  integrity: number; // 0.0 to 1.0
  stressLevel: number;
}

export interface HardwareComponent {
  id: string;
  name: string;
  health: number;
  lastRepair: number;
  faults: FaultState[];
}

export interface FaultState {
  id: string;
  severity: number;
  description: string;
  detectedAt: number;
}

export interface RepairMission {
  id: string;
  targetComponentId: string;
  botsAllocated: string[];
  priority: 'CRITICAL' | 'NORMAL';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}
