import { GoogleGenerativeAI } from '@google/generative-ai';

const getModel = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  const genAI = new GoogleGenerativeAI(key);
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
};

const cleanJson = (text) => text.replace(/^```json\s*/i, '').replace(/^```/i, '').replace(/```$/, '').trim();

export const generateLesson = async (day) => {
  const model = getModel();

  if (!model) {
    return {
      topic: `Day ${day}: Python Fundamentals`,
      explanation: 'Focus on variables, loops, and functions. Build confidence by writing small scripts.',
      codeExamples: ['for i in range(5):\n    print(i)', 'def greet(name):\n    return f"Hello {name}"'],
      suggestedVideos: ['Python for Beginners - Variables and Loops', 'Functions in Python Explained'],
      keyNotes: ['Practice daily for retention.', 'Write at least one function-based solution.']
    };
  }

  const prompt = `Create a concise programming bootcamp lesson for day ${day} of a 90-day curriculum.
Return valid JSON only with keys:
- topic (string)
- explanation (string)
- codeExamples (array of strings)
- suggestedVideos (array of strings)
- keyNotes (array of strings)`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return JSON.parse(cleanJson(text));
};

export const evaluateCode = async (userCode) => {
  const model = getModel();
  const evaluationPrompt = `You are a senior software engineer reviewing a junior developer's Python code.

Evaluate the code based on:

1. Correctness
2. Efficiency
3. Code quality
4. Suggestions for improvement
5. Score out of 10

Code:
${userCode}

Return JSON only with this shape:
{
  "correctness": "",
  "efficiency": "",
  "codeQuality": "",
  "improvements": [""],
  "score": 0
}`;

  if (!model) {
    return {
      correctness: 'No Gemini key configured. Baseline feedback: verify output against prompt requirements.',
      efficiency: 'Use efficient data structures and avoid repeated loops when possible.',
      codeQuality: 'Use clear variable names and split logic into reusable functions.',
      improvements: ['Add comments for tricky logic.', 'Include input validation and edge case handling.'],
      score: 6
    };
  }

  const result = await model.generateContent(evaluationPrompt);
  const text = result.response.text();
  return JSON.parse(cleanJson(text));
};
