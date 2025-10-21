
import { GoogleGenAI, Modality } from "@google/genai";
import { ImageData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
): Promise<string> => {
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
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
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
