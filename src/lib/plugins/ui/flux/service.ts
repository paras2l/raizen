import { RaizenPlugin, PluginAction, ActionResult } from '../../types';
import { auditLedger } from '../../../governance';
import { ContextDetector } from './context-detector';
import { LayoutEngine } from './layout-engine';
import { TransitionAnimator } from './animator';
import { UIMorphController } from './morph-controller';
import { ComponentRegistry } from './component-registry';

/**
 * Flux UI: Dynamic Interface Morphing
 * Deeply implemented for context-aware layout evolution and physical component shifting.
 */
export class FluxUIService implements RaizenPlugin {
  id = 'ui.flux';
  name = "Dynamic Interface Morphing (The Flux UI)";
  description = "God-Tier UI: Layout evolution. UI components physically change shape and position based on current task Context.";
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  private detector = new ContextDetector();
  private engine = new LayoutEngine();
  private animator = new TransitionAnimator();
  private controller = new UIMorphController();
  private registry = new ComponentRegistry();

  actions: PluginAction[] = [
    {
      id: 'morph_interface',
      label: 'Morph UI',
      description: 'Change the current interface morphology to match a new mission context.',
      category: 'system',
      sensitive: false
    },
    {
        id: 'get_registered_components',
        label: 'List Components',
        description: 'Get all UI components registered with the Flux morphology layer.',
        category: 'system',
        sensitive: false
    }
  ];

  async initialize(): Promise<void> {
    this.status = 'online';
    console.log('[FLUX] UI-morphology engine online. Layout: Fluid.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    const auditEntry = await auditLedger.append('action_result', { 
      pluginId: this.id, 
      actionId, 
      params 
    });

    try {
        switch (actionId) {
          case 'morph_interface':
            return await this.handleMorph(params, auditEntry.id);
          case 'get_registered_components':
            return { success: true, data: { components: this.registry.getAvailable() }, auditId: auditEntry.id };
          default:
            return { success: false, error: 'Unknown morphology request.', auditId: auditEntry.id };
        }
    } catch (e: any) {
      return { success: false, error: e.message, auditId: auditEntry.id };
    }
  }

  private async handleMorph(params: Record<string, any>, auditId: string): Promise<ActionResult> {
    const context = params.context || (params.force ? this.detector.setMockContext(params.force) : this.detector.detect());
    const template = this.engine.getTemplate(context);
    
    console.log(`[FLUX] TRIGGERING interface morph to: ${context}...`);
    
    // Coordination of the literal transition
    await this.controller.morphTo(context, template);
    
    const animation = this.animator.getAnimationStyles(true);

    return { 
      success: true, 
      data: { 
        newLayout: template.id, 
        profileName: template.name,
        panels: template.panels,
        tools: template.activeTools,
        animation,
        status: 'MORPH_LOCKED'
      }, 
      auditId 
    };
  }
}

export const fluxUI = new FluxUIService();
