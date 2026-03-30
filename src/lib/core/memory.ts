import { CoordinatedPlan } from './reasoningEngine';

export async function writeMemory(userMessage: string, plan: CoordinatedPlan, results: any[]) {
  console.log('[MEMORY] Storing interaction:', {
    message: userMessage,
    resolvedPlan: plan.actions.map(a => a.pluginId),
    status: 'STORED'
  });
  // Integration with Supabase/Episodic storage would happen here.
}

export async function readMemory(limit: number = 10) {
  return []; // Placeholder for Akasha retrieval
}
