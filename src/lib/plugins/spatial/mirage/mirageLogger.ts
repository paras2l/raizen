export const mirageLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[MIRAGE] ${message}`, ...args);
  },
  mapping: (surfaceId: string, type: string) => {
    console.log(`[MIRAGE] Surface mapped → ID: ${surfaceId} (${type}) recorded`);
  },
  projection: (overlayId: string, status: string) => {
    console.log(`[MIRAGE] Projection ${status} → Overlay: ${overlayId} active`);
  },
  skin: (theme: string) => {
    console.log(`[MIRAGE] Visual skin updated → theme [${theme}] applied to environment`);
  },
  interaction: (details: string) => {
    console.log(`[MIRAGE] AR interaction recorded → ${details} | system stable`);
  },
  alert: (details: string) => {
    console.warn(`[MIRAGE] ⚠️ SPATIAL ALERT: ${details}`);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[MIRAGE] MIRAGE ERROR: ${message}`, ...args);
  },
};
