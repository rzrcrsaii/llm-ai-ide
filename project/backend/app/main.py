# IDE-Agent HINT: FastAPI ana uygulama - ModelHub MVP backend
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
import logging
import time
from contextlib import asynccontextmanager
from typing import Dict, Any

from config.settings import get_settings
from core.database import get_database
from core.security import SecurityManager
from .api_v1_router import api_v1_router
from .dependencies import get_current_user, get_db

# Logging konfigürasyonu
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

settings = get_settings()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Uygulama yaşam döngüsü yönetimi"""
    # Startup
    logger.info("IDE-Agent Backend başlatılıyor...")
    
    # Veritabanı bağlantısını test et
    try:
        db = await get_database()
        logger.info("Veritabanı bağlantısı başarılı")
    except Exception as e:
        logger.error(f"Veritabanı bağlantı hatası: {e}")
        raise
    
    # Security manager başlat
    security_manager = SecurityManager()
    await security_manager.initialize()
    
    logger.info("IDE-Agent Backend başarıyla başlatıldı")
    
    yield
    
    # Shutdown
    logger.info("IDE-Agent Backend kapatılıyor...")
    await security_manager.cleanup()
    logger.info("IDE-Agent Backend kapatıldı")

# FastAPI uygulaması
app = FastAPI(
    title="IDE-Agent API",
    description="AI-powered IDE with local model support",
    version="1.0.0-alpha",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React dev server
        "http://127.0.0.1:3000",
        "http://localhost:8080",  # Electron renderer
        "http://127.0.0.1:8080",
    ] if settings.DEBUG else ["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gzip compression
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Request timing middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

# Error handling middleware
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "message": exc.detail,
                "status_code": exc.status_code,
                "timestamp": time.time()
            }
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.error(f"Beklenmeyen hata: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": {
                "message": "Internal server error",
                "status_code": 500,
                "timestamp": time.time()
            }
        }
    )

# Static files (production)
if not settings.DEBUG:
    app.mount("/static", StaticFiles(directory="static"), name="static")

# API routes
app.include_router(api_v1_router, prefix="/api/v1")

# Health check endpoint
@app.get("/health")
async def health_check() -> Dict[str, Any]:
    """Sistem sağlık kontrolü"""
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "version": "1.0.0-alpha",
        "environment": "development" if settings.DEBUG else "production"
    }

# Root endpoint
@app.get("/")
async def root() -> Dict[str, str]:
    """Ana endpoint"""
    return {
        "message": "IDE-Agent API v1.0.0-alpha",
        "docs": "/docs" if settings.DEBUG else "Documentation disabled in production"
    }

# WebSocket endpoint for real-time communication
@app.websocket("/ws")
async def websocket_endpoint(websocket):
    """WebSocket bağlantısı"""
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            # WebSocket mesaj işleme burada yapılacak
            await websocket.send_text(f"Echo: {data}")
    except Exception as e:
        logger.error(f"WebSocket hatası: {e}")
    finally:
        await websocket.close()

if __name__ == "__main__":
    # Development server
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level="info" if settings.DEBUG else "warning"
    )