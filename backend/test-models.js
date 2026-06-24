require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

async function testModels() {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
    const modelsToTry = [
        'gemini-2.5-flash', 
        'gemini-1.5-flash', 
        'gemini-1.5-flash-latest', 
        'gemini-1.5-flash-8b',
        'gemini-1.5-pro'
    ];

    for (const model of modelsToTry) {
        try {
            console.log(`Testing ${model}...`);
            await ai.models.generateContent({
                model: model,
                contents: 'hi'
            });
            console.log(`✅ Success: ${model}`);
        } catch (err) {
            console.log(`❌ Failed: ${model} -> ${err.message}`);
        }
    }
}
testModels();
