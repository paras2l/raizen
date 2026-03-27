import { WorkflowPattern } from './types';

export class HabitMemoryStore {
  private habits: Map<string, WorkflowPattern> = new Map();

  persist(patterns: WorkflowPattern[]) {
    patterns.forEach(p => this.habits.set(p.id, p));
    console.log(`[MITOSIS-HABIT] Persisted ${patterns.length} learned workflows to memory.`);
  }

  getHabits(): WorkflowPattern[] {
    return Array.from(this.habits.values());
  }
}
