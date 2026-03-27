import { SignalType } from './quantTypes';

export const quantConfig = {
  accuracyBenchmark: 0.987,
  dataNodes: 1000,
  scrapeIntervalMs: 5000,
  sentimentSensitivity: 0.85,
  defaultConfidenceThreshold: 0.95,
  
  marketSymbols: [
    'BTC/USD', 'ETH/USD', 'SOL/USD', 
    'TSLA', 'NVDA', 'AAPL', 'MSFT',
    'GOLD', 'OIL'
  ],

  sources: {
    books: 100000,
    videos: 10000,
    newsFeeds: ['Reuters', 'Bloomberg', 'Alternative-Intel']
  },

  signalDefaults: {
    'STRONG-BUY': { confidence: 0.98, probability: 99.2 },
    'BUY': { confidence: 0.95, probability: 98.7 },
    'SELL': { confidence: 0.95, probability: 98.7 }
  } as Record<string, any>
};
