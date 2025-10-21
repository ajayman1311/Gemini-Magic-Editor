// Fix: Creates the main application component, orchestrating UI, state, and AI features.
import React, {
  useState,
  useCallback,
  useMemo,
  ComponentType,
  useRef,
  useEffect,
} from 'react';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop';

// Components
import ImageUploader from './components/ImageUploader';
import Loader from './components/Loader';
import ZoomControls from './components/ZoomControls';
import FilterControl from './components/FilterControl';

// Icons
import MagicEditorIcon from './components/icons/MagicEditorIcon';
import FilterIcon from './components/icons/FilterIcon';
import CropIcon from './components/icons/CropIcon';
import PhotoCombinerIcon from './components/icons/PhotoCombinerIcon';
import BackgroundRemoverIcon from './components/icons/BackgroundRemoverIcon';
import BackgroundChangerIcon from './components/icons/BackgroundChangerIcon';
import ClothChangerIcon from './components/icons/ClothChangerIcon';
import ViewChangerIcon from './components/icons/ViewChangerIcon';
import BrightnessIcon from './components/icons/BrightnessIcon';
import ContrastIcon from './components/icons/ContrastIcon';
import SepiaIcon from './components/icons/SepiaIcon';
import GrayscaleIcon from './components/icons/GrayscaleIcon';
import InvertIcon from './components/icons/InvertIcon';
import ExposureIcon from './components/icons/ExposureIcon';
import HighlightsIcon from './components/icons/HighlightsIcon';
import ShadowsHighlightsIcon from './components/icons/ShadowsHighlightsIcon';
import UndoIcon from './components/icons/UndoIcon';
import RedoIcon from './components/icons/RedoIcon';
import GoogleGIcon from './components/icons/GoogleGIcon';
import XCircleIcon from './components/icons/XCircleIcon';
import DownloadIcon from './components/icons/DownloadIcon';

// Hooks, Services, Types, Constants
import { useHistory } from './hooks/useHistory';
import { editImage } from './services/geminiService';
import { ImageData, ImageFilters, ImageState, AiTool } from './types';
import { EDIT_MODES, INITIAL_FILTERS } from './constants';

type ActiveTab = 'ai' | 'filters' | 'crop';

// Icon Mappings outside component for performance
const aiToolIcons: { [key: string]: ComponentType<{ className?: string }> } = {
  'magic-editor': MagicEditorIcon,
  'photo-combiner': PhotoCombinerIcon,
  'background-remover': BackgroundRemoverIcon,
  'background-changer': BackgroundChangerIcon,
  'cloth-changer': ClothChangerIcon,
  'view-changer': ViewChangerIcon,
};

const filterControls = [
  {
    id: 'brightness',
    name: 'Brightness',
    icon: BrightnessIcon,
    min: 0,
    max: 200,
    step: 1,
    unit: '%',
  },
  {
    id: 'contrast',
    name: 'Contrast',
    icon: ContrastIcon,
    min: 0,
    max: 200,
    step: 1,
    unit: '%',
  },
  {
    id: 'exposure',
    name: 'Exposure',
    icon: ExposureIcon,
    min: 0,
    max: 200,
    step: 1,
    unit: '%',
  },
  {
    id: 'highlights',
    name: 'Highlights',
    icon: HighlightsIcon,
    min: -100,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    id: 'shadows',
    name: 'Shadows',
    icon: ShadowsHighlightsIcon,
    min: -100,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    id: 'sepia',
    name: 'Sepia',
    icon: SepiaIcon,
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    id: 'grayscale',
    name: 'Grayscale',
    icon: GrayscaleIcon,
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    id: 'invert',
    name: 'Invert',
    icon: InvertIcon,
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
];

const ASPECT_RATIOS = [
    { name: 'Free', value: undefined },
    { name: '1:1', value: 1 / 1 },
    { name: '4:3', value: 4 / 3 },
    { name: '16:9', value: 16 / 9 },
    { name: '3:2', value: 3 / 2 },
    { name: '5:4', value: 5 / 4 },
    { name: '3:4', value: 3 / 4 },
    { name: '9:16', value: 9 / 16 },
];


const App: React.FC = () => {
  const {
    state: imageState,
    setState: setImageState,
    resetState: resetImageState,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory<ImageState>({
    imageData: null,
    filters: INITIAL_FILTERS,
  });
  const { imageData, filters } = imageState;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('ai');
  const [prompt, setPrompt] = useState('');
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>();
  const [selectedAiTool, setSelectedAiTool] = useState<AiTool | null>(null);
  const [secondaryImage, setSecondaryImage] = useState<ImageData | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const secondaryImageInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isUndo = (isMac ? event.metaKey : event.ctrlKey) && event.key === 'z' && !event.shiftKey;
      const isRedo = (isMac ? event.metaKey : event.ctrlKey) && (event.key === 'y' || (event.key === 'z' && event.shiftKey));

      if (isLoading) return;

      if (isUndo) {
        event.preventDefault();
        if (canUndo) {
          undo();
        }
      } else if (isRedo) {
        event.preventDefault();
        if (canRedo) {
          redo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [undo, redo, canUndo, canRedo, isLoading]);

  const getBakedImage = useCallback(async (): Promise<ImageData> => {
    if (!imageData) throw new Error("No image data available");

    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error("Canvas context not available"));

            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            
            const cssFilterString = `
                brightness(${filters.brightness * (filters.exposure / 100)}%) 
                contrast(${filters.contrast}%) 
                sepia(${filters.sepia}%) 
                grayscale(${filters.grayscale}%) 
                invert(${filters.invert}%)
            `;
            ctx.filter = cssFilterString.trim();
            ctx.drawImage(image, 0, 0);

            // Apply highlights
            if (filters.highlights !== 0) {
                ctx.globalCompositeOperation = filters.highlights > 0 ? 'color-dodge' : 'color-burn';
                ctx.fillStyle = `rgba(${filters.highlights > 0 ? '255,255,255' : '0,0,0'}, ${Math.abs(filters.highlights) / 100})`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // Apply shadows
            if (filters.shadows !== 0) {
                ctx.globalCompositeOperation = filters.shadows > 0 ? 'screen' : 'multiply';
                ctx.fillStyle = `rgba(${filters.shadows > 0 ? '255,255,255' : '0,0,0'}, ${Math.abs(filters.shadows) / 100})`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            
            canvas.toBlob((blob) => {
                if (!blob) return reject(new Error("Canvas to Blob conversion failed"));
                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = (reader.result as string).split(',')[1];
                    resolve({ base64, mimeType: 'image/png' }); // Always save as PNG to preserve quality
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }, 'image/png');
        };
        image.onerror = reject;
        image.src = `data:${imageData.mimeType};base64,${imageData.base64}`;
    });
}, [imageData, filters]);

  // Handlers
  const handleImageUpload = useCallback(
    (newImageData: ImageData) => {
      resetImageState({
        imageData: newImageData,
        filters: INITIAL_FILTERS,
      });
      setZoom(1);
      setError(null);
      setActiveTab('ai');
      setSecondaryImage(null);
      setSelectedAiTool(null);
      setPrompt('');
    },
    [resetImageState]
  );

  const handlePromptBasedSubmit = useCallback(
    async (finalPrompt: string) => {
      if (!imageData) return;

      const imagesToProcess: ImageData[] = [];
      const baseImage = await getBakedImage();
      imagesToProcess.push(baseImage);

      if (selectedAiTool?.id === 'photo-combiner') {
        if (!secondaryImage) {
          setError("Please upload a second image for the combiner tool.");
          setTimeout(() => setError(null), 5000);
          return;
        }
        imagesToProcess.push(secondaryImage);
      }

      setIsLoading(true);
      setError(null);
      try {
        const newImageData = await editImage(imagesToProcess, finalPrompt);
        setImageState({ imageData: newImageData, filters: INITIAL_FILTERS });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred.'
        );
        setTimeout(() => setError(null), 5000);
      } finally {
        setIsLoading(false);
      }
    },
    [imageData, getBakedImage, setImageState, selectedAiTool, secondaryImage]
  );
  
  const handleAiToolSelect = useCallback((tool: AiTool) => {
    setSelectedAiTool(tool);
    setPrompt(tool.defaultPrompt);
    if (tool.id !== 'photo-combiner') {
      setSecondaryImage(null);
    }
  }, []);

  const handleCustomPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAiTool) {
      setError("Please select an AI tool first.");
      setTimeout(() => setError(null), 5000);
      return;
    }
    if (prompt.trim()) {
      handlePromptBasedSubmit(prompt.trim());
    }
  };

  const handleFilterChange = useCallback(
    (filterName: keyof ImageFilters, value: number) => {
      setImageState(
        { ...imageState, filters: { ...filters, [filterName]: value } },
        true
      );
    },
    [imageState, filters, setImageState]
  );

  const handleFilterChangeEnd = useCallback(() => {
    setImageState({ ...imageState, filters: { ...filters } });
  }, [imageState, filters, setImageState]);

  const handleResetFilter = useCallback(
    (filterName: keyof ImageFilters) => {
      setImageState({
        ...imageState,
        filters: { ...filters, [filterName]: INITIAL_FILTERS[filterName] },
      });
    },
    [imageState, filters, setImageState]
  );
  
  const handleSecondaryImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
       if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
            const base64 = reader.result.split(',')[1];
            setSecondaryImage({ base64, mimeType: file.type });
            }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleApplyCrop = useCallback(() => {
    if (!completedCrop || !imgRef.current) return;
    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );
    
    canvas.toBlob((blob) => {
        if (!blob) return;
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1];
            setImageState({ imageData: { base64, mimeType: blob.type }, filters: INITIAL_FILTERS });
        };
        reader.readAsDataURL(blob);
    }, imageData?.mimeType);

  }, [completedCrop, imageData, setImageState]);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.1, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.1));
  const handleResetZoom = () => setZoom(1);

  const handleDownload = useCallback(async () => {
    if (!imageData) return;
    try {
      const finalImageData = await getBakedImage();
      const link = document.createElement('a');
      link.href = `data:${finalImageData.mimeType};base64,${finalImageData.base64}`;
      link.download = 'google-ai-editor-result.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to download image:", err);
      setError("Failed to prepare image for download.");
      setTimeout(() => setError(null), 5000);
    }
  }, [imageData, getBakedImage]);


  const imageStyle = useMemo(
    () => ({
      transform: `scale(${zoom})`,
      filter: `
            brightness(${filters.brightness * (filters.exposure / 100)}%) 
            contrast(${filters.contrast}%) 
            sepia(${filters.sepia}%) 
            grayscale(${filters.grayscale}%) 
            invert(${filters.invert}%)
        `,
    }),
    [zoom, filters]
  );

  const highlightStyle = useMemo((): React.CSSProperties => {
      const value = filters.highlights;
      if (value === 0) return { display: 'none' };
      return {
          backgroundColor: value > 0 ? 'white' : 'black',
          mixBlendMode: value > 0 ? 'color-dodge' : 'color-burn',
          opacity: Math.abs(value) / 100,
      };
  }, [filters.highlights]);

  const shadowStyle = useMemo((): React.CSSProperties => {
    const value = filters.shadows;
    if (value === 0) return { display: 'none' };
    return {
        backgroundColor: value > 0 ? 'white' : 'black',
        mixBlendMode: value > 0 ? 'screen' : 'multiply',
        opacity: Math.abs(value) / 100,
    };
}, [filters.shadows]);

  // Render logic
  const TabButton = ({
    tab,
    icon: Icon,
    label,
  }: {
    tab: ActiveTab;
    icon: ComponentType<{ className?: string }>;
    label: string;
  }) => (
    <button
      onClick={() => {
        setActiveTab(tab);
        if(tab === 'crop' && imgRef.current) {
            const { naturalWidth, naturalHeight } = imgRef.current;
            const newCrop = centerCrop(
                makeAspectCrop({ unit: '%', width: 90 }, aspect || naturalWidth / naturalHeight, naturalWidth, naturalHeight),
                naturalWidth,
                naturalHeight
            );
            setCrop(newCrop);
        }
      }}
      className={`flex-1 p-3 flex flex-col items-center justify-center text-xs transition-colors ${
        activeTab === tab
          ? 'bg-gray-700 text-blue-400'
          : 'text-gray-400 hover:bg-gray-700/50'
      }`}
    >
      <Icon className="w-6 h-6 mb-1" />
      {label}
    </button>
  );

  const renderSidebarContent = () => {
    if (!imageData)
      return (
        <div className="p-4 text-center text-gray-400">
          <p>Upload an image to start editing!</p>
        </div>
      );

    switch (activeTab) {
      case 'ai':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <MagicEditorIcon className="w-5 h-5 mr-2" />
              AI Magic Tools
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {EDIT_MODES.map((mode) => {
                const Icon = aiToolIcons[mode.id];
                const isSelected = selectedAiTool?.id === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => handleAiToolSelect(mode)}
                    disabled={isLoading}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all text-center border-2 ${
                      isSelected
                        ? 'bg-blue-600/30 border-blue-500'
                        : 'bg-gray-700 border-transparent hover:bg-gray-600'
                    } disabled:bg-gray-700/50 disabled:cursor-not-allowed`}
                  >
                    <Icon className={`w-8 h-8 mb-2 ${isSelected ? 'text-blue-300' : 'text-gray-300'}`} />
                    <span className={`text-xs ${isSelected ? 'text-white' : 'text-gray-200'}`}>{mode.name}</span>
                  </button>
                );
              })}
            </div>

            {selectedAiTool?.id === 'photo-combiner' && (
              <div className="mb-4">
                 <h4 className="text-sm font-semibold text-gray-300 mb-2">Second Image</h4>
                 {secondaryImage ? (
                   <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                     <img src={`data:${secondaryImage.mimeType};base64,${secondaryImage.base64}`} className="w-full h-full object-cover"/>
                     <button onClick={() => setSecondaryImage(null)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 hover:bg-black/80 transition-colors">
                       <XCircleIcon className="w-5 h-5" />
                     </button>
                   </div>
                 ) : (
                   <>
                    <input ref={secondaryImageInputRef} type="file" className="hidden" onChange={handleSecondaryImageUpload} accept="image/*"/>
                    <button onClick={() => secondaryImageInputRef.current?.click()} className="w-full p-4 border-2 border-dashed border-gray-600 hover:border-gray-500 rounded-lg text-gray-400 text-sm transition-colors">
                        Click to upload
                    </button>
                   </>
                 )}
              </div>
            )}
            
            <form onSubmit={handleCustomPromptSubmit} className="space-y-3">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Select a tool or describe your edit..."
                className="w-full h-24 p-2 bg-gray-900 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                disabled={!selectedAiTool}
              />
              <button
                type="submit"
                disabled={isLoading || !selectedAiTool}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800/50 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors"
              >
                Apply AI Edit
              </button>
            </form>
          </div>
        );
      case 'filters':
        return (
          <div className="p-2">
            <h3 className="text-lg font-semibold text-white mb-2 px-2">
              Adjust Filters
            </h3>
            {filterControls.map((fc) => (
              <FilterControl
                key={fc.id}
                icon={fc.icon}
                name={fc.name}
                value={filters[fc.id as keyof ImageFilters]}
                onChange={(v) =>
                  handleFilterChange(fc.id as keyof ImageFilters, v)
                }
                onChangeEnd={handleFilterChangeEnd}
                onReset={() =>
                  handleResetFilter(fc.id as keyof ImageFilters)
                }
                min={fc.min}
                max={fc.max}
                step={fc.step}
                unit={fc.unit}
              />
            ))}
          </div>
        );
      case 'crop':
        return (
            <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Aspect Ratio</h3>
                <div className="grid grid-cols-4 gap-2 mb-4">
                    {ASPECT_RATIOS.map(ratio => (
                        <button key={ratio.name} onClick={() => setAspect(ratio.value)} className={`p-2 rounded-md text-sm ${aspect === ratio.value ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
                            {ratio.name}
                        </button>
                    ))}
                </div>
                <button onClick={handleApplyCrop} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">Apply Crop</button>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 flex flex-col lg:flex-row h-screen font-sans antialiased">
      {isLoading && <Loader />}

      <aside className="basis-2/5 lg:basis-auto w-full lg:w-96 bg-gray-800 flex flex-col shadow-2xl flex-shrink-0 order-last lg:order-first min-h-0">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-center flex items-center justify-center">
            <GoogleGIcon className="w-8 h-8 mr-2" />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              GOOGLE AI EDITOR
            </span>
          </h1>
        </div>
        {imageData && (
          <div className="flex border-b border-gray-700">
            <TabButton tab="ai" icon={MagicEditorIcon} label="AI Edits" />
            <TabButton tab="filters" icon={FilterIcon} label="Filters" />
            <TabButton tab="crop" icon={CropIcon} label="Crop" />
          </div>
        )}
        <div className="flex-grow overflow-y-auto">{renderSidebarContent()}</div>
        {imageData && (
          <div className="p-2 border-t border-gray-700 flex items-center justify-center space-x-2">
            <button
              onClick={undo}
              disabled={!canUndo || isLoading}
              className="p-3 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-700 rounded-md transition-colors"
            >
              <UndoIcon className="w-6 h-6" />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo || isLoading}
              className="p-3 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-700 rounded-md transition-colors"
            >
              <RedoIcon className="w-6 h-6" />
            </button>
          </div>
        )}
      </aside>

      <main className="basis-3/5 lg:basis-auto flex-1 flex items-center justify-center p-4 lg:p-8 overflow-hidden bg-black/20">
        {error && (
          <div className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-md shadow-lg z-50 animate-pulse">
            {error}
          </div>
        )}
        {imageData ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className="relative transition-transform duration-200"
              style={{ transform: `scale(${zoom})` }}
            >
              <div style={{ filter: imageStyle.filter }}>
                {activeTab === 'crop' ? (
                     <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                     >
                        <img
                            ref={imgRef}
                            src={`data:${imageData.mimeType};base64,${imageData.base64}`}
                            alt="user content"
                            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                        />
                     </ReactCrop>
                ) : (
                    <img
                        ref={imgRef}
                        src={`data:${imageData.mimeType};base64,${imageData.base64}`}
                        alt="user content"
                        className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                    />
                )}
              </div>
              <div className="absolute inset-0 pointer-events-none" style={highlightStyle}></div>
              <div className="absolute inset-0 pointer-events-none" style={shadowStyle}></div>
            </div>
            <button
              onClick={handleDownload}
              className="absolute top-4 right-4 bg-gray-800 text-white rounded-lg p-3 hover:bg-gray-700 transition-colors shadow-lg"
              aria-label="Download image"
            >
              <DownloadIcon className="w-6 h-6" />
            </button>
            <ZoomControls
              zoom={zoom}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onResetZoom={handleResetZoom}
            />
          </div>
        ) : (
          <ImageUploader onImageUpload={handleImageUpload} />
        )}
      </main>
    </div>
  );
};

export default App;