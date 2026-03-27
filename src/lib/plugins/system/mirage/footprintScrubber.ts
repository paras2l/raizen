import { mirageLogger } from './mirageLogger';

export class FootprintScrubber {
  async scrub(domain: string) {
    mirageLogger.log(`Proactively purging metadata and footprint logs from ${domain}...`);
    return true;
  }
}
