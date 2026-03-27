import { ModuleMetadata } from './types';

export class MutationRegistry {
  private modules: Map<string, ModuleMetadata> = new Map();

  register(meta: ModuleMetadata) {
    this.modules.set(meta.id, meta);
    console.log(`[ALPHA-REGISTRY] Module registered: ${meta.name}`);
  }

  getModules(): ModuleMetadata[] {
    return Array.from(this.modules.values());
  }
}
