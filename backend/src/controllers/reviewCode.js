const { GoogleGenAI } = require('@google/genai');

const reviewCode = async (req, res) => {
    try {
        const { problemTitle, problemDescription, code, language } = req.body;

        if (!code) {
            return res.status(400).send("No code provided for review.");
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

        const systemPrompt = `You are an expert technical interviewer and AI code reviewer.
Analyze the user's provided code for the following problem:
[PROBLEM_TITLE]: ${problemTitle}
[PROBLEM_DESCRIPTION]: ${problemDescription}
[LANGUAGE]: ${language}

Please review the code and output a clean Markdown response with the following sections:
### ⏱️ Time Complexity
Analyze the worst-case time complexity. Be specific.

### 💾 Space Complexity
Analyze the worst-case space complexity (excluding the space required to return the result, but including call stacks for recursion).

### 🐛 Potential Bugs & Edge Cases
Identify any missing edge cases, memory leaks, out-of-bounds errors, or logical flaws.

### 💡 Suggestions for Better Approach
Suggest a more optimal or cleaner approach if one exists. Keep it concise but educational.

Do NOT rewrite their entire code unless absolutely necessary to show a small snippet of optimization. Focus strictly on reviewing.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${systemPrompt}\n\nHere is my code:\n\n\`\`\`${language}\n${code}\n\`\`\``
        });

        res.status(200).send({ review: response.text });
    } catch (err) {
        console.error("Gemini API Error in reviewCode:", err);
        
        if (err.status === 503 || err.message?.includes('503')) {
            return res.status(503).send("The AI model is currently experiencing high demand. Please try again in a few moments.");
        }
        
        res.status(500).send("Error generating AI code review. Please try again later.");
    }
};

module.exports = reviewCode;
