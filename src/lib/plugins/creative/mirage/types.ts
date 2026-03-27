export type PrototypeComponent = 'UI_MOCKUP' | 'CODE_STUB' | 'ASSET' | 'DIAGRAM';

export interface ConceptIntent {
  topic: string;
  audience: string;
  style: 'minimal' | 'corporate' | 'playful' | 'brutalist';
  features: string[];
}

export interface AssetManifest {
  icons: string[];
  images: string[];
  fonts: string[];
}

export interface PrototypeDemo {
  id: string;
  title: string;
  htmlPreview: string;
  codeStubs: Record<string, string>;
  assets: AssetManifest;
}

export interface MirageConfig {
  maxGenerationTimeSeconds: number;
  outputFormat: 'html' | 'react' | 'figma_stub';
}
