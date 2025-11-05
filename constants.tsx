// Fix: Provides constant data for AI modes and initial filter values.
import { ImageFilters, AiTool, ApiFilterAction, ApiAdjustmentAction } from './types';

export const EDIT_MODES: AiTool[] = [
    { id: 'magic-editor', name: 'Magic Editor', defaultPrompt: 'Enhance this image to look more professional and vibrant.', imageInputs: 1 },
    { id: 'background-remover', name: 'Remove BG', defaultPrompt: 'The background will be removed automatically. Custom prompts are not used for this tool.', imageInputs: 1 },
    { id: 'background-changer', name: 'Change BG', defaultPrompt: 'Change the background of this image to a beautiful mountain landscape at sunset.', imageInputs: 1 },
    { id: 'cloth-changer', name: 'Change Clothes', defaultPrompt: 'Change the shirt in this image to a blue polo shirt.', imageInputs: 1 },
    { id: 'view-changer', name: 'Change View', defaultPrompt: 'Alter the perspective of this image to a low-angle shot.', imageInputs: 1 },
    { id: 'photo-combiner', name: 'Remix', defaultPrompt: 'Create a new, photorealistic image that creatively combines the main subjects and styles of both images. The result should be a completely new scene that harmoniously integrates elements from each input.', imageInputs: 2 },
];

export const API_FILTERS: ApiFilterAction[] = [
    { id: 'vivid', name: 'Vivid', prompt: "Apply a 'vivid' filter to this image, enhancing color saturation to make it pop without looking unnatural." },
    { id: 'west', name: 'West', prompt: "Give this image a retro, warm-toned 'West' filter vibe, reminiscent of classic western films with slightly faded colors." },
    { id: 'palma', name: 'Palma', prompt: "Apply a 'Palma' filter to this image, giving it a warmer, sun-drenched tone with soft contrast." },
    { id: 'metro', name: 'Metro', prompt: "Apply a 'Metro' filter to this image, adding cool tones and boosting contrast for a modern, urban feel." },
    { id: 'alpaca', name: 'Alpaca', prompt: "Apply an 'Alpaca' filter to this image, creating a cool, muted look with softened highlights and shadows." },
    { id: 'playa', name: 'Playa', prompt: "Apply the 'Playa' Real Tone filter, ensuring skin tones are rendered beautifully and naturally with a warm, sunlit feel." },
    { id: 'desert', name: 'Desert', prompt: "Apply the 'Desert' Real Tone filter, ensuring skin tones are rendered beautifully and naturally with a golden, arid light." },
    { id: 'caly', name: 'Caly', prompt: "Apply the 'Caly' Real Tone filter, ensuring skin tones are rendered beautifully and naturally with a rich, earthy warmth." },
    { id: 'honey', name: 'Honey', prompt: "Apply the 'Honey' Real Tone filter, ensuring skin tones are rendered beautifully and naturally with a sweet, golden hue." },
    { id: 'isla', name: 'Isla', prompt: "Apply the 'Isla' Real Tone filter, ensuring skin tones are rendered beautifully and naturally with a cool, island-breeze inspired light." },
    { id: 'bw-film', name: 'B&W Film', prompt: "Convert this image to a classic black and white film style, with rich contrast, deep blacks, and authentic grain." },
    { id: 'sky', name: 'Sky', prompt: "Subtly enhance the sky in this image, adjusting its color and contrast to be more dramatic and vibrant while keeping the rest of the image natural." },
];

export const API_ADJUSTMENTS: ApiAdjustmentAction[] = [
    { id: 'pop', name: 'Pop', prompt: "Apply a 'pop' filter to this image, enhancing local contrast at the edges to make the image appear sharper and more detailed without looking unnatural." },
    { id: 'sharpen', name: 'Sharpen', prompt: "Apply a 'sharpen' filter to this image, increasing edge contrast for a crisper, clearer appearance. Apply it subtly." },
    { id: 'denoise', name: 'Denoise', prompt: "Apply a 'denoise' filter to this image, reducing visual noise and grain, especially in shadow areas, while preserving important details." },
    { id: 'skin-tone', name: 'Skin Tone', prompt: "Subtly adjust the saturation and warmth of only the skin tones in this image to make them look more natural and healthy." },
    { id: 'blue-tone', name: 'Blue Tone', prompt: "Subtly adjust the saturation of only the blue tones in this image, such as the sky and water, to make them richer and more vibrant." },
];


export const INITIAL_FILTERS: ImageFilters = {
    brightness: 100,
    contrast: 100,
    sepia: 0,
    grayscale: 0,
    invert: 0,
    exposure: 100,
    whitePoint: 0,
    blackPoint: 0,
    saturation: 100,
    warmth: 0,
    tint: 0,
    vignette: 0,
    vintage: 0,
    west: 0,
    palma: 0,
};