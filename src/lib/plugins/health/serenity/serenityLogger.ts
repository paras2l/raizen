export const serenityLogger = {
  log: (msg: string) => console.log(`[SERENITY] ${msg}`),
  info: (msg: string) => console.log(`[SERENITY] INFO: ${msg}`),
  success: (msg: string) => console.log(`[SERENITY] SUCCESS: ${msg}`),
  error: (msg: string) => console.error(`[SERENITY] ERROR: ${msg}`),
  stressDetected: (level: string, load: number) => 
    console.log(`[SERENITY] Stress indicators detected [Level: ${level}, Load: ${(load * 100).toFixed(0)}%] → initiating assessment.`),
  environmentAdjusted: (mode: string) => 
    console.log(`[SERENITY] Environment adjusted [Mode: ${mode}] → Proactive focus stabilization active.`),
  breakPrompted: () => 
    console.warn(`[SERENITY] CRITICAL LOAD: Break recommended. Proactive notification Filtering enabled.`),
  metricsLogged: (interventions: number) => 
    console.log(`[SERENITY] Well-being metrics logged → long-term trends updated. Interventions: ${interventions}.`)
};
