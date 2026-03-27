import { ControlCommand } from './centurionTypes';
import { centurionLogger } from './centurionLogger';

export class CommandScheduler {
  private queue: ControlCommand[] = [];

  scheduleCommand(command: ControlCommand) {
    this.queue.push(command);
    this.queue.sort((a, b) => b.priority - a.priority);
    centurionLogger.log(`Command scheduled for device ${command.deviceId}. Queue length: ${this.queue.length}.`);
  }

  getNextCommand(): ControlCommand | undefined {
    return this.queue.shift();
  }
}
