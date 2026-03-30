import { auditLedger, verifyCodeword } from './governance';
import { PluginRegistry } from './plugins/index';

export interface VoiceConfig {
  wakeWord: string;
  continuousMode: boolean;
  sensitivity: number;
}

export class RaizenVoiceSystem {
  private static instance: RaizenVoiceSystem;
  private isListening: boolean = false;
  private config: VoiceConfig & { secondaryWakeWords: string[] } = {
    wakeWord: 'hey raizen',
    secondaryWakeWords: ['raizen wake up', 'wake up raizen', 'raizen one', 'ghost', 'paro the god'],
    continuousMode: false,
    sensitivity: 0.9
  };

  private constructor() {}

  static getInstance(): RaizenVoiceSystem {
    if (!RaizenVoiceSystem.instance) {
      RaizenVoiceSystem.instance = new RaizenVoiceSystem();
    }
    return RaizenVoiceSystem.instance;
  }

  async setMode(continuous: boolean): Promise<void> {
    this.config.continuousMode = continuous;
    await auditLedger.append('action_result', {
      type: 'voice_config',
      payload: { continuousMode: continuous }
    });
  }

  startWakeWordService(): void {
    const allWords = [this.config.wakeWord, ...this.config.secondaryWakeWords];
    console.log(`[VOICE] Wake-word service active. Listening for [${allWords.join(', ')}]...`);
    
    // In Electron, this would hook into the Swabble daemon or similar.
    // In Browser, we simulate the detection.
    
    if ((window as any).ipcRenderer) {
      (window as any).ipcRenderer.on('wake-word-detected', (_event: any, detectedWord: string) => {
        this.handleWake(detectedWord || this.config.wakeWord);
      });
    }
  }

  private async handleWake(triggerWord: string): Promise<void> {
    const lowerTrigger = triggerWord.toLowerCase();
    const codewordLevel = await verifyCodeword(triggerWord);
    
    const isMaster = lowerTrigger === 'paro the god' || codewordLevel === 'master';
    const isAdmin = codewordLevel === 'admin' || codewordLevel === 'master' || this.config.secondaryWakeWords.includes(lowerTrigger);
    
    let resonanceTier = 'STANDARD';
    if (isMaster) resonanceTier = 'SOVEREIGN';
    else if (isAdmin) resonanceTier = 'ELITE';

    console.log(`[VOICE] Wake-word detected: "${triggerWord}" [Tier: ${resonanceTier}]. Activating Neural Link.`);
    
    // Dispatch Hook: Notify the UI to start listening or handle a specific phrase
    const event = new CustomEvent('raizen:wake', { 
      detail: { 
        timestamp: Date.now(),
        trigger: triggerWord,
        tier: resonanceTier,
        mode: this.config.continuousMode ? 'CONTINUOUS' : 'SINGLE'
      } 
    });
    window.dispatchEvent(event);

    // Auto-launch Greeting
    await PluginRegistry.getInstance().executeAction('communication.echo', 'speak', { 
      message: resonanceTier === 'SOVEREIGN' ? "System online, my Lord Paro. How may I assist you?" : "Raizen online. Awaiting command."
    });

    await auditLedger.append('action_result', {
      type: 'voice_wake',
      payload: { mode: this.config.continuousMode }
    });
  }

  async executeVoiceHook(transcript: string): Promise<void> {
    const lowerTranscript = transcript.toLowerCase();
    
    // Conceptually, if the transcript matches a command, we execute it directly
    if (lowerTranscript.includes('run diagnostic')) {
      console.log('[VOICE HOOK] Triggering diagnostic scan.');
      // Execute via plugin registry or direct internal call
    }

    await auditLedger.append('action_result', {
      type: 'voice_hook_exec',
      payload: { transcript, detectedIntent: 'diagnostic_scan' }
    });
  }

  generateScribe(transcript: string, format: 'srt' | 'txt'): string {
    if (format === 'txt') {
      return `Raizen OS Voice Session - ${new Date().toLocaleString()}\n\n${transcript}`;
    }

    // Basic SRT generation
    const lines = transcript.split('. ').map((line, i) => {
      const start = i * 2; // Simulated 2s per sentence
      const end = start + 2;
      return `${i + 1}\n00:00:${start.toString().padStart(2, '0')},000 --> 00:00:${end.toString().padStart(2, '0')},000\n${line.trim()}\n`;
    });
    return lines.join('\n');
  }

  async exportScribe(transcript: string, format: 'srt' | 'txt'): Promise<void> {
    const content = this.generateScribe(transcript, format);
    console.log(`[SCRIBE] Exporting ${format.toUpperCase()} scribe...`);
    
    // In a real implementation, this would use fs.writeFileSync via IPC
    await auditLedger.append('action_result', {
      type: 'scribe_export',
      payload: { format, characterCount: content.length }
    });
  }
}

export const raizenVoice = RaizenVoiceSystem.getInstance();
