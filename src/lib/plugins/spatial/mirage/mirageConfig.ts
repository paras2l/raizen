import { MirageTheme } from './mirageTypes';

export const mirageConfig = {
  defaultTheme: 'Cyberpunk' as MirageTheme,
  maxSurfaceDistortion: 0.05,
  meshRefreshRateMs: 500,
  autoGlow: true,
  interactiveOverlays: true,
  auricSync: true, // Sync visuals with User Aura
  surfaces: [
    { name: 'Primary-Wall', type: 'Wall', priority: 1 },
    { name: 'Workspace-Ambient', type: 'Furniture', priority: 2 }
  ]
};
