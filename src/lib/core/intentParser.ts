import { pluginRegistry } from '../plugins';

export interface Intent {
  primaryPluginId: string;
  requiredCapabilities: string[];
  isCritical: boolean;
  metadata: Record<string, any>;
}

export async function parseIntent(message: string): Promise<Intent> {
  const lower = message.toLowerCase();
  const manifest = pluginRegistry.getAll();
  
  // Advanced Dynamic Intent Parsing
  let primaryPluginId = 'system.orchestrator';
  const requiredCapabilities: string[] = [];
  const metadata: Record<string, any> = {};

  // Logic: Scan manifest for capability matches dynamically
  for (const plugin of manifest) {
    if (plugin.actions.some(a => lower.includes(a.id) || lower.includes(a.label.toLowerCase()))) {
      primaryPluginId = plugin.id;
      break;
    }
  }

  // Common High-Level Intent Maps (Cascades)
  if (lower.includes('open') || lower.includes('launch') || lower.includes('run')) {
    primaryPluginId = 'system.native-bridge';
    const apps = ['chrome', 'spotify', 'photoshop', 'notepad', 'termux'];
    const targetApp = apps.find(a => lower.includes(a));
    metadata.targetApp = targetApp ? `${targetApp}.exe` : 'chrome.exe';
    if (lower.includes('spotify') || lower.includes('music')) metadata.isMusic = true;
  } else if (lower.includes('business') || lower.includes('company') || lower.includes('revenue')) {
    primaryPluginId = 'social.empire';
  } else if (lower.includes('phone') || lower.includes('mobile') || lower.includes('android')) {
    primaryPluginId = 'mobile.phone-control';
    metadata.mobileMsg = "Raizen: Command Received from Hub";
  } else if (lower.includes('security') || lower.includes('protect') || lower.includes('lockdown')) {
    primaryPluginId = 'security.guardian';
  } else if (lower.includes('health') || lower.includes('vitals')) {
    primaryPluginId = 'health.iris-scan';
  } else if (lower.includes('finance') || lower.includes('market') || lower.includes('invest')) {
    primaryPluginId = 'finance.quant';
  } else if (lower.includes('render') || lower.includes('gpu') || lower.includes('heavy') || lower.includes('training')) {
    primaryPluginId = 'finance.venture';
    metadata.isHeavy = true;
  }

  const criticalKeywords = ['delete', 'wipe', 'transfer', 'kill', 'destroy', 'paro the god'];
  const isCritical = criticalKeywords.some(k => lower.includes(k));

  return {
    primaryPluginId,
    requiredCapabilities,
    isCritical,
    metadata
  };
}
