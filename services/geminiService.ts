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

export const editImage = async (
    images: ImageData[],
    prompt: string
// Fix: Changed return type to Promise<ImageData> for better type safety.
): Promise<ImageData> => {
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
                // Fix: Return an ImageData object instead of a data URL string.
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
