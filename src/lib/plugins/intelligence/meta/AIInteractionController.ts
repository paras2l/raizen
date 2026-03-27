import { InteractionEvent } from './metaTypes';
import { metaLogger } from './metaLogger';

export class AIInteractionController {
  public async processInteraction(event: InteractionEvent): Promise<void> {
    await metaLogger.log(`Processing multimodal interaction: ${event.source} on target ${event.targetEntityId}`);
  }
}
