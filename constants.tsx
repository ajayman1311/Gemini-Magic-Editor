
import React from 'react';
import { Tool, ToolConfig } from './types';
import BackgroundRemoverIcon from './components/icons/BackgroundRemoverIcon';
import PhotoCombinerIcon from './components/icons/PhotoCombinerIcon';
import BackgroundChangerIcon from './components/icons/BackgroundChangerIcon';
import ClothChangerIcon from './components/icons/ClothChangerIcon';
import ViewChangerIcon from './components/icons/ViewChangerIcon';
import MagicEditorIcon from './components/icons/MagicEditorIcon';

export const TOOLS: ToolConfig[] = [
  {
    id: Tool.BACKGROUND_REMOVER,
    name: 'Background Remover',
    description: 'Remove the background from any image.',
    icon: BackgroundRemoverIcon,
    promptPrefix: 'remove the background',
    imageInputs: 1,
    promptLabel: 'Instructions (optional)',
    promptPlaceholder: 'e.g., keep the shadow'
  },
  {
    id: Tool.BACKGROUND_CHANGER,
    name: 'Background Changer',
    description: 'Replace the background with a new scene.',
    icon: BackgroundChangerIcon,
    promptPrefix: 'change the background to',
    imageInputs: 1,
    promptLabel: 'New Background Description',
    promptPlaceholder: 'e.g., a futuristic city at night'
  },
  {
    id: Tool.CLOTH_CHANGER,
    name: 'Cloth Changer',
    description: 'Magically change the outfit in a photo.',
    icon: ClothChangerIcon,
    promptPrefix: 'change the clothes to',
    imageInputs: 1,
    promptLabel: 'New Outfit Description',
    promptPlaceholder: 'e.g., a formal black suit'
  },
  {
    id: Tool.MAGIC_EDITOR,
    name: 'Magic Editor',
    description: 'Use a prompt to make any edit you can imagine.',
    icon: MagicEditorIcon,
    promptPrefix: '',
    imageInputs: 1,
    promptLabel: 'Editing Instructions',
    promptPlaceholder: 'e.g., make the cat wear a wizard hat'
  },
  {
    id: Tool.PHOTO_COMBINER,
    name: 'Photo Combiner',
    description: 'Merge two photos into a single masterpiece.',
    icon: PhotoCombinerIcon,
    promptPrefix: 'Combine the following images. It is critically important to preserve the exact facial features and identity of any people shown. With that in mind, ',
    imageInputs: 2,
    promptLabel: 'Combination Instructions',
    promptPlaceholder: 'e.g., place the person from the first image into the background of the second image'
  },
  {
    id: Tool.VIEW_CHANGER,
    name: 'View Changer',
    description: 'Alter the perspective or angle of your photo.',
    icon: ViewChangerIcon,
    promptPrefix: 'change the view to',
    imageInputs: 1,
    promptLabel: 'New View Description',
    promptPlaceholder: 'e.g., a low-angle shot'
  },
];