export const elysiumConfig = {
  operationalBaseline: {
    shroudMode: 'passive',
    phoenixStatus: 'standby',
    apiExposure: 'sovereign-restricted',
    resourceAllocation: 'optimal'
  },

  restorationPolicies: {
    autoRestoreOnFalseAlarm: true,
    requireManualConfirmOnHighThreat: true,
    verificationTimeoutMs: 30000
  },

  reportStoragePath: 'logs/recovery/',
  
  criticalSubsystems: [
    'core.engine',
    'security.shoud',
    'security.phoenix',
    'finance.mint',
    'health.iris'
  ]
};
