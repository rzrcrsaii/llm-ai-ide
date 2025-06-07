# IDE-Agent HINT: ModelHub MVP Router - Model yönetimi API endpoints
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, BackgroundTasks
from fastapi.responses import StreamingResponse
from typing import List, Optional, Dict, Any
import asyncio
import logging
from pathlib import Path

from .service import ModelHubService
from .schemas import (
    ModelInfo,
    ModelCreateRequest,
    ModelUpdateRequest,
    ModelResponse,
    ModelListResponse,
    ModelDownloadRequest,
    ModelInferenceRequest,
    ModelInferenceResponse,
    ModelStatusResponse
)
from app.dependencies import get_current_user, get_db

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/models", tags=["Model Hub"])

@router.get("/", response_model=ModelListResponse)
async def list_models(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    search: Optional[str] = None,
    db=Depends(get_db),
    current_user=Depends(get_current_user)
) -> ModelListResponse:
    """Mevcut modelleri listele"""
    try:
        service = ModelHubService(db)
        models = await service.list_models(
            skip=skip,
            limit=limit,
            category=category,
            search=search
        )
        return ModelListResponse(
            models=models,
            total=len(models),
            skip=skip,
            limit=limit
        )
    except Exception as e:
        logger.error(f"Model listeleme hatası: {e}")
        raise HTTPException(status_code=500, detail="Model listesi alınamadı")

@router.get("/available", response_model=List[ModelInfo])
async def get_available_models(
    db=Depends(get_db),
    current_user=Depends(get_current_user)
) -> List[ModelInfo]:
    """İndirilebilir modelleri listele"""
    try:
        service = ModelHubService(db)
        return await service.get_available_models()
    except Exception as e:
        logger.error(f"Mevcut modeller alınamadı: {e}")
        raise HTTPException(status_code=500, detail="Mevcut modeller alınamadı")

@router.get("/local", response_model=List[ModelResponse])
async def get_local_models(
    db=Depends(get_db),
    current_user=Depends(get_current_user)
) -> List[ModelResponse]:
    """Yerel modelleri listele"""
    try:
        service = ModelHubService(db)
        return await service.get_local_models()
    except Exception as e:
        logger.error(f"Yerel modeller alınamadı: {e}")
        raise HTTPException(status_code=500, detail="Yerel modeller alınamadı")

@router.get("/{model_id}", response_model=ModelResponse)
async def get_model(
    model_id: str,
    db=Depends(get_db),
    current_user=Depends(get_current_user)
) -> ModelResponse:
    """Belirli bir modelin detaylarını al"""
    try:
        service = ModelHubService(db)
        model = await service.get_model(model_id)
        if not model:
            raise HTTPException(status_code=404, detail="Model bulunamadı")
        return model
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Model detayları alınamadı: {e}")
        raise HTTPException(status_code=500, detail="Model detayları alınamadı")

@router.post("/download", response_model=Dict[str, str])
async def download_model(
    request: ModelDownloadRequest,
    background_tasks: BackgroundTasks,
    db=Depends(get_db),
    current_user=Depends(get_current_user)
) -> Dict[str, str]:
    """Model indir"""
    try:
        service = ModelHubService(db)
        task_id = await service.start_model_download(
            model_id=request.model_id,
            source_url=request.source_url,
            user_id=current_user.id
        )
        
        # Background task olarak indirme işlemini başlat
        background_tasks.add_task(
            service.download_model_background,
            task_id,
            request.model_id,
            request.source_url
        )
        
        return {
            "message": "Model indirme işlemi başlatıldı",
            "task_id": task_id
        }
    except Exception as e:
        logger.error(f"Model indirme hatası: {e}")
        raise HTTPException(status_code=500, detail="Model indirme başlatılamadı")

@router.get("/download/{task_id}/status", response_model=Dict[str, Any])
async def get_download_status(
    task_id: str,
    db=Depends(get_db),
    current_user=Depends(get_current_user)
) -> Dict[str, Any]:
    """İndirme durumunu kontrol et"""
    try:
        service = ModelHubService(db)
        status = await service.get_download_status(task_id)
        if not status:
            raise HTTPException(status_code=404, detail="İndirme görevi bulunamadı")
        return status
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"İndirme durumu alınamadı: {e}")
        raise HTTPException(status_code=500, detail="İndirme durumu alınamadı")

@router.post("/upload", response_model=ModelResponse)
async def upload_model(
    file: UploadFile = File(...),
    name: str = None,
    description: str = None,
    category: str = "custom",
    db=Depends(get_db),
    current_user=Depends(get_current_user)
) -> ModelResponse:
    """Model dosyası yükle"""
    try:
        service = ModelHubService(db)
        
        # Dosya türü kontrolü
        if not file.filename.endswith(('.gguf', '.bin', '.safetensors')):
            raise HTTPException(
                status_code=400,
                detail="Desteklenen dosya türleri: .gguf, .bin, .safetensors"
            )
        
        model = await service.upload_model(
            file=file,
            name=name or file.filename,
            description=description,
            category=category,
            user_id=current_user.id
        )
        
        return model
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Model yükleme hatası: {e}")
        raise HTTPException(status_code=500, detail="Model yüklenemedi")

@router.post("/{model_id}/load", response_model=Dict[str, str])
async def load_model(
    model_id: str,
    db=Depends(get_db),
    current_user=Depends(get_current_user)
) -> Dict[str, str]:
    """Modeli belleğe yükle"""
    try:
        service = ModelHubService(db)
        await service.load_model(model_id)
        return {"message": "Model başarıyla yüklendi", "model_id": model_id}
    except Exception as e:
        logger.error(f"Model yükleme hatası: {e}")
        raise HTTPException(status_code=500, detail="Model yüklenemedi")

@router.post("/{model_id}/unload", response_model=Dict[str, str])
async def unload_model(
    model_id: str,
    db=Depends(get_db),
    current_user=Depends(get_current_user)
) -> Dict[str, str]:
    """Modeli bellekten kaldır"""
    try:
        service = ModelHubService(db)
        await service.unload_model(model_id)
        return {"message": "Model bellekten kaldırıldı", "model_id": model_id}
    except Exception as e:
        logger.error(f"Model kaldırma hatası: {e}")
        raise HTTPException(status_code=500, detail="Model kaldırılamadı")

@router.get("/{model_id}/status", response_model=ModelStatusResponse)
async def get_model_status(
    model_id: str,
    db=Depends(get_db),
    current_user=Depends(get_current_user)
) -> ModelStatusResponse:
    """Model durumunu al"""
    try:
        service = ModelHubService(db)
        status = await service.get_model_status(model_id)
        if not status:
            raise HTTPException(status_code=404, detail="Model bulunamadı")
        return status
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Model durumu alınamadı: {e}")
        raise HTTPException(status_code=500, detail="Model durumu alınamadı")

@router.post("/{model_id}/inference", response_model=ModelInferenceResponse)
async def run_inference(
    model_id: str,
    request: ModelInferenceRequest,
    db=Depends(get_db),
    current_user=Depends(get_current_user)
) -> ModelInferenceResponse:
    """Model ile çıkarım yap"""
    try:
        service = ModelHubService(db)
        result = await service.run_inference(
            model_id=model_id,
            input_data=request.input,
            parameters=request.parameters
        )
        return ModelInferenceResponse(
            model_id=model_id,
            output=result.output,
            metadata=result.metadata,
            execution_time=result.execution_time
        )
    except Exception as e:
        logger.error(f"Çıkarım hatası: {e}")
        raise HTTPException(status_code=500, detail="Çıkarım yapılamadı")

@router.post("/{model_id}/inference/stream")
async def run_inference_stream(
    model_id: str,
    request: ModelInferenceRequest,
    db=Depends(get_db),
    current_user=Depends(get_current_user)
):
    """Streaming çıkarım yap"""
    try:
        service = ModelHubService(db)
        
        async def generate():
            async for chunk in service.run_inference_stream(
                model_id=model_id,
                input_data=request.input,
                parameters=request.parameters
            ):
                yield f"data: {chunk}\n\n"
        
        return StreamingResponse(
            generate(),
            media_type="text/plain",
            headers={"Cache-Control": "no-cache"}
        )
    except Exception as e:
        logger.error(f"Streaming çıkarım hatası: {e}")
        raise HTTPException(status_code=500, detail="Streaming çıkarım yapılamadı")

@router.delete("/{model_id}", response_model=Dict[str, str])
async def delete_model(
    model_id: str,
    db=Depends(get_db),
    current_user=Depends(get_current_user)
) -> Dict[str, str]:
    """Modeli sil"""
    try:
        service = ModelHubService(db)
        await service.delete_model(model_id, current_user.id)
        return {"message": "Model başarıyla silindi", "model_id": model_id}
    except Exception as e:
        logger.error(f"Model silme hatası: {e}")
        raise HTTPException(status_code=500, detail="Model silinemedi")

@router.put("/{model_id}", response_model=ModelResponse)
async def update_model(
    model_id: str,
    request: ModelUpdateRequest,
    db=Depends(get_db),
    current_user=Depends(get_current_user)
) -> ModelResponse:
    """Model bilgilerini güncelle"""
    try:
        service = ModelHubService(db)
        model = await service.update_model(
            model_id=model_id,
            update_data=request.dict(exclude_unset=True),
            user_id=current_user.id
        )
        if not model:
            raise HTTPException(status_code=404, detail="Model bulunamadı")
        return model
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Model güncelleme hatası: {e}")
        raise HTTPException(status_code=500, detail="Model güncellenemedi")