export class ConceptExtractor {
  extract(rawLogs: string[]): string[] {
    console.log('[AKASHA-EXTRACTOR] Performing NLP theme detection on historical buffer.');
    
    const themes: string[] = [];
    rawLogs.forEach(log => {
      if (log.includes('architecture') || log.includes('logic')) themes.push('engineering');
      if (log.includes('ethical') || log.includes('alignment')) themes.push('ethics');
    });

    return [...new Set(themes)];
  }
}
