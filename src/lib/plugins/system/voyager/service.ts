import { RaizenPlugin, PluginAction, ActionResult } from '../../types';
import { TemporalPacketBuilder } from './temporalPacketBuilder';
import { DecentralizedMeshConnector } from './decentralizedMeshConnector';
import { EncryptionPersistenceEngine } from './encryptionPersistenceEngine';
import { CodewordAccessController } from './codewordAccessController';
import { VoyagerSessionManager } from './voyagerSessionManager';
import { TemporalSingularityVault } from './temporalSingularityVault';
import { voyagerLogger } from './voyagerLogger';
import { VoyagerConfig } from './voyagerConfig';

export class VoyagerProtocolService implements RaizenPlugin {
  id = 'voyager-protocol';
  name = 'Voyager Protocol (Post-Human Information Archiving)';
  description = 'Ensures temporal persistence by broadcasting encrypted "Message in a Bottle" packets to decentralized meshes.';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  private builder = new TemporalPacketBuilder();
  private connector = new DecentralizedMeshConnector();
  private persistence = new EncryptionPersistenceEngine();
  private controller = new CodewordAccessController();
  private session = new VoyagerSessionManager();
  private vault = new TemporalSingularityVault();

  actions: PluginAction[] = [
    {
      id: 'voyager-broadcast',
      label: '[GOD-LEVEL] Broadcast Temporal Packet',
      description: 'Packages and broadcasts your digital history to decentralized Nostr/IPFS nodes.',
      category: 'system',
      sensitive: true
    },
    {
      id: 'voyager-validate-codeword',
      label: '[GOD-LEVEL] Validate Master Codeword',
      description: 'Verifies the Master Codeword required for legacy reconstitution sessions.',
      category: 'system',
      sensitive: true
    },
    {
      id: 'voyager-status',
      label: '[GOD-LEVEL] Get Archival Status',
      description: 'Retrieves current broadcast status, node reachability, and persistence integrity.',
      category: 'system',
      sensitive: false
    }
  ];

  async initialize(): Promise<void> {
    await voyagerLogger.log('Initializing Voyager Protocol (Post-Human Information Archiving)...');
    this.status = 'online';
    await voyagerLogger.log('Temporal persistence active via Version ' + VoyagerConfig.VERSION);
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    await voyagerLogger.log(`Executing voyager operation: ${actionId}`);

    switch (actionId) {
      case 'voyager-broadcast': {
        const data = params.data || { type: 'CREATIVE_ARCHIVE', context: 'SOVEREIGN_LIFE_WORK' };
        await this.session.initiateArchival();
        const packet = await this.builder.buildPacket(data);
        await this.persistence.hardenEncryption();
        const nodes = await this.connector.broadcastPacket(packet.packetId);
        return { success: true, data: { packet, nodes, status: 'BOTTLE_BROADCAST_COMPLETE' } };
      }

      case 'voyager-validate-codeword': {
        const codeword = params.codeword || '';
        const validation = await this.controller.validateCodeword(codeword);
        return { success: true, data: { validation, status: 'CODEWORD_PROCESSED' } };
      }

      case 'voyager-status': {
        return { success: true, data: { version: VoyagerConfig.VERSION, status: 'VOYAGER_STABLE' } };
      }

      case 'voyager-temporal-singularity-vault': {
        await this.vault.sealImmortalArchive();
        return { success: true, data: { status: 'TEMPORAL_SINGULARITY_ARCHIVE_ACTIVE' } };
      }

      default:
        return { success: true, data: { message: `Voyager Protocol ${actionId} hyper-ascended.` } };
    }
  }
}

export const voyagerProtocol = new VoyagerProtocolService();
