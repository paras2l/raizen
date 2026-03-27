import { WorkflowPattern, UIShortcut } from './types';

export class UIShortcutGenerator {
  generate(pattern: WorkflowPattern): UIShortcut {
    console.log(`[MITOSIS-GEN] Generating UI shortcut for pattern: ${pattern.steps.join(' -> ')}`);
    
    return {
      id: `shortcut_${pattern.id}`,
      label: `Smart: ${pattern.steps[0]} + More`,
      workflowId: pattern.id,
      status: 'proposed'
    };
  }
}
