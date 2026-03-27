import { MediaCreationRequest } from './artisanTypes';
import { artisanConfig } from './artisanConfig';

export class ArtisanCommandParser {
  parse(prompt: string): MediaCreationRequest {
    const style = artisanConfig.stylePresets.find(s => prompt.toLowerCase().includes(s)) || 'concept';
    const isEnhanced = prompt.toLowerCase().includes('ultra') || prompt.toLowerCase().includes('high-fidelity');
    
    return {
      prompt,
      style,
      enhanced: isEnhanced,
      resolution: artisanConfig.maxResolution,
    };
  }
}
