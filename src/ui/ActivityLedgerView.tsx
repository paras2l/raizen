import React, { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { auditLedger, AuditEntry } from '../lib/governance'

export function ActivityLedgerView() {
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const allLogs = await auditLedger.getAll();
      setAuditLog([...allLogs].reverse().slice(0, 10));
    };
    fetchLogs();
  }, [])

  return (
    <div className="tab-view">
      <h2 className="view-title">Activity Ledger</h2>
      <div className="log-list" style={{ marginTop: '2rem' }}>
        {auditLog.length === 0 ? (
          <div className="placeholder-card" style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>No recent security events.</div>
        ) : (
          auditLog.map(log => (
            <div key={log.id} className="log-item">
              <Clock size={16} className="opacity-40" />
              <span className="log-time">{new Date(log.created_at).toLocaleTimeString()}</span>
              <div className="log-content">
                <div style={{ fontWeight: 700, fontSize: '0.7rem', color: 'var(--accent-primary)', marginBottom: 4 }}>{log.action.toUpperCase()}</div>
                <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(log.payload)}</div>
                <div className="log-hash" style={{ fontSize: '0.6rem', opacity: 0.4, marginTop: 4, fontFamily: 'monospace' }}>UUID: {log.id}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
