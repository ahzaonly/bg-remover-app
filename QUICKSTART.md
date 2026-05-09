# Quick Start Guide 🚀

## Run Locally (5 minutes)

### Terminal 1: Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # macOS/Linux
# or: venv\Scripts\activate  # Windows

pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

### Terminal 2: Frontend
```bash
cd frontend
npm install
npm run dev
```

### Open in Browser
Go to `http://localhost:5173`

---

## Deploy to Railway (10 minutes)

### 1. Sign up at railway.app

### 2. Create new project
```bash
railway init
```

### 3. Add your project
```bash
railway add
```

### 4. Deploy
```bash
railway up
```

### 5. Get Railway URL
```bash
railway domains
```

### 6. Update frontend
Edit `frontend/src/App.jsx`:
```javascript
const API_URL = 'https://your-railway-url'
```

### 7. Deploy frontend
```bash
cd frontend
npm run build
# Upload dist/ to Vercel, Netlify, or your host
```

---

## Troubleshoot

**Backend won't start?**
```bash
pip install --upgrade pillow rembg
```

**Port already in use?**
```bash
# Use different port
python -m uvicorn main:app --reload --port 8001
```

**Need help?**
Check README.md for detailed docs
