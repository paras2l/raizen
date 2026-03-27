import { GeopoliticalRisk } from './aegisTypes';
import { aegisLogger } from './aegisLogger';

export class GeoSafetyAdvisor {
  generateBriefing(risks: GeopoliticalRisk[]): string {
    aegisLogger.log('Compiling regional geo-safety briefing...');
    
    if (risks.length === 0) return 'All tracked regions are currently within baseline safety parameters.';
    
    return risks.map(r => `${r.region}: ${r.level} Risk (${r.riskType}) - ${r.description}`).join('\n');
  }
}
