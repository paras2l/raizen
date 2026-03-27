export const foundryConfig = {
  annualLaunchTarget: 5,
  minTrendScore: 0.70,
  maxCompetitionIndex: 0.45,
  minROIExpectation: 0.25, // 25% monthly
  
  bootstrapBudget: 5000, // USD per launch
  
  automationStack: ['Cloud-Native', 'AI-LLM', 'Auto-Fulfillment', 'Stripe-Atlas'],
  
  scalingTriggers: {
    revenueThreshold: 10000,
    userMilestone: 1000,
    efficiencyRating: 0.90
  }
};
