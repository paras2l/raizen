import { AnchorType } from './types';

export class AnchorSystem {
  // Simulates locking overlays to spatial coordinates
  calculateTarget(type: AnchorType): { x: number; y: number; z: number } {
    switch (type) {
      case 'gaze':
        return { x: 0, y: 0, z: -1.5 }; // Fixed 1.5m in front of user
      case 'surface':
        return { x: 0.5, y: -0.2, z: -0.8 }; // Offset to table-level
      case 'world':
        return { x: Math.random(), y: Math.random(), z: Math.random() };
      default:
        return { x: 0, y: 0, z: 0 };
    }
  }

  getBestAnchor(context: string): AnchorType {
    if (context.includes('navigation')) return 'world';
    if (context.includes('alert')) return 'gaze';
    return 'screen-relative';
  }
}
