import { OCRResult, UIElement, VisionContext } from './types';

export class VisionContextBuilder {
  build(ocr: OCRResult[], elements: UIElement[]): VisionContext {
    console.log('[CYCLOPS-CONTEXT] Synthesizing visual signals into AI context snapshot.');

    return {
      activeApplication: 'VS Code',
      detectedText: ocr.map(r => r.text),
      elements: elements,
      timestamp: new Date().toISOString()
    };
  }
}
