import { SpatialOverlay, OverlayType, AnchorType } from './types';

export class OverlayManager {
  private activeOverlays: Map<string, SpatialOverlay> = new Map();

  createOverlay(type: OverlayType, title: string, content: string, anchor: AnchorType): SpatialOverlay {
    const id = `ovl_${Date.now()}`;
    const overlay: SpatialOverlay = {
      id,
      type,
      title,
      content,
      anchor,
      position: { x: 0, y: 0, z: 0 },
      scale: 1.0
    };

    this.activeOverlays.set(id, overlay);
    return overlay;
  }

  updateOverlay(id: string, updates: Partial<SpatialOverlay>) {
    const existing = this.activeOverlays.get(id);
    if (existing) {
      this.activeOverlays.set(id, { ...existing, ...updates });
    }
  }

  removeOverlay(id: string) {
    this.activeOverlays.delete(id);
  }

  getVisible(): SpatialOverlay[] {
    return Array.from(this.activeOverlays.values());
  }
}
