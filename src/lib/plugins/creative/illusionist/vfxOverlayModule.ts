import { RealityOverlay, VisualElement } from './illusionistTypes';
import { illusionistLogger } from './illusionistLogger';

export class VFXOverlayModule {
  private activeOverlays = new Map<string, RealityOverlay>();

  applyOverlay(type: RealityOverlay['type'], elements: VisualElement[]): RealityOverlay {
    const id = `VFX-${Date.now()}`;
    const overlay: RealityOverlay = {
      id,
      type,
      elements,
      opacity: 1.0,
      blendMode: 'additive',
      timestamp: Date.now(),
    };

    this.activeOverlays.set(id, overlay);
    illusionistLogger.overlay(`Applying ${type} overlay: ${elements.length} elements integrated.`);
    return overlay;
  }

  removeOverlay(id: string) {
    this.activeOverlays.delete(id);
    illusionistLogger.log(`Overlay removed: ${id}`);
  }
}
