/**
 * RAIZEN OS GOVERNANCE ENGINE (FINAL VERSION)
 * Full port from legacy policy-boundary logic.
 */
import { supabase } from './supabase';

// --- Constants & Config ---
export const IMMUTABLE_BOUNDARY_PREFIXES = ['/boundary', '/src/lib/governance'];
export const SENSITIVE_CATEGORIES = new Set(['filesystem', 'network', 'codegen', 'system', 'knowledge']);

export const MASTER_GATED_ACTION_IDS = new Set([
  'security.disablePolicy',
  'security.deleteAudit',
  'network.exfiltrateData',
  'system.disableDefenses',
]);

export const HARMFUL_PATTERN = /\b(hack|malware|ransom|phishing|ddos|exploit|exfiltrate|keylogger)\b/i;

const RESTRICTED_PATTERNS = [
  /\brun\s+terminal\b/i,
  /\bterminal\s+run\b/i,
  /\bcheck\s+nmap\b/i,
  /\bnmap\s+version\b/i,
  /\bcall\b/i,
  /\b(make|create|generate)\s+(ai\s+)?workflow\b/i,
  /\b(creative|ideate|brainstorm|research\s+idea)\b/i,
  /\badmin\b/i,
  /\bsudo\b/i,
  /\bexecute\b/i,
  /\bsystem\b/i,
];

// --- Types ---
export type ActionCategory = 'System' | 'Terminal' | 'Nmap' | 'Execute' | 'Plugin';

export interface ActionRequest {
  id: string;
  category: ActionCategory;
  intent: string;
  payload?: any;
  codeword?: string;
  ticket?: string;
}

export interface PolicyDecision {
  allowed: boolean;
  requiresApproval: boolean;
  ruleId: string;
  reason: string;
}

export interface EnforcementContext {
  adminVerified: boolean;
  approvalGranted: boolean;
}

export type AuditEventType = 'policy_check' | 'approval_issue' | 'approval_use' | 'action_result' | 'focus_event' | 'focus_warning' | 'biometric_event' | 'stress_alert' | 'insight_capture' | 'idea_archived' | 'dream_incubation' | 'briefing_ready' | 'intent_prediction' | 'workflow_optimized' | 'aura_state_shift' | 'bio_identity_sync' | 'emotional_sync_event' | 'decision_pacing_applied' | 'thought_stream_active' | 'neural_code_generated' | 'thought_synthesis_start' | 'code_injected_neural' | 'memory_recall_request' | 'context_reconstructed' | 'dream_learning_scheduled' | 'retention_recorded' | 'tactical_alert_issued' | 'hazard_identified' | 'knowledge_archived' | 'backup_sync_complete' | 'security_event';

export interface ObedienceResult {
  allowed: boolean;
  cleanText: string;
  reason?: string;
}

export interface AuditEntry {
  id: string;
  user_id: string;
  action: AuditEventType;
  payload: Record<string, any>;
  created_at: string;
}

// --- Utilities ---
function normalizePath(p: string): string {
  return String(p || '').replace(/\\/g, '/').toLowerCase();
}

async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  // Note: Only available in secure contexts or polyflipped. 
  // In Electron/Node this is easy via crypto module. 
  // In Browser we use subtle crypto.
  try {
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (e) {
    return 'HASH_UNAVAILABLE'; // Fallback for testing
  }
}

// --- Audit Ledger ---
class AuditLedger {
  async getAll() { 
    const { data } = await supabase.from('audit_logs').select('*').limit(100);
    return data || [];
  }
  
  async search(query: { type?: AuditEventType; limit?: number }) {
    let q = supabase.from('audit_logs').select('*');
    if (query.type) q = q.eq('action', query.type);
    if (query.limit) q = q.limit(query.limit);
    const { data } = await q;
    return data || [];
  }

  async append(type: AuditEventType, payload: Record<string, any>): Promise<any> {
    const entry = {
      user_id: 'raizen-master',
      action: type,
      payload: payload,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase.from('audit_logs').insert([entry]).select();
    if (error) {
      console.error(`[GOVERNANCE] Audit backup failed: ${type}`, error);
      // Failover to local console for absolute visibility
      console.warn(`[FAILOVER] Audit: ${type}`, payload);
    }
    
    console.log(`[GOVERNANCE] Audit entry appended: ${type}`, entry);
    return data?.[0];
  }
}

export const auditLedger = new AuditLedger();

// --- Approval Store ---
class ApprovalStore {
  private tickets = new Map<string, { actionId: string; expiresAt: number }>();

  issue(actionId: string, ttlMs = 5 * 60 * 1000) {
    const ticketId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
    this.tickets.set(ticketId, { actionId, expiresAt: Date.now() + ttlMs });
    auditLedger.append('approval_issue', { ticketId, actionId });
    return ticketId;
  }

  consume(ticketId: string, actionId: string): boolean {
    const ticket = this.tickets.get(ticketId);
    if (!ticket || ticket.actionId !== actionId || Date.now() > ticket.expiresAt) return false;
    this.tickets.delete(ticketId);
    auditLedger.append('approval_use', { ticketId, actionId });
    return true;
  }
}

export const approvalStore = new ApprovalStore();

// --- Utilities ---
const getSecurityBridge = () => (window as any).raizen?.security;

/**
 * Checks if a codeword is valid. (Now Async/Secure)
 */
export async function verifyCodeword(value: string): Promise<'admin' | 'master' | null> {
  const bridge = getSecurityBridge();
  if (bridge) return await bridge.verify(value);
  return null;
}

/**
 * Strips codewords from text. (Now Async/Secure)
 */
export async function cleanCodeword(text: string): Promise<string> {
  const bridge = getSecurityBridge();
  if (bridge) return await bridge.clean(text);
  return text;
}

/**
 * Integrated validation for chat messages.
 */
export async function checkCodewordObedience(text: string): Promise<ObedienceResult> {
  const lowerText = text.toLowerCase();
  
  // 1. Harmful Pattern Check
  if (HARMFUL_PATTERN.test(lowerText)) {
    auditLedger.append('policy_check', { text, result: 'blocked', reason: 'harmful_pattern' });
    return {
      allowed: false,
      reason: 'Malicious intent detected. Command blocked by security boundary.',
      cleanText: text
    };
  }

  // 2. Restricted Command Check
  const isRestricted = RESTRICTED_PATTERNS.some(p => p.test(lowerText));
  if (isRestricted) {
    const level = await verifyCodeword(text);
    if (level) {
      auditLedger.append('policy_check', { text, result: 'allowed', level });
      return { allowed: true, cleanText: await cleanCodeword(text) };
    }
    
    auditLedger.append('policy_check', { text, result: 'blocked', reason: 'unauthorized_restricted' });
    return {
      allowed: false,
      reason: 'Missing authorization codeword for restricted command.',
      cleanText: text
    };
  }

  return { allowed: true, cleanText: text };
}

/**
 * Action level policy evaluator (for file edits, network, etc.)
 */
export async function evaluateActionPolicy(req: ActionRequest): Promise<PolicyDecision> {
  // Plugin action logic
  if (req.category === 'Plugin') {
    const isSensitive = req.payload?.sensitive !== false;
    if (isSensitive) {
      const level = await verifyCodeword(req.codeword || '');
      if (level === 'master') return { allowed: true, requiresApproval: false, ruleId: 'plugin-master-bypass', reason: 'Master codeword provided for sensitive plugin action.' };
      if (level === 'admin') return { allowed: true, requiresApproval: false, ruleId: 'plugin-admin-auth', reason: 'Admin codeword provided for sensitive plugin action.' };
      return { allowed: false, requiresApproval: true, ruleId: 'plugin-sensitive-gate', reason: 'Sensitive plugin execution requires authorization codeword or approval.' };
    }
    return { allowed: true, requiresApproval: false, ruleId: 'plugin-allow', reason: 'Non-sensitive plugin action allowed.' };
  }

  // Original logic
  const isMasterGated = MASTER_GATED_ACTION_IDS.has(req.id);
  const isHarmful = HARMFUL_PATTERN.test(`${req.id} ${req.intent || ''}`);

  if (isMasterGated || isHarmful) {
    const level = await verifyCodeword(req.codeword || '');
    if (level !== 'master') {
      return {
        allowed: false,
        requiresApproval: false,
        ruleId: 'master-gate',
        reason: 'Action requires MASTER level authorization.'
      };
    }
  }

  if (req.intent) {
    const normPath = normalizePath(req.intent);
    if (IMMUTABLE_BOUNDARY_PREFIXES.some(pre => normPath.startsWith(pre))) {
      return {
        allowed: false,
        requiresApproval: false,
        ruleId: 'immutable-boundary',
        reason: 'Target path is within an immutable security boundary.'
      };
    }
  }

  if (req.category === 'System' || req.category === 'Terminal' || req.category === 'Nmap' || req.category === 'Execute') {
    return {
      allowed: true,
      requiresApproval: true,
      ruleId: 'sensitive-category-gate',
      reason: 'Sensitive system action requires explicit admin verification.'
    };
  }

  return { allowed: false, requiresApproval: false, ruleId: 'unknown-category', reason: 'Unknown security category.' };
}
