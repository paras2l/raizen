import { reputationLogger } from './reputationLogger';

export class AlertDispatcher {
  dispatch(msg: string) {
    reputationLogger.log(`DISPATCHING ALERT: ${msg}`);
  }
}
