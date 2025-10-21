import React from 'react';
import ZoomInIcon from './icons/ZoomInIcon';
import ZoomOutIcon from './icons/ZoomOutIcon';
import ResetZoomIcon from './icons/ResetZoomIcon';

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ zoom, onZoomIn, onZoomOut, onResetZoom }) => {
  return (
    <div className="absolute bottom-4 right-4 bg-gray-800 text-white rounded-lg p-2 flex items-center space-x-2 shadow-lg">
      <button onClick={onZoomOut} className="p-2 hover:bg-gray-700 rounded-md transition-colors" aria-label="Zoom out">
        <ZoomOutIcon className="w-6 h-6" />
      </button>
      <span className="font-semibold text-lg w-16 text-center tabular-nums">
        {Math.round(zoom * 100)}%
      </span>
      <button onClick={onZoomIn} className="p-2 hover:bg-gray-700 rounded-md transition-colors" aria-label="Zoom in">
        <ZoomInIcon className="w-6 h-6" />
      </button>
      <button onClick={onResetZoom} className="p-2 hover:bg-gray-700 rounded-md transition-colors" aria-label="Reset zoom">
        <ResetZoomIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ZoomControls;
