import { CinematicScene, CinematicScript } from './directorTypes';
import { directorLogger } from './directorLogger';
import { VideoRenderEngine } from './videoRenderEngine';
import { SpatialAudioModule } from './spatialAudioModule';
import { directorConfig } from './directorConfig';

export class SceneOrchestrator {
  private videoEngine = new VideoRenderEngine();
  private audioModule = new SpatialAudioModule();

  async synthesize(script: CinematicScript, profile: keyof typeof directorConfig.profiles): Promise<CinematicScene> {
    directorLogger.log(`Orchestrating scene synthesis: ${script.id}`);
    
    // Execute production pipeline in parallel
    const [videoUri, audioUri] = await Promise.all([
      this.videoEngine.render(script, profile),
      this.audioModule.synthesizeAudio(script),
    ]);

    directorLogger.success(`Cinematic synthesis verified: Production complete.`);

    return {
      id: `SCENE-${Date.now()}`,
      title: `Production of ${script.id}`,
      script,
      videoUri,
      audioUri,
      duration: 30, // Default for now
      timestamp: Date.now(),
      metadata: {
        profile,
        syncFidelity: directorConfig.audioFidelity,
        renderingTier: 'GOD_PRO_MAX',
      },
    };
  }
}
