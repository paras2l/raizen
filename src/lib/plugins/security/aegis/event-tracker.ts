import { MicroEvent } from './types';

export class MicroEventTracker {
  private sequences: Map<string, MicroEvent[]> = new Map();

  track(event: MicroEvent) {
    const key = event.source;
    const seq = this.sequences.get(key) || [];
    seq.push(event);
    if (seq.length > 50) seq.shift();
    this.sequences.set(key, seq);
  }

  getSequence(source: string): MicroEvent[] {
    return this.sequences.get(source) || [];
  }
}
