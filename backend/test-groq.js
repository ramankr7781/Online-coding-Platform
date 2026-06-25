require('dotenv').config();
const Groq = require('groq-sdk');

async function listGroqModels() {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    try {
        const models = await groq.models.list();
        for (const model of models.data) {
            console.log(model.id);
        }
    } catch (err) {
        console.error("Error listing Groq models:", err);
    }
}
listGroqModels();
