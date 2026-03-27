export const oracleConfig = {
  dataRetentionDays: 30,
  insightRefreshrateMs: 3600000, // 1 hour
  minConfidenceThreshold: 0.75,
  sourceWeighting: {
    financial: 1.2,
    social: 0.8,
    news: 1.0,
  },
  priorityTopics: ['AI', 'Quantum Computing', 'Global Markets', 'Geopolitics'],
};
