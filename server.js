// Simple Express backend proxy for OpenRouter API
// Keeps API key secret on server side
// Visitors can use ALPHA AI without needing their own key

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Proxy endpoint for AI chat
app.post('/api/chat', async (req, res) => {
    try {
        if (!OPENROUTER_API_KEY) {
            return res.status(500).json({ 
                error: 'Server configuration error: API key not set' 
            });
        }

        const { messages, model = 'mistral/mistral-7b-instruct' } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ 
                error: 'Invalid request: messages array required' 
            });
        }

        // Call OpenRouter API
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`
            },
            body: JSON.stringify({
                model: model,
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
        res.json(data);

    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).json({ 
            error: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok',
        apiConfigured: !!OPENROUTER_API_KEY
    });
});

app.listen(PORT, () => {
    console.log(`OpenRouter Proxy Server running on port ${PORT}`);
    if (!OPENROUTER_API_KEY) {
        console.warn('⚠️  WARNING: OPENROUTER_API_KEY not set. Set it in .env file');
    } else {
        console.log('✓ OpenRouter API key configured');
    }
});
