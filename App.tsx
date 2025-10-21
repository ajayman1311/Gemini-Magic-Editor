
import React, { useState, useMemo, useCallback } from 'react';
import { Tool, ImageData, ToolConfig } from './types';
import { TOOLS } from './constants';
import { editImage } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import Loader from './components/Loader';
import SparklesIcon from './components/icons/SparklesIcon';

const Header: React.FC = () => (
  <header className="bg-gray-900/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-20 border-b border-gray-700">
    <div className="container mx-auto px-6 py-4 flex items-center gap-4">
      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Gemini Magic Editor
      </div>
    </div>
  </header>
);

const Sidebar: React.FC<{ activeTool: Tool; onSelectTool: (tool: Tool) => void }> = ({ activeTool, onSelectTool }) => (
  <aside className="w-64 bg-gray-900/60 backdrop-blur-md border-r border-gray-800 p-4 flex flex-col gap-2 fixed top-[73px] bottom-0">
    {TOOLS.map((tool) => {
      const isActive = activeTool === tool.id;
      const Icon = tool.icon;
      return (
        <button
          key={tool.id}
          onClick={() => onSelectTool(tool.id)}
          className={`flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
            isActive ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-gray-700/50 text-gray-300'
          }`}
        >
          <Icon className="w-6 h-6 flex-shrink-0" />
          <span className="font-medium">{tool.name}</span>
        </button>
      );
    })}
  </aside>
);

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.BACKGROUND_REMOVER);
  const [images, setImages] = useState<ImageData[]>([]);
  const [prompt, setPrompt] = useState('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeToolConfig = useMemo<ToolConfig>(
    () => TOOLS.find((tool) => tool.id === activeTool)!,
    [activeTool]
  );
    
  const handleToolSelect = useCallback((tool: Tool) => {
    setActiveTool(tool);
    setImages([]);
    setPrompt('');
    setResultImage(null);
    setError(null);
  }, []);

  const handleImageUpload = useCallback((imageData: ImageData | null) => {
    if (imageData) {
        setImages(prev => {
            const existing = prev.find(img => img.id === imageData.id);
            if (existing) {
                return prev.map(img => img.id === imageData.id ? imageData : img);
            }
            return [...prev, imageData];
        });
    } else {
        setImages(prev => prev.filter(img => img.id !== imageData?.id));
    }
  }, []);

  const canSubmit = useMemo(() => {
    return images.length === activeToolConfig.imageInputs;
  }, [images, activeToolConfig]);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const fullPrompt = `${activeToolConfig.promptPrefix} ${prompt}`.trim();
      const result = await editImage(images, fullPrompt);
      setResultImage(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <div className="flex pt-[73px]">
        <Sidebar activeTool={activeTool} onSelectTool={handleToolSelect} />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">{activeToolConfig.name}</h1>
                <p className="text-gray-400 mt-1">{activeToolConfig.description}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Panel: Inputs */}
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.from({ length: activeToolConfig.imageInputs }).map((_, index) => (
                            <ImageUploader 
                                key={`${activeTool}-${index}`} 
                                id={`image-${index}`} 
                                onImageUpload={handleImageUpload}
                                title={activeToolConfig.imageInputs > 1 ? `Image ${index + 1}` : 'Source Image'}
                            />
                        ))}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="prompt" className="font-semibold text-gray-300">{activeToolConfig.promptLabel}</label>
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder={activeToolConfig.promptPlaceholder}
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 min-h-[80px]"
                        />
                    </div>
                    
                    <button
                        onClick={handleSubmit}
                        disabled={!canSubmit || isLoading}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                         {isLoading ? 'Processing...' : 'Generate'}
                    </button>
                </div>

                {/* Right Panel: Result */}
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex flex-col items-center justify-center min-h-[400px] relative">
                    {isLoading && <Loader />}
                    {error && <div className="text-red-400 text-center"><p className="font-semibold">An Error Occurred</p><p>{error}</p></div>}
                    {resultImage && !isLoading && !error && (
                        <>
                            <h2 className="text-2xl font-bold mb-4 self-start">Result</h2>
                            <img src={resultImage} alt="Edited result" className="max-w-full max-h-[500px] object-contain rounded-lg" />
                            <a 
                                href={resultImage} 
                                download="edited-image.png" 
                                className="mt-4 bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Download Image
                            </a>
                        </>
                    )}
                    {!resultImage && !isLoading && !error && (
                        <div className="text-center text-gray-500">
                            {/* FIX: SparklesIcon was used without being imported. */}
                            <SparklesIcon className="w-16 h-16 mx-auto mb-4"/>
                            <h3 className="text-xl font-semibold">Your masterpiece will appear here</h3>
                            <p>Upload image(s) and provide instructions to get started.</p>
                        </div>
                    )}
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
