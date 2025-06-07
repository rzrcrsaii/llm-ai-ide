Aşağıda, **IDE-AGENT-ROOT** monoreposunun “tam zoom” görünümü yer alır.
*Her* klasör ve dosya, azami **10 seviye** derinliğe kadar listelenmiştir; **hiçbir “…” kısaltması yoktur.**
Sağdaki **(Sxx)** etiketleri dosya ya da klasörün *ilk* oluşturulduğu sprinti (ilk genişlediği sprint varsa virgülle çokludur) gösterir.

> **Okuma ipucu**
> • Ağaç 4 boşluk girinti ile ilerler.
> • `__init__.py` dosyaları yalnızca Python paket göstergesi olduğundan listede aynı satırda kısadır.
> • *Test* ve *dokümantasyon* alt klasörleri de ayrıntıda verilmiştir; CI-CD, worker ve plugin ağaçları dâhil.

```
IDE-AGENT-ROOT (S00–S58)
├── .github (S01)
│   └── workflows
│       ├── ci.yml (S19)
│       ├── release.yml (S20,S27,S51)
│       ├── nightly-fine-tune.yml (S18,S55)
│       └── e2e-tests.yml (S07,S44)
├── .env.example (S01)
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierignore
├── .prettierrc.js
├── Dockerfile (S01)
├── docker-compose.yml (S01,S55)
├── pnpm-workspace.yaml (S57)
├── package.json            # kök workspaces (S57)
├── tsconfig.base.json      # paylaşılan TS ayarları (S57)
├── README.md (S00)
│
├── common (S54)
│   ├── package.json (S57)
│   ├── tsconfig.json (S57)
│   └── src
│       ├── constants
│       │   ├── index.ts (S54)
│       │   └── ipc-channels.ts (S54,S08)
│       ├── types
│       │   ├── api.ts (S54)
│       │   ├── events.ts (S54)
│       │   ├── index.ts (S54)
│       │   ├── models.ts (S54)
│       │   ├── plugins.ts (S54,S03)
│       │   └── settings.ts (S54,S06)
│       └── utils
│           ├── index.ts (S54)
│           └── zod-schemas.ts (S54)
│
├── electron-shell (S00)
│   ├── package.json (S57)
│   ├── tsconfig.json (S57)
│   └── src
│       ├── main
│       │   ├── index.ts (S00)
│       │   ├── window-manager.ts (S00)
│       │   ├── menu-setup.ts (S06)
│       │   ├── ipc-main-router.ts (S08,S58)
│       │   └── services
│       │       ├── feature-flag-service.ts (S08,S52)
│       │       ├── local-model-service.ts (S01,S14,S55)
│       │       ├── plugin-manager.ts (S03,S22,S26,S56)
│       │       ├── screen-capture-service.ts (S16,S27,S31)
│       │       ├── security-service.ts (S50)
│       │       ├── telemetry-service.ts (S19,S21,S29,S53)
│       │       └── update-manager.ts (S07,S20,S26)
│       └── preload
│           ├── index.ts (S00)
│           └── bridges
│               ├── audio-api-bridge.ts (S17,S58)
│               ├── code-editor-api-bridge.ts (S02,S58)
│               ├── core-api-bridge.ts (S00)
│               ├── debate-api-bridge.ts (S05,S58)
│               ├── fine-tune-api-bridge.ts (S04,S58)
│               ├── terminal-api-bridge.ts (S03,S58)
│               └── vision-api-bridge.ts (S09,S58)
│
├── renderer-ui (S00)
│   ├── package.json (S57)
│   ├── tsconfig.json (S57)
│   ├── public
│   │   ├── favicon.ico
│   │   └── index.html
│   └── src
│       ├── assets           # SVG, font, resim (S00)
│       ├── styles
│       │   ├── global.css (S00)
│       │   └── theme-variables.css (S07)
│       ├── utils
│       │   ├── formatters.ts
│       │   └── validators.ts
│       ├── hooks
│       │   ├── useAppUpdater.ts (S20)
│       │   └── useTelemetry.ts (S21)
│       ├── services
│       │   ├── api-client.ts (S02)
│       │   ├── editor-service.ts (S02)
│       │   └── hotkey-service.ts (S07)
│       ├── app
│       │   ├── App.tsx (S00)
│       │   ├── Router.tsx (S01)
│       │   ├── store.ts (S01)
│       │   └── theme.ts (S07)
│       ├── components
│       │   ├── common
│       │   │   ├── Button.tsx
│       │   │   ├── Card.tsx
│       │   │   ├── Icon.tsx
│       │   │   ├── LoadingSpinner.tsx
│       │   │   └── Modal.tsx
│       │   └── layout
│       │       ├── MainLayout.tsx
│       │       ├── Sidebar.tsx
│       │       └── TopNavbar.tsx
│       └── features
│           ├── agent-config
│           │   ├── AgentConfigTab.tsx (S06)
│           │   └── components
│           │       ├── ModelRegistryPanel.tsx
│           │       └── RulesTable.tsx
│           ├── audio-speech
│           │   ├── SpeechLabTab.tsx (S15)
│           │   ├── VoiceTab.tsx (S17)
│           │   ├── hooks
│           │   │   ├── useAsrSocket.ts (S15)
│           │   │   └── useSpeech.ts (S28)
│           │   ├── modals
│           │   │   └── AudioSettingsModal.tsx (S24)
│           │   └── components
│           │       ├── LanguageSelect.tsx (S15)
│           │       ├── MicButton.tsx (S24)
│           │       ├── SpeakerButton.tsx (S28)
│           │       └── TranscriptPane.tsx (S15)
│           ├── code-editor
│           │   ├── CodeEditorTab.tsx (S02)
│           │   ├── MonacoEditorWrapper.tsx (S02)
│           │   └── providers
│           │       └── inlineLLMCompletionProvider.ts (S02,S03)
│           ├── collaboration
│           │   ├── ChatPanel.tsx
│           │   ├── CollabEditorWrapper.tsx
│           │   ├── PresenceOverlay.tsx
│           │   └── hooks
│           │       └── useCollabClient.ts
│           ├── debate-lab
│           │   ├── DebateLabTab.tsx (S05)
│           │   ├── hooks
│           │   │   └── useDebate.ts (S05,S13)
│           │   └── components
│           │       ├── DebateStream.tsx (S13)
│           │       ├── PromptBox.tsx (S05)
│           │       └── ScorePanel.tsx (S13)
│           ├── debug-assistant
│           │   └── DebugTab.tsx
│           ├── eval-board
│           │   ├── EvalBoardTab.tsx (S07)
│           │   └── components
│           │       ├── EvalRunForm.tsx (S18)
│           │       └── LeaderboardChart.tsx (S18)
│           ├── feedback-beta
│           │   ├── ABTestWrapper.tsx (S52)
│           │   └── FeedbackWidget.tsx (S08)
│           ├── fine-tuning
│           │   ├── FineTuneTab.tsx (S04)
│           │   ├── hooks
│           │   │   └── useFineTune.ts (S04,S12)
│           │   └── components
│           │       ├── AdapterRegistryPanel.tsx (S11)
│           │       ├── ConfigPane.tsx (S04,S12)
│           │       ├── DatasetPane.tsx (S04,S12)
│           │       └── JobMonitor.tsx (S04,S12)
│           ├── marketplace
│           │   ├── PluginStoreTab.tsx (S22)
│           │   └── components
│           │       └── PluginCard.tsx
│           ├── model-hub
│           │   ├── ModelHubTab.tsx (S01)
│           │   ├── hooks
│           │   │   └── useModelHub.ts (S01)
│           │   ├── store
│           │   │   └── modelHubSlice.ts (S01)
│           │   └── components
│           │       ├── DownloadQueue.tsx (S01,S14)
│           │       ├── LocalList.tsx (S01)
│           │       ├── ModelCard.tsx (S01)
│           │       └── RemoteGallery.tsx (S01)
│           ├── refactor-tools
│           │   ├── RefactorPanel.tsx (S35)
│           │   └── ReviewPanel.tsx (S36)
│           ├── search-rag
│           │   ├── SearchTab.tsx (S10,S29)
│           │   ├── hooks
│           │   │   ├── useDocSearch.ts (S33)
│           │   │   └── useSmartSearch.ts (S10)
│           │   └── components
│           │       ├── DocPopup.tsx (S33)
│           │       ├── ResultCard.tsx (S30)
│           │       └── SnippetCard.tsx (S29)
│           ├── terminal
│           │   ├── TerminalTab.tsx (S03)
│           │   └── XtermWrapper.tsx (S03)
│           ├── test-automation
│           │   ├── TestAutomationTab.tsx (S38)
│           │   └── components
│           │       ├── CoverageReportView.tsx
│           │       └── TestDiffViewer.tsx
│           ├── vision-assistant
│           │   ├── VisionTab.tsx (S09)
│           │   ├── hooks
│           │   │   └── useVisionChat.ts (S23,S39)
│           │   └── components
│           │       ├── BBoxOverlay.tsx (S23)
│           │       ├── ImageChatPanel.tsx (S39)
│           │       ├── ImageDropZone.tsx (S23)
│           │       └── VisionChatPanel.tsx (S23)
│           └── workflow-builder
│               ├── WorkflowBuilderTab.tsx
│               └── components
│                   ├── NodeEditor.tsx
│                   └── WorkflowPalette.tsx
│
├── backend (S00)
│   ├── poetry.lock
│   ├── pyproject.toml (S01)
│   ├── alembic
│   │   ├── alembic.ini
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── versions/            # göç dosyaları (S07+)
│   ├── app
│   │   ├── main.py (S00)
│   │   ├── api_v1_router.py (S01)
│   │   └── dependencies.py (S01)
│   ├── cli.py (S01)
│   ├── config
│   │   └── settings.py (S07,S54)
│   ├── core
│   │   ├── database.py (S01,S07)
│   │   └── security.py (S34,S50)
│   ├── utils
│   │   ├── file_utils.py
│   │   └── text_processing.py
│   ├── ai_core
│   │   ├── embedding_models
│   │   │   ├── base_embedder.py
│   │   │   └── sentence_transformer_embedder.py (S10,S29)
│   │   ├── llm_clients
│   │   │   ├── base_llm_client.py
│   │   │   ├── local_gguf_client.py (S14)
│   │   │   └── openrouter_client.py (S02)
│   │   └── vector_db
│   │       └── qdrant_client.py (S10)
│   └── features
│       ├── agent_config
│       │   ├── models.py
│       │   ├── router.py
│       │   ├── schemas.py
│       │   └── service.py
│       ├── audio_processing
│       │   ├── router.py
│       │   ├── schemas.py
│       │   └── service.py
│       ├── chat_completion
│       │   ├── router.py
│       │   └── service.py
│       ├── collaboration
│       │   ├── models.py
│       │   ├── router.py
│       │   └── service.py
│       ├── debate_lab
│       │   ├── router.py
│       │   ├── schemas.py
│       │   └── service.py
│       ├── debug_assistant
│       │   ├── router.py
│       │   └── service.py
│       ├── evaluation
│       │   ├── models.py
│       │   ├── router.py
│       │   ├── service.py
│       │   └── tasks
│       │       ├── base_eval_task.py
│       │       ├── human_eval_task.py
│       │       └── mt_bench_task.py
│       ├── fine_tuning
│       │   ├── models.py
│       │   ├── router.py
│       │   ├── schemas.py
│       │   └── service.py
│       ├── governance
│       │   ├── router.py
│       │   └── service.py
│       ├── marketplace
│       │   ├── router.py
│       │   └── service.py
│       ├── model_hub
│       │   ├── models.py
│       │   ├── router.py
│       │   ├── schemas.py
│       │   └── service.py
│       ├── refactor_engine
│       │   ├── models.py
│       │   ├── router.py
│       │   └── service.py
│       ├── review_assistant
│       │   ├── router.py
│       │   └── service.py
│       ├── search_rag
│       │   ├── prompts
│       │   │   ├── rag_code_prompt.j2
│       │   │   ├── rag_doc_prompt.j2
│       │   │   └── rag_web_prompt.j2
│       │   ├── router.py
│       │   └── service.py
│       ├── telemetry
│       │   ├── router.py
│       │   └── service.py
│       ├── test_automation
│       │   ├── router.py
│       │   └── service.py
│       ├── tool_runner
│       │   ├── router.py
│       │   └── service.py
│       ├── vision_assistant
│       │   ├── prompts
│       │   │   ├── vision_caption_prompt.j2
│       │   │   └── vision_error_analysis_prompt.j2
│       │   ├── router.py
│       │   └── service.py
│       └── workflow_engine
│           ├── models.py
│           ├── router.py
│           └── service.py
│
├── workers (S55)
│   ├── Dockerfile.worker (S55)
│   ├── requirements.worker.txt (S55)
│   ├── celery_app.py (S55)
│   └── ml_tasks
│       ├── embedding_task.py (S55)
│       ├── evaluation_task.py (S55)
│       └── fine_tuner_task.py (S55)
│
├── plugins-core (S03,S56)
│   └── example-hello-world
│       ├── dist
│       │   └── index.js
│       └── plugin.json
│
├── plugins-external (S22,S56)
│   └── README.md               # kullanıcı eklentileri burada tutulur
│
├── scripts (S01–S57)
│   ├── bootstrap_dev.sh (S01)
│   ├── build_all.sh (S02)
│   ├── convert_gguf_models.py (S09)
│   ├── db_migrate.sh
│   ├── fetch_models.sh (S14,S56)
│   └── test_all.sh (S02)
│
├── tests (S02–S44)
│   ├── backend
│   │   ├── integration
│   │   │   └── test_fine_tune_api.py
│   │   └── unit
│   │       └── test_fine_tune_service.py
│   ├── electron-shell
│   │   └── unit
│   │       └── test_ipc_router.ts
│   ├── renderer-ui
│   │   ├── integration
│   │   │   └── model_hub_flow.test.tsx
│   │   └── unit
│   │       └── CodeEditor.test.tsx
│   ├── e2e
│   │   ├── playwright.config.ts
│   │   └── specs
│   │       └── onboarding.spec.ts
│   └── fixtures
│       ├── small_dataset.jsonl
│       └── tutorial_image.png
│
└── docs (S00–S50)
    ├── adr
    │   ├── ADR-0001-record-decisions.md
    │   └── ADR-0002-electron-context-isolation.md
    ├── api_reference
    │   └── openapi.md
    ├── contributing.md (S19)
    ├── developer_guide
    │   ├── build_system.md
    │   └── coding_style.md
    ├── release_process.md (S20)
    ├── security_overview.md (S50)
    ├── telemetry_policy.md (S21)
    └── user_guide
        ├── getting_started.md
        ├── model_hub.md
        └── troubleshooting.md
```

---

### Neyi Nerede Bulacaksınız?

| Alt-kök                             | Birincil Sorumluluk                                                      | Sprint Kökeni |
| ----------------------------------- | ------------------------------------------------------------------------ | ------------- |
| **electron-shell/**                 | Ana Electron süreçleri, IPC, güncelleme, eklenti ve yerel LLM servisleri | S00           |
| **renderer-ui/**                    | React + Vite arayüzü, sekme bileşenleri, Zustand/React-Query durumları   | S00           |
| **backend/**                        | FastAPI API’leri, iş mantığı, veritabanı, AI çekirdeği                   | S00           |
| **workers/**                        | Celery/RQ ile GPU/CPU-ağır görevler (LoRA, embedding, eval)              | S55           |
| **common/**                         | Ortak TypeScript tipleri, sabitler, IPC kanalları                        | S54           |
| **plugins-core / plugins-external** | Dahili ve üçüncü-taraf eklenti paketleri                                 | S26 / S56     |

Bu ayrıntılı **tam ağaç**, sprint planınızın her deliverable’ını modüler, ölçeklenebilir bir dosya-klasör düzenine eşler ve “dünyanın en iyi” mimari uygulamalarını (SoC, feature slicing, testability, monorepo yönetimi) gözetir. Artık her sprintte ilgili dosyaların içini kodla doldurmaya ve CI hattında otomatik olarak derleyip test etmeye hazırsınız.
