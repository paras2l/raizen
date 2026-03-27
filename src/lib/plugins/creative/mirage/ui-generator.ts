import { ConceptIntent } from './types';

export class UIMockGenerator {
  generateHTML(intent: ConceptIntent): string {
    console.log(`[MIRAGE-UI] Synthesizing high-fidelity HTML layout for ${intent.topic}.`);
    return `
      <div class="mirage-prototype" style="font-family: '${intent.style === 'minimal' ? 'Inter' : 'Arial'}';">
        <header><h1>${intent.topic}</h1></header>
        <main>
          <ul>${intent.features.map(f => `<li>${f}</li>`).join('')}</ul>
        </main>
      </div>
    `;
  }
}
