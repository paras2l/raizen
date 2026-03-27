export class ContextualNotificationEngine {
  adapt(chaosIndex: number): string {
    if (chaosIndex > 0.7) return 'CONCISE_URGENT';
    if (chaosIndex < 0.2) return 'NATURAL_EXPANSIVE';
    return 'STANDARD_CONTEXTUAL';
  }

  getProactiveWarning(category: string, severity: number): string | null {
    if (severity > 0.6) {
      return `Chief, external ${category} volatility is spiking. I recommend adjusting your immediate focus.`;
    }
    return null;
  }
}
