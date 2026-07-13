// GeminiService.js
//
// The Gemini key is NO LONGER used here. This now calls our own server
// endpoint (a Cloudflare Pages Function at /api/gemini), which holds the key
// as an encrypted secret. Nothing sensitive is shipped to the browser.

export const useGemini = async (prompt) => {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  })

  if (!res.ok) {
    throw new Error('Gemini request failed')
  }

  const data = await res.json()
  if (data.error) {
    throw new Error(data.error)
  }
  return data.text
}
