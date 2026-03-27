import { ConnectionNode } from './navigatorTypes';
import { navigatorLogger } from './navigatorLogger';

export class ConnectionOpportunityDetector {
  detectOpenings(nodes: ConnectionNode[]): ConnectionNode[] {
    navigatorLogger.log("Scanning for high-value connection opportunities...");
    return nodes.filter(n => n.relevance > 0.7);
  }
}
