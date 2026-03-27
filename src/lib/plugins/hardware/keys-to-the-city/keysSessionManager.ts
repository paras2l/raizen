import { TransitPath, InfrastructureNode } from './keysTypes';
import { keysLogger } from './keysLogger';

export class KeysSessionManager {
  private activePaths: Map<string, TransitPath> = new Map();
  private overriddenNodes: Set<string> = new Set();

  public async initiatePath(path: TransitPath): Promise<void> {
    this.activePaths.set(path.id, path);
    await keysLogger.log(`Transit path [${path.id}] initiated. Synchronizing infrastructure...`);
  }

  public trackNode(node: InfrastructureNode): void {
    if (node.status === 'OVERRIDDEN') {
        this.overriddenNodes.add(node.id);
    }
  }

  public getActivePaths(): TransitPath[] {
    return Array.from(this.activePaths.values());
  }

  public reset(): void {
    this.activePaths.clear();
    this.overriddenNodes.clear();
  }
}
