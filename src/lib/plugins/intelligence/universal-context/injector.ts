import { ContextSnapshot, InjectionPayload } from './types';

export class ContextInjector {
  inject(snapshot: ContextSnapshot): InjectionPayload {
    console.log(`[CONTEXT-INJECTOR] Preparing knowledge payload for reasoning pipeline.`);

    const prompt = `--- COGNITIVE CONTEXT INJECTED ---\n` +
      `Topic/Subject: ${snapshot.subject}\n` +
      `Context Summary: ${snapshot.summary}\n` +
      `Key Facts:\n- ${snapshot.keyFacts.join('\n- ')}\n` +
      `---------------------------------`;

    return {
      snapshotId: snapshot.id,
      injectedPrompt: prompt,
      priority: snapshot.confidence > 0.8 ? 'high' : 'normal'
    };
  }
}
