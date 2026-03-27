import { SwarmTask, SubTask, AgentRole } from './types';

export class TaskPlanner {
  // Uses Raizen's internal NLP to split a complex task into atomic missions
  plan(task: SwarmTask): SubTask[] {
    console.log(`[LEGION-PLANNER] Decomposing: "${task.description}"`);
    
    // In a production scenario, this would use a LLM call to generate the sub-tasks
    // This mockup handles common 'analyze' patterns
    if (task.description.toLowerCase().includes('analyze') || task.description.toLowerCase().includes('research')) {
      return [
        { id: `${task.id}_s1`, parentId: task.id, description: 'Fetch related datasets', role: 'researcher', payload: {}, priority: 1 },
        { id: `${task.id}_s2`, parentId: task.id, description: 'Scan for patterns and sentiment', role: 'analyst', payload: {}, priority: 2 },
        { id: `${task.id}_s3`, parentId: task.id, description: 'Generate executive summary', role: 'summarizer', payload: {}, priority: 3 }
      ];
    }

    // Default fallback: single processing unit
    return [{ id: `${task.id}_s1`, parentId: task.id, description: task.description, role: 'analyst', payload: task.payload, priority: 1 }];
  }
}
