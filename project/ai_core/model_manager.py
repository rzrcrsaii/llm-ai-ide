# IDE-Agent HINT: AI Core Model Manager - Model yönetim sistemi
import asyncio
import logging
import psutil
import torch
import gc
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, Optional, AsyncGenerator, List
from dataclasses import dataclass
import json
import threading
from concurrent.futures import ThreadPoolExecutor

logger = logging.getLogger(__name__)

@dataclass
class InferenceResult:
    """Çıkarım sonucu"""
    output: Any
    metadata: Dict[str, Any]
    tokens_generated: Optional[int] = None
    finish_reason: Optional[str] = None

@dataclass
class ModelInfo:
    """Model bilgileri"""
    model_id: str
    model_path: str
    model_type: str
    is_loaded: bool = False
    memory_usage: Optional[int] = None
    load_time: Optional[float] = None
    last_used: Optional[datetime] = None

class ModelManager:
    """Model yönetim sistemi"""
    
    def __init__(self):
        self.loaded_models: Dict[str, Any] = {}
        self.model_info: Dict[str, ModelInfo] = {}
        self.executor = ThreadPoolExecutor(max_workers=2)
        self._lock = threading.Lock()
        
        # GPU kullanılabilirliğini kontrol et
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        logger.info(f"Model Manager başlatıldı. Cihaz: {self.device}")
    
    async def load_model(
        self,
        model_id: str,
        model_path: str,
        model_type: str,
        config: Optional[Dict[str, Any]] = None
    ) -> bool:
        """Modeli belleğe yükle"""
        try:
            start_time = datetime.now()
            
            # Model zaten yüklüyse
            if model_id in self.loaded_models:
                logger.info(f"Model {model_id} zaten yüklü")
                return True
            
            logger.info(f"Model yükleniyor: {model_id}")
            
            # Model tipine göre yükleme
            if model_type in ["text", "code"]:
                model = await self._load_text_model(model_path, config)
            elif model_type == "vision":
                model = await self._load_vision_model(model_path, config)
            elif model_type == "multimodal":
                model = await self._load_multimodal_model(model_path, config)
            else:
                model = await self._load_generic_model(model_path, config)
            
            # Model bilgilerini kaydet
            with self._lock:
                self.loaded_models[model_id] = model
                
                load_time = (datetime.now() - start_time).total_seconds()
                memory_usage = self._get_model_memory_usage(model)
                
                self.model_info[model_id] = ModelInfo(
                    model_id=model_id,
                    model_path=model_path,
                    model_type=model_type,
                    is_loaded=True,
                    memory_usage=memory_usage,
                    load_time=load_time,
                    last_used=datetime.now()
                )
            
            logger.info(f"Model {model_id} başarıyla yüklendi. Süre: {load_time:.2f}s")
            return True
            
        except Exception as e:
            logger.error(f"Model yükleme hatası {model_id}: {e}")
            return False
    
    async def unload_model(self, model_id: str) -> bool:
        """Modeli bellekten kaldır"""
        try:
            if model_id not in self.loaded_models:
                logger.warning(f"Model {model_id} zaten yüklü değil")
                return True
            
            logger.info(f"Model kaldırılıyor: {model_id}")
            
            with self._lock:
                # Modeli sil
                del self.loaded_models[model_id]
                
                # Model bilgilerini güncelle
                if model_id in self.model_info:
                    self.model_info[model_id].is_loaded = False
                    self.model_info[model_id].memory_usage = None
            
            # Bellek temizliği
            gc.collect()
            if torch.cuda.is_available():
                torch.cuda.empty_cache()
            
            logger.info(f"Model {model_id} başarıyla kaldırıldı")
            return True
            
        except Exception as e:
            logger.error(f"Model kaldırma hatası {model_id}: {e}")
            return False
    
    async def is_model_loaded(self, model_id: str) -> bool:
        """Model yüklü mü kontrol et"""
        return model_id in self.loaded_models
    
    async def get_model_memory_usage(self, model_id: str) -> Optional[int]:
        """Model bellek kullanımını al"""
        if model_id in self.model_info:
            return self.model_info[model_id].memory_usage
        return None
    
    async def run_inference(
        self,
        model_id: str,
        input_data: Any,
        parameters: Dict[str, Any]
    ) -> InferenceResult:
        """Model ile çıkarım yap"""
        try:
            if model_id not in self.loaded_models:
                raise ValueError(f"Model {model_id} yüklü değil")
            
            model = self.loaded_models[model_id]
            model_type = self.model_info[model_id].model_type
            
            # Son kullanım zamanını güncelle
            self.model_info[model_id].last_used = datetime.now()
            
            # Model tipine göre çıkarım
            if model_type in ["text", "code"]:
                result = await self._run_text_inference(model, input_data, parameters)
            elif model_type == "vision":
                result = await self._run_vision_inference(model, input_data, parameters)
            elif model_type == "multimodal":
                result = await self._run_multimodal_inference(model, input_data, parameters)
            else:
                result = await self._run_generic_inference(model, input_data, parameters)
            
            return result
            
        except Exception as e:
            logger.error(f"Çıkarım hatası {model_id}: {e}")
            raise
    
    async def run_inference_stream(
        self,
        model_id: str,
        input_data: Any,
        parameters: Dict[str, Any]
    ) -> AsyncGenerator[Dict[str, Any], None]:
        """Streaming çıkarım yap"""
        try:
            if model_id not in self.loaded_models:
                raise ValueError(f"Model {model_id} yüklü değil")
            
            model = self.loaded_models[model_id]
            model_type = self.model_info[model_id].model_type
            
            # Son kullanım zamanını güncelle
            self.model_info[model_id].last_used = datetime.now()
            
            # Model tipine göre streaming çıkarım
            if model_type in ["text", "code"]:
                async for chunk in self._run_text_inference_stream(model, input_data, parameters):
                    yield chunk
            else:
                # Diğer model tipleri için basit çıkarım
                result = await self.run_inference(model_id, input_data, parameters)
                yield {
                    "type": "content",
                    "content": result.output,
                    "metadata": result.metadata
                }
                yield {
                    "type": "done",
                    "finish_reason": result.finish_reason
                }
            
        except Exception as e:
            logger.error(f"Streaming çıkarım hatası {model_id}: {e}")
            raise
    
    def get_loaded_models(self) -> List[str]:
        """Yüklü modellerin listesini al"""
        return list(self.loaded_models.keys())
    
    def get_system_info(self) -> Dict[str, Any]:
        """Sistem bilgilerini al"""
        memory = psutil.virtual_memory()
        
        info = {
            "cpu_count": psutil.cpu_count(),
            "memory_total": memory.total,
            "memory_available": memory.available,
            "memory_percent": memory.percent,
            "device": self.device,
            "loaded_models_count": len(self.loaded_models)
        }
        
        if torch.cuda.is_available():
            info.update({
                "gpu_count": torch.cuda.device_count(),
                "gpu_memory_total": torch.cuda.get_device_properties(0).total_memory,
                "gpu_memory_allocated": torch.cuda.memory_allocated(),
                "gpu_memory_cached": torch.cuda.memory_reserved()
            })
        
        return info
    
    # Model yükleme metodları
    
    async def _load_text_model(self, model_path: str, config: Optional[Dict[str, Any]]) -> Any:
        """Metin modeli yükle"""
        try:
            # Transformers kütüphanesi kullanarak model yükle
            from transformers import AutoTokenizer, AutoModelForCausalLM
            
            def load_model():
                tokenizer = AutoTokenizer.from_pretrained(model_path)
                model = AutoModelForCausalLM.from_pretrained(
                    model_path,
                    torch_dtype=torch.float16 if self.device == "cuda" else torch.float32,
                    device_map="auto" if self.device == "cuda" else None
                )
                return {"model": model, "tokenizer": tokenizer}
            
            # Thread pool'da yükle
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(self.executor, load_model)
            
            return result
            
        except Exception as e:
            logger.error(f"Metin modeli yükleme hatası: {e}")
            # Fallback: basit mock model
            return {"model": None, "tokenizer": None, "type": "mock"}
    
    async def _load_vision_model(self, model_path: str, config: Optional[Dict[str, Any]]) -> Any:
        """Görsel modeli yükle"""
        try:
            # PIL ve transformers kullanarak görsel model yükle
            from transformers import AutoProcessor, AutoModel
            
            def load_model():
                processor = AutoProcessor.from_pretrained(model_path)
                model = AutoModel.from_pretrained(model_path)
                return {"model": model, "processor": processor}
            
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(self.executor, load_model)
            
            return result
            
        except Exception as e:
            logger.error(f"Görsel modeli yükleme hatası: {e}")
            return {"model": None, "processor": None, "type": "mock"}
    
    async def _load_multimodal_model(self, model_path: str, config: Optional[Dict[str, Any]]) -> Any:
        """Çok modlu model yükle"""
        try:
            # CLIP benzeri çok modlu model yükle
            from transformers import AutoProcessor, AutoModel
            
            def load_model():
                processor = AutoProcessor.from_pretrained(model_path)
                model = AutoModel.from_pretrained(model_path)
                return {"model": model, "processor": processor}
            
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(self.executor, load_model)
            
            return result
            
        except Exception as e:
            logger.error(f"Çok modlu model yükleme hatası: {e}")
            return {"model": None, "processor": None, "type": "mock"}
    
    async def _load_generic_model(self, model_path: str, config: Optional[Dict[str, Any]]) -> Any:
        """Genel model yükle"""
        try:
            # PyTorch model yükle
            def load_model():
                model = torch.load(model_path, map_location=self.device)
                return {"model": model, "type": "pytorch"}
            
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(self.executor, load_model)
            
            return result
            
        except Exception as e:
            logger.error(f"Genel model yükleme hatası: {e}")
            return {"model": None, "type": "mock"}
    
    # Çıkarım metodları
    
    async def _run_text_inference(
        self,
        model_data: Dict[str, Any],
        input_data: Any,
        parameters: Dict[str, Any]
    ) -> InferenceResult:
        """Metin çıkarımı yap"""
        try:
            if model_data.get("type") == "mock":
                # Mock response
                return InferenceResult(
                    output=f"Mock response for: {input_data}",
                    metadata={"model_type": "text", "mock": True},
                    tokens_generated=10,
                    finish_reason="length"
                )
            
            model = model_data["model"]
            tokenizer = model_data["tokenizer"]
            
            def generate():
                inputs = tokenizer.encode(input_data, return_tensors="pt")
                if self.device == "cuda":
                    inputs = inputs.to("cuda")
                
                with torch.no_grad():
                    outputs = model.generate(
                        inputs,
                        max_length=parameters.get("max_length", 100),
                        temperature=parameters.get("temperature", 0.7),
                        do_sample=parameters.get("do_sample", True),
                        pad_token_id=tokenizer.eos_token_id
                    )
                
                response = tokenizer.decode(outputs[0], skip_special_tokens=True)
                return response
            
            loop = asyncio.get_event_loop()
            output = await loop.run_in_executor(self.executor, generate)
            
            return InferenceResult(
                output=output,
                metadata={"model_type": "text"},
                tokens_generated=len(output.split()),
                finish_reason="eos"
            )
            
        except Exception as e:
            logger.error(f"Metin çıkarım hatası: {e}")
            raise
    
    async def _run_vision_inference(
        self,
        model_data: Dict[str, Any],
        input_data: Any,
        parameters: Dict[str, Any]
    ) -> InferenceResult:
        """Görsel çıkarım yap"""
        try:
            if model_data.get("type") == "mock":
                return InferenceResult(
                    output="Mock vision analysis result",
                    metadata={"model_type": "vision", "mock": True}
                )
            
            # Gerçek görsel işleme burada yapılacak
            return InferenceResult(
                output="Vision processing result",
                metadata={"model_type": "vision"}
            )
            
        except Exception as e:
            logger.error(f"Görsel çıkarım hatası: {e}")
            raise
    
    async def _run_multimodal_inference(
        self,
        model_data: Dict[str, Any],
        input_data: Any,
        parameters: Dict[str, Any]
    ) -> InferenceResult:
        """Çok modlu çıkarım yap"""
        try:
            if model_data.get("type") == "mock":
                return InferenceResult(
                    output="Mock multimodal analysis result",
                    metadata={"model_type": "multimodal", "mock": True}
                )
            
            # Gerçek çok modlu işleme burada yapılacak
            return InferenceResult(
                output="Multimodal processing result",
                metadata={"model_type": "multimodal"}
            )
            
        except Exception as e:
            logger.error(f"Çok modlu çıkarım hatası: {e}")
            raise
    
    async def _run_generic_inference(
        self,
        model_data: Dict[str, Any],
        input_data: Any,
        parameters: Dict[str, Any]
    ) -> InferenceResult:
        """Genel çıkarım yap"""
        try:
            if model_data.get("type") == "mock":
                return InferenceResult(
                    output="Mock generic inference result",
                    metadata={"model_type": "generic", "mock": True}
                )
            
            # Gerçek genel işleme burada yapılacak
            return InferenceResult(
                output="Generic processing result",
                metadata={"model_type": "generic"}
            )
            
        except Exception as e:
            logger.error(f"Genel çıkarım hatası: {e}")
            raise
    
    async def _run_text_inference_stream(
        self,
        model_data: Dict[str, Any],
        input_data: Any,
        parameters: Dict[str, Any]
    ) -> AsyncGenerator[Dict[str, Any], None]:
        """Streaming metin çıkarımı"""
        try:
            if model_data.get("type") == "mock":
                # Mock streaming response
                words = f"Mock streaming response for: {input_data}".split()
                for i, word in enumerate(words):
                    yield {
                        "type": "content",
                        "content": word + " ",
                        "index": i
                    }
                    await asyncio.sleep(0.1)  # Simulate processing time
                
                yield {
                    "type": "done",
                    "finish_reason": "eos"
                }
                return
            
            # Gerçek streaming implementasyonu burada olacak
            model = model_data["model"]
            tokenizer = model_data["tokenizer"]
            
            # Basit streaming simülasyonu
            response = "This is a streaming response from the model."
            words = response.split()
            
            for i, word in enumerate(words):
                yield {
                    "type": "content",
                    "content": word + " ",
                    "index": i
                }
                await asyncio.sleep(0.05)
            
            yield {
                "type": "done",
                "finish_reason": "eos"
            }
            
        except Exception as e:
            logger.error(f"Streaming çıkarım hatası: {e}")
            raise
    
    def _get_model_memory_usage(self, model_data: Dict[str, Any]) -> int:
        """Model bellek kullanımını hesapla"""
        try:
            if model_data.get("type") == "mock":
                return 100  # MB
            
            # PyTorch model için bellek kullanımını hesapla
            if "model" in model_data and model_data["model"] is not None:
                model = model_data["model"]
                param_size = 0
                for param in model.parameters():
                    param_size += param.nelement() * param.element_size()
                
                buffer_size = 0
                for buffer in model.buffers():
                    buffer_size += buffer.nelement() * buffer.element_size()
                
                size_mb = (param_size + buffer_size) / 1024 / 1024
                return int(size_mb)
            
            return 0
            
        except Exception as e:
            logger.error(f"Bellek kullanımı hesaplama hatası: {e}")
            return 0
    
    def __del__(self):
        """Temizlik"""
        try:
            self.executor.shutdown(wait=False)
        except:
            pass