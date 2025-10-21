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
  highlights: number;
  shadows: number;
}

export interface ImageState {
  imageData: ImageData | null;
  filters: ImageFilters;
}

export interface AiTool {
  id: string;
  name: string;
  defaultPrompt: string;
  imageInputs: 1 | 2;
}
