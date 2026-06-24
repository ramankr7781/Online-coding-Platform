require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

async function testReview() {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
        const modelsToTry = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-8b'];
        let response = null;
        let lastError = null;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Trying ${modelName}...`);
                response = await ai.models.generateContent({
                    model: modelName,
                    contents: `Review this code: print("Hello")`
                });
                console.log(`Success with ${modelName}`);
                break;
            } catch (err) {
                lastError = err;
                console.log(`Model ${modelName} failed with message: ${err.message}, status: ${err.status}`);
                const isRateLimit = err.status === 503 || err.status === 429 || err.message?.includes('503') || err.message?.includes('429');
                if (!isRateLimit) {
                    console.log(`NOT a rate limit, breaking loop.`);
                    break;
                }
            }
        }

        if (!response) {
            throw lastError;
        }

        console.log("Got response:", response.text);
    } catch (err) {
        console.error("CATCH BLOCK - Error generating review");
        const isRateLimit = err.status === 503 || err.status === 429 || err.message?.includes('503') || err.message?.includes('429');
        console.log("Is Rate Limit:", isRateLimit);
        if (isRateLimit) {
            console.log("Would return 503: All AI models high demand");
        } else {
            console.log("Would return 500: Error generating AI code review");
            console.log("Actual error:", err);
        }
    }
}

testReview();
