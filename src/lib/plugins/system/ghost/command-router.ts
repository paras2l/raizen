export class OfflineCommandRouter {
  route(command: string) {
    console.log(`[GHOST-ROUTER] Routing mission to local capabilities: ${command}`);
    // Routes to local skills like File Organizer or Home Assistant Bridge
    return { success: true, handler: 'local_skill_executor' };
  }
}
