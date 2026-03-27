import { SignalStream, InterceptResult, StrategicInsight } from './strategistTypes';
import { strategistLogger } from './strategistLogger';

export class StrategistSessionManager {
  private activeStreams = new Map<string, SignalStream>();
  private findings = new Map<string, StrategicInsight[]>();

  startMonitoring(stream: SignalStream) {
    this.activeStreams.set(stream.id, stream);
    this.findings.set(stream.id, []);
    strategistLogger.log(`Monitoring session active for stream: ${stream.id}`);
  }

  recordInsight(streamId: string, insight: StrategicInsight) {
    const list = this.findings.get(streamId) || [];
    list.push(insight);
    this.findings.set(streamId, list);
  }

  stopMonitoring(streamId: string) {
    this.activeStreams.delete(streamId);
    strategistLogger.success(`Strategic session ${streamId} concluded and archived.`);
  }

  getInsights(streamId: string): StrategicInsight[] {
    return this.findings.get(streamId) || [];
  }
}
