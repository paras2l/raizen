import { RaizenPlugin, PluginAction, ActionResult } from '../types';
import { auditLedger } from '../../governance';

export interface AmbientData {
  weather: string;
  traffic: 'low' | 'moderate' | 'high';
  marketHeat: number; // 0-100
  safetyAlerts: string[];
}

export class SixthSensePlugin implements RaizenPlugin {
  id = 'intelligence.sixth-sense';
  name = "Ambient Awareness (Sixth Sense)";
  description = "Environmental Consciousness: Tracks weather, markets, and safety alerts to autonomously adjust system urgency and persona tone.";
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  private currentAmbient: AmbientData = {
    weather: 'Clear',
    traffic: 'low',
    marketHeat: 45,
    safetyAlerts: []
  };

  actions: PluginAction[] = [
    {
      id: 'get_ambient_context',
      label: 'Read Environmental Context',
      description: 'Fetch real-time data on weather, traffic, and global market stability.',
      category: 'intelligence',
      sensitive: false
    },
    {
      id: 'auto_adjust_tone',
      label: 'Sync System Urgency',
      description: 'Automatically adjust Raizens tone and notification priority based on external chaos.',
      category: 'system',
      sensitive: false
    }
  ];

  async initialize(): Promise<void> {
    this.status = 'online';
    console.log('[SIXTH-SENSE] Awareness Mesh Online: Monitoring real-world pulse.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    const auditEntry = await auditLedger.append('action_result', { 
      pluginId: this.id, 
      actionId, 
      params 
    });

    switch (actionId) {
      case 'get_ambient_context':
        return { success: true, data: this.currentAmbient, auditId: auditEntry.id };
      case 'auto_adjust_tone':
        return this.syncSystemUrgency(auditEntry.id);
      default:
        return { success: false, error: 'Unknown action.', auditId: auditEntry.id };
    }
  }

  private async syncSystemUrgency(auditId: string): Promise<ActionResult> {
    const chaosLevel = (this.currentAmbient.traffic === 'high' ? 30 : 0) + (this.currentAmbient.marketHeat > 80 ? 40 : 0);
    const urgency = chaosLevel > 50 ? 'High' : 'Normal';
    
    console.log(`[SIXTH-SENSE] Chaos Level: ${chaosLevel}%. System Urgency: ${urgency}.`);
    
    return { 
      success: true, 
      data: { urgency, adjustedVibe: chaosLevel > 50 ? 'Professional' : 'Partner' }, 
      auditId 
    };
  }
}

export const sixthSensePlugin = new SixthSensePlugin();
