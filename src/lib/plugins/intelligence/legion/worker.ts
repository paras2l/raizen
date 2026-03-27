import { AgentRole, AgentStatus, SubTask, AgentResult } from './types';

export class LegionWorker {
  id: string;
  role: AgentRole;
  status: AgentStatus = 'created';
  memoryBuffer: any[] = [];
  private startTime: number = 0;

  constructor(id: string, role: AgentRole) {
    this.id = id;
    this.role = role;
  }

  async run(task: SubTask): Promise<AgentResult> {
    this.status = 'running';
    this.startTime = Date.now();
    
    console.log(`[LEGION-WORKER] ${this.id} (${this.role}) started task: ${task.description}`);

    try {
      // Simulate task execution (In a real implementation, this would call specialized AI adapters)
      // Here we simulate a processing delay based on role
      const delay = this.role === 'analyst' ? 1500 : 800;
      await new Promise(resolve => setTimeout(resolve, delay));

      const resultData = this.simulateResult(task);
      this.status = 'completed';
      
      return {
        agentId: this.id,
        subTaskId: task.id,
        success: true,
        data: resultData,
        durationMs: Date.now() - this.startTime
      };
    } catch (error: any) {
      this.status = 'error';
      return {
        agentId: this.id,
        subTaskId: task.id,
        success: false,
        data: null,
        error: error.message,
        durationMs: Date.now() - this.startTime
      };
    }
  }

  private simulateResult(task: SubTask): any {
    switch (this.role) {
      case 'summarizer': return { summary: `Condensed version of: ${task.description}`, wordCount: 45 };
      case 'analyst': return { sentiment: 'positive', confidence: 0.94, insights: ['Actionable', 'High-Impact'] };
      case 'researcher': return { sources: ['Source A', 'Source B'], relevance: 0.88 };
      default: return { status: 'processed', inputId: task.id };
    }
  }

  terminate() {
    this.status = 'terminated';
    this.memoryBuffer = []; // Wipe memory
    console.log(`[LEGION-WORKER] ${this.id} self-terminated.`);
  }
}
