# IDE-Agent HINT: ModelHub MVP Schemas - Pydantic modelleri
from pydantic import BaseModel, Field, validator
from typing import List, Optional, Dict, Any, Union
from datetime import datetime
from enum import Enum

class ModelType(str, Enum):
    """Model türleri"""
    TEXT = "text"
    CODE = "code"
    VISION = "vision"
    MULTIMODAL = "multimodal"
    AUDIO = "audio"
    EMBEDDING = "embedding"
    CUSTOM = "custom"

class ModelStatus(str, Enum):
    """Model durumları"""
    AVAILABLE = "available"
    DOWNLOADING = "downloading"
    DOWNLOADED = "downloaded"
    LOADING = "loading"
    LOADED = "loaded"
    ERROR = "error"
    UNLOADED = "unloaded"

class ModelFormat(str, Enum):
    """Model formatları"""
    GGUF = "gguf"
    SAFETENSORS = "safetensors"
    PYTORCH = "pytorch"
    ONNX = "onnx"
    TENSORFLOW = "tensorflow"

class ModelInfo(BaseModel):
    """Temel model bilgileri"""
    id: str
    name: str
    description: Optional[str] = None
    type: ModelType
    format: ModelFormat
    size_bytes: Optional[int] = None
    parameters: Optional[str] = None  # "7B", "13B", etc.
    quantization: Optional[str] = None  # "Q4_0", "Q8_0", etc.
    license: Optional[str] = None
    author: Optional[str] = None
    source_url: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ModelCreateRequest(BaseModel):
    """Model oluşturma isteği"""
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    type: ModelType
    format: ModelFormat
    source_url: Optional[str] = None
    parameters: Optional[str] = None
    quantization: Optional[str] = None
    license: Optional[str] = None
    tags: List[str] = Field(default_factory=list)

    @validator('tags')
    def validate_tags(cls, v):
        if len(v) > 10:
            raise ValueError('En fazla 10 etiket eklenebilir')
        return v

class ModelUpdateRequest(BaseModel):
    """Model güncelleme isteği"""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    tags: Optional[List[str]] = None
    license: Optional[str] = None

    @validator('tags')
    def validate_tags(cls, v):
        if v and len(v) > 10:
            raise ValueError('En fazla 10 etiket eklenebilir')
        return v

class ModelResponse(BaseModel):
    """Model yanıt modeli"""
    id: str
    name: str
    description: Optional[str] = None
    type: ModelType
    format: ModelFormat
    status: ModelStatus
    size_bytes: Optional[int] = None
    parameters: Optional[str] = None
    quantization: Optional[str] = None
    license: Optional[str] = None
    author: Optional[str] = None
    source_url: Optional[str] = None
    local_path: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    download_progress: Optional[float] = None  # 0.0 - 1.0
    memory_usage: Optional[int] = None  # bytes
    is_loaded: bool = False
    created_at: datetime
    updated_at: datetime
    user_id: Optional[str] = None

    class Config:
        from_attributes = True

class ModelListResponse(BaseModel):
    """Model listesi yanıtı"""
    models: List[ModelResponse]
    total: int
    skip: int
    limit: int

class ModelDownloadRequest(BaseModel):
    """Model indirme isteği"""
    model_id: str
    source_url: str
    force_redownload: bool = False

class ModelStatusResponse(BaseModel):
    """Model durum yanıtı"""
    model_id: str
    status: ModelStatus
    is_loaded: bool
    memory_usage: Optional[int] = None
    download_progress: Optional[float] = None
    error_message: Optional[str] = None
    last_used: Optional[datetime] = None
    load_time: Optional[float] = None  # seconds

class ModelInferenceRequest(BaseModel):
    """Model çıkarım isteği"""
    input: Union[str, Dict[str, Any], List[Any]]
    parameters: Optional[Dict[str, Any]] = Field(default_factory=dict)
    stream: bool = False
    max_tokens: Optional[int] = Field(None, ge=1, le=8192)
    temperature: Optional[float] = Field(None, ge=0.0, le=2.0)
    top_p: Optional[float] = Field(None, ge=0.0, le=1.0)
    top_k: Optional[int] = Field(None, ge=1)
    stop_sequences: Optional[List[str]] = None

class ModelInferenceResponse(BaseModel):
    """Model çıkarım yanıtı"""
    model_id: str
    output: Union[str, Dict[str, Any], List[Any]]
    metadata: Dict[str, Any] = Field(default_factory=dict)
    execution_time: float  # seconds
    tokens_generated: Optional[int] = None
    finish_reason: Optional[str] = None

class ModelMetrics(BaseModel):
    """Model metrikleri"""
    model_id: str
    total_requests: int = 0
    total_tokens: int = 0
    average_response_time: float = 0.0
    error_count: int = 0
    last_request: Optional[datetime] = None
    memory_peak: Optional[int] = None

class ModelConfiguration(BaseModel):
    """Model yapılandırması"""
    model_id: str
    max_context_length: Optional[int] = None
    default_temperature: float = 0.7
    default_top_p: float = 0.9
    default_top_k: Optional[int] = None
    default_max_tokens: int = 512
    custom_parameters: Dict[str, Any] = Field(default_factory=dict)
    preprocessing_config: Optional[Dict[str, Any]] = None
    postprocessing_config: Optional[Dict[str, Any]] = None

class ModelBenchmark(BaseModel):
    """Model benchmark sonuçları"""
    model_id: str
    benchmark_type: str  # "speed", "quality", "memory"
    score: float
    unit: str  # "tokens/sec", "MB", "score"
    test_date: datetime
    test_config: Dict[str, Any] = Field(default_factory=dict)
    notes: Optional[str] = None

class ModelCompatibility(BaseModel):
    """Model uyumluluk bilgileri"""
    model_id: str
    supported_platforms: List[str] = Field(default_factory=list)  # ["cpu", "cuda", "metal"]
    min_memory_gb: Optional[float] = None
    recommended_memory_gb: Optional[float] = None
    gpu_memory_gb: Optional[float] = None
    cpu_requirements: Optional[Dict[str, Any]] = None
    os_compatibility: List[str] = Field(default_factory=list)  # ["windows", "linux", "macos"]

class ModelSearchRequest(BaseModel):
    """Model arama isteği"""
    query: Optional[str] = None
    type: Optional[ModelType] = None
    format: Optional[ModelFormat] = None
    status: Optional[ModelStatus] = None
    tags: Optional[List[str]] = None
    min_size: Optional[int] = None
    max_size: Optional[int] = None
    sort_by: Optional[str] = Field("created_at", regex="^(name|size|created_at|updated_at|popularity)$")
    sort_order: Optional[str] = Field("desc", regex="^(asc|desc)$")
    skip: int = Field(0, ge=0)
    limit: int = Field(50, ge=1, le=100)

class ModelExportRequest(BaseModel):
    """Model dışa aktarma isteği"""
    model_id: str
    export_format: str  # "onnx", "tensorrt", "coreml"
    optimization_level: Optional[str] = "default"  # "none", "default", "aggressive"
    target_platform: Optional[str] = None  # "cpu", "gpu", "mobile"
    custom_config: Optional[Dict[str, Any]] = None

class ModelImportRequest(BaseModel):
    """Model içe aktarma isteği"""
    name: str
    source_type: str  # "file", "url", "huggingface", "github"
    source_path: str
    model_type: ModelType
    format: ModelFormat
    description: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    auto_detect_config: bool = True