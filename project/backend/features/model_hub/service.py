# IDE-Agent HINT: ModelHub MVP Service - İş mantığı katmanı
import asyncio
import aiohttp
import aiofiles
import hashlib
import json
import logging
import os
import shutil
import uuid
from datetime import datetime
from pathlib import Path
from typing import List, Optional, Dict, Any, AsyncGenerator
from fastapi import UploadFile, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from sqlalchemy.orm import selectinload

from .models import ModelRecord, ModelDownloadTask
from .schemas import (
    ModelInfo,
    ModelResponse,
    ModelStatus,
    ModelType,
    ModelFormat,
    ModelInferenceRequest,
    ModelInferenceResponse
)
from core.config import get_settings
from ai_core.model_manager import ModelManager
from utils.file_utils import calculate_file_hash, ensure_directory

logger = logging.getLogger(__name__)
settings = get_settings()

class ModelHubService:
    """Model Hub servis katmanı"""
    
    def __init__(self, db: AsyncSession):
        self.db = db
        self.model_manager = ModelManager()
        self.models_dir = Path(settings.MODELS_DIR)
        self.downloads_dir = Path(settings.DOWNLOADS_DIR)
        self.ensure_directories()
    
    def ensure_directories(self):
        """Gerekli dizinleri oluştur"""
        self.models_dir.mkdir(parents=True, exist_ok=True)
        self.downloads_dir.mkdir(parents=True, exist_ok=True)
    
    async def list_models(
        self,
        skip: int = 0,
        limit: int = 100,
        category: Optional[str] = None,
        search: Optional[str] = None
    ) -> List[ModelResponse]:
        """Modelleri listele"""
        try:
            query = select(ModelRecord)
            
            if category:
                query = query.where(ModelRecord.type == category)
            
            if search:
                query = query.where(
                    ModelRecord.name.ilike(f"%{search}%") |
                    ModelRecord.description.ilike(f"%{search}%")
                )
            
            query = query.offset(skip).limit(limit)
            result = await self.db.execute(query)
            models = result.scalars().all()
            
            return [self._model_to_response(model) for model in models]
        except Exception as e:
            logger.error(f"Model listeleme hatası: {e}")
            raise
    
    async def get_available_models(self) -> List[ModelInfo]:
        """İndirilebilir modelleri al"""
        try:
            # Hugging Face Hub'dan popüler modelleri al
            available_models = [
                ModelInfo(
                    id="microsoft/DialoGPT-medium",
                    name="DialoGPT Medium",
                    description="Microsoft'un konuşma modeli",
                    type=ModelType.TEXT,
                    format=ModelFormat.PYTORCH,
                    parameters="117M",
                    source_url="https://huggingface.co/microsoft/DialoGPT-medium",
                    tags=["conversation", "chatbot"]
                ),
                ModelInfo(
                    id="microsoft/codebert-base",
                    name="CodeBERT Base",
                    description="Kod anlama için BERT modeli",
                    type=ModelType.CODE,
                    format=ModelFormat.PYTORCH,
                    parameters="125M",
                    source_url="https://huggingface.co/microsoft/codebert-base",
                    tags=["code", "programming"]
                ),
                ModelInfo(
                    id="openai/clip-vit-base-patch32",
                    name="CLIP ViT Base",
                    description="Görsel-metin çok modlu model",
                    type=ModelType.MULTIMODAL,
                    format=ModelFormat.PYTORCH,
                    parameters="151M",
                    source_url="https://huggingface.co/openai/clip-vit-base-patch32",
                    tags=["vision", "multimodal"]
                )
            ]
            return available_models
        except Exception as e:
            logger.error(f"Mevcut modeller alınamadı: {e}")
            raise
    
    async def get_local_models(self) -> List[ModelResponse]:
        """Yerel modelleri al"""
        try:
            query = select(ModelRecord).where(
                ModelRecord.status.in_([ModelStatus.DOWNLOADED, ModelStatus.LOADED])
            )
            result = await self.db.execute(query)
            models = result.scalars().all()
            
            return [self._model_to_response(model) for model in models]
        except Exception as e:
            logger.error(f"Yerel modeller alınamadı: {e}")
            raise
    
    async def get_model(self, model_id: str) -> Optional[ModelResponse]:
        """Belirli bir modeli al"""
        try:
            query = select(ModelRecord).where(ModelRecord.id == model_id)
            result = await self.db.execute(query)
            model = result.scalar_one_or_none()
            
            if model:
                return self._model_to_response(model)
            return None
        except Exception as e:
            logger.error(f"Model alınamadı: {e}")
            raise
    
    async def start_model_download(
        self,
        model_id: str,
        source_url: str,
        user_id: str
    ) -> str:
        """Model indirme işlemini başlat"""
        try:
            task_id = str(uuid.uuid4())
            
            # İndirme görevini veritabanına kaydet
            download_task = ModelDownloadTask(
                id=task_id,
                model_id=model_id,
                source_url=source_url,
                user_id=user_id,
                status="pending",
                progress=0.0
            )
            
            self.db.add(download_task)
            await self.db.commit()
            
            return task_id
        except Exception as e:
            logger.error(f"İndirme görevi oluşturulamadı: {e}")
            raise
    
    async def download_model_background(
        self,
        task_id: str,
        model_id: str,
        source_url: str
    ):
        """Arka planda model indir"""
        try:
            # Görev durumunu güncelle
            await self._update_download_task(task_id, "downloading", 0.0)
            
            # Model dosyasını indir
            file_path = self.downloads_dir / f"{model_id}.bin"
            
            async with aiohttp.ClientSession() as session:
                async with session.get(source_url) as response:
                    if response.status == 200:
                        total_size = int(response.headers.get('content-length', 0))
                        downloaded = 0
                        
                        async with aiofiles.open(file_path, 'wb') as f:
                            async for chunk in response.content.iter_chunked(8192):
                                await f.write(chunk)
                                downloaded += len(chunk)
                                
                                if total_size > 0:
                                    progress = downloaded / total_size
                                    await self._update_download_task(task_id, "downloading", progress)
                    else:
                        raise Exception(f"İndirme hatası: {response.status}")
            
            # Model kaydını oluştur veya güncelle
            await self._create_or_update_model_record(
                model_id=model_id,
                file_path=str(file_path),
                source_url=source_url
            )
            
            # Görev durumunu tamamlandı olarak işaretle
            await self._update_download_task(task_id, "completed", 1.0)
            
        except Exception as e:
            logger.error(f"Model indirme hatası: {e}")
            await self._update_download_task(task_id, "failed", 0.0, str(e))
    
    async def get_download_status(self, task_id: str) -> Optional[Dict[str, Any]]:
        """İndirme durumunu al"""
        try:
            query = select(ModelDownloadTask).where(ModelDownloadTask.id == task_id)
            result = await self.db.execute(query)
            task = result.scalar_one_or_none()
            
            if task:
                return {
                    "task_id": task.id,
                    "model_id": task.model_id,
                    "status": task.status,
                    "progress": task.progress,
                    "error_message": task.error_message,
                    "created_at": task.created_at,
                    "updated_at": task.updated_at
                }
            return None
        except Exception as e:
            logger.error(f"İndirme durumu alınamadı: {e}")
            raise
    
    async def upload_model(
        self,
        file: UploadFile,
        name: str,
        description: Optional[str],
        category: str,
        user_id: str
    ) -> ModelResponse:
        """Model dosyası yükle"""
        try:
            # Dosya boyutu kontrolü (max 10GB)
            if file.size and file.size > 10 * 1024 * 1024 * 1024:
                raise HTTPException(status_code=400, detail="Dosya çok büyük (max 10GB)")
            
            # Benzersiz dosya adı oluştur
            file_id = str(uuid.uuid4())
            file_extension = Path(file.filename).suffix
            local_filename = f"{file_id}{file_extension}"
            file_path = self.models_dir / local_filename
            
            # Dosyayı kaydet
            async with aiofiles.open(file_path, 'wb') as f:
                content = await file.read()
                await f.write(content)
            
            # Dosya hash'ini hesapla
            file_hash = await calculate_file_hash(file_path)
            
            # Model formatını belirle
            format_map = {
                '.gguf': ModelFormat.GGUF,
                '.bin': ModelFormat.PYTORCH,
                '.safetensors': ModelFormat.SAFETENSORS
            }
            model_format = format_map.get(file_extension, ModelFormat.PYTORCH)
            
            # Model kaydını oluştur
            model_record = ModelRecord(
                id=file_id,
                name=name,
                description=description,
                type=ModelType.CUSTOM,
                format=model_format,
                status=ModelStatus.DOWNLOADED,
                size_bytes=file.size,
                local_path=str(file_path),
                file_hash=file_hash,
                user_id=user_id
            )
            
            self.db.add(model_record)
            await self.db.commit()
            await self.db.refresh(model_record)
            
            return self._model_to_response(model_record)
            
        except Exception as e:
            logger.error(f"Model yükleme hatası: {e}")
            # Hata durumunda dosyayı temizle
            if 'file_path' in locals() and file_path.exists():
                file_path.unlink()
            raise
    
    async def load_model(self, model_id: str):
        """Modeli belleğe yükle"""
        try:
            model_record = await self.get_model(model_id)
            if not model_record:
                raise HTTPException(status_code=404, detail="Model bulunamadı")
            
            if not model_record.local_path or not Path(model_record.local_path).exists():
                raise HTTPException(status_code=400, detail="Model dosyası bulunamadı")
            
            # Model durumunu güncelle
            await self._update_model_status(model_id, ModelStatus.LOADING)
            
            # Model manager ile modeli yükle
            await self.model_manager.load_model(
                model_id=model_id,
                model_path=model_record.local_path,
                model_type=model_record.type
            )
            
            # Model durumunu güncelle
            await self._update_model_status(model_id, ModelStatus.LOADED)
            
        except Exception as e:
            logger.error(f"Model yükleme hatası: {e}")
            await self._update_model_status(model_id, ModelStatus.ERROR)
            raise
    
    async def unload_model(self, model_id: str):
        """Modeli bellekten kaldır"""
        try:
            await self.model_manager.unload_model(model_id)
            await self._update_model_status(model_id, ModelStatus.DOWNLOADED)
        except Exception as e:
            logger.error(f"Model kaldırma hatası: {e}")
            raise
    
    async def get_model_status(self, model_id: str) -> Optional[Dict[str, Any]]:
        """Model durumunu al"""
        try:
            model_record = await self.get_model(model_id)
            if not model_record:
                return None
            
            is_loaded = await self.model_manager.is_model_loaded(model_id)
            memory_usage = await self.model_manager.get_model_memory_usage(model_id) if is_loaded else None
            
            return {
                "model_id": model_id,
                "status": model_record.status,
                "is_loaded": is_loaded,
                "memory_usage": memory_usage,
                "last_used": model_record.last_used,
                "load_time": model_record.load_time
            }
        except Exception as e:
            logger.error(f"Model durumu alınamadı: {e}")
            raise
    
    async def run_inference(
        self,
        model_id: str,
        input_data: Any,
        parameters: Optional[Dict[str, Any]] = None
    ) -> ModelInferenceResponse:
        """Model ile çıkarım yap"""
        try:
            start_time = datetime.now()
            
            # Model yüklü mü kontrol et
            if not await self.model_manager.is_model_loaded(model_id):
                await self.load_model(model_id)
            
            # Çıkarım yap
            result = await self.model_manager.run_inference(
                model_id=model_id,
                input_data=input_data,
                parameters=parameters or {}
            )
            
            execution_time = (datetime.now() - start_time).total_seconds()
            
            # Son kullanım zamanını güncelle
            await self._update_model_last_used(model_id)
            
            return ModelInferenceResponse(
                model_id=model_id,
                output=result.output,
                metadata=result.metadata,
                execution_time=execution_time,
                tokens_generated=result.tokens_generated,
                finish_reason=result.finish_reason
            )
            
        except Exception as e:
            logger.error(f"Çıkarım hatası: {e}")
            raise
    
    async def run_inference_stream(
        self,
        model_id: str,
        input_data: Any,
        parameters: Optional[Dict[str, Any]] = None
    ) -> AsyncGenerator[str, None]:
        """Streaming çıkarım yap"""
        try:
            # Model yüklü mü kontrol et
            if not await self.model_manager.is_model_loaded(model_id):
                await self.load_model(model_id)
            
            # Streaming çıkarım yap
            async for chunk in self.model_manager.run_inference_stream(
                model_id=model_id,
                input_data=input_data,
                parameters=parameters or {}
            ):
                yield json.dumps(chunk)
            
            # Son kullanım zamanını güncelle
            await self._update_model_last_used(model_id)
            
        except Exception as e:
            logger.error(f"Streaming çıkarım hatası: {e}")
            raise
    
    async def delete_model(self, model_id: str, user_id: str):
        """Modeli sil"""
        try:
            model_record = await self.get_model(model_id)
            if not model_record:
                raise HTTPException(status_code=404, detail="Model bulunamadı")
            
            # Kullanıcı yetkisi kontrolü
            if model_record.user_id != user_id:
                raise HTTPException(status_code=403, detail="Bu modeli silme yetkiniz yok")
            
            # Model yüklüyse bellekten kaldır
            if await self.model_manager.is_model_loaded(model_id):
                await self.unload_model(model_id)
            
            # Dosyayı sil
            if model_record.local_path and Path(model_record.local_path).exists():
                Path(model_record.local_path).unlink()
            
            # Veritabanından sil
            await self.db.execute(delete(ModelRecord).where(ModelRecord.id == model_id))
            await self.db.commit()
            
        except Exception as e:
            logger.error(f"Model silme hatası: {e}")
            raise
    
    async def update_model(
        self,
        model_id: str,
        update_data: Dict[str, Any],
        user_id: str
    ) -> Optional[ModelResponse]:
        """Model bilgilerini güncelle"""
        try:
            model_record = await self.get_model(model_id)
            if not model_record:
                return None
            
            # Kullanıcı yetkisi kontrolü
            if model_record.user_id != user_id:
                raise HTTPException(status_code=403, detail="Bu modeli güncelleme yetkiniz yok")
            
            # Güncelleme yap
            stmt = update(ModelRecord).where(ModelRecord.id == model_id).values(**update_data)
            await self.db.execute(stmt)
            await self.db.commit()
            
            return await self.get_model(model_id)
            
        except Exception as e:
            logger.error(f"Model güncelleme hatası: {e}")
            raise
    
    # Yardımcı metodlar
    
    def _model_to_response(self, model: ModelRecord) -> ModelResponse:
        """Model kaydını response modeline dönüştür"""
        return ModelResponse(
            id=model.id,
            name=model.name,
            description=model.description,
            type=model.type,
            format=model.format,
            status=model.status,
            size_bytes=model.size_bytes,
            parameters=model.parameters,
            quantization=model.quantization,
            license=model.license,
            author=model.author,
            source_url=model.source_url,
            local_path=model.local_path,
            tags=model.tags or [],
            download_progress=model.download_progress,
            memory_usage=model.memory_usage,
            is_loaded=model.status == ModelStatus.LOADED,
            created_at=model.created_at,
            updated_at=model.updated_at,
            user_id=model.user_id
        )
    
    async def _update_download_task(
        self,
        task_id: str,
        status: str,
        progress: float,
        error_message: Optional[str] = None
    ):
        """İndirme görevini güncelle"""
        stmt = update(ModelDownloadTask).where(
            ModelDownloadTask.id == task_id
        ).values(
            status=status,
            progress=progress,
            error_message=error_message,
            updated_at=datetime.utcnow()
        )
        await self.db.execute(stmt)
        await self.db.commit()
    
    async def _create_or_update_model_record(
        self,
        model_id: str,
        file_path: str,
        source_url: str
    ):
        """Model kaydını oluştur veya güncelle"""
        existing_model = await self.get_model(model_id)
        
        if existing_model:
            # Mevcut modeli güncelle
            stmt = update(ModelRecord).where(
                ModelRecord.id == model_id
            ).values(
                local_path=file_path,
                status=ModelStatus.DOWNLOADED,
                updated_at=datetime.utcnow()
            )
            await self.db.execute(stmt)
        else:
            # Yeni model kaydı oluştur
            file_size = Path(file_path).stat().st_size
            file_hash = await calculate_file_hash(Path(file_path))
            
            model_record = ModelRecord(
                id=model_id,
                name=model_id,
                type=ModelType.TEXT,
                format=ModelFormat.PYTORCH,
                status=ModelStatus.DOWNLOADED,
                size_bytes=file_size,
                source_url=source_url,
                local_path=file_path,
                file_hash=file_hash
            )
            
            self.db.add(model_record)
        
        await self.db.commit()
    
    async def _update_model_status(self, model_id: str, status: ModelStatus):
        """Model durumunu güncelle"""
        stmt = update(ModelRecord).where(
            ModelRecord.id == model_id
        ).values(
            status=status,
            updated_at=datetime.utcnow()
        )
        await self.db.execute(stmt)
        await self.db.commit()
    
    async def _update_model_last_used(self, model_id: str):
        """Model son kullanım zamanını güncelle"""
        stmt = update(ModelRecord).where(
            ModelRecord.id == model_id
        ).values(
            last_used=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        await self.db.execute(stmt)
        await self.db.commit()