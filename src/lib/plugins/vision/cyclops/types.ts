export type VisionSessionStatus = 'idle' | 'active' | 'analyzing' | 'expired';

export interface VisionSession {
  id: string;
  startTime: string;
  expiresAt: string;
  status: VisionSessionStatus;
}

export interface OCRResult {
  text: string;
  confidence: number;
  area: { x: number; y: number; width: number; height: number };
}

export interface UIElement {
  id: string;
  type: 'button' | 'menu' | 'input' | 'window' | 'chart';
  label?: string;
  bounds: { x: number; y: number; w: number; h: number };
}

export interface VisionContext {
  activeApplication: string;
  detectedText: string[];
  elements: UIElement[];
  timestamp: string;
}

export interface VisionLogEntry {
  timestamp: string;
  event: 'SESSION_START' | 'FRAME_CAPTURE' | 'OCR_SUCCESS' | 'PERMISSION_GRANT';
  details: string;
}
