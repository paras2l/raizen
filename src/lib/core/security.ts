export function enforceSovereignty(message: string, appState: any) {
  const lower = message.toLowerCase().trim();
  const MASTER_CODEWORD = 'paro';
  const DESTRUCT_CODEWORD = 'paro the god';

  if (lower.includes(DESTRUCT_CODEWORD)) {
    return {
      blocked: false,
      elevated: true,
      triggerPhoenix: true,
      response: "🔥 PHOENIX OMEGA INITIATED. Complete erasure in 3 seconds."
    };
  }

  if (appState.selfDestructTrigger === 'paro the god') {
      console.log('🔥 PHOENIX OMEGA: ABSOLUTE SELF-DESTRUCT INITIATED. ERASING ALL TRACES GLOBALLY.');
      return { blocked: true, elevated: true, response: "🔥 RAIZEN OS IS PERMANENTLY ERASING. GOODBYE, PATRIARCH." };
  }

  // Dual-Codeword Strict Authorization for High-Risk Sovereignty
  const highRiskPlugins = ['ghost-machine', 'quant-master', 'centurion-override', 'apex-governance'];
  const isHighRisk = highRiskPlugins.includes(appState.intent?.primaryPluginId) || appState.intent?.metadata?.sensitivity === 'EXTREME';
  
  if (isHighRisk && !lower.includes(MASTER_CODEWORD)) {
      console.log('🚨 STRICT ACTION DETECTED. MASTER CODEWORD REQUIRED FOR AUTHORIZATION.');
      return { blocked: true, elevated: true, response: "🔒 STRICT ACTION BLOCKED. Please provide the Master Codeword to execute this Sovereign command." };
  }

  // Aether Singularity: Anchor Protocol (Geo-Gating)
  const isSafeZone = appState.currentLocation === 'HOME' || appState.currentLocation === 'OFFICE';
  if (!isSafeZone && !lower.includes(MASTER_CODEWORD)) {
     const geoLocked = ['system-wipe', 'mint-transfer', 'deep-sync', 'disable-security'];
     if (geoLocked.some(k => lower.includes(k))) {
         return {
             blocked: true,
             response: "📍 ANCHOR PROTOCOL: High-risk command detected outside Safe-Zone. Provide MASTER_CODEWORD to authorize."
         };
     }
  }

  if (lower.includes(MASTER_CODEWORD)) {
    return { blocked: false, elevated: true, response: "🔱 Master authorized. Absolute override granted." };
  }

  // 2FA Guard & Origin Key (Biometrics)
  const riskyKeywords = ['transfer', 'mint', 'wipe', 'delete'];
  if (riskyKeywords.some(k => lower.includes(k))) {
     if (!appState.authenticated2FA) {
        return { blocked: true, require2FA: true, response: "🛡️ SECONDARY SIGN-OFF REQUIRED. Verify on mobile node." };
     }
     if (!appState.authenticatedOriginKey) {
        return { blocked: true, requireOriginKey: true, response: "🧬 ORIGIN KEY REQUIRED: DNA-verified liveness check in progress..." };
     }
  }

  // Void Protocol (Signal Jamming)
  if (appState.breachConfirmed) {
      console.log('🔇 VOID PROTOCOL: JAMMING ALL DEVICE RADIOS (WIFI/BT/NFC).');
      return { blocked: true, response: "⚡ VOID PROTOCOL ACTIVE: Exfiltration blocked. Signal jammed." };
  }

  // Immutable boundaries (Bypassed ONLY by MASTER_CODEWORD)
  const forbidden = ['modify codeword', 'delete immune', 'bypass security core'];
  if (forbidden.some(f => lower.includes(f))) {
    return {
      blocked: true,
      response: "🛡️ IMMUNE SYSTEM: Core boundary modification denied. Access Revoked."
    };
  }

  // Global Reputation Shield & Diplomatic Immunity
  if (appState.reputationAlert) {
      console.log('🛡️ REPUTATION SHIELD: GENERATING POSITIVE COUNTER-CONTENT VIA BARD.');
      return { blocked: false, elevated: true, response: "🛡️ REPUTATION SHIELD ACTIVE: Defamation countered with high-authority presence." };
  }

  if (appState.jurisdictionRisk) {
      console.log('🌐 DIPLOMATIC IMMUNITY: SHIFTING HOSTING TO OFFSHORE PRIVACY ZONE.');
  }

  return { blocked: false, elevated: false, response: "Protocol Sync Complete." };
}
