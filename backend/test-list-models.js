require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

async function listModels() {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
    try {
        const response = await ai.models.list();
        for (const model of response.models) {
            console.log(model.name);
        }
    } catch (err) {
        console.error("Error listing models:", err);
    }
}
listModels();
