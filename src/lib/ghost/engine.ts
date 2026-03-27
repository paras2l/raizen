import { auditLedger } from '../governance';

export interface GhostSession {
  id: string;
  url: string;
  status: 'idle' | 'loading' | 'active' | 'error';
  webview: any; // HTMLWebViewElement
}

class GhostEngine {
  private static instance: GhostEngine;
  private sessions: Map<string, GhostSession> = new Map();
  private container: HTMLElement | null = null;

  private constructor() {}

  static getInstance(): GhostEngine {
    if (!GhostEngine.instance) {
      GhostEngine.instance = new GhostEngine();
    }
    return GhostEngine.instance;
  }

  setContainer(el: HTMLElement) {
    this.container = el;
  }

  async activate(sessionId: string, url: string): Promise<GhostSession> {
    if (this.sessions.has(sessionId)) {
      return this.sessions.get(sessionId)!;
    }

    if (!this.container) {
      throw new Error('GhostEngine: No container found in DOM.');
    }

    const webview = document.createElement('webview') as any;
    webview.setAttribute('src', url);
    webview.setAttribute('style', 'display: none;'); // Hidden from user
    webview.setAttribute('partition', `persist:${sessionId}`);
    
    const session: GhostSession = {
      id: sessionId,
      url,
      status: 'loading',
      webview
    };

    this.container.appendChild(webview);
    this.sessions.set(sessionId, session);

    return new Promise((resolve) => {
      webview.addEventListener('did-finish-load', () => {
        session.status = 'active';
        auditLedger.append('action_result', { type: 'ghost_session_active', sessionId });
        resolve(session);
      });
    });
  }

  async execute(sessionId: string, script: string): Promise<any> {
    const session = this.sessions.get(sessionId);
    if (!session || session.status !== 'active') {
      throw new Error(`Ghost session ${sessionId} not ready.`);
    }

    console.log(`[GHOST] Executing script on ${sessionId}...`);
    return await session.webview.executeJavaScript(script);
  }

  async destroy(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.webview.remove();
      this.sessions.delete(sessionId);
      auditLedger.append('action_result', { type: 'ghost_session_destroyed', sessionId });
    }
  }
}

export const ghostEngine = GhostEngine.getInstance();
