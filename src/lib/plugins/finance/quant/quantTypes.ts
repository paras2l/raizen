export interface MarketNode {
  id: string;
  exchange: string;
  symbol: string;
  price: number;
  volume24h: number;
  change24h: number;
  lastUpdate: number;
}

export interface Candlestick {
  open: number;
  high: number;
  low: number;
  close: number;
  timestamp: number;
}

export type SignalType = 'BUY' | 'SELL' | 'HOLD' | 'STRONG-BUY' | 'STRONG-SELL';

export interface TradingSignal {
  id: string;
  symbol: string;
  type: SignalType;
  timeframe: 'Intraday' | 'Mid-Term' | 'Long-Term';
  confidence: number; // 0-1
  probability: number; // Percentage
  reasoning: string[];
  timestamp: number;
}

export interface PredictiveMetrics {
  accuracy: number;
  activePositions: number;
  winRate: number;
  profitFactor: number;
}

export interface QuantAction {
  type: 'market-scan' | 'predict' | 'analyze-sentiment' | 'dispatch-signal';
  payload: any;
}
