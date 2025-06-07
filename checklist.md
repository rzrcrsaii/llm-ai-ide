Aşağıda, tüm monorepo ağacına göre “oluşturulacak” path ve dosyaların tam bir **checklist**’ini görebilirsin. Her satırda:

* `[ ]` — henüz oluşturulması gereken dosyayı,
* **Path** — kök `IDE-AGENT-ROOT/` içinden başlayarak,
* **Açıklama** — dosyanın işlevini kısaca.

Eğer bir dosya eksikse ya da fazlaysa, lütfen belirt.

```markdown
# ✅ Oluşturulacak Dosyalar & Path’ler Checklist

## common (paylaşılan tipler & sabitler)
- [ ] `common/package.json` — common paketi tanımı  
- [ ] `common/tsconfig.json` — common TS derleme ayarları  
- [ ] `common/src/constants/index.ts` — genel sabitler  
- [ ] `common/src/constants/ipc-channels.ts` — IPC kanallarının isimleri  
- [ ] `common/src/types/api.ts` — genel API tipleri  
- [ ] `common/src/types/events.ts` — uygulama içi event tipleri  
- [ ] `common/src/types/index.ts` — tip re-export  
- [ ] `common/src/types/models.ts` — ortak veri modelleri  
- [ ] `common/src/types/plugins.ts` — plugin manifest tipleri  
- [ ] `common/src/types/settings.ts` — ayar yapıları  
- [ ] `common/src/utils/index.ts` — yardımcı fonksiyonlar  
- [ ] `common/src/utils/zod-schemas.ts` — Zod ile doğrulama şemaları  

## electron-shell (main process & preload bridges)
- [ ] `electron-shell/package.json`  
- [ ] `electron-shell/tsconfig.json`  
- [ ] `electron-shell/src/main/index.ts` — entry point (app.on ready vs.)  
- [ ] `electron-shell/src/main/window-manager.ts` — ana pencere yönetimi  
- [ ] `electron-shell/src/main/menu-setup.ts` — native menü yapılandırması  
- [ ] `electron-shell/src/main/ipc-main-router.ts` — tüm IPC çağrılarının yöneticisi  
- [ ] `electron-shell/src/main/services/feature-flag-service.ts` — özellik bayrakları  
- [ ] `electron-shell/src/main/services/local-model-service.ts` — yerel LLM yükleme yönetimi  
- [ ] `electron-shell/src/main/services/plugin-manager.ts` — plugin yükleme/otomatik güncelleme  
- [ ] `electron-shell/src/main/services/screen-capture-service.ts` — ekran görüntüsü arayüzü  
- [ ] `electron-shell/src/main/services/security-service.ts` — preload izin kontrolleri  
- [ ] `electron-shell/src/main/services/telemetry-service.ts` — olay / metrik gönderimi  
- [ ] `electron-shell/src/main/services/update-manager.ts` — auto-update akışı  
- [ ] `electron-shell/src/preload/index.ts` — preload genel yükleme  
- [ ] `electron-shell/src/preload/bridges/audio-api-bridge.ts` — ses API köprüsü  
- [ ] `electron-shell/src/preload/bridges/code-editor-api-bridge.ts` — editör API köprüsü  
- [ ] `electron-shell/src/preload/bridges/core-api-bridge.ts` — temel köprü  
- [ ] `electron-shell/src/preload/bridges/debate-api-bridge.ts` — debate köprüsü  
- [ ] `electron-shell/src/preload/bridges/fine-tune-api-bridge.ts` — fine-tune köprüsü  
- [ ] `electron-shell/src/preload/bridges/terminal-api-bridge.ts` — terminal köprüsü  
- [ ] `electron-shell/src/preload/bridges/vision-api-bridge.ts` — vision köprüsü  

## renderer-ui (React + Vite)
- [ ] `renderer-ui/package.json`  
- [ ] `renderer-ui/tsconfig.json`  
- [ ] `renderer-ui/public/favicon.ico`  
- [ ] `renderer-ui/public/index.html`  
### src/assets
- [ ] (SVG, font, resim dosyaları zaten yerleşik)  
### src/styles
- [ ] `renderer-ui/src/styles/global.css`  
- [ ] `renderer-ui/src/styles/theme-variables.css`  
### src/utils
- [ ] `renderer-ui/src/utils/formatters.ts`  
- [ ] `renderer-ui/src/utils/validators.ts`  
### src/hooks
- [ ] `renderer-ui/src/hooks/useAppUpdater.ts`  
- [ ] `renderer-ui/src/hooks/useTelemetry.ts`  
### src/services
- [ ] `renderer-ui/src/services/api-client.ts`  
- [ ] `renderer-ui/src/services/editor-service.ts`  
- [ ] `renderer-ui/src/services/hotkey-service.ts`  
### src/app
- [ ] `renderer-ui/src/app/App.tsx`  
- [ ] `renderer-ui/src/app/Router.tsx`  
- [ ] `renderer-ui/src/app/store.ts`  
- [ ] `renderer-ui/src/app/theme.ts`  
### src/components/common
- [ ] `renderer-ui/src/components/common/Button.tsx`  
- [ ] `renderer-ui/src/components/common/Card.tsx`  
- [ ] `renderer-ui/src/components/common/Icon.tsx`  
- [ ] `renderer-ui/src/components/common/LoadingSpinner.tsx`  
- [ ] `renderer-ui/src/components/common/Modal.tsx`  
### src/components/layout
- [ ] `renderer-ui/src/components/layout/MainLayout.tsx`  
- [ ] `renderer-ui/src/components/layout/Sidebar.tsx`  
- [ ] `renderer-ui/src/components/layout/TopNavbar.tsx`  

### src/features/**  
(Özellik bazlı klasörler; her birine ait `Tab.tsx`, `hooks/`, `components/` dizinleri)

- **agent-config**  
  - [ ] `renderer-ui/src/features/agent-config/AgentConfigTab.tsx`  
  - [ ] `renderer-ui/src/features/agent-config/components/ModelRegistryPanel.tsx`  
  - [ ] `renderer-ui/src/features/agent-config/components/RulesTable.tsx`  

- **audio-speech**  
  - [ ] `renderer-ui/src/features/audio-speech/SpeechLabTab.tsx`  
  - [ ] `renderer-ui/src/features/audio-speech/VoiceTab.tsx`  
  - [ ] `renderer-ui/src/features/audio-speech/hooks/useAsrSocket.ts`  
  - [ ] `renderer-ui/src/features/audio-speech/hooks/useSpeech.ts`  
  - [ ] `renderer-ui/src/features/audio-speech/modals/AudioSettingsModal.tsx`  
  - [ ] `renderer-ui/src/features/audio-speech/components/LanguageSelect.tsx`  
  - [ ] `renderer-ui/src/features/audio-speech/components/MicButton.tsx`  
  - [ ] `renderer-ui/src/features/audio-speech/components/SpeakerButton.tsx`  
  - [ ] `renderer-ui/src/features/audio-speech/components/TranscriptPane.tsx`  

*(Diğer tüm feature klasörlerini de yukarıdaki kalıba göre işaretle: code-editor, collaboration, debate-lab, debug-assistant vs.)*

## backend (FastAPI & Python)
- [ ] `backend/pyproject.toml`  
- [ ] `backend/poetry.lock`  
- [ ] `backend/app/main.py`  
- [ ] `backend/app/api_v1_router.py`  
- [ ] `backend/app/dependencies.py`  
- [ ] `backend/cli.py`  
- [ ] `backend/config/settings.py`  
- [ ] `backend/core/database.py`  
- [ ] `backend/core/security.py`  
- [ ] `backend/utils/file_utils.py`  
- [ ] `backend/utils/text_processing.py`  
- **ai_core**  
  - [ ] `backend/ai_core/embedding_models/base_embedder.py`  
  - [ ] `backend/ai_core/embedding_models/sentence_transformer_embedder.py`  
  - [ ] `backend/ai_core/llm_clients/base_llm_client.py`  
  - [ ] `backend/ai_core/llm_clients/local_gguf_client.py`  
  - [ ] `backend/ai_core/llm_clients/openrouter_client.py`  
  - [ ] `backend/ai_core/vector_db/qdrant_client.py`  
- **features** (her biri `models.py`, `router.py`, `service.py`, gerekirse `schemas.py` / `tasks/`):
  - agent_config, audio_processing, chat_completion, collaboration, debate_lab, debug_assistant, evaluation, fine_tuning, governance, marketplace, model_hub, refactor_engine, review_assistant, search_rag, telemetry, test_automation, tool_runner, vision_assistant, workflow_engine  

## workers (Celery tasks)
- [ ] `workers/Dockerfile.worker`  
- [ ] `workers/requirements.worker.txt`  
- [ ] `workers/celery_app.py`  
- [ ] `workers/ml_tasks/embedding_task.py`  
- [ ] `workers/ml_tasks/evaluation_task.py`  
- [ ] `workers/ml_tasks/fine_tuner_task.py`  

## plugins-core & plugins-external
- [ ] `plugins-core/example-hello-world/plugin.json`  
- [ ] `plugins-core/example-hello-world/dist/index.js`  
- [ ] `plugins-external/README.md`  

## scripts
- [ ] `scripts/bootstrap_dev.sh`  
- [ ] `scripts/build_all.sh`  
- [ ] `scripts/convert_gguf_models.py`  
- [ ] `scripts/db_migrate.sh`  
- [ ] `scripts/fetch_models.sh`  
- [ ] `scripts/test_all.sh`  

## tests
- **backend integration**  
  - [ ] `tests/backend/integration/test_fine_tune_api.py`  
- **backend unit**  
  - [ ] `tests/backend/unit/test_fine_tune_service.py`  
- **electron-shell unit**  
  - [ ] `tests/electron-shell/unit/test_ipc_router.ts`  
- **renderer-ui integration**  
  - [ ] `tests/renderer-ui/integration/model_hub_flow.test.tsx`  
- **renderer-ui unit**  
  - [ ] `tests/renderer-ui/unit/CodeEditor.test.tsx`  
- **e2e**  
  - [ ] `tests/e2e/playwright.config.ts`  
  - [ ] `tests/e2e/specs/onboarding.spec.ts`  
- **fixtures**  
  - [ ] `tests/fixtures/small_dataset.jsonl`  
  - [ ] `tests/fixtures/tutorial_image.png`  

## docs
- [ ] `docs/adr/ADR-0001-record-decisions.md`  
- [ ] `docs/adr/ADR-0002-electron-context-isolation.md`  
- [ ] `docs/api_reference/openapi.md`  
- [ ] `docs/contributing.md`  
- [ ] `docs/developer_guide/build_system.md`  
- [ ] `docs/developer_guide/coding_style.md`  
- [ ] `docs/release_process.md`  
- [ ] `docs/security_overview.md`  
- [ ] `docs/telemetry_policy.md`  
- [ ] `docs/user_guide/getting_started.md`  
- [ ] `docs/user_guide/model_hub.md`  
- [ ] `docs/user_guide/troubleshooting.md`  
# ✅ Oluşturulacak Dosyalar & Path’ler Checklist

## common (S54–S57)
- [ ] `common/package.json` (S57)  
  — common workspace tanımı, bağımlılıklar  
- [ ] `common/tsconfig.json` (S57)  
  — common derleme ayarları  
- [ ] `common/src/constants/index.ts` (S54)  
  — genel sabitler  
- [ ] `common/src/constants/ipc-channels.ts` (S54,S08)  
  — IPC kanal adları  
- [ ] `common/src/types/api.ts` (S54)  
  — REST API istek/yanıt tipleri  
- [ ] `common/src/types/events.ts` (S54)  
  — uygulama-içi event tipleri  
- [ ] `common/src/types/index.ts` (S54)  
  — tiplerin tek noktadan re-export’u  
- [ ] `common/src/types/models.ts` (S54)  
  — paylaşılan veri modelleri  
- [ ] `common/src/types/plugins.ts` (S54,S03)  
  — plugin manifest tipleri  
- [ ] `common/src/types/settings.ts` (S54,S06)  
  — kullanıcı ayarları tipleri  
- [ ] `common/src/utils/index.ts` (S54)  
  — yardımcı fonksiyonlar  
- [ ] `common/src/utils/zod-schemas.ts` (S54)  
  — Zod şemaları  

> ⚠️ **Eksik**  
> - Hiçbir `README.md` veya `CHANGELOG.md` yok; common içi belgelendirme için eklenebilir.

---

## electron-shell (S00–S58)
### package & config
- [ ] `electron-shell/package.json` (S57)  
  — renderer & main bağımlılıkları  
- [ ] `electron-shell/tsconfig.json` (S57)  
  — TS derleme  

### src/main
- [ ] `electron-shell/src/main/index.ts` (S00)  
  — Electron app başlangıç  
- [ ] `electron-shell/src/main/window-manager.ts` (S00)  
  — BrowserWindow yönetimi  
- [ ] `electron-shell/src/main/menu-setup.ts` (S06)  
  — native menü  
- [ ] `electron-shell/src/main/ipc-main-router.ts` (S08,S58)  
  — tüm IPC isteklerinin yönlendirilmesi  
- [ ] `electron-shell/src/main/services/feature-flag-service.ts` (S08,S52)  
  — feature toggle  
- [ ] `electron-shell/src/main/services/local-model-service.ts` (S01,S14,S55)  
  — yerel model indirme & önbellekleme  
- [ ] `electron-shell/src/main/services/plugin-manager.ts` (S03,S22,S26,S56)  
  — plugin yükle/güncelle  
- [ ] `electron-shell/src/main/services/screen-capture-service.ts` (S16,S27,S31)  
  — ekran görüntüsü alma  
- [ ] `electron-shell/src/main/services/security-service.ts` (S50)  
  — preload izin politikası  
- [ ] `electron-shell/src/main/services/telemetry-service.ts` (S19,S21,S29,S53)  
  — metrik / event toplama  
- [ ] `electron-shell/src/main/services/update-manager.ts` (S07,S20,S26)  
  — AutoUpdater akışı  

> ⚠️ **Eksik**  
> - `electron-shell/src/main/services/crash-reporter.ts` — S44’de Sentry/Crashpad eklendiği için burası listelenmeli.  

### src/preload
- [ ] `electron-shell/src/preload/index.ts` (S00)  
  — tüm köprüleri expose eder  
- [ ] `electron-shell/src/preload/bridges/audio-api-bridge.ts` (S17,S58)  
  — ASR/TTS çağrıları  
- [ ] `electron-shell/src/preload/bridges/code-editor-api-bridge.ts` (S02,S58)  
  — editör komutları  
- [ ] `electron-shell/src/preload/bridges/core-api-bridge.ts` (S00)  
  — temel uygulama köprüleri  
- [ ] `electron-shell/src/preload/bridges/debate-api-bridge.ts` (S05,S58)  
  — debate akışı  
- [ ] `electron-shell/src/preload/bridges/fine-tune-api-bridge.ts` (S04,S58)  
  — fine-tune kontrol  
- [ ] `electron-shell/src/preload/bridges/terminal-api-bridge.ts` (S03,S58)  
  — terminal komutları  
- [ ] `electron-shell/src/preload/bridges/vision-api-bridge.ts` (S09,S58)  
  — vision soruları  

> ⚠️ **Eksik**  
> - `electron-shell/src/preload/bridges/workflow-api-bridge.ts` — Sprint 49 Workflow Builder için eklenmeli.  

İşte monorepo’daki tüm alt dizinler için eksiksiz “oluşturulacak dosyalar” checklist’i. Her satırda:

* `[ ]` — oluşturulacak dosya,
* **Path** — `IDE-AGENT-ROOT/` içinden başlayarak,
* **Açıklama** — dosyanın işlevi.

Eksik olan iki dosya da eklendi (`crash-reporter.ts`, `workflow-api-bridge.ts`).

```markdown
# ✅ Oluşturulacak Dosyalar & Path’ler Checklist

## common (S54–S57)
- [ ] `common/package.json` — common workspace tanımı  
- [ ] `common/tsconfig.json` — common TS derleme ayarları  
- [ ] `common/src/constants/index.ts` — genel sabitler  
- [ ] `common/src/constants/ipc-channels.ts` — IPC kanal adları  
- [ ] `common/src/types/api.ts` — REST API tipleri  
- [ ] `common/src/types/events.ts` — uygulama içi event tipleri  
- [ ] `common/src/types/index.ts` — tiplerin tek noktadan re-export’u  
- [ ] `common/src/types/models.ts` — paylaşılan veri modelleri  
- [ ] `common/src/types/plugins.ts` — plugin manifest tipleri  
- [ ] `common/src/types/settings.ts` — kullanıcı ayarları tipleri  
- [ ] `common/src/utils/index.ts` — yardımcı fonksiyonlar  
- [ ] `common/src/utils/zod-schemas.ts` — Zod doğrulama şemaları  
- [ ] `common/README.md` — common modülü için kısa belge  
- [ ] `common/CHANGELOG.md` — common sürüm notları  

## electron-shell (S00–S58)

### Konfigürasyon
- [ ] `electron-shell/package.json` — main & preload bağımlılıkları  
- [ ] `electron-shell/tsconfig.json` — TS derleme ayarları  

### src/main
- [ ] `electron-shell/src/main/index.ts` — Electron app başlangıç noktası  
- [ ] `electron-shell/src/main/window-manager.ts` — BrowserWindow yönetimi  
- [ ] `electron-shell/src/main/menu-setup.ts` — native menü yapısı  
- [ ] `electron-shell/src/main/ipc-main-router.ts` — IPC isteği yönlendirme  
- [ ] `electron-shell/src/main/services/feature-flag-service.ts` — feature toggle  
- [ ] `electron-shell/src/main/services/local-model-service.ts` — yerel model yönetimi  
- [ ] `electron-shell/src/main/services/plugin-manager.ts` — plugin yükle/güncelle  
- [ ] `electron-shell/src/main/services/screen-capture-service.ts` — ekran görüntüsü  
- [ ] `electron-shell/src/main/services/security-service.ts` — preload izin kontrol  
- [ ] `electron-shell/src/main/services/telemetry-service.ts` — metrik toplama  
- [ ] `electron-shell/src/main/services/update-manager.ts` — auto-update akışı  
- [ ] `electron-shell/src/main/services/crash-reporter.ts` — Sentry/Crashpad entegrasyonu  

### src/preload
- [ ] `electron-shell/src/preload/index.ts` — bütün köprüleri expose eder  
- [ ] `electron-shell/src/preload/bridges/audio-api-bridge.ts` — ASR/TTS çağrıları  
- [ ] `electron-shell/src/preload/bridges/code-editor-api-bridge.ts` — editör API  
- [ ] `electron-shell/src/preload/bridges/core-api-bridge.ts` — temel köprüler  
- [ ] `electron-shell/src/preload/bridges/debate-api-bridge.ts` — debate akışı  
- [ ] `electron-shell/src/preload/bridges/fine-tune-api-bridge.ts` — fine-tune  
- [ ] `electron-shell/src/preload/bridges/terminal-api-bridge.ts` — terminal komutları  
- [ ] `electron-shell/src/preload/bridges/vision-api-bridge.ts` — vision soruları  
- [ ] `electron-shell/src/preload/bridges/workflow-api-bridge.ts` — workflow builder  

---

*(Diğer dizinler için aynı formatta devam edeceğiz: `renderer-ui/`, `backend/`, `workers/`, `scripts/`, `tests/`, `docs/`.)*  
```

Bu iki modülün checklist’i artık eksiksiz. Devamında diğer ana dizinleri de bu şablona uygun olarak tek seferde çıkarabilirim. Benzer bir listeleme ister misin?
# ✅ Oluşturulacak Dosyalar & Path’ler Checklist

## common (S54–S57)
- [ ] `common/package.json` — common workspace tanımı  
- [ ] `common/tsconfig.json` — common TS derleme ayarları  
- [ ] `common/src/constants/index.ts` — genel sabitler  
- [ ] `common/src/constants/ipc-channels.ts` — IPC kanal adları  
- [ ] `common/src/types/api.ts` — REST API tipleri  
- [ ] `common/src/types/events.ts` — uygulama içi event tipleri  
- [ ] `common/src/types/index.ts` — tiplerin tek noktadan re-export’u  
- [ ] `common/src/types/models.ts` — paylaşılan veri modelleri  
- [ ] `common/src/types/plugins.ts` — plugin manifest tipleri  
- [ ] `common/src/types/settings.ts` — kullanıcı ayarları tipleri  
- [ ] `common/src/utils/index.ts` — yardımcı fonksiyonlar  
- [ ] `common/src/utils/zod-schemas.ts` — Zod doğrulama şemaları  
- [ ] `common/README.md` — common modülü için kısa belge  
- [ ] `common/CHANGELOG.md` — common sürüm notları  

## electron-shell (S00–S58)

### Konfigürasyon
- [ ] `electron-shell/package.json` — main & preload bağımlılıkları  
- [ ] `electron-shell/tsconfig.json` — TS derleme ayarları  

### src/main
- [ ] `electron-shell/src/main/index.ts` — Electron app başlangıç noktası  
- [ ] `electron-shell/src/main/window-manager.ts` — BrowserWindow yönetimi  
- [ ] `electron-shell/src/main/menu-setup.ts` — native menü yapısı  
- [ ] `electron-shell/src/main/ipc-main-router.ts` — IPC isteği yönlendirme  
- [ ] `electron-shell/src/main/services/feature-flag-service.ts` — feature toggle  
- [ ] `electron-shell/src/main/services/local-model-service.ts` — yerel model yönetimi  
- [ ] `electron-shell/src/main/services/plugin-manager.ts` — plugin yükle/güncelle  
- [ ] `electron-shell/src/main/services/screen-capture-service.ts` — ekran görüntüsü  
- [ ] `electron-shell/src/main/services/security-service.ts` — preload izin kontrol  
- [ ] `electron-shell/src/main/services/telemetry-service.ts` — metrik toplama  
- [ ] `electron-shell/src/main/services/update-manager.ts` — auto-update akışı  
- [ ] `electron-shell/src/main/services/crash-reporter.ts` — Sentry/Crashpad entegrasyonu  

### src/preload
- [ ] `electron-shell/src/preload/index.ts` — tüm köprüleri expose eder  
- [ ] `electron-shell/src/preload/bridges/audio-api-bridge.ts` — ASR/TTS çağrıları  
- [ ] `electron-shell/src/preload/bridges/code-editor-api-bridge.ts` — editör API  
- [ ] `electron-shell/src/preload/bridges/core-api-bridge.ts` — temel köprüler  
- [ ] `electron-shell/src/preload/bridges/debate-api-bridge.ts` — debate akışı  
- [ ] `electron-shell/src/preload/bridges/fine-tune-api-bridge.ts` — fine-tune  
- [ ] `electron-shell/src/preload/bridges/terminal-api-bridge.ts` — terminal komutları  
- [ ] `electron-shell/src/preload/bridges/vision-api-bridge.ts` — vision soruları  
- [ ] `electron-shell/src/preload/bridges/workflow-api-bridge.ts` — workflow builder  

---

## renderer-ui (S00–S58, React + Vite)

### Konfigürasyon & Public
- [ ] `renderer-ui/package.json`  
- [ ] `renderer-ui/tsconfig.json`  
- [ ] `renderer-ui/public/favicon.ico`  
- [ ] `renderer-ui/public/index.html`  

### styles & assets
- [ ] `renderer-ui/src/styles/global.css`  
- [ ] `renderer-ui/src/styles/theme-variables.css`  
- [ ] `renderer-ui/src/assets/*` — SVG, font, resim vs.  

### utils & hooks & services
- [ ] `renderer-ui/src/utils/formatters.ts`  
- [ ] `renderer-ui/src/utils/validators.ts`  
- [ ] `renderer-ui/src/hooks/useAppUpdater.ts`  
- [ ] `renderer-ui/src/hooks/useTelemetry.ts`  
- [ ] `renderer-ui/src/services/api-client.ts`  
- [ ] `renderer-ui/src/services/editor-service.ts`  
- [ ] `renderer-ui/src/services/hotkey-service.ts`  

### app altyapısı
- [ ] `renderer-ui/src/app/App.tsx`  
- [ ] `renderer-ui/src/app/Router.tsx`  
- [ ] `renderer-ui/src/app/store.ts`  
- [ ] `renderer-ui/src/app/theme.ts`  

### component: common
- [ ] `renderer-ui/src/components/common/Button.tsx`  
- [ ] `renderer-ui/src/components/common/Card.tsx`  
- [ ] `renderer-ui/src/components/common/Icon.tsx`  
- [ ] `renderer-ui/src/components/common/LoadingSpinner.tsx`  
- [ ] `renderer-ui/src/components/common/Modal.tsx`  

### component: layout
- [ ] `renderer-ui/src/components/layout/MainLayout.tsx`  
- [ ] `renderer-ui/src/components/layout/Sidebar.tsx`  
- [ ] `renderer-ui/src/components/layout/TopNavbar.tsx`  

### features (her biri Tab, hooks/, components/)
- **agent-config**  
  - [ ] `renderer-ui/src/features/agent-config/AgentConfigTab.tsx`  
  - [ ] `renderer-ui/src/features/agent-config/components/ModelRegistryPanel.tsx`  
  - [ ] `renderer-ui/src/features/agent-config/components/RulesTable.tsx`  

- **audio-speech**  
  - [ ] `renderer-ui/src/features/audio-speech/SpeechLabTab.tsx`  
  - [ ] `renderer-ui/src/features/audio-speech/VoiceTab.tsx`  
  - [ ] `renderer-ui/src/features/audio-speech/hooks/useAsrSocket.ts`  
  - [ ] `renderer-ui/src/features/audio-speech/hooks/useSpeech.ts`  
  - [ ] `renderer-ui/src/features/audio-speech/modals/AudioSettingsModal.tsx`  
  - [ ] `renderer-ui/src/features/audio-speech/components/LanguageSelect.tsx`  
  - [ ] `renderer-ui/src/features/audio-speech/components/MicButton.tsx`  
  - [ ] `renderer-ui/src/features/audio-speech/components/SpeakerButton.tsx`  
  - [ ] `renderer-ui/src/features/audio-speech/components/TranscriptPane.tsx`  

- **code-editor**  
  - [ ] `renderer-ui/src/features/code-editor/CodeEditorTab.tsx`  
  - [ ] `renderer-ui/src/features/code-editor/MonacoEditorWrapper.tsx`  
  - [ ] `renderer-ui/src/features/code-editor/providers/inlineLLMCompletionProvider.ts`  

- **collaboration**  
  - [ ] `renderer-ui/src/features/collaboration/ChatPanel.tsx`  
  - [ ] `renderer-ui/src/features/collaboration/CollabEditorWrapper.tsx`  
  - [ ] `renderer-ui/src/features/collaboration/PresenceOverlay.tsx`  
  - [ ] `renderer-ui/src/features/collaboration/hooks/useCollabClient.ts`  

- **debate-lab**  
  - [ ] `renderer-ui/src/features/debate-lab/DebateLabTab.tsx`  
  - [ ] `renderer-ui/src/features/debate-lab/hooks/useDebate.ts`  
  - [ ] `renderer-ui/src/features/debate-lab/components/DebateStream.tsx`  
  - [ ] `renderer-ui/src/features/debate-lab/components/PromptBox.tsx`  
  - [ ] `renderer-ui/src/features/debate-lab/components/ScorePanel.tsx`  

- **debug-assistant**  
  - [ ] `renderer-ui/src/features/debug-assistant/DebugTab.tsx`  

- **eval-board**  
  - [ ] `renderer-ui/src/features/eval-board/EvalBoardTab.tsx`  
  - [ ] `renderer-ui/src/features/eval-board/components/EvalRunForm.tsx`  
  - [ ] `renderer-ui/src/features/eval-board/components/LeaderboardChart.tsx`  

- **feedback-beta**  
  - [ ] `renderer-ui/src/features/feedback-beta/ABTestWrapper.tsx`  
  - [ ] `renderer-ui/src/features/feedback-beta/FeedbackWidget.tsx`  

- **fine-tuning**  
  - [ ] `renderer-ui/src/features/fine-tuning/FineTuneTab.tsx`  
  - [ ] `renderer-ui/src/features/fine-tuning/hooks/useFineTune.ts`  
  - [ ] `renderer-ui/src/features/fine-tuning/components/AdapterRegistryPanel.tsx`  
  - [ ] `renderer-ui/src/features/fine-tuning/components/ConfigPane.tsx`  
  - [ ] `renderer-ui/src/features/fine-tuning/components/DatasetPane.tsx`  
  - [ ] `renderer-ui/src/features/fine-tuning/components/JobMonitor.tsx`  

- **marketplace**  
  - [ ] `renderer-ui/src/features/marketplace/PluginStoreTab.tsx`  
  - [ ] `renderer-ui/src/features/marketplace/components/PluginCard.tsx`  

- **model-hub**  
  - [ ] `renderer-ui/src/features/model-hub/ModelHubTab.tsx`  
  - [ ] `renderer-ui/src/features/model-hub/hooks/useModelHub.ts`  
  - [ ] `renderer-ui/src/features/model-hub/store/modelHubSlice.ts`  
  - [ ] `renderer-ui/src/features/model-hub/components/DownloadQueue.tsx`  
  - [ ] `renderer-ui/src/features/model-hub/components/LocalList.tsx`  
  - [ ] `renderer-ui/src/features/model-hub/components/ModelCard.tsx`  
  - [ ] `renderer-ui/src/features/model-hub/components/RemoteGallery.tsx`  

- **refactor-tools**  
  - [ ] `renderer-ui/src/features/refactor-tools/RefactorPanel.tsx`  
  - [ ] `renderer-ui/src/features/refactor-tools/ReviewPanel.tsx`  

- **search-rag**  
  - [ ] `renderer-ui/src/features/search-rag/SearchTab.tsx`  
  - [ ] `renderer-ui/src/features/search-rag/hooks/useDocSearch.ts`  
  - [ ] `renderer-ui/src/features/search-rag/hooks/useSmartSearch.ts`  
  - [ ] `renderer-ui/src/features/search-rag/components/DocPopup.tsx`  
  - [ ] `renderer-ui/src/features/search-rag/components/ResultCard.tsx`  
  - [ ] `renderer-ui/src/features/search-rag/components/SnippetCard.tsx`  

- **terminal**  
  - [ ] `renderer-ui/src/features/terminal/TerminalTab.tsx`  
  - [ ] `renderer-ui/src/features/terminal/XtermWrapper.tsx`  

- **test-automation**  
  - [ ] `renderer-ui/src/features/test-automation/TestAutomationTab.tsx`  
  - [ ] `renderer-ui/src/features/test-automation/components/CoverageReportView.tsx`  
  - [ ] `renderer-ui/src/features/test-automation/components/TestDiffViewer.tsx`  

- **vision-assistant**  
  - [ ] `renderer-ui/src/features/vision-assistant/VisionTab.tsx`  
  - [ ] `renderer-ui/src/features/vision-assistant/hooks/useVisionChat.ts`  
  - [ ] `renderer-ui/src/features/vision-assistant/components/BBoxOverlay.tsx`  
  - [ ] `renderer-ui/src/features/vision-assistant/components/ImageChatPanel.tsx`  
  - [ ] `renderer-ui/src/features/vision-assistant/components/ImageDropZone.tsx`  
  - [ ] `renderer-ui/src/features/vision-assistant/components/VisionChatPanel.tsx`  

- **workflow-builder**  
  - [ ] `renderer-ui/src/features/workflow-builder/WorkflowBuilderTab.tsx`  
  - [ ] `renderer-ui/src/features/workflow-builder/components/NodeEditor.tsx`  
  - [ ] `renderer-ui/src/features/workflow-builder/components/WorkflowPalette.tsx`  

---

## backend (S00–S58, FastAPI & Python)
- [ ] `backend/pyproject.toml` — projenin bağımlılıkları  
- [ ] `backend/poetry.lock` — kilit dosyası  
- [ ] `backend/app/main.py` — FastAPI uygulama giriş noktası  
- [ ] `backend/app/api_v1_router.py` — tüm API router’ları  
- [ ] `backend/app/dependencies.py` — ortak bağımlılıklar  
- [ ] `backend/cli.py` — CLI yardımcıları  
- [ ] `backend/config/settings.py` — ayar yönetimi  
- [ ] `backend/core/database.py` — DB bağlantısı  
- [ ] `backend/core/security.py` — güvenlik utilities  
- [ ] `backend/utils/file_utils.py` — dosya işlemleri  
- [ ] `backend/utils/text_processing.py` — metin işleme fonksiyonları  

### ai_core
- [ ] `backend/ai_core/embedding_models/base_embedder.py`  
- [ ] `backend/ai_core/embedding_models/sentence_transformer_embedder.py`  
- [ ] `backend/ai_core/llm_clients/base_llm_client.py`  
- [ ] `backend/ai_core/llm_clients/local_gguf_client.py`  
- [ ] `backend/ai_core/llm_clients/openrouter_client.py`  
- [ ] `backend/ai_core/vector_db/qdrant_client.py`  

### features (her biri models.py, router.py, service.py; gerekirse schemas.py / tasks/)
- **agent_config**  
- **audio_processing**  
- **chat_completion**  
- **collaboration**  
- **debate_lab**  
- **debug_assistant**  
- **evaluation** (+ tasks/base_eval_task.py, human_eval_task.py, mt_bench_task.py)  
- **fine_tuning**  
- **governance**  
- **marketplace**  
- **model_hub**  
- **refactor_engine**  
- **review_assistant**  
- **search_rag** (+ prompts/*.j2)  
- **telemetry**  
- **test_automation**  
- **tool_runner**  
- **vision_assistant** (+ prompts/*.j2)  
- **workflow_engine**  

*(Her feature klasörü altında ilgili `.py` dosyalarını oluştur.)*

---

## workers (S55)
- [ ] `workers/Dockerfile.worker` — worker image tanımı  
- [ ] `workers/requirements.worker.txt` — Python bağımlılıkları  
- [ ] `workers/celery_app.py` — Celery uygulama  
- [ ] `workers/ml_tasks/embedding_task.py` — embedding job  
- [ ] `workers/ml_tasks/evaluation_task.py` — evaluation job  
- [ ] `workers/ml_tasks/fine_tuner_task.py` — fine-tune job  

---

## plugins-core / plugins-external
- [ ] `plugins-core/example-hello-world/plugin.json` — plugin manifest  
- [ ] `plugins-core/example-hello-world/dist/index.js` — plugin bundle  
- [ ] `plugins-external/README.md` — kullanıcı eklentileri klasörü açıklaması  

---

## scripts
- [ ] `scripts/bootstrap_dev.sh` — geliştirme ortamı kurulumu  
- [ ] `scripts/build_all.sh` — tüm paketleri derleme  
- [ ] `scripts/convert_gguf_models.py` — GGUF dönüştürücü  
- [ ] `scripts/db_migrate.sh` — DB migration helper  
- [ ] `scripts/fetch_models.sh` — model indirme scripti  
- [ ] `scripts/test_all.sh` — bütün testleri çalıştır  

---

## tests
- [ ] `tests/backend/integration/test_fine_tune_api.py`  
- [ ] `tests/backend/unit/test_fine_tune_service.py`  
- [ ] `tests/electron-shell/unit/test_ipc_router.ts`  
- [ ] `tests/renderer-ui/integration/model_hub_flow.test.tsx`  
- [ ] `tests/renderer-ui/unit/CodeEditor.test.tsx`  
- [ ] `tests/e2e/playwright.config.ts`  
- [ ] `tests/e2e/specs/onboarding.spec.ts`  
- [ ] `tests/fixtures/small_dataset.jsonl`  
- [ ] `tests/fixtures/tutorial_image.png`  

---

## docs
- [ ] `docs/adr/ADR-0001-record-decisions.md`  
- [ ] `docs/adr/ADR-0002-electron-context-isolation.md`  
- [ ] `docs/api_reference/openapi.md`  
- [ ] `docs/contributing.md`  
- [ ] `docs/developer_guide/build_system.md`  
- [ ] `docs/developer_guide/coding_style.md`  
- [ ] `docs/release_process.md`  
- [ ] `docs/security_overview.md`  
- [ ] `docs/telemetry_policy.md`  
- [ ] `docs/user_guide/getting_started.md`  
- [ ] `docs/user_guide/model_hub.md`  
- [ ] `docs/user_guide/troubleshooting.md`  
Evet, gözden geçirirken birkaç alan atlanmış:

1. **Kök (root) düzeyindeki konfigürasyon ve dokümanlar**

   * `.github/workflows/ci.yml`
   * `.github/workflows/release.yml`
   * `.github/workflows/nightly-fine-tune.yml`
   * `.github/workflows/e2e-tests.yml`
   * `.env.example`
   * `.gitignore`
   * `.eslintignore`
   * `.eslintrc.js`
   * `.prettierignore`
   * `.prettierrc.js`
   * `Dockerfile`
   * `docker-compose.yml`
   * `pnpm-workspace.yaml`
   * `package.json` (root workspaces tanımı)
   * `tsconfig.base.json`
   * `README.md`

2. **`.github` içindeki diğer iş akışları**

   * `ci.yml`, `release.yml`, `nightly-fine-tune.yml`, `e2e-tests.yml`

Bunları da checklist’e ekleyerek tamamlarsak, tüm repo yapısı eksiksiz olur. Eğer onaylarsan root ve `.github` dosyalarını da listeye ekleyeyim.
# Renderer UI Directory Structure

```
renderer-ui/
├── package.json
├── tsconfig.json
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/
│   │   └── (SVG, fonts, images...)
│   ├── styles/
│   │   ├── global.css
│   │   └── theme-variables.css
│   ├── utils/
│   │   ├── formatters.ts
│   │   └── validators.ts
│   ├── hooks/
│   │   ├── useAppUpdater.ts
│   │   └── useTelemetry.ts
│   ├── services/
│   │   ├── api-client.ts
│   │   ├── editor-service.ts
│   │   ├── hotkey-service.ts
│   │   └── (other shared services)
│   ├── app/
│   │   ├── App.tsx
│   │   ├── Router.tsx
│   │   ├── store.ts
│   │   └── theme.ts
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Icon.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Toast.tsx
│   │   └── layout/
│   │       ├── MainLayout.tsx
│   │       ├── TopNavbar.tsx
│   │       ├── TabBar.tsx
│   │       ├── Sidebar.tsx
│   │       └── StatusBar.tsx
│   └── features/
│       ├── agent-config/
│       │   ├── AgentConfigTab.tsx
│       │   ├── components/
│       │   │   ├── ModelRegistryPanel.tsx
│       │   │   └── RulesTable.tsx
│       │   └── hooks/useAgentConfig.ts
│       ├── audio-speech/
│       │   ├── SpeechLabTab.tsx
│       │   ├── VoiceTab.tsx
│       │   ├── hooks/
│       │   │   ├── useAsrSocket.ts
│       │   │   └── useSpeech.ts
│       │   ├── modals/
│       │   │   └── AudioSettingsModal.tsx
│       │   └── components/
│       │       ├── LanguageSelect.tsx
│       │       ├── MicButton.tsx
│       │       ├── SpeakerButton.tsx
│       │       └── TranscriptPane.tsx
│       ├── code-editor/
│       │   ├── CodeEditorTab.tsx
│       │   ├── MonacoEditorWrapper.tsx
│       │   ├── providers/
│       │   │   └── inlineLLMCompletionProvider.ts
│       │   └── components/
│       │       └── EditorToolbar.tsx
│       ├── collaboration/
│       │   ├── ChatPanel.tsx
│       │   ├── CollabEditorWrapper.tsx
│       │   ├── PresenceOverlay.tsx
│       │   └── hooks/useCollabClient.ts
│       ├── debate-lab/
│       │   ├── DebateLabTab.tsx
│       │   ├── hooks/useDebate.ts
│       │   └── components/
│       │       ├── PromptBox.tsx
│       │       ├── DebateStream.tsx
│       │       └── ScorePanel.tsx
│       ├── debug-assistant/
│       │   └── DebugTab.tsx
│       ├── eval-board/
│       │   ├── EvalBoardTab.tsx
│       │   └── components/
│       │       ├── EvalRunForm.tsx
│       │       └── LeaderboardChart.tsx
│       ├── feedback-beta/
│       │   ├── ABTestWrapper.tsx
│       │   └── FeedbackWidget.tsx
│       ├── fine-tuning/
│       │   ├── FineTuneTab.tsx
│       │   ├── hooks/useFineTune.ts
│       │   └── components/
│       │       ├── AdapterRegistryPanel.tsx
│       │       ├── ConfigPane.tsx
│       │       ├── DatasetPane.tsx
│       │       └── JobMonitor.tsx
│       ├── marketplace/
│       │   ├── PluginStoreTab.tsx
│       │   └── components/PluginCard.tsx
│       ├── model-hub/
│       │   ├── ModelHubTab.tsx
│       │   ├── hooks/useModelHub.ts
│       │   └── components/
│       │       ├── ModelCard.tsx
│       │       ├── LocalList.tsx
│       │       └── DownloadQueue.tsx
│       ├── refactor-tools/
│       │   ├── RefactorPanel.tsx
│       │   └── ReviewPanel.tsx
│       ├── search-rag/
│       │   ├── SearchTab.tsx
│       │   ├── hooks/
│       │   │   ├── useDocSearch.ts
│       │   │   └── useSmartSearch.ts
│       │   └── components/
│       │       ├── DocPopup.tsx
│       │       ├── ResultCard.tsx
│       │       └── SnippetCard.tsx
│       ├── terminal/
│       │   ├── TerminalTab.tsx
│       │   └── XtermWrapper.tsx
│       ├── test-automation/
│       │   ├── TestAutomationTab.tsx
│       │   └── components/
│       │       ├── CoverageReportView.tsx
│       │       └── TestDiffViewer.tsx
│       ├── vision-assistant/
│       │   ├── VisionTab.tsx
│       │   ├── hooks/useVisionChat.ts
│       │   └── components/
│       │       ├── BBoxOverlay.tsx
│       │       ├── ImageDropZone.tsx
│       │       └── VisionChatPanel.tsx
│       └── workflow-builder/
│           ├── WorkflowBuilderTab.tsx
│           └── components/
│               ├── NodeEditor.tsx
│               └── WorkflowPalette.tsx
```

tmm mı ?
Aşağıda, **renderer-ui** katmanınızın “tam ağaç” yapısıyla karşılaştırdığımda eksik kalan dosyaları görebilirsiniz:

```markdown
## ⚠️ Eksik Renderer-UI Dosyaları

### Ortak Bileşenler
- [ ] `renderer-ui/src/components/common/Dropdown.tsx`  
  — Genel açılır menü bileşeni (shadcn/ui wrapper)

### Layout Bileşenleri
> (TabBar.tsx ve StatusBar.tsx zaten ekli)

### Code Editor Sekmesi
- [ ] `renderer-ui/src/features/code-editor/InlineSuggestionBox.tsx`  
  — Satır içi LLM önerilerini gösteren kutu

### Model Hub Sekmesi
- [ ] `renderer-ui/src/features/model-hub/components/RemoteGallery.tsx`  
  — Uzak modelleri listeleyen galeri bileşeni
- [ ] `renderer-ui/src/features/model-hub/store/modelHubSlice.ts`  
  — Zustand/Redux Toolkit ile model-hub state yönetimi

### Debug Assistant
> Sprint 27’de bahsedilen **PatchView** veya **TraceView** gibi ek bileşenler yoksa geçerli, aksi takdirde eklenmeli.

---

Bunları ekledikten sonra **renderer-ui/** dizininiz sprint planlarındaki tüm UI gereksinimlerini karşılayacaktır. Eğer başka eksik fark ederseniz, lütfen haber verin!
```
###########################################################################################################################################################################
# ✅ Oluşturulacak Dosyalar & Path’ler Checklist (Tamamlanmış)

## 📁 .github (S01, S19, S20, S27, S51)
- [ ] `.github/workflows/ci.yml` — Temel CI (lint, test, build)
- [ ] `.github/workflows/release.yml` — Otomatik sürüm paketleme ve yayınlama
- [ ] `.github/workflows/nightly-fine-tune.yml` — Geceleyin otomatik fine-tune işleri
- [ ] `.github/workflows/e2e-tests.yml` — Periyodik veya PR tetikli E2E testleri

## 📁 Kök Dizin (S00, S01, S57)
- [ ] `.env.example` — Geliştirme ortamı için örnek çevre değişkenleri
- [ ] `.eslintignore` — ESLint'in yok sayacağı dosyalar
- [ ] `.eslintrc.js` — ESLint konfigürasyonu
- [ ] `.gitignore` — Git'in yok sayacağı dosyalar
- [ ] `.prettierignore` — Prettier'ın yok sayacağı dosyalar
- [ ] `.prettierrc.js` — Prettier konfigürasyonu
- [ ] `Dockerfile` — Backend ve/veya Electron için ana Docker imajı
- [ ] `docker-compose.yml` — Geliştirme ortamı için servisler (DB, worker vb.)
- [ ] `pnpm-workspace.yaml` — PNPM workspaces tanımı
- [ ] `package.json` — Kök workspace ve script'ler
- [ ] `tsconfig.base.json` — Paylaşılan temel TypeScript ayarları
- [ ] `README.md` — Proje ana açıklaması

## 📁 common (S54–S57)
- [ ] `common/package.json` — common paketi tanımı
- [ ] `common/tsconfig.json` — common TS derleme ayarları
- [ ] `common/src/constants/index.ts` — genel sabitler
- [ ] `common/src/constants/ipc-channels.ts` — IPC kanallarının isimleri
- [ ] `common/src/types/api.ts` — genel API tipleri
- [ ] `common/src/types/events.ts` — uygulama içi event tipleri
- [ ] `common/src/types/index.ts` — tip re-export
- [ ] `common/src/types/models.ts` — ortak veri modelleri
- [ ] `common/src/types/plugins.ts` — plugin manifest tipleri
- [ ] `common/src/types/settings.ts` — ayar yapıları
- [ ] `common/src/utils/index.ts` — yardımcı fonksiyonlar
- [ ] `common/src/utils/zod-schemas.ts` — Zod ile doğrulama şemaları
- [ ] `common/README.md` — common modülü için kısa belge
- [ ] `common/CHANGELOG.md` — common sürüm notları

## 📁 electron-shell (S00–S58)
- [ ] `electron-shell/package.json` — Electron shell paketi tanımı
- [ ] `electron-shell/tsconfig.json` — Electron shell TS derleme ayarları
- [ ] `electron-shell/src/main/index.ts` — Electron ana süreç giriş noktası
- [ ] `electron-shell/src/main/window-manager.ts` — Ana pencere yönetimi
- [ ] `electron-shell/src/main/menu-setup.ts` — Uygulama menüsü yapılandırması
- [ ] `electron-shell/src/main/ipc-main-router.ts` — IPC çağrılarının ana yönlendiricisi
- [ ] `electron-shell/src/main/services/feature-flag-service.ts` — Özellik bayrakları yönetimi
- [ ] `electron-shell/src/main/services/local-model-service.ts` — Yerel LLM yükleme ve yönetimi
- [ ] `electron-shell/src/main/services/plugin-manager.ts` — Eklenti yükleme, güncelleme ve yönetimi
- [ ] `electron-shell/src/main/services/screen-capture-service.ts` — Ekran görüntüsü alma servisi
- [ ] `electron-shell/src/main/services/security-service.ts` — Preload ve IPC güvenlik kontrolleri
- [ ] `electron-shell/src/main/services/telemetry-service.ts` — Olay ve metrik gönderim servisi
- [ ] `electron-shell/src/main/services/update-manager.ts` — Otomatik güncelleme akış yönetimi
- [ ] `electron-shell/src/main/services/crash-reporter.ts` — Çökme raporlama entegrasyonu (Sentry/Crashpad)
- [ ] `electron-shell/src/preload/index.ts` — Preload script ana giriş noktası
- [ ] `electron-shell/src/preload/bridges/audio-api-bridge.ts` — Ses (ASR/TTS) API köprüsü
- [ ] `electron-shell/src/preload/bridges/code-editor-api-bridge.ts` — Kod editörü API köprüsü
- [ ] `electron-shell/src/preload/bridges/core-api-bridge.ts` — Temel uygulama API köprüsü
- [ ] `electron-shell/src/preload/bridges/debate-api-bridge.ts` — Debate Lab API köprüsü
- [ ] `electron-shell/src/preload/bridges/fine-tune-api-bridge.ts` — Fine-tune API köprüsü
- [ ] `electron-shell/src/preload/bridges/terminal-api-bridge.ts` — Terminal API köprüsü
- [ ] `electron-shell/src/preload/bridges/vision-api-bridge.ts` — Vision Assistant API köprüsü
- [ ] `electron-shell/src/preload/bridges/workflow-api-bridge.ts` — Workflow Builder API köprüsü

## 📁 renderer-ui (S00–S58)
- [ ] `renderer-ui/package.json` — Renderer UI paketi tanımı
- [ ] `renderer-ui/tsconfig.json` — Renderer UI TS derleme ayarları
- [ ] `renderer-ui/public/favicon.ico` — Uygulama ikonu
- [ ] `renderer-ui/public/index.html` — Ana HTML sayfası
- [ ] `renderer-ui/src/assets/*` — (SVG, font, resim dosyaları)
- [ ] `renderer-ui/src/styles/global.css` — Genel CSS stilleri
- [ ] `renderer-ui/src/styles/theme-variables.css` — Tema değişkenleri
- [ ] `renderer-ui/src/utils/formatters.ts` — Veri formatlama yardımcıları
- [ ] `renderer-ui/src/utils/validators.ts` — Giriş doğrulama yardımcıları
- [ ] `renderer-ui/src/hooks/useAppUpdater.ts` — Uygulama güncelleme hook'u
- [ ] `renderer-ui/src/hooks/useTelemetry.ts` — Telemetri hook'u
- [ ] `renderer-ui/src/services/api-client.ts` — Backend API istemcisi
- [ ] `renderer-ui/src/services/editor-service.ts` — Monaco editör servis entegrasyonu
- [ ] `renderer-ui/src/services/hotkey-service.ts` — Klavye kısayol yönetimi
- [ ] `renderer-ui/src/app/App.tsx` — Ana React uygulaması
- [ ] `renderer-ui/src/app/Router.tsx` — React Router yapılandırması
- [ ] `renderer-ui/src/app/store.ts` — Global state yönetimi (Zustand/Redux)
- [ ] `renderer-ui/src/app/theme.ts` — Tema ayarları ve sağlayıcısı
- [ ] `renderer-ui/src/components/common/Button.tsx`
- [ ] `renderer-ui/src/components/common/Card.tsx`
- [ ] `renderer-ui/src/components/common/Icon.tsx`
- [ ] `renderer-ui/src/components/common/LoadingSpinner.tsx`
- [ ] `renderer-ui/src/components/common/Modal.tsx`
- [ ] `renderer-ui/src/components/common/Dropdown.tsx`
- [ ] `renderer-ui/src/components/common/Toast.tsx`
- [ ] `renderer-ui/src/components/layout/MainLayout.tsx`
- [ ] `renderer-ui/src/components/layout/Sidebar.tsx`
- [ ] `renderer-ui/src/components/layout/TopNavbar.tsx`
- [ ] `renderer-ui/src/components/layout/TabBar.tsx`
- [ ] `renderer-ui/src/components/layout/StatusBar.tsx`

### 📁 renderer-ui/src/features/*
- **agent-config**
    - [ ] `renderer-ui/src/features/agent-config/AgentConfigTab.tsx`
    - [ ] `renderer-ui/src/features/agent-config/components/ModelRegistryPanel.tsx`
    - [ ] `renderer-ui/src/features/agent-config/components/RulesTable.tsx`
    - [ ] `renderer-ui/src/features/agent-config/hooks/useAgentConfig.ts`
- **audio-speech**
    - [ ] `renderer-ui/src/features/audio-speech/SpeechLabTab.tsx`
    - [ ] `renderer-ui/src/features/audio-speech/VoiceTab.tsx`
    - [ ] `renderer-ui/src/features/audio-speech/hooks/useAsrSocket.ts`
    - [ ] `renderer-ui/src/features/audio-speech/hooks/useSpeech.ts`
    - [ ] `renderer-ui/src/features/audio-speech/modals/AudioSettingsModal.tsx`
    - [ ] `renderer-ui/src/features/audio-speech/components/LanguageSelect.tsx`
    - [ ] `renderer-ui/src/features/audio-speech/components/MicButton.tsx`
    - [ ] `renderer-ui/src/features/audio-speech/components/SpeakerButton.tsx`
    - [ ] `renderer-ui/src/features/audio-speech/components/TranscriptPane.tsx`
- **code-editor**
    - [ ] `renderer-ui/src/features/code-editor/CodeEditorTab.tsx`
    - [ ] `renderer-ui/src/features/code-editor/MonacoEditorWrapper.tsx`
    - [ ] `renderer-ui/src/features/code-editor/providers/inlineLLMCompletionProvider.ts`
    - [ ] `renderer-ui/src/features/code-editor/components/EditorToolbar.tsx`
- **collaboration**
    - [ ] `renderer-ui/src/features/collaboration/ChatPanel.tsx`
    - [ ] `renderer-ui/src/features/collaboration/CollabEditorWrapper.tsx`
    - [ ] `renderer-ui/src/features/collaboration/PresenceOverlay.tsx`
    - [ ] `renderer-ui/src/features/collaboration/hooks/useCollabClient.ts`
- **debate-lab**
    - [ ] `renderer-ui/src/features/debate-lab/DebateLabTab.tsx`
    - [ ] `renderer-ui/src/features/debate-lab/hooks/useDebate.ts`
    - [ ] `renderer-ui/src/features/debate-lab/components/DebateStream.tsx`
    - [ ] `renderer-ui/src/features/debate-lab/components/PromptBox.tsx`
    - [ ] `renderer-ui/src/features/debate-lab/components/ScorePanel.tsx`
- **debug-assistant**
    - [ ] `renderer-ui/src/features/debug-assistant/DebugTab.tsx`
    - [ ] `renderer-ui/src/features/debug-assistant/components/TraceView.tsx` *(Sprint 27)*
    - [ ] `renderer-ui/src/features/debug-assistant/components/PatchView.tsx` *(Sprint 27)*
- **eval-board**
    - [ ] `renderer-ui/src/features/eval-board/EvalBoardTab.tsx`
    - [ ] `renderer-ui/src/features/eval-board/components/EvalRunForm.tsx`
    - [ ] `renderer-ui/src/features/eval-board/components/LeaderboardChart.tsx`
- **feedback-beta**
    - [ ] `renderer-ui/src/features/feedback-beta/ABTestWrapper.tsx`
    - [ ] `renderer-ui/src/features/feedback-beta/FeedbackWidget.tsx`
- **fine-tuning**
    - [ ] `renderer-ui/src/features/fine-tuning/FineTuneTab.tsx`
    - [ ] `renderer-ui/src/features/fine-tuning/hooks/useFineTune.ts`
    - [ ] `renderer-ui/src/features/fine-tuning/components/AdapterRegistryPanel.tsx`
    - [ ] `renderer-ui/src/features/fine-tuning/components/ConfigPane.tsx`
    - [ ] `renderer-ui/src/features/fine-tuning/components/DatasetPane.tsx`
    - [ ] `renderer-ui/src/features/fine-tuning/components/JobMonitor.tsx`
- **marketplace**
    - [ ] `renderer-ui/src/features/marketplace/PluginStoreTab.tsx`
    - [ ] `renderer-ui/src/features/marketplace/components/PluginCard.tsx`
- **model-hub**
    - [ ] `renderer-ui/src/features/model-hub/ModelHubTab.tsx`
    - [ ] `renderer-ui/src/features/model-hub/hooks/useModelHub.ts`
    - [ ] `renderer-ui/src/features/model-hub/store/modelHubSlice.ts`
    - [ ] `renderer-ui/src/features/model-hub/components/DownloadQueue.tsx`
    - [ ] `renderer-ui/src/features/model-hub/components/LocalList.tsx`
    - [ ] `renderer-ui/src/features/model-hub/components/ModelCard.tsx`
    - [ ] `renderer-ui/src/features/model-hub/components/RemoteGallery.tsx`
- **refactor-tools**
    - [ ] `renderer-ui/src/features/refactor-tools/RefactorPanel.tsx`
    - [ ] `renderer-ui/src/features/refactor-tools/ReviewPanel.tsx`
- **search-rag**
    - [ ] `renderer-ui/src/features/search-rag/SearchTab.tsx`
    - [ ] `renderer-ui/src/features/search-rag/hooks/useDocSearch.ts`
    - [ ] `renderer-ui/src/features/search-rag/hooks/useSmartSearch.ts`
    - [ ] `renderer-ui/src/features/search-rag/components/DocPopup.tsx`
    - [ ] `renderer-ui/src/features/search-rag/components/ResultCard.tsx`
    - [ ] `renderer-ui/src/features/search-rag/components/SnippetCard.tsx`
- **terminal**
    - [ ] `renderer-ui/src/features/terminal/TerminalTab.tsx`
    - [ ] `renderer-ui/src/features/terminal/XtermWrapper.tsx`
- **test-automation**
    - [ ] `renderer-ui/src/features/test-automation/TestAutomationTab.tsx`
    - [ ] `renderer-ui/src/features/test-automation/components/CoverageReportView.tsx`
    - [ ] `renderer-ui/src/features/test-automation/components/TestDiffViewer.tsx`
- **vision-assistant**
    - [ ] `renderer-ui/src/features/vision-assistant/VisionTab.tsx`
    - [ ] `renderer-ui/src/features/vision-assistant/hooks/useVisionChat.ts`
    - [ ] `renderer-ui/src/features/vision-assistant/components/BBoxOverlay.tsx`
    - [ ] `renderer-ui/src/features/vision-assistant/components/ImageChatPanel.tsx`
    - [ ] `renderer-ui/src/features/vision-assistant/components/ImageDropZone.tsx`
    - [ ] `renderer-ui/src/features/vision-assistant/components/VisionChatPanel.tsx`
- **workflow-builder**
    - [ ] `renderer-ui/src/features/workflow-builder/WorkflowBuilderTab.tsx`
    - [ ] `renderer-ui/src/features/workflow-builder/components/NodeEditor.tsx`
    - [ ] `renderer-ui/src/features/workflow-builder/components/WorkflowPalette.tsx`

## 📁 backend (S00–S58)
- [ ] `backend/pyproject.toml` — Proje bağımlılıkları ve meta verileri
- [ ] `backend/poetry.lock` — Bağımlılıkların kilit dosyası
- [ ] `backend/alembic/alembic.ini` — Alembic konfigürasyonu
- [ ] `backend/alembic/env.py` — Alembic çevre ayarları
- [ ] `backend/alembic/script.py.mako` — Migration script şablonu
- [ ] `backend/alembic/versions/*` — (Oluşturulacak migration dosyaları)
- [ ] `backend/app/main.py` — FastAPI uygulama giriş noktası
- [ ] `backend/app/api_v1_router.py` — Tüm API router'larını birleştiren ana router
- [ ] `backend/app/dependencies.py` — Genel FastAPI bağımlılıkları (DB session vb.)
- [ ] `backend/cli.py` — Komut satırı arayüzü yardımcıları
- [ ] `backend/config/settings.py` — Uygulama ayarları yönetimi
- [ ] `backend/core/database.py` — Veritabanı bağlantısı ve session yönetimi
- [ ] `backend/core/security.py` — Güvenlik (JWT, parola hashleme) yardımcıları
- [ ] `backend/utils/file_utils.py` — Dosya işlemleri yardımcıları
- [ ] `backend/utils/text_processing.py` — Metin işleme yardımcıları

### 📁 backend/ai_core
- [ ] `backend/ai_core/embedding_models/base_embedder.py` — Temel embedding sınıfı
- [ ] `backend/ai_core/embedding_models/sentence_transformer_embedder.py` — ST ile embedding
- [ ] `backend/ai_core/llm_clients/base_llm_client.py` — Temel LLM istemci sınıfı
- [ ] `backend/ai_core/llm_clients/local_gguf_client.py` — Yerel GGUF modelleri için istemci
- [ ] `backend/ai_core/llm_clients/openrouter_client.py` — OpenRouter API istemcisi
- [ ] `backend/ai_core/vector_db/qdrant_client.py` — Qdrant vektör DB istemcisi

### 📁 backend/features/*
*(Her bir özellik klasörü altında genellikle `models.py`, `router.py`, `service.py` ve gerektiğinde `schemas.py` ve `prompts/` veya `tasks/` alt dizinleri bulunur.)*

- **agent_config**
    - [ ] `backend/features/agent_config/models.py`
    - [ ] `backend/features/agent_config/router.py`
    - [ ] `backend/features/agent_config/schemas.py`
    - [ ] `backend/features/agent_config/service.py`
- **audio_processing**
    - [ ] `backend/features/audio_processing/router.py`
    - [ ] `backend/features/audio_processing/schemas.py`
    - [ ] `backend/features/audio_processing/service.py`
- **chat_completion**
    - [ ] `backend/features/chat_completion/router.py`
    - [ ] `backend/features/chat_completion/service.py`
- **collaboration**
    - [ ] `backend/features/collaboration/models.py`
    - [ ] `backend/features/collaboration/router.py`
    - [ ] `backend/features/collaboration/service.py`
- **debate_lab**
    - [ ] `backend/features/debate_lab/router.py`
    - [ ] `backend/features/debate_lab/schemas.py`
    - [ ] `backend/features/debate_lab/service.py`
- **debug_assistant**
    - [ ] `backend/features/debug_assistant/router.py`
    - [ ] `backend/features/debug_assistant/service.py`
- **evaluation**
    - [ ] `backend/features/evaluation/models.py`
    - [ ] `backend/features/evaluation/router.py`
    - [ ] `backend/features/evaluation/service.py`
    - [ ] `backend/features/evaluation/tasks/base_eval_task.py`
    - [ ] `backend/features/evaluation/tasks/human_eval_task.py`
    - [ ] `backend/features/evaluation/tasks/mt_bench_task.py`
- **fine_tuning**
    - [ ] `backend/features/fine_tuning/models.py`
    - [ ] `backend/features/fine_tuning/router.py`
    - [ ] `backend/features/fine_tuning/schemas.py`
    - [ ] `backend/features/fine_tuning/service.py`
- **governance**
    - [ ] `backend/features/governance/router.py`
    - [ ] `backend/features/governance/service.py`
- **marketplace**
    - [ ] `backend/features/marketplace/router.py`
    - [ ] `backend/features/marketplace/service.py`
- **model_hub**
    - [ ] `backend/features/model_hub/models.py`
    - [ ] `backend/features/model_hub/router.py`
    - [ ] `backend/features/model_hub/schemas.py`
    - [ ] `backend/features/model_hub/service.py`
- **refactor_engine**
    - [ ] `backend/features/refactor_engine/models.py`
    - [ ] `backend/features/refactor_engine/router.py`
    - [ ] `backend/features/refactor_engine/service.py`
- **review_assistant**
    - [ ] `backend/features/review_assistant/router.py`
    - [ ] `backend/features/review_assistant/service.py`
- **search_rag**
    - [ ] `backend/features/search_rag/prompts/rag_code_prompt.j2`
    - [ ] `backend/features/search_rag/prompts/rag_doc_prompt.j2`
    - [ ] `backend/features/search_rag/prompts/rag_web_prompt.j2`
    - [ ] `backend/features/search_rag/router.py`
    - [ ] `backend/features/search_rag/service.py`
- **telemetry**
    - [ ] `backend/features/telemetry/router.py`
    - [ ] `backend/features/telemetry/service.py`
- **test_automation**
    - [ ] `backend/features/test_automation/router.py`
    - [ ] `backend/features/test_automation/service.py`
- **tool_runner**
    - [ ] `backend/features/tool_runner/router.py`
    - [ ] `backend/features/tool_runner/service.py`
- **vision_assistant**
    - [ ] `backend/features/vision_assistant/prompts/vision_caption_prompt.j2`
    - [ ] `backend/features/vision_assistant/prompts/vision_error_analysis_prompt.j2`
    - [ ] `backend/features/vision_assistant/router.py`
    - [ ] `backend/features/vision_assistant/service.py`
- **workflow_engine**
    - [ ] `backend/features/workflow_engine/models.py`
    - [ ] `backend/features/workflow_engine/router.py`
    - [ ] `backend/features/workflow_engine/service.py`

## 📁 workers (S55)
- [ ] `workers/Dockerfile.worker` — Worker Docker imaj tanımı
- [ ] `workers/requirements.worker.txt` — Worker Python bağımlılıkları
- [ ] `workers/celery_app.py` — Celery uygulama örneği
- [ ] `workers/ml_tasks/embedding_task.py` — Embedding Celery görevi
- [ ] `workers/ml_tasks/evaluation_task.py` — Değerlendirme Celery görevi
- [ ] `workers/ml_tasks/fine_tuner_task.py` — Fine-tuning Celery görevi

## 📁 plugins-core (S03, S56)
- [ ] `plugins-core/example-hello-world/plugin.json` — Örnek eklenti manifesti
- [ ] `plugins-core/example-hello-world/dist/index.js` — Örnek eklenti derlenmiş kodu

## 📁 plugins-external (S22, S56)
- [ ] `plugins-external/README.md` — Üçüncü parti eklentilerin tutulacağı yer hakkında açıklama

## 📁 scripts (S01–S57)
- [ ] `scripts/bootstrap_dev.sh` — Geliştirme ortamını başlatan script
- [ ] `scripts/build_all.sh` — Tüm paketleri derleyen script
- [ ] `scripts/convert_gguf_models.py` — Modelleri GGUF formatına dönüştüren script
- [ ] `scripts/db_migrate.sh` — Veritabanı migration script'i
- [ ] `scripts/fetch_models.sh` — Modelleri indiren script
- [ ] `scripts/test_all.sh` — Tüm testleri çalıştıran script

## 📁 tests (S02–S44)
- [ ] `tests/backend/integration/test_fine_tune_api.py` — Fine-tune API entegrasyon testi
- [ ] `tests/backend/unit/test_fine_tune_service.py` — Fine-tune servis birim testi
- [ ] `tests/electron-shell/unit/test_ipc_router.ts` — IPC router birim testi
- [ ] `tests/renderer-ui/integration/model_hub_flow.test.tsx` — Model Hub akış entegrasyon testi
- [ ] `tests/renderer-ui/unit/CodeEditor.test.tsx` — Kod editörü birim testi
- [ ] `tests/e2e/playwright.config.ts` — Playwright E2E test konfigürasyonu
- [ ] `tests/e2e/specs/onboarding.spec.ts` — Onboarding E2E testi
- [ ] `tests/fixtures/small_dataset.jsonl` — Test için küçük veri seti
- [ ] `tests/fixtures/tutorial_image.png` — Test için örnek görsel

## 📁 docs (S00–S50)
- [ ] `docs/adr/ADR-0001-record-decisions.md` — Mimari Karar Kaydı 1
- [ ] `docs/adr/ADR-0002-electron-context-isolation.md` — Mimari Karar Kaydı 2
- [ ] `docs/api_reference/openapi.md` — OpenAPI (Swagger) dokümantasyonu
- [ ] `docs/contributing.md` — Katkıda bulunma rehberi
- [ ] `docs/developer_guide/build_system.md` — Derleme sistemi rehberi
- [ ] `docs/developer_guide/coding_style.md` — Kodlama stili rehberi
- [ ] `docs/release_process.md` — Sürüm çıkarma süreci
- [ ] `docs/security_overview.md` — Güvenlik genel bakışı
- [ ] `docs/telemetry_policy.md` — Telemetri politikası
- [ ] `docs/user_guide/getting_started.md` — Kullanıcı başlangıç rehberi
- [ ] `docs/user_guide/model_hub.md` — Model Hub kullanıcı rehberi
- [ ] `docs/user_guide/troubleshooting.md` — Sorun giderme rehberi