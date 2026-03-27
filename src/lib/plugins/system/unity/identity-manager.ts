import { PeerNode, TrustLevel } from './types';

export class PeerIdentityManager {
  private peers: Map<string, PeerNode> = new Map();

  registerPeer(peer: PeerNode) {
    this.peers.set(peer.id, peer);
    console.log(`[UNITY-IDENTITY] Knowledgeable peer registered: ${peer.name} (${peer.trustLevel})`);
  }

  updateTrust(peerId: string, level: TrustLevel) {
    const peer = this.peers.get(peerId);
    if (peer) peer.trustLevel = level;
  }

  getTrusted(): PeerNode[] {
    return Array.from(this.peers.values()).filter(p => p.trustLevel !== 'unknown');
  }
}
