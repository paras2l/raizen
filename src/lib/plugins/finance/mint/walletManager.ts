import { mintLogger } from './mintLogger';
import { WalletState } from './mintTypes';

export class WalletManager {
  private wallets: Map<string, WalletState> = new Map();

  createWallet(label: string): WalletState {
    const wallet: WalletState = {
      id: `wallet-${Math.random().toString(36).substr(2, 9)}`,
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      assets: [
        { symbol: 'USDT', amount: 1000000 },
        { symbol: 'BTC', amount: 10 }
      ],
      lastAudit: Date.now()
    };

    this.wallets.set(wallet.id, wallet);
    mintLogger.log(`Decentralized wallet created for ${label}: ${wallet.address}`);
    return wallet;
  }

  getWallet(id: string): WalletState | undefined {
    return this.wallets.get(id);
  }

  balanceOf(symbol: string): number {
    let total = 0;
    this.wallets.forEach(w => {
      const asset = w.assets.find(a => a.symbol === symbol);
      if (asset) total += asset.amount;
    });
    return total;
  }
}

export const walletManager = new WalletManager();
