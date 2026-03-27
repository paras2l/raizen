export type MachineType = '3D_PRINTER' | 'CNC_MACHINE' | 'LASER_CUTTER' | 'ROBOTIC_ARM';
export type JobPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface MachineAgent {
  id: string;
  type: MachineType;
  status: 'IDLE' | 'PREPARING' | 'BUSY' | 'ERROR' | 'MAINTENANCE';
  capabilities: string[];
  currentJobId: string | null;
  materialRemaining: number; // Percentage
}

export interface ProductionJob {
  id: string;
  designId: string;
  machineId: string | null;
  priority: JobPriority;
  status: 'QUEUED' | 'MATERIAL_PREP' | 'EXECUTING' | 'COMPLETED' | 'FAILED';
  progress: number; // 0 to 100
  startTime?: number;
}

export interface MaterialProfile {
  id: string;
  type: string;
  quantity: number;
  unit: string;
  compatibility: MachineType[];
}

export interface FabricationStatus {
  activeJobs: number;
  machineStates: Record<string, MachineAgent['status']>;
  inventoryAlerts: string[];
}
