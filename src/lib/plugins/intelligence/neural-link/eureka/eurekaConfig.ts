export const EurekaConfig = {
  THRESHOLDS: {
    ACTIVITY_SPIKE: 25, // events per 10s
    TAB_CHURN: 8, // switches per 30s
    NOTES_VELOCITY: 100 // chars per 5s
  },
  CAPTURE: {
    MAX_TERMINAL_LINES: 50,
    INDEX_RETENTION_DAYS: 365
  },
  INDEX: {
    AUTO_TAG: true,
    PROJECT_DETECTION: 'PATH_BASED'
  }
};
