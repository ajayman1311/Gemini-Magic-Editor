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
  const buttonStyle = "bg-white/30 backdrop-blur-sm text-gray-800 p-2 rounded-full transition-colors hover:bg-white/50 shadow-md";
  
  return (
    <div className="absolute bottom-4 right-4 flex items-center space-x-2">
      <button onClick={onZoomOut} className={buttonStyle} aria-label="Zoom out">
        <ZoomOutIcon className="w-6 h-6" />
      </button>
      <span className="bg-white/30 backdrop-blur-sm text-gray-800 font-semibold text-base w-16 text-center tabular-nums rounded-full py-2 shadow-md">
        {Math.round(zoom * 100)}%
      </span>
      <button onClick={onZoomIn} className={buttonStyle} aria-label="Zoom in">
        <ZoomInIcon className="w-6 h-6" />
      </button>
      <button onClick={onResetZoom} className={buttonStyle} aria-label="Reset zoom">
        <ResetZoomIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ZoomControls;