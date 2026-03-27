export interface GpuNode {
  id: string;
  provider: string;
  location: string;
  hashRate: number; // MH/s
  status: 'IDLE' | 'MINING' | 'OFFLINE';
  lastSeen: number;
}

export interface MiningSession {
  id: string;
  coin: 'BTC' | 'ETH' | 'SOL' | 'XMR';
  algorithm: string;
  nodesAllocated: number;
  totalHashRate: number;
  startTime: number;
}

export interface WalletTransaction {
  id: string;
  coin: string;
  amount: number;
  destinationWallet: string;
  timestamp: number;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
}
