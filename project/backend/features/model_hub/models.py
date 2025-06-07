# IDE-Agent HINT: ModelHub MVP Models - SQLAlchemy ORM modelleri
from datetime import datetime
from typing import Optional, List
from sqlalchemy import Column, String, Integer, Float, DateTime, Text, Boolean, JSON, Enum as SQLEnum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
import enum

Base = declarative_base()

class ModelStatus(enum.Enum):
    """Model durumu enum'u"""
    PENDING = "pending"
    DOWNLOADING = "downloading"
    DOWNLOADED = "downloaded"
    LOADING = "loading"
    LOADED = "loaded"
    ERROR = "error"
    UNLOADED = "unloaded"

class ModelType(enum.Enum):
    """Model tipi enum'u"""
    TEXT = "text"
    CODE = "code"
    VISION = "vision"
    AUDIO = "audio"
    MULTIMODAL = "multimodal"
    CUSTOM = "custom"

class ModelFormat(enum.Enum):
    """Model formatı enum'u"""
    PYTORCH = "pytorch"
    TENSORFLOW = "tensorflow"
    ONNX = "onnx"
    GGUF = "gguf"
    SAFETENSORS = "safetensors"
    HUGGINGFACE = "huggingface"

class ModelRecord(Base):
    """Model kayıt tablosu"""
    __tablename__ = "models"
    
    # Temel bilgiler
    id = Column(String(255), primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    
    # Model özellikleri
    type = Column(SQLEnum(ModelType), nullable=False, default=ModelType.TEXT)
    format = Column(SQLEnum(ModelFormat), nullable=False, default=ModelFormat.PYTORCH)
    status = Column(SQLEnum(ModelStatus), nullable=False, default=ModelStatus.PENDING)
    
    # Boyut ve performans
    size_bytes = Column(Integer, nullable=True)
    parameters = Column(String(50), nullable=True)  # "7B", "13B", "70B" gibi
    quantization = Column(String(50), nullable=True)  # "Q4_0", "Q8_0" gibi
    
    # Metadata
    license = Column(String(100), nullable=True)
    author = Column(String(255), nullable=True)
    version = Column(String(50), nullable=True)
    tags = Column(JSON, nullable=True)  # List[str]
    
    # Dosya bilgileri
    source_url = Column(Text, nullable=True)
    local_path = Column(Text, nullable=True)
    file_hash = Column(String(64), nullable=True)  # SHA-256
    
    # İndirme ve yükleme durumu
    download_progress = Column(Float, default=0.0)
    download_speed = Column(Float, nullable=True)  # MB/s
    
    # Bellek kullanımı
    memory_usage = Column(Integer, nullable=True)  # MB
    gpu_memory_usage = Column(Integer, nullable=True)  # MB
    
    # Performans metrikleri
    load_time = Column(Float, nullable=True)  # saniye
    inference_time = Column(Float, nullable=True)  # ms
    tokens_per_second = Column(Float, nullable=True)
    
    # Kullanım istatistikleri
    usage_count = Column(Integer, default=0)
    last_used = Column(DateTime, nullable=True)
    
    # Yapılandırma
    config = Column(JSON, nullable=True)  # Model-specific config
    
    # Kullanıcı bilgileri
    user_id = Column(String(255), nullable=True, index=True)
    is_public = Column(Boolean, default=False)
    
    # Zaman damgaları
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<ModelRecord(id='{self.id}', name='{self.name}', status='{self.status}')>"

class ModelDownloadTask(Base):
    """Model indirme görevi tablosu"""
    __tablename__ = "model_download_tasks"
    
    # Temel bilgiler
    id = Column(String(255), primary_key=True, index=True)
    model_id = Column(String(255), nullable=False, index=True)
    
    # İndirme bilgileri
    source_url = Column(Text, nullable=False)
    destination_path = Column(Text, nullable=True)
    
    # Durum bilgileri
    status = Column(String(50), nullable=False, default="pending")  # pending, downloading, completed, failed
    progress = Column(Float, default=0.0)  # 0.0 - 1.0
    
    # Hız ve boyut bilgileri
    total_size = Column(Integer, nullable=True)  # bytes
    downloaded_size = Column(Integer, default=0)  # bytes
    download_speed = Column(Float, nullable=True)  # bytes/second
    
    # Hata bilgileri
    error_message = Column(Text, nullable=True)
    retry_count = Column(Integer, default=0)
    max_retries = Column(Integer, default=3)
    
    # Kullanıcı bilgileri
    user_id = Column(String(255), nullable=False, index=True)
    
    # Zaman bilgileri
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    estimated_completion = Column(DateTime, nullable=True)
    
    # Zaman damgaları
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<ModelDownloadTask(id='{self.id}', model_id='{self.model_id}', status='{self.status}')>"

class ModelUsageLog(Base):
    """Model kullanım log tablosu"""
    __tablename__ = "model_usage_logs"
    
    # Temel bilgiler
    id = Column(String(255), primary_key=True, index=True)
    model_id = Column(String(255), nullable=False, index=True)
    user_id = Column(String(255), nullable=False, index=True)
    
    # Kullanım bilgileri
    operation = Column(String(50), nullable=False)  # inference, load, unload
    input_tokens = Column(Integer, nullable=True)
    output_tokens = Column(Integer, nullable=True)
    
    # Performans metrikleri
    execution_time = Column(Float, nullable=True)  # saniye
    memory_used = Column(Integer, nullable=True)  # MB
    gpu_memory_used = Column(Integer, nullable=True)  # MB
    
    # Metadata
    parameters = Column(JSON, nullable=True)  # Kullanılan parametreler
    metadata = Column(JSON, nullable=True)  # Ek bilgiler
    
    # Hata bilgileri
    success = Column(Boolean, default=True)
    error_message = Column(Text, nullable=True)
    
    # Zaman damgası
    timestamp = Column(DateTime, default=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<ModelUsageLog(id='{self.id}', model_id='{self.model_id}', operation='{self.operation}')>"

class ModelBenchmark(Base):
    """Model benchmark sonuçları tablosu"""
    __tablename__ = "model_benchmarks"
    
    # Temel bilgiler
    id = Column(String(255), primary_key=True, index=True)
    model_id = Column(String(255), nullable=False, index=True)
    
    # Benchmark bilgileri
    benchmark_name = Column(String(100), nullable=False)  # "inference_speed", "memory_usage", "accuracy"
    benchmark_type = Column(String(50), nullable=False)  # "performance", "quality", "resource"
    
    # Sonuçlar
    score = Column(Float, nullable=False)
    unit = Column(String(20), nullable=True)  # "ms", "MB", "%", "tokens/s"
    
    # Test koşulları
    test_conditions = Column(JSON, nullable=True)  # Test parametreleri
    hardware_info = Column(JSON, nullable=True)  # Donanım bilgileri
    
    # Metadata
    notes = Column(Text, nullable=True)
    
    # Zaman damgası
    created_at = Column(DateTime, default=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<ModelBenchmark(id='{self.id}', model_id='{self.model_id}', benchmark_name='{self.benchmark_name}')>"

class ModelCompatibility(Base):
    """Model uyumluluk tablosu"""
    __tablename__ = "model_compatibility"
    
    # Temel bilgiler
    id = Column(String(255), primary_key=True, index=True)
    model_id = Column(String(255), nullable=False, index=True)
    
    # Uyumluluk bilgileri
    framework = Column(String(50), nullable=False)  # "pytorch", "tensorflow", "onnx"
    framework_version = Column(String(20), nullable=True)
    
    # Sistem gereksinimleri
    min_ram_mb = Column(Integer, nullable=True)
    min_vram_mb = Column(Integer, nullable=True)
    min_cpu_cores = Column(Integer, nullable=True)
    
    # Platform desteği
    supports_cpu = Column(Boolean, default=True)
    supports_gpu = Column(Boolean, default=False)
    supports_apple_silicon = Column(Boolean, default=False)
    
    # İşletim sistemi desteği
    supports_windows = Column(Boolean, default=True)
    supports_linux = Column(Boolean, default=True)
    supports_macos = Column(Boolean, default=True)
    
    # Ek bilgiler
    notes = Column(Text, nullable=True)
    
    # Zaman damgası
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<ModelCompatibility(id='{self.id}', model_id='{self.model_id}', framework='{self.framework}')>"