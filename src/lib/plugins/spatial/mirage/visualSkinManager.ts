import { mirageLogger } from './mirageLogger';
import { MirageTheme, VisualSkin } from './mirageTypes';

export class VisualSkinManager {
  private currentSkin: VisualSkin = {
    theme: 'Zen',
    globalOpacity: 1.0,
    activeOverlays: []
  };

  async updateSkin(theme: MirageTheme): Promise<void> {
    mirageLogger.log(`Shifting environment visual skin to ${theme}...`);
    this.currentSkin.theme = theme;
    mirageLogger.skin(theme);
  }

  trackInteraction(interaction: string): void {
    mirageLogger.interaction(interaction);
  }
}

export const visualSkinManager = new VisualSkinManager();
