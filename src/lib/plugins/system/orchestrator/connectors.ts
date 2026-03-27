import { AppConnector } from './types';

export class AppConnectorManager {
  private connectors: AppConnector[] = [
    { id: 'slack', name: 'Slack', actions: ['send_message', 'read_channel'] },
    { id: 'email', name: 'Email (SMTP)', actions: ['send_mail', 'fetch_inbox'] },
    { id: 'github', name: 'GitHub API', actions: ['create_issue', 'push_code'] }
  ];

  getConnectors(): AppConnector[] {
    return [...this.connectors];
  }
}
