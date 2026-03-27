import { TaskMode } from './sovereignTypes';

export const sovereignConfig = {
  defaultMode: 'Standby' as TaskMode,
  assetPollingIntervalMs: 60000, // 1 minute
  friendshipInsightThreshold: 0.85,
  uiTransitionSpeedMs: 300,
  userName: 'Paro',
  loyaltyLocked: true,
};
