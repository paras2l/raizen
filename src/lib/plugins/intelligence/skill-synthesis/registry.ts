import { SkillManifest } from './types';

export class SkillRegistry {
  private skills: Map<string, SkillManifest> = new Map();

  register(manifest: SkillManifest) {
    this.skills.set(manifest.id, manifest);
    console.log(`[SKILL-REGISTRY] New autonomic capability registered: ${manifest.name} (v${manifest.version})`);
  }

  getSkillIds(): string[] {
    return Array.from(this.skills.keys());
  }

  getSkills(): SkillManifest[] {
    return Array.from(this.skills.values());
  }
}
