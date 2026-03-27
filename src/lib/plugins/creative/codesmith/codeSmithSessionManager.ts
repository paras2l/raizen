import { SoftwareSpec, Codebase, DeploymentResult } from './codeSmithTypes';
import { codeSmithLogger } from './codeSmithLogger';

export class CodeSmithSessionManager {
  private activeSpecs = new Map<string, SoftwareSpec>();
  private activeCodebases = new Map<string, Codebase>();
  private activeDeployments = new Map<string, DeploymentResult[]>();

  registerSpec(spec: SoftwareSpec) {
    this.activeSpecs.set(spec.id, spec);
    codeSmithLogger.log(`Software specification registered: ${spec.id}`);
  }

  registerCodebase(codebase: Codebase) {
    this.activeCodebases.set(codebase.id, codebase);
    codeSmithLogger.log(`Codebase ready for deployment: ${codebase.repositoryUri}`);
  }

  registerDeployment(deployment: DeploymentResult[]) {
    if (deployment.length > 0) {
      this.activeDeployments.set(deployment[0].appId, deployment);
      codeSmithLogger.log(`Active deployments registered for ${deployment[0].appId}`);
    }
  }

  getActiveSpecs(): SoftwareSpec[] {
    return Array.from(this.activeSpecs.values());
  }

  getActiveDeployments(): DeploymentResult[][] {
    return Array.from(this.activeDeployments.values());
  }
}
