export class AlertPriorityManager {
  shouldSilence(priority: number, chaosIndex: number): boolean {
    // If chaos is high, silence low-priority pings
    const threshold = chaosIndex * 0.8;
    const silence = priority < threshold;
    
    if (silence) console.log(`[SIXTH-SENSE-PRIORITY] Silencing low-priority ping due to high ambient chaos (${chaosIndex.toFixed(2)}).`);
    return silence;
  }
}
