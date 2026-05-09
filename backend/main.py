from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import shutil
from pathlib import Path
from PIL import Image
import io
from rembg import remove
import uuid
from datetime import datetime

app = FastAPI(title="BG Remover API", version="1.0.0")

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "ok", "timestamp": datetime.now().isoformat()}

@app.post("/api/remove-bg")
async def remove_background(file: UploadFile = File(...)):
    try:
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        contents = await file.read()
        input_image = Image.open(io.BytesIO(contents))
        
        output = remove(input_image)
        
        file_id = str(uuid.uuid4())
        output_filename = f"{file_id}_removed.png"
        output_path = UPLOAD_DIR / output_filename
        
        output.save(output_path, "PNG")
        
        return {
            "status": "success",
            "file_id": file_id,
            "download_url": f"/api/download/{file_id}",
            "original_filename": file.filename,
            "timestamp": datetime.now().isoformat()
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/download/{file_id}")
async def download_file(file_id: str):
    try:
        file_path = UPLOAD_DIR / f"{file_id}_removed.png"
        
        if not file_path.exists():
            raise HTTPException(status_code=404, detail="File not found")
        
        return FileResponse(
            path=file_path,
            media_type="image/png",
            filename=f"background_removed_{file_id}.png"
        )
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")

@app.post("/api/cleanup")
async def cleanup_old_files():
    """Manual cleanup endpoint"""
    try:
        count = 0
        for file in UPLOAD_DIR.glob("*_removed.png"):
            file.unlink()
            count += 1
        return {"status": "success", "files_deleted": count}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
