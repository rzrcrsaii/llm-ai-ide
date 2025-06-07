# IDE-Agent HINT: AI Core Package - AI işlevsellik modülleri
"""AI Core Package

Bu paket IDE-Agent'ın AI işlevsellik modüllerini içerir:
- Model yönetimi
- Çıkarım servisleri
- AI yardımcıları
- Performans optimizasyonu
"""

from .model_manager import ModelManager, InferenceResult, ModelInfo

__version__ = "1.0.0"
__all__ = [
    "ModelManager",
    "InferenceResult", 
    "ModelInfo"
]