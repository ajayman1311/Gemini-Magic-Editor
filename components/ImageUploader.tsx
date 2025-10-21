
import React, { useState, useRef, useCallback } from 'react';
import { ImageData } from '../types';

interface ImageUploaderProps {
  id: string;
  onImageUpload: (imageData: ImageData | null) => void;
  title?: string;
}

const fileToBase64 = (file: File): Promise<{ base64: string, mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve({ base64, mimeType: file.type });
    };
    reader.onerror = (error) => reject(error);
  });
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ id, onImageUpload, title = 'Upload Image' }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const { base64, mimeType } = await fileToBase64(file);
        setImagePreview(URL.createObjectURL(file));
        onImageUpload({ id, base64, mimeType });
      } catch (error) {
        console.error("Error converting file to base64:", error);
        onImageUpload(null);
        setImagePreview(null);
      }
    }
  }, [id, onImageUpload]);

  const handleUploaderClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImagePreview(null);
    onImageUpload(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-300 mb-2">{title}</h3>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      <div
        onClick={handleUploaderClick}
        className="relative w-full h-64 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors duration-300 bg-gray-800/50"
      >
        {imagePreview ? (
          <>
            <img src={imagePreview} alt="Preview" className="h-full w-full object-contain rounded-lg" />
            <button 
              onClick={handleRemoveImage} 
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 transition-colors z-10"
              aria-label="Remove image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </>
        ) : (
          <div className="text-center text-gray-500">
            <svg
              className="mx-auto h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 4v.01M28 8l4 4m0 0l4 4m-4-4v12m0-12H20a4 4 0 00-4 4v20m32-12v8m0 4v.01"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2">Click to upload an image</p>
            <p className="text-xs">PNG, JPG, WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
