import { duetLogger } from './duetLogger';
import { duetConfig } from './duetConfig';

export class MediumAdapter {
  adaptOutput(output: any, medium: string): any {
    if (!duetConfig.supportedMediums.includes(medium)) {
      duetLogger.error(`Unsupported medium: ${medium}`);
      return output;
    }

    duetLogger.log(`Adapting AI contribution for ${medium} environment...`);
    
    return {
      ...output,
      medium,
      compatible: true,
    };
  }
}
