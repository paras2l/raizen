export const VoyagerConfig = {
  VERSION: '1.0.0-VOYAGER',
  RELAYS: ['wss://relay.nostr.raizen', 'ipfs://gateway.id.persistence'],
  BROADCAST_INTERVAL_MS: 86400000, // 24 hours
  ENCRYPTION_STRENGTH: 'POST_QUANTUM_POLY1305',
  MAX_PACKET_SIZE_MB: 50
};
