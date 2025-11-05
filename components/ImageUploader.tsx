
import React, { useState, useCallback, DragEvent } from 'react';
import CameraIcon from './icons/CameraIcon';
import { ImageData } from '../types';

interface ImageUploaderProps {
  onImagesUpload: (imageData: ImageData[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesUpload }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFiles = (files: FileList) => {
    if (!files || files.length === 0) return;
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      alert('Please select valid image files.');
      return;
    }
    
    const promises = imageFiles.map(file => {
      return new Promise<ImageData>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            const base64 = reader.result.split(',')[1];
            resolve({ base64, mimeType: file.type });
          } else {
            reject(new Error('Failed to read file.'));
          }
        };
        // FIX: Ensure promise is rejected with an Error object.
        reader.onerror = () => reject(new Error('Failed to read file.'));
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(imageDataArray => {
      onImagesUpload(imageDataArray);
    }).catch(error => {
      console.error("Error reading files:", error);
      alert("There was an error processing some of your images.");
    });
  };

  const onDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFiles(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  }, [onImagesUpload]);

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
    if (event.target.files && event.target.files.length > 0) {
      handleFiles(event.target.files);
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
      <input id="fileInput" type="file" className="hidden" onChange={onInputChange} accept="image/*" multiple />
      <div className="text-center p-8 pointer-events-none">
        <CameraIcon className="w-24 h-24 mx-auto text-gray-500 mb-6" />
        <h2 className="text-2xl font-bold text-gray-200 mb-2">
          {isDragActive ? 'Drop images here ...' : 'Drag & drop images here'}
        </h2>
        <p className="text-gray-400">or click to select files</p>
        <p className="text-xs text-gray-500 mt-4">PNG, JPG, WEBP</p>
      </div>
    </div>
  );
};

export default ImageUploader;
