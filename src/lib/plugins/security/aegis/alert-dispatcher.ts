export class AlertDispatcher {
  async dispatch(message: string, channels: string[]) {
    console.log(`[AEGIS-ALERT] Dispatching security notification: "${message}" -> [${channels.join(', ')}]`);
    return true;
  }
}
