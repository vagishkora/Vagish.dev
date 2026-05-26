const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Proxy endpoint for AI chat
app.post('/api/chat', async (req, res) => {
    try {
        const { messages, model } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ 
                error: 'Invalid request: messages array required' 
            });
        }

        // Direct Google Gemini API route (100% free direct route, recommended)
        if (GEMINI_API_KEY) {
            const systemMsg = messages.find(m => m.role === 'system');
            const systemText = systemMsg ? systemMsg.content : '';
            const chatMessages = messages.filter(m => m.role !== 'system');

            // Format history into Gemini API contents structure
            const contents = chatMessages.map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }]
            }));

            const payload = { contents };
            if (systemText) {
                payload.systemInstruction = {
                    parts: [{ text: systemText }]
                };
            }

            // Default model to gemini-2.5-flash for maximum intelligence and speed on free tier
            const geminiModel = 'gemini-2.5-flash';
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${GEMINI_API_KEY}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Gemini API Error details:', errorData);
                return res.status(response.status).json({
                    error: errorData.error?.message || 'Gemini API connection error'
                });
            }

            const data = await response.json();
            
            // Extract the generated text
            const candidate = data.candidates?.[0];
            const text = candidate?.content?.parts?.[0]?.text || '[INTEL_REDACTED]';

            // Normalize response to match OpenAI / OpenRouter shape so frontend remains uniform
            return res.json({
                choices: [
                    {
                        message: {
                            role: 'assistant',
                            content: text
                        }
                    }
                ],
                provider: 'google-gemini-direct'
            });
        }

        // OpenRouter route
        if (OPENROUTER_API_KEY) {
            // Default model to a highly performant and free model on OpenRouter
            const openRouterModel = model || 'google/gemini-2.5-flash';

            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`
                },
                body: JSON.stringify({
                    model: openRouterModel,
                    messages: messages,
                    max_tokens: 1000
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('OpenRouter API Error:', errorData);
                return res.status(response.status).json(errorData);
            }

            const data = await response.json();
            data.provider = 'openrouter';
            return res.json(data);
        }

        // Neither key is present
        return res.status(500).json({ 
            error: 'Server configuration error: Neither GEMINI_API_KEY nor OPENROUTER_API_KEY is configured in the backend environment (.env file).' 
        });

    } catch (error) {
        console.error('Proxy Server Error:', error);
        res.status(500).json({ 
            error: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    let mode = 'not-configured';
    if (GEMINI_API_KEY) mode = 'google-gemini-direct';
    else if (OPENROUTER_API_KEY) mode = 'openrouter';

    res.json({ 
        status: 'ok',
        apiMode: mode,
        isConfigured: mode !== 'not-configured'
    });
});

app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`ALPHA AI PROXY RUNNING ON PORT: ${PORT}`);
    
    if (GEMINI_API_KEY) {
        console.log(`ACTIVE INTERFACE: ✓ Direct Google Gemini API (Free Tier)`);
    } else if (OPENROUTER_API_KEY) {
        console.log(`ACTIVE INTERFACE: ✓ OpenRouter API Gateway`);
    } else {
        console.warn(`⚠️ WARNING: Neither GEMINI_API_KEY nor OPENROUTER_API_KEY is configured in .env!`);
        console.warn(`           Chatbot requests will fail until an API key is set.`);
    }
    console.log(`=========================================`);
});
