import { DuetSession, CreativeInput, CreativePrediction } from './duetTypes';
import { duetLogger } from './duetLogger';

export class DuetSessionManager {
  private activeSessions = new Map<string, DuetSession>();
  private inputHistory = new Map<string, CreativeInput[]>();
  private predictionStreams = new Map<string, CreativePrediction[]>();

  startSession(mode: DuetSession['mode']): DuetSession {
    const session: DuetSession = {
      id: `DUET-${Date.now()}`,
      startTime: Date.now(),
      mode,
      metrics: { syncScore: 1.0, latencyMs: 0 },
    };
    this.activeSessions.set(session.id, session);
    this.inputHistory.set(session.id, []);
    this.predictionStreams.set(session.id, []);
    duetLogger.log(`Live collaboration session started: ${session.id} (Mode: ${mode})`);
    return session;
  }

  recordInput(sessionId: string, input: CreativeInput) {
    const history = this.inputHistory.get(sessionId) || [];
    history.push(input);
    this.inputHistory.set(sessionId, history);
  }

  recordPrediction(sessionId: string, prediction: CreativePrediction) {
    const stream = this.predictionStreams.get(sessionId) || [];
    stream.push(prediction);
    this.predictionStreams.set(sessionId, stream);
  }

  getSession(id: string): DuetSession | undefined {
    return this.activeSessions.get(id);
  }

  endSession(id: string) {
    const session = this.activeSessions.get(id);
    if (session) {
      duetLogger.success(`Session ${id} archived. Creative metrics logged.`);
      this.activeSessions.delete(id);
    }
  }
}
