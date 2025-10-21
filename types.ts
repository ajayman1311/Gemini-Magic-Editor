// Fix: Defines the data structures used throughout the application.
export interface ImageData {
  base64: string;
  mimeType: string;
}

export interface ImageFilters {
  brightness: number;
  contrast: number;
  sepia: number;
  grayscale: number;
  invert: number;
  exposure: number;
  whitePoint: number;
  blackPoint: number;
  saturation: number;
  warmth: number;
  tint: number;
  vignette: number;
  vintage: number;
  west: number;
  palma: number;
}

export interface ImageState {
  imageData: ImageData | null;
  filters: ImageFilters;
  rotation: number;
  straightenAngle: number;
}

export interface AiTool {
  id: string;
  name: string;
  defaultPrompt: string;
  imageInputs: 1 | 2;
}

export interface ApiFilterAction {
    id: string;
    name: string;
    prompt: string;
}

export interface ApiAdjustmentAction {
    id: string;
    name: string;
    prompt: string;
}