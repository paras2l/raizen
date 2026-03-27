import { RaizenPlugin, PluginAction, ActionResult } from '../types';
import { auditLedger } from '../../governance';

export interface ThreadOwner {
  threadId: string;
  actorId: string;
  platform: string;
  expiresAt?: string;
}

export class ThreadOwnershipPlugin implements RaizenPlugin {
  id = 'intelligence.thread-ownership';
  name = 'Thread Ownership API';
  description = 'Unified logic to track which actor or agent "owns" a conversation thread across platforms.';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  private ownershipMap: Map<string, ThreadOwner> = new Map(); // CompositeKey (Platform:Thread) -> Owner

  actions: PluginAction[] = [
    {
      id: 'assign_owner',
      label: 'Assign Owner',
      description: 'Map an actor to a specific thread.',
      category: 'intelligence',
      sensitive: false
    },
    {
      id: 'get_owner',
      label: 'Get Owner',
      description: 'Find the current owner of a thread.',
      category: 'intelligence',
      sensitive: false
    },
    {
      id: 'release_thread',
      label: 'Release Thread',
      description: 'Remove ownership mapping for a thread.',
      category: 'intelligence',
      sensitive: false
    }
  ];

  async initialize(): Promise<void> {
    this.status = 'online';
    console.log('Thread Ownership: Tracking system active.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    const auditEntry = await auditLedger.append('action_result', { 
      pluginId: this.id, 
      actionId, 
      params 
    });

    switch (actionId) {
      case 'assign_owner':
        return this.assignOwner(params, auditEntry.id);
      case 'get_owner':
        return this.getOwner(params, auditEntry.id);
      case 'release_thread':
        return this.releaseThread(params, auditEntry.id);
      default:
        return { success: false, error: 'Unknown action.', auditId: auditEntry.id };
    }
  }

  private async assignOwner(params: Record<string, any>, auditId: string): Promise<ActionResult> {
    const { threadId, actorId, platform } = params;
    if (!threadId || !actorId || !platform) {
      return { success: false, error: 'Incomplete ownership data.', auditId };
    }

    const key = `${platform}:${threadId}`;
    const owner: ThreadOwner = { threadId, actorId, platform };
    this.ownershipMap.set(key, owner);

    console.log(`[THREAD] Actor "${actorId}" now owns thread "${threadId}" on [${platform}]`);
    
    return { success: true, auditId };
  }

  private async getOwner(params: Record<string, any>, auditId: string): Promise<ActionResult> {
    const { threadId, platform } = params;
    const key = `${platform}:${threadId}`;
    const owner = this.ownershipMap.get(key);

    if (!owner) {
      return { success: false, error: 'No owner assigned to this thread.', auditId };
    }

    return { success: true, data: owner, auditId };
  }

  private async releaseThread(params: Record<string, any>, auditId: string): Promise<ActionResult> {
    const { threadId, platform } = params;
    const key = `${platform}:${threadId}`;
    const deleted = this.ownershipMap.delete(key);

    return { success: deleted, auditId };
  }
}

export const threadOwnershipPlugin = new ThreadOwnershipPlugin();
