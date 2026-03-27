import { auditLedger } from './governance';

export interface Span {
  id: string;
  name: string;
  startTime: number;
  endTime?: number;
  attributes: Record<string, any>;
  status: 'ok' | 'error';
  error?: string;
}

export class RaizenDiagnostics {
  private static instance: RaizenDiagnostics;
  private activeSpans: Map<string, Span> = new Map();

  private constructor() {}

  static getInstance(): RaizenDiagnostics {
    if (!RaizenDiagnostics.instance) {
      RaizenDiagnostics.instance = new RaizenDiagnostics();
    }
    return RaizenDiagnostics.instance;
  }

  startSpan(name: string, attributes: Record<string, any> = {}): string {
    const spanId = `span-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const span: Span = {
      id: spanId,
      name,
      startTime: Date.now(),
      attributes,
      status: 'ok'
    };
    this.activeSpans.set(spanId, span);
    return spanId;
  }

  async endSpan(spanId: string, status: 'ok' | 'error' = 'ok', error?: string): Promise<void> {
    const span = this.activeSpans.get(spanId);
    if (!span) return;

    span.endTime = Date.now();
    span.status = status;
    span.error = error;

    const duration = span.endTime - span.startTime;
    this.activeSpans.delete(spanId);

    // Deep logging to Audit Ledger for Pro Diagnostics
    await auditLedger.append('action_result', {
      type: 'telemetry_span',
      payload: { ...span, duration, message: `Span "${span.name}" completed in ${duration}ms` }
    });

    if (status === 'error') {
      console.error(`[DIAGNOSTICS] Span error: ${span.name} (ID: ${span.id}) - ${error}`);
    } else {
      console.log(`[DIAGNOSTICS] Traced: ${span.name} [${duration}ms]`);
    }
  }

  // Helper for performance measurement
  async trace<T>(name: string, attributes: Record<string, any>, fn: () => Promise<T>): Promise<T> {
    const spanId = this.startSpan(name, attributes);
    try {
      const result = await fn();
      await this.endSpan(spanId, 'ok');
      return result;
    } catch (e: any) {
      await this.endSpan(spanId, 'error', e.message);
      throw e;
    }
  }
}

export const diagnostics = RaizenDiagnostics.getInstance();
