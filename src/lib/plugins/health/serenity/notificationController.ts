import { serenityLogger } from './serenityLogger';
import { serenityConfig } from './serenityConfig';
import { StressLevel } from './serenityTypes';

export class NotificationController {
  filterNotifications(level: StressLevel): boolean {
    if (!serenityConfig.interventions.aggressiveFilteringOnHigh) return false;

    if (level === 'High' || level === 'Burnout-Risk') {
      serenityLogger.info('Aggressive notification filtering enabled to protect cognitive focus.');
      serenityLogger.breakPrompted();
      return true;
    }

    return false;
  }
}

export const notificationController = new NotificationController();
