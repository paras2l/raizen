import { nomadLogger } from './nomadLogger';
import { nomadConfig } from './nomadConfig';
import { ArbitrageNode } from './nomadTypes';

export class AssetScanner {
  private nodes: ArbitrageNode[] = [];

  async scanGlobalMarkets(): Promise<ArbitrageNode[]> {
    nomadLogger.log(`Scanning assets across ${nomadConfig.monitoredCountries} countries...`);

    // Simulated Global Market Scanning (High-Fidelity)
    this.nodes = Array.from({ length: nomadConfig.monitoredCountries }).map((_, i) => ({
      countryCode: `ISO-${i + 1}`,
      interestRate: 0.01 + Math.random() * 0.15, // 1% - 16% range
      currency: i % 3 === 0 ? 'USDT' : i % 3 === 1 ? 'EUR' : 'GBP',
      liquidity: 0.5 + Math.random() * 0.5,
      riskScore: Math.random()
    }));

    return this.nodes;
  }

  detectSpreads(): { from: string; to: string; spread: number }[] {
    const spreads: { from: string; to: string; spread: number }[] = [];
    
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const spread = Math.abs(this.nodes[i].interestRate - this.nodes[j].interestRate);
        if (spread > nomadConfig.arbitrageThreshold) {
          spreads.push({
            from: this.nodes[i].countryCode,
            to: this.nodes[j].countryCode,
            spread
          });
        }
      }
    }

    return spreads.sort((a, b) => b.spread - a.spread);
  }
}

export const assetScanner = new AssetScanner();
