import { RaizenPlugin, PluginAction, ActionResult } from '../../types';
import { auditLedger } from '../../../governance';
import { ScreenCaptureManager } from './capture-manager';
import { PermissionGate } from './permission-gate';
import { OCREngine } from './ocr-engine';
import { UIElementDetector } from './ui-detector';
import { VisionContextBuilder } from './context-builder';

/**
 * Computer Vision Sight (The Cyclops Module)
 * Deeply consolidated for visual context sovereignty: 
 * Real-time screen analysis, strictly permission-gated for explicit visual context.
 */
export class CyclopsVisionService implements RaizenPlugin {
  id = 'vision.cyclops';
  name = "Computer Vision Sight (Cyclops)";
  description = "Visual Context Sovereignty: Real-time screen analysis, strictly permission-gated for explicit visual context.";
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  private capturer = new ScreenCaptureManager();
  private gate = new PermissionGate();
  private ocr = new OCREngine();
  private uiDetector = new UIElementDetector();
  private contextBuilder = new VisionContextBuilder();

  actions: PluginAction[] = [
    {
      id: 'analyze_screen',
      label: 'Analyze My Screen',
      description: 'Capture and analyze the current screen content (Explicit Command Only).',
      category: 'system',
      sensitive: true
    },
    {
      id: 'identify_ui_element',
      label: 'Identify UI Element',
      description: 'Look for a specific button or text on the screen to assist with automation.',
      category: 'system',
      sensitive: false
    },
    {
      id: 'grant_vision_access',
      label: 'Grant Vision Access',
      description: 'Authorize Raizen to access the visual field for 5 minutes.',
      category: 'system',
      sensitive: true
    },
    {
      id: 'revoke_vision_access',
      label: 'Revoke Vision Access',
      description: 'Immediately terminate all active vision sessions.',
      category: 'system',
      sensitive: true
    }
  ];

  async initialize(): Promise<void> {
    this.status = 'online';
    console.log('[CYCLOPS] Lens Online: Awaiting visual permission "take a look at my screen".');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    const auditEntry = await auditLedger.append('action_result', { 
      pluginId: this.id, 
      actionId, 
      params 
    });

    try {
        switch (actionId) {
          case 'analyze_screen':
            return await this.handleAnalysis(params, auditEntry.id);
          case 'identify_ui_element':
            return await this.handleIdentification(params, auditEntry.id);
          case 'grant_vision_access':
            return this.handleGrant(params, auditEntry.id);
          case 'revoke_vision_access':
            return this.handleRevoke(auditEntry.id);
          default:
            return { success: false, error: 'Sight boundary violation.', auditId: auditEntry.id };
        }
    } catch (e: any) {
      return { success: false, error: e.message, auditId: auditEntry.id };
    }
  }

  private async handleAnalysis(params: Record<string, any>, auditId: string): Promise<ActionResult> {
    if (!this.gate.isAuthorized()) {
        return { 
            success: false, 
            error: 'AUTHORIZATION_REQUIRED', 
            data: { message: 'Patriarch, I require explicit authorization to access your visual field.' },
            auditId 
        };
    }

    const frame = await this.capturer.captureFull();
    const ocrResults = await this.ocr.extractText(frame);
    const elements = this.uiDetector.detect(frame);
    const context = this.contextBuilder.build(ocrResults, elements);

    // High-Level Descriptive Summary (Legacy logic)
    const summary = `I see a code editor with ${ocrResults.length} lines of text detected, and UI elements including: ${elements.map(e => e.label || 'Unknown').join(', ')}.`;

    return { 
      success: true, 
      data: { 
        summary,
        context,
        resolution: '4K',
        sessionStatus: 'ACTIVE'
      }, 
      auditId 
    };
  }

  private async handleIdentification(params: Record<string, any>, auditId: string): Promise<ActionResult> {
    const { target } = params;
    if (!this.gate.isAuthorized()) return { success: false, error: 'AUTHORIZATION_REQUIRED', auditId };

    const frame = await this.capturer.captureFull();
    const ocrResults = await this.ocr.extractText(frame);
    const elements = this.uiDetector.detect(frame);

    const match = elements.find(e => e.label?.toLowerCase().includes(target.toLowerCase())) || 
                  ocrResults.find(r => r.text.toLowerCase().includes(target.toLowerCase()));

    return { 
      success: !!match, 
      data: { 
        target,
        found: !!match,
        details: match || null
      }, 
      auditId 
    };
  }

  private handleGrant(params: Record<string, any>, auditId: string): ActionResult {
    const session = this.gate.grant(params.duration || 5);
    return { success: true, data: { session, message: 'Vision focus engaged.' }, auditId };
  }

  private handleRevoke(auditId: string): ActionResult {
    this.gate.revoke();
    return { success: true, data: { message: 'Vision focus terminated.' }, auditId };
  }
}

export const cyclopsVision = new CyclopsVisionService();
