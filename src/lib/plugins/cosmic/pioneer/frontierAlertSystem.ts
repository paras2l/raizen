import { CosmicEvent, PioneerAlert } from './pioneerTypes';
import { pioneerLogger } from './pioneerLogger';

export class FrontierAlertSystem {
  dispatchAlert(event: CosmicEvent): PioneerAlert {
    pioneerLogger.alert(`Distributing cosmic discovery alert for event: ${event.id}...`);
    
    const alert: PioneerAlert = {
      id: `ALT-${Date.now()}`,
      eventId: event.id,
      priority: event.magnitude > 8.0 ? 'critical' : 'high',
      message: `[COSMIC ALERT] ${event.type}: ${event.description}`,
    };

    pioneerLogger.success(`Frontier alert dispatched. Priority: ${alert.priority.toUpperCase()}.`);
    return alert;
  }
}
