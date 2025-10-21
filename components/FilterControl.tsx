// Fix: Creates the FilterControl component for image adjustment sliders.
import React, { ComponentType } from 'react';

interface FilterControlProps {
  // Fix: Changed the type of the 'icon' prop from React.FC to React.ComponentType to allow both functional and class components.
  icon: ComponentType<{ className?: string }>;
  name: string;
  value: number;
  onChange: (value: number) => void;
  onChangeEnd?: () => void;
  onReset: () => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}

const FilterControl: React.FC<FilterControlProps> = ({
  icon: Icon,
  name,
  value,
  onChange,
  onChangeEnd,
  onReset,
  min,
  max,
  step,
  unit,
}) => {
  return (
    <div className="flex items-center space-x-4 p-2">
      <div className="flex flex-col items-center w-16 text-center">
        <Icon className="w-6 h-6 mb-1 text-gray-300" />
        <span className="text-xs text-gray-400">{name}</span>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-300 tabular-nums" onDoubleClick={onReset}>{value}{unit}</span>
          <button
            onClick={onReset}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Reset
          </button>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseUp={onChangeEnd}
          onTouchEnd={onChangeEnd}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>
    </div>
  );
};

export default FilterControl;