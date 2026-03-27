export const architectConfig = {
  learningProfiles: {
    'creative': ['Blender', 'Premiere', 'Photoshop'],
    'engineering': ['AutoCAD', 'SolidWorks', 'MATLAB'],
    'core': ['Terminal', 'VSCode', 'Browser'],
  },
  omniLink: {
    enableRemoteCompute: true,
    maxLatencyMs: 150,
    encryptionTier: 'Ghost-V2',
  },
  studyInterval: 3600, // 1 hour per session
};
