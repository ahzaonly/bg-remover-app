# Background Remover 🎨

A production-ready web application for removing backgrounds from images using REMBG AI model. Built with React + FastAPI + Docker.

## Features

✨ **Smart Background Removal** — Uses REMBG for accurate people & object detection
🚀 **Full Stack** — React frontend + FastAPI backend
📱 **Responsive Design** — Apple-inspired UI that works on all devices
🔄 **Real-time Processing** — Fast processing with visual feedback
💾 **PNG Download** — Preserves original resolution with transparent background
🐳 **Docker Ready** — One-click deployment to Railway

## Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Axios

**Backend:**
- FastAPI
- Python 3.11
- REMBG 2.0
- Pillow

**Deployment:**
- Docker
- Railway.app

## Local Development

### Prerequisites
- Node.js 16+
- Python 3.11+
- Git

### Backend Setup

```bash
cd backend
python -m venv venv

# macOS/Linux
source venv/bin/activate

# Windows
venv\Scripts\activate

pip install -r requirements.txt
python -m uvicorn main:app --reload
```

Backend runs on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### Test Locally

1. Open `http://localhost:5173`
2. Drop an image
3. Click "Remove Background"
4. Download the PNG

## Deployment to Railway

### Step 1: Create Railway Account
Go to [railway.app](https://railway.app) and sign up

### Step 2: Initialize Railway Project
```bash
# From project root
railway init
```

### Step 3: Configure Environment
Railway auto-detects Docker, no additional config needed.

### Step 4: Deploy Backend
```bash
railway up
```

### Step 5: Deploy Frontend
Build the frontend:
```bash
cd frontend
npm run build
```

Deploy frontend to Vercel/Netlify:
```bash
# Using Vercel (recommended)
npm i -g vercel
vercel --prod
```

Or manually upload `frontend/dist` to:
- Netlify: Drag & drop the dist folder
- Vercel: Connect GitHub repo
- Any static host: Upload dist folder

### Step 6: Connect Frontend to Backend
In `frontend/src/App.jsx`, update API_URL:
```javascript
const API_URL = 'https://your-railway-backend.railway.app'
```

Rebuild and redeploy frontend.

## Project Structure

```
bg-remover-app/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt      # Python dependencies
│   └── uploads/            # Processed images storage
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DropZone.jsx
│   │   │   ├── Preview.jsx
│   │   │   └── Header.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── Dockerfile
├── docker-compose.yml
├── railway.json
└── README.md
```

## API Endpoints

### POST `/api/remove-bg`
Remove background from image

**Request:**
```
Content-Type: multipart/form-data
file: <image file>
```

**Response:**
```json
{
  "status": "success",
  "file_id": "uuid-string",
  "download_url": "/api/download/uuid-string",
  "original_filename": "photo.jpg",
  "timestamp": "2024-05-10T12:34:56"
}
```

### GET `/api/download/{file_id}`
Download processed image as PNG

### GET `/health`
Health check endpoint

### POST `/api/cleanup`
Manual cleanup of processed images (admin only)

## Performance Notes

- Average processing time: 2-5 seconds per image
- Supports images up to 50MB
- Works with JPG, PNG, WebP formats
- Preserves original resolution

## If REMBG is Too Heavy

If deployment runs slow, switch to MediaPipe Selfie Segmenter:

In `backend/main.py`:
```python
# Replace rembg with mediapipe
from mediapipe.tasks import vision

# Use MediaPipe instead
```

Performance will improve ~50% but accuracy decreases slightly.

## Troubleshooting

### Backend won't start
```bash
# Clear cache
pip cache purge
pip install -r requirements.txt --no-cache-dir
```

### Large file upload fails
Increase FastAPI max upload size in `main.py`:
```python
app.add_middleware(
    ...
    max_upload_size=1024**2 * 100  # 100MB
)
```

### Docker build fails
Ensure you have 4GB+ disk space. REMBG model is ~300MB.

## Future Improvements

- [ ] Batch processing (multiple images)
- [ ] Advanced controls (feather edges, blur)
- [ ] Processing history & favorites
- [ ] User authentication
- [ ] Cost analytics
- [ ] API key system for external use

## License

MIT

## Support

For issues or feature requests, create an issue in the repo.

---

Made with ❤️ by Ahza
# bg-remover-app
