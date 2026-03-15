# ALPHA AI Backend Proxy Setup

This backend proxy keeps your OpenRouter API key secure and allows public visitors to use the ALPHA AI assistant without needing their own API key.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Key
1. Get your OpenRouter API key from [openrouter.ai](https://openrouter.ai)
2. Create a `.env` file (copy from `.env.example`)
3. Add your API key:
```
OPENROUTER_API_KEY=sk-or-v1-xxxxx...
PORT=3001
```

### 3. Run Backend Server (Local Development)
```bash
npm run server
```
Server will start on `http://localhost:3001`

### 4. Test the API
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "model": "mistral/mistral-7b-instruct",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

## Deployment Options

### Option A: Vercel (Recommended - Free)
_Coming soon - requires Next.js API route refactor or separate deployment_

### Option B: Heroku (Free tier deprecated, use alternatives)
_Deploy using Heroku CLI or GitHub actions_

### Option C: Railway.app (Free tier available)
1. Push code to GitHub
2. Connect to Railway.app 
3. Set environment variable: `OPENROUTER_API_KEY`
4. Deploy

### Option D: Render.com (Free tier available)
1. Connect GitHub repo
2. Create new "Web Service"
3. Build command: `npm install`
4. Start command: `npm run server`
5. Add environment variable: `OPENROUTER_API_KEY`

### Option E: Your Own Server
Deploy on AWS, DigitalOcean, or any VPS running Node.js

## Environment Variables
- `OPENROUTER_API_KEY` (required) - Your OpenRouter API key from https://openrouter.ai
- `PORT` (optional) - Server port, defaults to 3001

## Security Notes
✅ API key is never exposed to frontend  
✅ Frontend makes requests to YOUR backend  
✅ Backend securely forwards requests to OpenRouter  
✅ .env file is in .gitignore - never committed to git  

## Troubleshooting

**Backend returns 500 error**
- Check that `OPENROUTER_API_KEY` is set in `.env`
- Verify API key is valid on https://openrouter.ai

**CORS errors**
- CORS is enabled for all origins (`cors()`)
- For production, restrict to your portfolio domain

**Model not working**
- Check available models at https://openrouter.ai/docs
- Update `selectedModel` in `script.js`

## Support
For OpenRouter API issues: https://openrouter.ai/docs
