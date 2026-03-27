import { CinematicOutput, DreamScene } from './dreamReelTypes';
import { dreamReelLogger } from './dreamReelLogger';

export class DreamReelSessionManager {
  private activeProductions = new Map<string, CinematicOutput>();
  private decodedScenes = new Map<string, DreamScene>();

  registerScene(scene: DreamScene) {
    this.decodedScenes.set(scene.id, scene);
    dreamReelLogger.log(`Dream scene stored in production queue: ${scene.id}`);
  }

  registerOutput(output: CinematicOutput) {
    this.activeProductions.set(output.id, output);
    dreamReelLogger.log(`Cinematic output registered: ${output.videoUri}`);
  }

  getDecodedScenes(): DreamScene[] {
    return Array.from(this.decodedScenes.values());
  }

  getActiveProductions(): CinematicOutput[] {
    return Array.from(this.activeProductions.values());
  }
}
