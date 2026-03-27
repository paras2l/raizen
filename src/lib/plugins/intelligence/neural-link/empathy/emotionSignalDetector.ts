import { EmpathyConfig } from './empathyConfig';

export class EmotionSignalDetector {
  private inputHistory: number[] = [];

  public detect(inputBurst: number, corrections: number): number {
    this.inputHistory.push(inputBurst);
    if (this.inputHistory.length > 10) this.inputHistory.shift();
    
    const avgBurst = this.inputHistory.reduce((a, b) => a + b, 0) / this.inputHistory.length;
    const correctionFactor = corrections * 0.2;
    const burstFactor = Math.min(avgBurst / EmpathyConfig.THRESHOLDS.INPUT_BURST_THRESHOLD, 1);
    
    return Math.min(burstFactor + correctionFactor, 1);
  }
}
