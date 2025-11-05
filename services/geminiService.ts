
import { GoogleGenAI, Modality } from "@google/genai";
import { ImageData } from '../types';

const model = 'gemini-2.5-flash-image';

const fileToGenerativePart = (imageData: ImageData) => {
    return {
        inlineData: {
            data: imageData.base64,
            mimeType: imageData.mimeType,
        },
    };
};

// Private function for making the API call
const makeApiCall = async (images: ImageData[], prompt: string): Promise<ImageData> => {
    if (!process.env.API_KEY) {
        return Promise.reject(new Error("API_KEY is not configured. Please set it up to use AI features."));
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const imageParts = images.map(fileToGenerativePart);
        const textPart = { text: prompt };

        const response = await ai.models.generateContent({
            model: model,
            contents: {
                parts: [...imageParts, textPart],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return {
                    base64: part.inlineData.data,
                    mimeType: part.inlineData.mimeType,
                };
            }
        }
        
        throw new Error("No image data found in the response.");
    } catch (error) {
        console.error("Error editing image with Gemini API:", error);
        if (error instanceof Error) {
            return Promise.reject(new Error(`Failed to edit image: ${error.message}`));
        }
        return Promise.reject(new Error("An unknown error occurred while editing the image."));
    }
};

export const editImage = async (
    images: ImageData[],
    prompt: string
): Promise<ImageData> => {
    return makeApiCall(images, prompt);
};

const processGreenScreenImage = (imageData: ImageData): Promise<ImageData> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error("Canvas context not available"));

            ctx.drawImage(image, 0, 0);

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;

            // Chroma key color (bright green) and tolerance
            const keyR = 0;
            const keyG = 255;
            const keyB = 0;
            const tolerance = 90;
            const toleranceSq = tolerance * tolerance;

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                const distanceSq = Math.pow(r - keyR, 2) + Math.pow(g - keyG, 2) + Math.pow(b - keyB, 2);

                if (distanceSq < toleranceSq) {
                    // This pixel is close to the key color, make it transparent
                    data[i + 3] = 0;
                }
            }

            ctx.putImageData(imgData, 0, 0);

            canvas.toBlob((blob) => {
                if (!blob) return reject(new Error("Canvas to Blob conversion failed"));
                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = (reader.result as string).split(',')[1];
                    resolve({ base64, mimeType: 'image/png' });
                };
                // FIX: Ensure promise is rejected with an Error object.
                reader.onerror = () => reject(new Error("FileReader failed during green screen processing"));
                reader.readAsDataURL(blob);
            }, 'image/png');
        };
        // FIX: Ensure promise is rejected with an Error object.
        image.onerror = () => reject(new Error("Image failed to load for green screen processing"));
        image.src = `data:${imageData.mimeType};base64,${imageData.base64}`;
    });
};

export const removeBackground = async (image: ImageData): Promise<ImageData> => {
    const prompt = 'Segment the main subject from the background. Output an image where the subject is preserved and the background is a solid, bright green color (RGB 0, 255, 0) that is not present in the subject. The subject must be fully opaque and unchanged, with clean, sharp edges.';
    
    const greenScreenImage = await makeApiCall([image], prompt);
    
    return processGreenScreenImage(greenScreenImage);
};
