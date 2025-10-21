import React, { useState, useCallback, DragEvent } from 'react';
import CameraIcon from './icons/CameraIcon';
import { ImageData } from '../types';

interface ImageUploaderProps {
  onImageUpload: (imageData: ImageData) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const base64 = reader.result.split(',')[1];
          onImageUpload({ base64, mimeType: file.type });
        }
      };
      reader.readAsDataURL(file);
    } else {
        alert('Please select a valid image file.');
    }
  };

  const onDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  }, [onImageUpload]);

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(true);
  };
  
  const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleFile(event.target.files[0]);
    }
  };

  const onDivClick = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <div
      onClick={onDivClick}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      className={`w-full h-full flex flex-col items-center justify-center border-4 border-dashed rounded-3xl cursor-pointer transition-colors ${
        isDragActive ? 'border-blue-500 bg-blue-900/20' : 'border-gray-600 hover:border-gray-500'
      }`}
    >
      <input id="fileInput" type="file" className="hidden" onChange={onInputChange} accept="image/*" />
      <div className="text-center p-8 pointer-events-none">
        <CameraIcon className="w-24 h-24 mx-auto text-gray-500 mb-6" />
        <h2 className="text-2xl font-bold text-gray-200 mb-2">
          {isDragActive ? 'Drop the image here ...' : 'Drag & drop an image here'}
        </h2>
        <p className="text-gray-400">or click to select a file</p>
        <p className="text-xs text-gray-500 mt-4">PNG, JPG, WEBP</p>
      </div>
    </div>
  );
};

export default ImageUploader;
