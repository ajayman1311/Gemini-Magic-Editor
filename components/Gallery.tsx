import React from 'react';
import { ImageData } from '../types';
import PlusCircleIcon from './icons/PlusCircleIcon';
import XCircleIcon from './icons/XCircleIcon';

interface GalleryProps {
  images: ImageData[];
  activeIndex: number | null;
  onSelect: (index: number) => void;
  onDelete: (index: number) => void;
  onAddClick: () => void;
  isSelectingSecondary?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ 
  images, 
  activeIndex, 
  onSelect, 
  onDelete, 
  onAddClick,
  isSelectingSecondary = false,
}) => {
  return (
    <div className="bg-gray-800 border-t-2 border-gray-700 p-2 shadow-inner">
      <div className="flex items-center space-x-3 overflow-x-auto">
        <button
          onClick={onAddClick}
          className="flex-shrink-0 w-24 h-24 bg-gray-700 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:bg-gray-600 hover:text-white transition-colors"
          aria-label="Add new images"
        >
          <PlusCircleIcon className="w-8 h-8 mb-1" />
          <span className="text-xs font-semibold">Add</span>
        </button>
        {images.map((image, index) => (
          <div key={index} className="relative flex-shrink-0">
            <button
              onClick={() => onSelect(index)}
              className={`w-24 h-24 rounded-lg overflow-hidden border-4 transition-colors ${
                activeIndex === index ? 'border-blue-500' : 'border-transparent hover:border-gray-500'
              } ${isSelectingSecondary && activeIndex === index ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSelectingSecondary && activeIndex === index}
            >
              <img
                src={`data:${image.mimeType};base64,${image.base64}`}
                alt={`gallery item ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(index);
              }}
              className="absolute -top-2 -right-2 bg-gray-800 text-gray-400 rounded-full p-0.5 hover:bg-red-600 hover:text-white transition-colors"
              aria-label={`Delete image ${index + 1}`}
            >
              <XCircleIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
