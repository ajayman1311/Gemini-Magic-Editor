
import React from 'react';
import { Tool, ToolConfig } from './types';
import ScissorIcon from './components/icons/ScissorIcon';
import CombineIcon from './components/icons/CombineIcon';
import SparklesIcon from './components/icons/SparklesIcon';
import ShirtIcon from './components/icons/ShirtIcon';
import CameraIcon from './components/icons/CameraIcon';
import WandIcon from './components/icons/WandIcon';

export const TOOLS: ToolConfig[] = [
  {
    id: Tool.BACKGROUND_REMOVER,
    name: 'Background Remover',
    description: 'Remove the background from any image.',
    icon: ScissorIcon,
    promptPrefix: 'remove the background',
    imageInputs: 1,
    promptLabel: 'Instructions (optional)',
    promptPlaceholder: 'e.g., keep the shadow'
  },
  {
    id: Tool.BACKGROUND_CHANGER,
    name: 'Background Changer',
    description: 'Replace the background with a new scene.',
    icon: SparklesIcon,
    promptPrefix: 'change the background to',
    imageInputs: 1,
    promptLabel: 'New Background Description',
    promptPlaceholder: 'e.g., a futuristic city at night'
  },
  {
    id: Tool.CLOTH_CHANGER,
    name: 'Cloth Changer',
    description: 'Magically change the outfit in a photo.',
    icon: ShirtIcon,
    promptPrefix: 'change the clothes to',
    imageInputs: 1,
    promptLabel: 'New Outfit Description',
    promptPlaceholder: 'e.g., a formal black suit'
  },
  {
    id: Tool.MAGIC_EDITOR,
    name: 'Magic Editor',
    description: 'Use a prompt to make any edit you can imagine.',
    icon: WandIcon,
    promptPrefix: '',
    imageInputs: 1,
    promptLabel: 'Editing Instructions',
    promptPlaceholder: 'e.g., make the cat wear a wizard hat'
  },
  {
    id: Tool.PHOTO_COMBINER,
    name: 'Photo Combiner',
    description: 'Merge two photos into a single masterpiece.',
    icon: CombineIcon,
    promptPrefix: 'combine these images to',
    imageInputs: 2,
    promptLabel: 'Combination Instructions',
    promptPlaceholder: 'e.g., show the cat riding the skateboard'
  },
  {
    id: Tool.VIEW_CHANGER,
    name: 'View Changer',
    description: 'Alter the perspective or angle of your photo.',
    icon: CameraIcon,
    promptPrefix: 'change the view to',
    imageInputs: 1,
    promptLabel: 'New View Description',
    promptPlaceholder: 'e.g., a low-angle shot'
  },
];
