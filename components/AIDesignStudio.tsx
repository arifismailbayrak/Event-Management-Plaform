import React, { useState } from 'react';
import { X, Sparkles, Download, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface AIDesignStudioProps {
  initialPrompt?: string;
  onClose: () => void;
}

export const AIDesignStudio: React.FC<AIDesignStudioProps> = ({ initialPrompt = '', onClose }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // 1. Check for API Key selection (Required for Veo/Imagen models)
      // @ts-ignore
      if (window.aistudio && !await window.aistudio.hasSelectedApiKey()) {
         // @ts-ignore
         await window.aistudio.openSelectKey();
      }

      // 2. Initialize Client
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // 3. Call API
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            imageSize: imageSize,
            aspectRatio: "16:9" // Defaulting to landscape for event concepts
          }
        },
      });

      // 4. Extract Image
      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64String = part.inlineData.data;
            setGeneratedImage(`data:image/png;base64,${base64String}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        throw new Error("No image generated. The model might have returned only text.");
      }

    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
         setError("API Key session expired. Please try again to re-select your key.");
         // Reset key selection state if possible, though we rely on re-clicking generate
      } else {
         setError(err.message || "Failed to generate image. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row h-[80vh] md:h-[600px]">
        
        {/* Controls Sidebar */}
        <div className="w-full md:w-1/3 bg-slate-50 border-r border-slate-200 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              <Sparkles className="text-indigo-600" size={20} />
              AI Design Studio
            </h2>
            <button onClick={onClose} className="md:hidden p-1 hover:bg-slate-200 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6 flex-1 overflow-y-auto">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the event concept, venue setup, or marketing material you need..."
                className="w-full h-32 p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm resize-none bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Quality / Size</label>
              <div className="grid grid-cols-3 gap-2">
                {(['1K', '2K', '4K'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setImageSize(size)}
                    className={`py-2 px-3 rounded-lg text-sm font-semibold border transition-all ${
                      imageSize === size
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Generate Concept
                </>
              )}
            </button>
            {/* Disclaimer for Billing */}
            <p className="text-[10px] text-slate-400 text-center mt-3">
               Requires a paid Google Cloud project with Gemini API enabled.
            </p>
          </div>
        </div>

        {/* Preview Area */}
        <div className="w-full md:w-2/3 bg-slate-900 flex items-center justify-center relative p-8">
           <button onClick={onClose} className="hidden md:block absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 bg-black/20 rounded-full hover:bg-black/40">
              <X size={20} />
           </button>

           {generatedImage ? (
             <div className="relative group w-full h-full flex items-center justify-center">
                <img 
                  src={generatedImage} 
                  alt="Generated Concept" 
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
                />
                <a 
                  href={generatedImage} 
                  download={`offsiteflow-concept-${Date.now()}.png`}
                  className="absolute bottom-4 right-4 bg-white text-slate-900 px-4 py-2 rounded-lg font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 hover:bg-indigo-50"
                >
                  <Download size={16} /> Download
                </a>
             </div>
           ) : (
             <div className="text-center text-slate-500 max-w-sm">
                {error ? (
                  <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 flex flex-col items-center gap-2">
                     <AlertCircle size={24} />
                     <p>{error}</p>
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-600">
                       <ImageIcon size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-slate-300 mb-2">Visualize your event</h3>
                    <p className="text-sm">
                      Enter a prompt to generate high-quality concept art for venues, catering setups, or marketing materials.
                    </p>
                  </>
                )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
