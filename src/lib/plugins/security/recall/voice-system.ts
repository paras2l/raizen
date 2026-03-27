export class AlertVoiceSystem {
  playAlarm() {
    console.warn('[RECALL-VOICE] AUDIBLE ALARM: Device theft recovery protocol active.');
  }

  speak(text: string) {
    console.log(`[RECALL-VOICE] AI Voice Alert: ${text}`);
  }
}
