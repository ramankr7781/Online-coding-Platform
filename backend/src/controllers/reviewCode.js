const { GoogleGenerativeAI } = require('@google/generative-ai');

const reviewCode = async (req, res) => {
    try {
        const { problemTitle, problemDescription, code, language } = req.body;

        if (!code) {
            return res.status(400).send("No code provided for review.");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: systemPrompt 
        });

        const result = await model.generateContent(`Here is my code:\n\n\`\`\`${language}\n${code}\n\`\`\``);

        res.status(200).send({ review: result.response.text() || "No review generated." });
    } catch (err) {
        console.error("Gemini API Error in reviewCode:", err);
        res.status(500).send("Error generating AI code review. Please try again later.");
    }
};

module.exports = reviewCode;
