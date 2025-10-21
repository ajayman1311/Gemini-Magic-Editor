import type { ComponentType } from 'react';

export enum Tool {
  BACKGROUND_REMOVER = 'BACKGROUND_REMOVER',
  PHOTO_COMBINER = 'PHOTO_COMBINER',
  BACKGROUND_CHANGER = 'BACKGROUND_CHANGER',
  CLOTH_CHANGER = 'CLOTH_CHANGER',
  VIEW_CHANGER = 'VIEW_CHANGER',
  MAGIC_EDITOR = 'MAGIC_EDITOR',
}

export interface ImageData {
  id: string;
  base64: string;
  mimeType: string;
}

export interface ToolConfig {
  id: Tool;
  name: string;
  description: string;
  // FIX: Use `ComponentType` and import it as a type from React to resolve the namespace error.
  icon: ComponentType<{ className?: string }>;
  promptPrefix: string;
  imageInputs: number;
  promptLabel: string;
  promptPlaceholder: string;
}
