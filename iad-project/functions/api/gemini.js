// Cloudflare Pages Function — runs on the server at the route /api/gemini
// Place this file at:  functions/api/gemini.js  (in your project root, NOT inside src/)
//
// The Gemini key lives only here, read from an encrypted Cloudflare Secret
// (context.env.GOOGLE_AI_STUDIO_API_KEY). It is never sent to the browser.

export async function onRequestPost(context) {
  const { request, env } = context

  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return json({ error: 'A "prompt" string is required.' }, 400)
    }

    const apiKey = env.GOOGLE_AI_STUDIO_API_KEY
    if (!apiKey) {
      return json({ error: 'Server is missing its API key configuration.' }, 500)
    }

    const endpoint =
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' +
      apiKey

    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    })

    if (!upstream.ok) {
      return json({ error: 'The assistant is unavailable right now. Please try again.' }, 502)
    }

    const data = await upstream.json()
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sorry, I couldn't generate a response to that."

    return json({ text })
  } catch (err) {
    return json({ error: 'Something went wrong handling your request.' }, 500)
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  })
}
