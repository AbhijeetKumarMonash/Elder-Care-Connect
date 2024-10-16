// useGemini.js

import { GoogleGenerativeAI } from '@google/generative-ai'

export const useGemini = async (prompt) => {
  const VITE_GOOGLE_AI_STUDIO_API_KEY = import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY

  // Initialize the Gemini API client
  const genAI = new GoogleGenerativeAI(VITE_GOOGLE_AI_STUDIO_API_KEY)

  // Specify the model you want to use
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  // Generate the content based on the user's prompt
  const result = await model.generateContent(prompt)

  const response = await result.response
  const text = await response.text()

  return text
}
