// Fix: Provides constant data for AI modes and initial filter values.
import { ImageFilters, AiTool } from './types';

export const EDIT_MODES: AiTool[] = [
    { id: 'magic-editor', name: 'Magic Editor', defaultPrompt: 'Enhance this image to look more professional and vibrant.', imageInputs: 1 },
    { id: 'background-remover', name: 'Remove BG', defaultPrompt: 'Remove the background from this image, keeping the main subject.', imageInputs: 1 },
    { id: 'background-changer', name: 'Change BG', defaultPrompt: 'Change the background of this image to a beautiful mountain landscape at sunset.', imageInputs: 1 },
    { id: 'cloth-changer', name: 'Change Clothes', defaultPrompt: 'Change the shirt in this image to a blue polo shirt.', imageInputs: 1 },
    { id: 'view-changer', name: 'Change View', defaultPrompt: 'Alter the perspective of this image to a low-angle shot.', imageInputs: 1 },
    { id: 'photo-combiner', name: 'Combine', defaultPrompt: 'Combine the main subject from the first image with the second image, blending them seamlessly.', imageInputs: 2 },
];

export const INITIAL_FILTERS: ImageFilters = {
    brightness: 100,
    contrast: 100,
    sepia: 0,
    grayscale: 0,
    invert: 0,
    exposure: 100,
    highlights: 0,
    shadows: 0,
};
