export type PluginCategoryId = 'communication' | 'browser' | 'system' | 'creative' | 'intelligence' | 'utility' | 'productivity' | 'vision' | 'social' | 'security' | 'neural' | 'financial' | 'hardware' | 'cosmic' | 'industrial' | 'health' | 'core' | 'spatial';

export interface PluginAction {
  id: string;
  label: string;
  description: string;
  category: PluginCategoryId;
  sensitive: boolean;
  icon?: string; // Lucide icon name or SVG path
}

export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  auditId?: string;
}

export interface RaizenPlugin {
  id: string;
  name: string;
  description: string;
  actions: PluginAction[];
  status: 'offline' | 'connecting' | 'online' | 'error';
  
  initialize(): Promise<void>;
  execute(actionId: string, params: Record<string, any>): Promise<ActionResult>;
  onMessage?(callback: (msg: any) => void): void;
  emitEvent?(eventId: string, data: any): void;
  onEvent?(eventId: string, callback: (data: any) => void): void;
}
