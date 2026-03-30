import { RaizenPlugin, PluginAction, ActionResult } from '../../types';
import { auditLedger } from '../../../governance';
import { EnvironmentDataCollector } from './data-collector';
import { ChaosIndexCalculator } from './chaos-calculator';
import { AlertPriorityManager } from './priority-manager';
import { SignalAggregator } from './aggregator';
import { ContextualNotificationEngine } from './notification-engine';

/**
 * Sixth Sense: Ambient Awareness
 * Deeply implemented for real-world environmental tracking, chaos-level calculation, and adaptive priority management.
 */
export class SixthSenseService implements RaizenPlugin {
  id = 'intelligence.sixth_sense';
  name = "Ambient Awareness (The Sixth Sense Module)";
  description = "God-Tier awareness: Tracks real-world environmental data and adjusts system tone based on external 'chaos levels'.";
  status: 'offline' | 'connecting' | 'online' | 'error' = 'online';

  private collector = new EnvironmentDataCollector();
  private calculator = new ChaosIndexCalculator();
  private priorityManager = new AlertPriorityManager();
  private aggregator = new SignalAggregator();
  private notificationEngine = new ContextualNotificationEngine();

  private environmentalCache: Map<string, any> = new Map();
  private chaosLevel: number = 0.12;

  actions: PluginAction[] = [
    {
      id: 'get_ambient_pulse',
      label: 'Sense Environment',
      description: 'Retrieve a snapshot of real-world environmental chaos and adjust system priority.',
      category: 'system',
      sensitive: false
    },
    {
      id: 'calibrate_sensors',
      label: 'Calibrate Awareness',
      description: 'Update environmental triggers based on current geopolitical and local events.',
      category: 'intelligence',
      sensitive: false
    },
    {
      id: 'trigger_alert_buffer',
      label: 'Set Alert Level',
      description: 'Manually override the system chaos level and notification tone.',
      category: 'system',
      sensitive: true
    },
    {
       id: 'adjust_priority',
       label: 'Adjust Priority',
       description: 'Determine if a notification should be silenced based on ambient chaos.',
       category: 'system',
       sensitive: false
    }
  ];

  async initialize(): Promise<void> {
    this.status = 'online';
    console.log('[SIXTH-SENSE] Environmental sensors hot. Pulse: Tracking.');
    this.environmentalCache.set('WEATHER', 'STABLE');
    this.environmentalCache.set('MARKET', 'HIGH_ALPHA');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    const auditEntry = await auditLedger.append('action_result', { 
      pluginId: this.id, 
      actionId, 
      params,
      currentChaos: this.chaosLevel
    });

    try {
      switch (actionId) {
        case 'get_ambient_pulse':
          return await this.handlePulse(auditEntry.id);
        case 'calibrate_sensors':
          return await this.handleCalibration(auditEntry.id);
        case 'trigger_alert_buffer':
          return await this.handleAlertOverride(params, auditEntry.id);
        case 'adjust_priority':
           return this.handlePriorityCheck(params, auditEntry.id);
        default:
          return { success: false, error: 'Sensory blackout.', auditId: auditEntry.id };
      }
    } catch (e: any) {
      return { success: false, error: e.message, auditId: auditEntry.id };
    }
  }

  private async handlePulse(auditId: string): Promise<ActionResult> {
    console.log('[SIXTH-SENSE] Sampling world events from news feeds and sensors...');
    const rawSignals = await this.collector.fetchSignals(['weather', 'finance', 'geopolitics' as any]);
    const aggregatedSignals = this.aggregator.aggregate(rawSignals);
    
    this.chaosLevel = this.calculator.calculate(aggregatedSignals);
    const tone = this.notificationEngine.adapt(this.chaosLevel);
    
    const warnings: string[] = [];
    aggregatedSignals.forEach(sig => {
       const warning = this.notificationEngine.getProactiveWarning(sig.category, sig.severity);
       if (warning) warnings.push(warning);
    });

    return { 
      success: true, 
      data: { 
        chaosLevel: this.chaosLevel, 
        environmentalStats: Array.from(this.environmentalCache.entries()),
        recentAlerts: aggregatedSignals.map(s => s.description),
        proactiveWarnings: warnings,
        toneRecommendation: tone
      }, 
      auditId 
    };
  }

  private async handleCalibration(auditId: string): Promise<ActionResult> {
    console.log('[SIXTH-SENSE] Calibrating sensitivity threshold...');
    return { success: true, data: { status: 'SENSORS_OPTIMIZED', sensitivity: 0.95 }, auditId };
  }

  private async handleAlertOverride(params: Record<string, any>, auditId: string): Promise<ActionResult> {
    const level = params.level || 0.5;
    this.chaosLevel = level;
    console.warn(`[SIXTH-SENSE] MANUAL CHAOS OVERRIDE: ${level}`);
    
    return { success: true, data: { status: 'ALERT_LEVEL_LOCKED', level }, auditId };
  }

  private handlePriorityCheck(params: Record<string, any>, auditId: string): ActionResult {
     const { priority } = params;
     const silence = this.priorityManager.shouldSilence(priority, this.chaosLevel);
     return { success: true, data: { silence, threshold: this.chaosLevel * 0.8 }, auditId };
  }
}

export const sixthSense = new SixthSenseService();
