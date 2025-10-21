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
import UndoIcon from './components/icons/UndoIcon';
import RedoIcon from './components/icons/RedoIcon';
import NewLogoIcon from './components/icons/NewLogoIcon';
import XCircleIcon from './components/icons/XCircleIcon';
import DownloadIcon from './components/icons/DownloadIcon';
import SlidersIcon from './components/icons/SlidersIcon';
import VintageIcon from './components/icons/VintageIcon';
import VividIcon from './components/icons/VividIcon';
import WestIcon from './components/icons/WestIcon';
import PalmaIcon from './components/icons/PalmaIcon';
import MetroIcon from './components/icons/MetroIcon';
import AlpacaIcon from './components/icons/AlpacaIcon';
import PlayaIcon from './components/icons/PlayaIcon';
import DesertIcon from './components/icons/DesertIcon';
import CalyIcon from './components/icons/CalyIcon';
import HoneyIcon from './components/icons/HoneyIcon';
import IslaIcon from './components/icons/IslaIcon';
import BwFilmIcon from './components/icons/BwFilmIcon';
import SkyIcon from './components/icons/SkyIcon';
import WarmthIcon from './components/icons/WarmthIcon';
import TintIcon from './components/icons/TintIcon';
import VignetteIcon from './components/icons/VignetteIcon';
import WhitePointIcon from './components/icons/WhitePointIcon';
import BlackPointIcon from './components/icons/BlackPointIcon';
import PopIcon from './components/icons/PopIcon';
import SharpenIcon from './components/icons/SharpenIcon';
import DenoiseIcon from './components/icons/DenoiseIcon';
import SkinToneIcon from './components/icons/SkinToneIcon';
import BlueToneIcon from './components/icons/BlueToneIcon';
import UploadIcon from './components/icons/UploadIcon';
import RotateLeftIcon from './components/icons/RotateLeftIcon';
import RotateRightIcon from './components/icons/RotateRightIcon';
import StraightenIcon from './components/icons/StraightenIcon';


// Hooks, Services, Types, Constants
import { useHistory } from './hooks/useHistory';
import { editImage } from './services/geminiService';
import { ImageData, ImageFilters, ImageState, AiTool, ApiFilterAction, ApiAdjustmentAction } from './types';
import { EDIT_MODES, INITIAL_FILTERS, API_FILTERS, API_ADJUSTMENTS } from './constants';

type ActiveTab = 'ai' | 'edits' | 'filters' | 'crop';

// Icon Mappings outside component for performance
const aiToolIcons: { [key: string]: ComponentType<{ className?: string }> } = {
  'magic-editor': MagicEditorIcon,
  'photo-combiner': PhotoCombinerIcon,
  'background-remover': BackgroundRemoverIcon,
  'background-changer': BackgroundChangerIcon,
  'cloth-changer': ClothChangerIcon,
  'view-changer': ViewChangerIcon,
};

const apiFilterIcons: { [key: string]: ComponentType<{ className?: string }> } = {
  'vivid': VividIcon,
  'west': WestIcon,
  'palma': PalmaIcon,
  'metro': MetroIcon,
  'alpaca': AlpacaIcon,
  'playa': PlayaIcon,
  'desert': DesertIcon,
  'caly': CalyIcon,
  'honey': HoneyIcon,
  'isla': IslaIcon,
  'bw-film': BwFilmIcon,
  'sky': SkyIcon,
};

const apiAdjustmentIcons: { [key: string]: ComponentType<{ className?: string }> } = {
    'pop': PopIcon,
    'sharpen': SharpenIcon,
    'denoise': DenoiseIcon,
    'skin-tone': SkinToneIcon,
    'blue-tone': BlueToneIcon,
};

const adjustmentControls = [
  { id: 'brightness', name: 'Brightness', icon: BrightnessIcon, min: 0, max: 200, step: 1, unit: '%'},
  { id: 'contrast', name: 'Contrast', icon: ContrastIcon, min: 0, max: 200, step: 1, unit: '%'},
  { id: 'saturation', name: 'Saturation', icon: VividIcon, min: 0, max: 200, step: 1, unit: '%'},
  { id: 'exposure', name: 'Exposure', icon: ExposureIcon, min: 0, max: 200, step: 1, unit: '%'},
  { id: 'warmth', name: 'Warmth', icon: WarmthIcon, min: -100, max: 100, step: 1, unit: ''},
  { id: 'tint', name: 'Tint', icon: TintIcon, min: -100, max: 100, step: 1, unit: ''},
  { id: 'whitePoint', name: 'White Point', icon: WhitePointIcon, min: -100, max: 100, step: 1, unit: ''},
  { id: 'blackPoint', name: 'Black Point', icon: BlackPointIcon, min: -100, max: 100, step: 1, unit: ''},
  { id: 'vignette', name: 'Vignette', icon: VignetteIcon, min: 0, max: 100, step: 1, unit: '%'},
];

const creativeFilterControls = [
   { id: 'sepia', name: 'Sepia', icon: SepiaIcon, min: 0, max: 100, step: 1, unit: '%'},
  { id: 'grayscale', name: 'Grayscale', icon: GrayscaleIcon, min: 0, max: 100, step: 1, unit: '%'},
  { id: 'invert', name: 'Invert', icon: InvertIcon, min: 0, max: 100, step: 1, unit: '%'},
  { id: 'vintage', name: 'Vintage', icon: VintageIcon, min: 0, max: 100, step: 1, unit: '%'},
  { id: 'west', name: 'West', icon: WestIcon, min: 0, max: 100, step: 1, unit: '%'},
  { id: 'palma', name: 'Palma', icon: PalmaIcon, min: 0, max: 100, step: 1, unit: '%'},
]

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
    rotation: 0,
    straightenAngle: 0,
  });
  const { imageData, filters, rotation, straightenAngle } = imageState;

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
  const [isTyping, setIsTyping] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const secondaryImageInputRef = useRef<HTMLInputElement>(null);
  const newImageInputRef = useRef<HTMLInputElement>(null);


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

  const getCssFilterString = useCallback((currentFilters: ImageFilters) => {
    return `
      brightness(${currentFilters.brightness * (currentFilters.exposure / 100)}%) 
      contrast(${currentFilters.contrast}%) 
      saturate(${currentFilters.saturation}%)
      sepia(${currentFilters.sepia}%) 
      grayscale(${currentFilters.grayscale}%) 
      invert(${currentFilters.invert}%)
      hue-rotate(${currentFilters.tint}deg)
      sepia(${currentFilters.vintage}%)
      brightness(${100 - currentFilters.vintage / 10}%)
      contrast(${100 + currentFilters.vintage / 10}%)
      sepia(${currentFilters.west / 2}%) brightness(${100 + currentFilters.west / 10}%)
      sepia(${currentFilters.palma / 3}%) contrast(${100 + currentFilters.palma / 5}%)
    `.trim();
  }, []);

  const getBakedImage = useCallback(async (
    sourceImageData: ImageData,
    sourceFilters: ImageFilters,
    sourceRotation: number,
    sourceStraighten: number,
  ): Promise<ImageData> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error("Canvas context not available"));

            const totalRotation = sourceRotation + sourceStraighten;
            const angleRad = totalRotation * Math.PI / 180;
            const sin = Math.sin(angleRad);
            const cos = Math.cos(angleRad);

            const w = image.naturalWidth;
            const h = image.naturalHeight;
            const newWidth = Math.abs(w * cos) + Math.abs(h * sin);
            const newHeight = Math.abs(w * sin) + Math.abs(h * cos);

            canvas.width = newWidth;
            canvas.height = newHeight;
            
            ctx.translate(newWidth / 2, newHeight / 2);
            ctx.rotate(angleRad);
            
            ctx.filter = getCssFilterString(sourceFilters);
            ctx.drawImage(image, -w / 2, -h / 2);
            ctx.filter = 'none';

            // Apply overlays after rotation and main filters
             if (sourceFilters.warmth !== 0) {
                const warmthColor = sourceFilters.warmth > 0 ? `rgba(255, 165, 0, ${Math.abs(sourceFilters.warmth) / 200})` : `rgba(0, 0, 255, ${Math.abs(sourceFilters.warmth) / 200})`;
                ctx.globalCompositeOperation = 'overlay';
                ctx.fillStyle = warmthColor;
                ctx.fillRect(-w/2, -h/2, w, h);
            }
            if (sourceFilters.whitePoint !== 0) {
                ctx.globalCompositeOperation = sourceFilters.whitePoint > 0 ? 'color-dodge' : 'color-burn';
                ctx.fillStyle = `rgba(${sourceFilters.whitePoint > 0 ? '255,255,255' : '0,0,0'}, ${Math.abs(sourceFilters.whitePoint) / 100})`;
                ctx.fillRect(-w/2, -h/2, w, h);
            }
            if (sourceFilters.blackPoint !== 0) {
                ctx.globalCompositeOperation = sourceFilters.blackPoint > 0 ? 'multiply' : 'screen';
                 ctx.fillStyle = `rgba(${sourceFilters.blackPoint > 0 ? '0,0,0' : '255,255,255'}, ${Math.abs(sourceFilters.blackPoint) / 100})`;
                ctx.fillRect(-w/2, -h/2, w, h);
            }
            
            canvas.toBlob((blob) => {
                if (!blob) return reject(new Error("Canvas to Blob conversion failed"));
                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = (reader.result as string).split(',')[1];
                    resolve({ base64, mimeType: 'image/png' });
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }, 'image/png');
        };
        image.onerror = reject;
        image.src = `data:${sourceImageData.mimeType};base64,${sourceImageData.base64}`;
    });
}, [getCssFilterString]);

  // Handlers
  const handleImageUpload = useCallback(
    (newImageData: ImageData) => {
      resetImageState({
        imageData: newImageData,
        filters: INITIAL_FILTERS,
        rotation: 0,
        straightenAngle: 0,
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
      const baseImage = await getBakedImage(imageData, filters, rotation, straightenAngle);
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
        setImageState({ imageData: newImageData, filters: INITIAL_FILTERS, rotation: 0, straightenAngle: 0 });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred.'
        );
        setTimeout(() => setError(null), 5000);
      } finally {
        setIsLoading(false);
      }
    },
    [imageData, filters, rotation, straightenAngle, getBakedImage, setImageState, selectedAiTool, secondaryImage]
  );
  
  const handleApiActionSubmit = useCallback(async (action: ApiFilterAction | ApiAdjustmentAction) => {
      if (!imageData) return;
      
      const baseImage = await getBakedImage(imageData, filters, rotation, straightenAngle);

      setIsLoading(true);
      setError(null);
      try {
        const newImageData = await editImage([baseImage], action.prompt);
        setImageState({ imageData: newImageData, filters: INITIAL_FILTERS, rotation: 0, straightenAngle: 0 });
      } catch (err) {
         setError(
          err instanceof Error ? err.message : 'An unknown error occurred.'
        );
        setTimeout(() => setError(null), 5000);
      } finally {
        setIsLoading(false);
      }
  }, [imageData, filters, rotation, straightenAngle, getBakedImage, setImageState]);

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
  
    const handleNewImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            const base64 = reader.result.split(',')[1];
            handleImageUpload({ base64, mimeType: file.type });
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleApplyCrop = useCallback(async () => {
    if (!completedCrop || !imageData) return;
    
    const bakedImage = await getBakedImage(imageData, INITIAL_FILTERS, rotation, straightenAngle);

    const image = new Image();
    image.onload = () => {
        const scaleX = image.naturalWidth / (imgRef.current?.width || image.naturalWidth);
        const scaleY = image.naturalHeight / (imgRef.current?.height || image.naturalHeight);

        const canvas = document.createElement('canvas');
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
                setImageState({ 
                    imageData: { base64, mimeType: blob.type }, 
                    filters, // Keep filters
                    rotation: 0,
                    straightenAngle: 0,
                });
            };
            reader.readAsDataURL(blob);
        }, 'image/png');
    };
    image.src = `data:${bakedImage.mimeType};base64,${bakedImage.base64}`;

  }, [completedCrop, imageData, filters, rotation, straightenAngle, getBakedImage, setImageState]);

  const handleRotate = (direction: 'left' | 'right') => {
    const newRotation = (rotation + (direction === 'left' ? -90 : 90) + 360) % 360;
    setImageState({...imageState, rotation: newRotation });
  };
  
  const handleStraightenChange = (angle: number) => {
      setImageState({...imageState, straightenAngle: angle}, true);
  };
  
  const handleStraightenChangeEnd = () => {
      setImageState({...imageState}); // Commit to history
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.1, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.1));
  const handleResetZoom = () => setZoom(1);

  const handleDownload = useCallback(async () => {
    if (!imageData) return;
    try {
      const finalImageData = await getBakedImage(imageData, filters, rotation, straightenAngle);
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
  }, [imageData, filters, rotation, straightenAngle, getBakedImage]);

  const handleAspectChange = useCallback((newAspect: number | undefined) => {
    setAspect(newAspect);
    if (imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current;
      const newCrop = centerCrop(
        makeAspectCrop(
          {
            unit: '%',
            width: 90,
          },
          newAspect || naturalWidth / naturalHeight,
          naturalWidth,
          naturalHeight
        ),
        naturalWidth,
        naturalHeight
      );
      setCrop(newCrop);
    }
  }, []);

  const imageStyle = useMemo(
    () => ({
      transform: `scale(${zoom}) rotate(${rotation + straightenAngle}deg)`,
      filter: getCssFilterString(filters),
    }),
    [zoom, rotation, straightenAngle, filters, getCssFilterString]
  );

  const warmthStyle = useMemo((): React.CSSProperties => {
    const value = filters.warmth;
    if (value === 0) return { display: 'none' };
    const color = value > 0 ? `255, 165, 0` : `0, 0, 255`;
    return {
        backgroundColor: `rgba(${color}, ${Math.abs(value) / 300})`, // reduced opacity
        mixBlendMode: 'color',
    };
  }, [filters.warmth]);

  const whitePointStyle = useMemo((): React.CSSProperties => {
      const value = filters.whitePoint;
      if (value === 0) return { display: 'none' };
      return {
          backgroundColor: value > 0 ? 'white' : 'black',
          mixBlendMode: value > 0 ? 'color-dodge' : 'color-burn',
          opacity: Math.abs(value) / 100,
      };
  }, [filters.whitePoint]);

  const blackPointStyle = useMemo((): React.CSSProperties => {
    const value = filters.blackPoint;
    if (value === 0) return { display: 'none' };
    return {
        backgroundColor: value > 0 ? 'black' : 'white',
        mixBlendMode: value > 0 ? 'multiply' : 'screen',
        opacity: Math.abs(value) / 100,
    };
}, [filters.blackPoint]);

const vignetteStyle = useMemo((): React.CSSProperties => {
    const value = filters.vignette;
    if (value === 0) return { display: 'none' };
    return {
        boxShadow: `inset 0 0 ${value * 2}px ${value}px rgba(0,0,0,0.8)`,
    };
}, [filters.vignette]);

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
                <>
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
                        onFocus={() => setIsTyping(true)}
                        onBlur={() => setIsTyping(false)}
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
                </>
          </div>
        );
      case 'edits':
        return (
          <div className="p-2">
            <h3 className="text-lg font-semibold text-white mb-2 px-2">
              Manual Adjustments
            </h3>
            {adjustmentControls.map((fc) => (
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
            <h3 className="text-lg font-semibold text-white mb-2 px-2 mt-4">
              AI-Powered Adjustments
            </h3>
            <div className="grid grid-cols-3 gap-2 px-2">
              {API_ADJUSTMENTS.map((adj) => {
                 const Icon = apiAdjustmentIcons[adj.id];
                 return (
                   <button
                    key={adj.id}
                    onClick={() => handleApiActionSubmit(adj)}
                    disabled={isLoading}
                    className="flex flex-col items-center justify-center p-2 rounded-lg transition-all text-center bg-gray-700 hover:bg-gray-600 disabled:bg-gray-700/50 disabled:cursor-not-allowed"
                   >
                     <Icon className="w-7 h-7 mb-1 text-gray-300" />
                     <span className="text-xs text-gray-200">{adj.name}</span>
                   </button>
                 )
              })}
            </div>
          </div>
        );
      case 'filters':
        return (
          <div className="p-2">
            <h3 className="text-lg font-semibold text-white mb-2 px-2">
              Creative Adjustments
            </h3>
            {creativeFilterControls.map((fc) => (
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
             <h3 className="text-lg font-semibold text-white mb-2 px-2 mt-4">
              AI-Powered Styles
            </h3>
            <div className="grid grid-cols-3 gap-2 px-2">
              {API_FILTERS.map((filter) => {
                 const Icon = apiFilterIcons[filter.id];
                 return (
                   <button
                    key={filter.id}
                    onClick={() => handleApiActionSubmit(filter)}
                    disabled={isLoading}
                    className="flex flex-col items-center justify-center p-2 rounded-lg transition-all text-center bg-gray-700 hover:bg-gray-600 disabled:bg-gray-700/50 disabled:cursor-not-allowed"
                   >
                     <Icon className="w-7 h-7 mb-1 text-gray-300" />
                     <span className="text-xs text-gray-200">{filter.name}</span>
                   </button>
                 )
              })}
            </div>
          </div>
        );
      case 'crop':
        return (
            <div className="p-4 space-y-4">
                 <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Rotate</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => handleRotate('left')} className="flex items-center justify-center space-x-2 p-2 rounded-md bg-gray-700 hover:bg-gray-600">
                            <RotateLeftIcon className="w-5 h-5" />
                            <span>Left</span>
                        </button>
                        <button onClick={() => handleRotate('right')} className="flex items-center justify-center space-x-2 p-2 rounded-md bg-gray-700 hover:bg-gray-600">
                            <RotateRightIcon className="w-5 h-5" />
                            <span>Right</span>
                        </button>
                    </div>
                </div>
                <div>
                     <FilterControl
                        icon={StraightenIcon}
                        name="Straighten"
                        value={straightenAngle}
                        onChange={handleStraightenChange}
                        onChangeEnd={handleStraightenChangeEnd}
                        onReset={() => setImageState({...imageState, straightenAngle: 0})}
                        min={-45}
                        max={45}
                        step={0.1}
                        unit="°"
                    />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Aspect Ratio</h3>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        {ASPECT_RATIOS.map(ratio => (
                            <button key={ratio.name} onClick={() => handleAspectChange(ratio.value)} className={`p-2 rounded-md text-sm ${aspect === ratio.value ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
                                {ratio.name}
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={handleApplyCrop} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800/50 text-white font-bold py-2 px-4 rounded-md transition-colors">Apply Crop</button>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 flex flex-col lg:flex-row h-screen font-sans antialiased">
      {isLoading && <Loader />}
      <input ref={newImageInputRef} type="file" className="hidden" onChange={handleNewImageSelect} accept="image/*" />

      <aside className="basis-2/5 lg:basis-2/5 xl:basis-auto w-full lg:w-96 bg-gray-800 flex flex-col shadow-2xl flex-shrink-0 order-last lg:order-first min-h-0">
        <div className={`p-2 border-b border-gray-700 ${isTyping ? 'hidden lg:block' : ''}`}>
          <div className="flex items-center justify-center space-x-2">
            <NewLogoIcon className="w-8 h-8 flex-shrink-0" />
            <div>
              <h1 className="text-2xl font-bold font-bitcount bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent leading-tight">
                AI Editor
              </h1>
              <p className="text-[10px] text-gray-400 -mt-1">Powered by Google</p>
            </div>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          {imageData && (
            <div className="flex border-b border-gray-700">
              <TabButton tab="ai" icon={MagicEditorIcon} label="AI Edits" />
              <TabButton tab="edits" icon={SlidersIcon} label="Adjust" />
              <TabButton tab="filters" icon={FilterIcon} label="Filters" />
              <TabButton tab="crop" icon={CropIcon} label="Crop & Rotate" />
            </div>
          )}
          {renderSidebarContent()}
        </div>
        {imageData && (
          <div className={`p-2 border-t border-gray-700 flex items-center justify-center space-x-2 ${isTyping ? 'hidden lg:flex' : ''}`}>
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

      <main className="basis-3/5 lg:basis-3/5 xl:basis-auto flex items-center justify-center p-4 lg:p-8 overflow-hidden bg-black/20">
        {error && (
          <div className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-md shadow-lg z-50 animate-pulse">
            {error}
          </div>
        )}
        {imageData ? (
          <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative" style={{ transform: `scale(${zoom})` }}>
                <div style={{ transform: `rotate(${rotation + straightenAngle}deg)` }}>
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
                              style={{filter: imageStyle.filter}}
                          />
                      </ReactCrop>
                  ) : (
                      <img
                          ref={imgRef}
                          src={`data:${imageData.mimeType};base64,${imageData.base64}`}
                          alt="user content"
                          className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                          style={{filter: imageStyle.filter}}
                      />
                  )}
              </div>
              <div className="absolute inset-0 pointer-events-none" style={{...warmthStyle, transform: `rotate(${rotation + straightenAngle}deg)`}}></div>
              <div className="absolute inset-0 pointer-events-none" style={{...whitePointStyle, transform: `rotate(${rotation + straightenAngle}deg)`}}></div>
              <div className="absolute inset-0 pointer-events-none" style={{...blackPointStyle, transform: `rotate(${rotation + straightenAngle}deg)`}}></div>
              <div className="absolute inset-0 pointer-events-none rounded-lg" style={{...vignetteStyle, transform: `rotate(${rotation + straightenAngle}deg)`}}></div>
            </div>
            <div className="absolute top-4 right-4 flex items-center space-x-2">
               <button
                  onClick={() => newImageInputRef.current?.click()}
                  className="bg-gray-800 text-white rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors shadow-lg flex items-center space-x-2"
                  aria-label="Upload new image"
                >
                  <UploadIcon className="w-5 h-5" />
                  <span className="text-sm font-semibold">Upload</span>
                </button>
                <button
                onClick={handleDownload}
                className="bg-gray-800 text-white rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors shadow-lg flex items-center space-x-2"
                aria-label="Download image"
                >
                <DownloadIcon className="w-5 h-5" />
                <span className="text-sm font-semibold">Download</span>
                </button>
            </div>
            <ZoomControls
              zoom={zoom}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onResetZoom={handleResetZoom}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-center">
            <div className="mb-8 text-center">
              <NewLogoIcon className="w-16 h-16 mx-auto" />
              <div className="flex items-baseline justify-center mt-4 space-x-3">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-bitcount">
                  AI Editor
                </h1>
                <p className="text-gray-400 text-lg">Powered by Google</p>
              </div>
            </div>
            <div className="w-full max-w-xl h-80">
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;