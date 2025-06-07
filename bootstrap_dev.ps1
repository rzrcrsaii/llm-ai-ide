# bootstrap_dev.ps1 - Create directory structure and placeholder files for IDE-AGENT-ROOT monorepo
# Based on the "Tamamlanmış Checklist".

# Usage: run from project root (IDE-AGENT-ROOT) using PowerShell: .\scripts\bootstrap_dev.ps1

Write-Host "🚀 Initializing IDE-AGENT-ROOT project structure..." -ForegroundColor Green

# List of directories to create
# This list includes all directories that contain files or other subdirectories.
# New-Item -ItemType Directory -Force will create parent directories as needed.
$dirs = @(
    ".github/workflows",
    "common/src/constants",
    "common/src/types",
    "common/src/utils",
    "electron-shell/src/main/services",
    "electron-shell/src/preload/bridges",
    "renderer-ui/public",
    "renderer-ui/src/assets",
    "renderer-ui/src/styles",
    "renderer-ui/src/utils",
    "renderer-ui/src/hooks",
    "renderer-ui/src/services",
    "renderer-ui/src/app",
    "renderer-ui/src/components/common",
    "renderer-ui/src/components/layout",
    "renderer-ui/src/features/agent-config/components",
    "renderer-ui/src/features/agent-config/hooks",
    "renderer-ui/src/features/audio-speech/components",
    "renderer-ui/src/features/audio-speech/hooks",
    "renderer-ui/src/features/audio-speech/modals",
    "renderer-ui/src/features/code-editor/components",
    "renderer-ui/src/features/code-editor/providers",
    "renderer-ui/src/features/collaboration/hooks",
    "renderer-ui/src/features/debate-lab/components",
    "renderer-ui/src/features/debate-lab/hooks",
    "renderer-ui/src/features/debug-assistant/components",
    "renderer-ui/src/features/eval-board/components",
    "renderer-ui/src/features/feedback-beta",
    "renderer-ui/src/features/fine-tuning/components",
    "renderer-ui/src/features/fine-tuning/hooks",
    "renderer-ui/src/features/marketplace/components",
    "renderer-ui/src/features/model-hub/components",
    "renderer-ui/src/features/model-hub/hooks",
    "renderer-ui/src/features/model-hub/store",
    "renderer-ui/src/features/refactor-tools",
    "renderer-ui/src/features/search-rag/components",
    "renderer-ui/src/features/search-rag/hooks",
    "renderer-ui/src/features/terminal",
    "renderer-ui/src/features/test-automation/components",
    "renderer-ui/src/features/vision-assistant/components",
    "renderer-ui/src/features/vision-assistant/hooks",
    "renderer-ui/src/features/workflow-builder/components",
    "backend/alembic/versions",
    "backend/app",
    "backend/config",
    "backend/core",
    "backend/utils",
    "backend/ai_core/embedding_models",
    "backend/ai_core/llm_clients",
    "backend/ai_core/vector_db",
    "backend/features/agent_config",
    "backend/features/audio_processing",
    "backend/features/chat_completion",
    "backend/features/collaboration",
    "backend/features/debate_lab",
    "backend/features/debug_assistant",
    "backend/features/evaluation/tasks",
    "backend/features/fine_tuning",
    "backend/features/governance",
    "backend/features/marketplace",
    "backend/features/model_hub",
    "backend/features/refactor_engine",
    "backend/features/review_assistant",
    "backend/features/search_rag/prompts",
    "backend/features/telemetry",
    "backend/features/test_automation",
    "backend/features/tool_runner",
    "backend/features/vision_assistant/prompts",
    "backend/features/workflow_engine",
    "workers/ml_tasks",
    "plugins-core/example-hello-world/dist",
    "plugins-external",
    "scripts",
    "tests/backend/integration",
    "tests/backend/unit",
    "tests/electron-shell/unit",
    "tests/renderer-ui/integration",
    "tests/renderer-ui/unit",
    "tests/e2e/specs",
    "tests/fixtures",
    "docs/adr",
    "docs/api_reference",
    "docs/developer_guide",
    "docs/user_guide"
)

# List of files to create
$files = @(
    # Root
    ".env.example",
    ".eslintignore",
    ".eslintrc.js",
    ".gitignore",
    ".prettierignore",
    ".prettierrc.js",
    "Dockerfile",
    "docker-compose.yml",
    "pnpm-workspace.yaml",
    "package.json",
    "tsconfig.base.json",
    "README.md",

    # .github/workflows
    ".github/workflows/ci.yml",
    ".github/workflows/release.yml",
    ".github/workflows/nightly-fine-tune.yml",
    ".github/workflows/e2e-tests.yml",

    # common
    "common/package.json",
    "common/tsconfig.json",
    "common/src/constants/index.ts",
    "common/src/constants/ipc-channels.ts",
    "common/src/types/api.ts",
    "common/src/types/events.ts",
    "common/src/types/index.ts",
    "common/src/types/models.ts",
    "common/src/types/plugins.ts",
    "common/src/types/settings.ts",
    "common/src/utils/index.ts",
    "common/src/utils/zod-schemas.ts",
    "common/README.md",
    "common/CHANGELOG.md",

    # electron-shell
    "electron-shell/package.json",
    "electron-shell/tsconfig.json",
    "electron-shell/src/main/index.ts",
    "electron-shell/src/main/window-manager.ts",
    "electron-shell/src/main/menu-setup.ts",
    "electron-shell/src/main/ipc-main-router.ts",
    "electron-shell/src/main/services/feature-flag-service.ts",
    "electron-shell/src/main/services/local-model-service.ts",
    "electron-shell/src/main/services/plugin-manager.ts",
    "electron-shell/src/main/services/screen-capture-service.ts",
    "electron-shell/src/main/services/security-service.ts",
    "electron-shell/src/main/services/telemetry-service.ts",
    "electron-shell/src/main/services/update-manager.ts",
    "electron-shell/src/main/services/crash-reporter.ts",
    "electron-shell/src/preload/index.ts",
    "electron-shell/src/preload/bridges/audio-api-bridge.ts",
    "electron-shell/src/preload/bridges/code-editor-api-bridge.ts",
    "electron-shell/src/preload/bridges/core-api-bridge.ts",
    "electron-shell/src/preload/bridges/debate-api-bridge.ts",
    "electron-shell/src/preload/bridges/fine-tune-api-bridge.ts",
    "electron-shell/src/preload/bridges/terminal-api-bridge.ts",
    "electron-shell/src/preload/bridges/vision-api-bridge.ts",
    "electron-shell/src/preload/bridges/workflow-api-bridge.ts",

    # renderer-ui
    "renderer-ui/package.json",
    "renderer-ui/tsconfig.json",
    "renderer-ui/public/favicon.ico",
    "renderer-ui/public/index.html",
    "renderer-ui/src/assets/.gitkeep",
    "renderer-ui/src/styles/global.css",
    "renderer-ui/src/styles/theme-variables.css",
    "renderer-ui/src/utils/formatters.ts",
    "renderer-ui/src/utils/validators.ts",
    "renderer-ui/src/hooks/useAppUpdater.ts",
    "renderer-ui/src/hooks/useTelemetry.ts",
    "renderer-ui/src/services/api-client.ts",
    "renderer-ui/src/services/editor-service.ts",
    "renderer-ui/src/services/hotkey-service.ts",
    "renderer-ui/src/app/App.tsx",
    "renderer-ui/src/app/Router.tsx",
    "renderer-ui/src/app/store.ts",
    "renderer-ui/src/app/theme.ts",
    "renderer-ui/src/components/common/Button.tsx",
    "renderer-ui/src/components/common/Card.tsx",
    "renderer-ui/src/components/common/Icon.tsx",
    "renderer-ui/src/components/common/LoadingSpinner.tsx",
    "renderer-ui/src/components/common/Modal.tsx",
    "renderer-ui/src/components/common/Dropdown.tsx",
    "renderer-ui/src/components/common/Toast.tsx",
    "renderer-ui/src/components/layout/MainLayout.tsx",
    "renderer-ui/src/components/layout/Sidebar.tsx",
    "renderer-ui/src/components/layout/TopNavbar.tsx",
    "renderer-ui/src/components/layout/TabBar.tsx",
    "renderer-ui/src/components/layout/StatusBar.tsx",

    # renderer-ui features
    "renderer-ui/src/features/agent-config/AgentConfigTab.tsx",
    "renderer-ui/src/features/agent-config/components/ModelRegistryPanel.tsx",
    "renderer-ui/src/features/agent-config/components/RulesTable.tsx",
    "renderer-ui/src/features/agent-config/hooks/useAgentConfig.ts",
    "renderer-ui/src/features/audio-speech/SpeechLabTab.tsx",
    "renderer-ui/src/features/audio-speech/VoiceTab.tsx",
    "renderer-ui/src/features/audio-speech/hooks/useAsrSocket.ts",
    "renderer-ui/src/features/audio-speech/hooks/useSpeech.ts",
    "renderer-ui/src/features/audio-speech/modals/AudioSettingsModal.tsx",
    "renderer-ui/src/features/audio-speech/components/LanguageSelect.tsx",
    "renderer-ui/src/features/audio-speech/components/MicButton.tsx",
    "renderer-ui/src/features/audio-speech/components/SpeakerButton.tsx",
    "renderer-ui/src/features/audio-speech/components/TranscriptPane.tsx",
    "renderer-ui/src/features/code-editor/CodeEditorTab.tsx",
    "renderer-ui/src/features/code-editor/MonacoEditorWrapper.tsx",
    "renderer-ui/src/features/code-editor/providers/inlineLLMCompletionProvider.ts",
    "renderer-ui/src/features/code-editor/components/EditorToolbar.tsx",
    "renderer-ui/src/features/code-editor/components/InlineSuggestionBox.tsx",
    "renderer-ui/src/features/collaboration/ChatPanel.tsx",
    "renderer-ui/src/features/collaboration/CollabEditorWrapper.tsx",
    "renderer-ui/src/features/collaboration/PresenceOverlay.tsx",
    "renderer-ui/src/features/collaboration/hooks/useCollabClient.ts",
    "renderer-ui/src/features/debate-lab/DebateLabTab.tsx",
    "renderer-ui/src/features/debate-lab/hooks/useDebate.ts",
    "renderer-ui/src/features/debate-lab/components/DebateStream.tsx",
    "renderer-ui/src/features/debate-lab/components/PromptBox.tsx",
    "renderer-ui/src/features/debate-lab/components/ScorePanel.tsx",
    "renderer-ui/src/features/debug-assistant/DebugTab.tsx",
    "renderer-ui/src/features/debug-assistant/components/TraceView.tsx",
    "renderer-ui/src/features/debug-assistant/components/PatchView.tsx",
    "renderer-ui/src/features/eval-board/EvalBoardTab.tsx",
    "renderer-ui/src/features/eval-board/components/EvalRunForm.tsx",
    "renderer-ui/src/features/eval-board/components/LeaderboardChart.tsx",
    "renderer-ui/src/features/feedback-beta/ABTestWrapper.tsx",
    "renderer-ui/src/features/feedback-beta/FeedbackWidget.tsx",
    "renderer-ui/src/features/fine-tuning/FineTuneTab.tsx",
    "renderer-ui/src/features/fine-tuning/hooks/useFineTune.ts",
    "renderer-ui/src/features/fine-tuning/components/AdapterRegistryPanel.tsx",
    "renderer-ui/src/features/fine-tuning/components/ConfigPane.tsx",
    "renderer-ui/src/features/fine-tuning/components/DatasetPane.tsx",
    "renderer-ui/src/features/fine-tuning/components/JobMonitor.tsx",
    "renderer-ui/src/features/marketplace/PluginStoreTab.tsx",
    "renderer-ui/src/features/marketplace/components/PluginCard.tsx",
    "renderer-ui/src/features/model-hub/ModelHubTab.tsx",
    "renderer-ui/src/features/model-hub/hooks/useModelHub.ts",
    "renderer-ui/src/features/model-hub/store/modelHubSlice.ts",
    "renderer-ui/src/features/model-hub/components/DownloadQueue.tsx",
    "renderer-ui/src/features/model-hub/components/LocalList.tsx",
    "renderer-ui/src/features/model-hub/components/ModelCard.tsx",
    "renderer-ui/src/features/model-hub/components/RemoteGallery.tsx",
    "renderer-ui/src/features/refactor-tools/RefactorPanel.tsx",
    "renderer-ui/src/features/refactor-tools/ReviewPanel.tsx",
    "renderer-ui/src/features/search-rag/SearchTab.tsx",
    "renderer-ui/src/features/search-rag/hooks/useDocSearch.ts",
    "renderer-ui/src/features/search-rag/hooks/useSmartSearch.ts",
    "renderer-ui/src/features/search-rag/components/DocPopup.tsx",
    "renderer-ui/src/features/search-rag/components/ResultCard.tsx",
    "renderer-ui/src/features/search-rag/components/SnippetCard.tsx",
    "renderer-ui/src/features/terminal/TerminalTab.tsx",
    "renderer-ui/src/features/terminal/XtermWrapper.tsx",
    "renderer-ui/src/features/test-automation/TestAutomationTab.tsx",
    "renderer-ui/src/features/test-automation/components/CoverageReportView.tsx",
    "renderer-ui/src/features/test-automation/components/TestDiffViewer.tsx",
    "renderer-ui/src/features/vision-assistant/VisionTab.tsx",
    "renderer-ui/src/features/vision-assistant/hooks/useVisionChat.ts",
    "renderer-ui/src/features/vision-assistant/components/BBoxOverlay.tsx",
    "renderer-ui/src/features/vision-assistant/components/ImageChatPanel.tsx",
    "renderer-ui/src/features/vision-assistant/components/ImageDropZone.tsx",
    "renderer-ui/src/features/vision-assistant/components/VisionChatPanel.tsx",
    "renderer-ui/src/features/workflow-builder/WorkflowBuilderTab.tsx",
    "renderer-ui/src/features/workflow-builder/components/NodeEditor.tsx",
    "renderer-ui/src/features/workflow-builder/components/WorkflowPalette.tsx",

    # backend
    "backend/pyproject.toml",
    "backend/poetry.lock",
    "backend/alembic/alembic.ini",
    "backend/alembic/env.py",
    "backend/alembic/script.py.mako",
    "backend/alembic/versions/.gitkeep",
    "backend/app/main.py",
    "backend/app/api_v1_router.py",
    "backend/app/dependencies.py",
    "backend/cli.py",
    "backend/config/settings.py",
    "backend/core/database.py",
    "backend/core/security.py",
    "backend/utils/file_utils.py",
    "backend/utils/text_processing.py",
    "backend/ai_core/embedding_models/base_embedder.py",
    "backend/ai_core/embedding_models/sentence_transformer_embedder.py",
    "backend/ai_core/llm_clients/base_llm_client.py",
    "backend/ai_core/llm_clients/local_gguf_client.py",
    "backend/ai_core/llm_clients/openrouter_client.py",
    "backend/ai_core/vector_db/qdrant_client.py",

    # backend/features/*
    "backend/features/agent_config/models.py",
    "backend/features/agent_config/router.py",
    "backend/features/agent_config/schemas.py",
    "backend/features/agent_config/service.py",
    "backend/features/audio_processing/router.py",
    "backend/features/audio_processing/schemas.py",
    "backend/features/audio_processing/service.py",
    "backend/features/chat_completion/router.py",
    "backend/features/chat_completion/service.py",
    "backend/features/collaboration/models.py",
    "backend/features/collaboration/router.py",
    "backend/features/collaboration/service.py",
    "backend/features/debate_lab/router.py",
    "backend/features/debate_lab/schemas.py",
    "backend/features/debate_lab/service.py",
    "backend/features/debug_assistant/router.py",
    "backend/features/debug_assistant/service.py",
    "backend/features/evaluation/models.py",
    "backend/features/evaluation/router.py",
    "backend/features/evaluation/service.py",
    "backend/features/evaluation/tasks/base_eval_task.py",
    "backend/features/evaluation/tasks/human_eval_task.py",
    "backend/features/evaluation/tasks/mt_bench_task.py",
    "backend/features/fine_tuning/models.py",
    "backend/features/fine_tuning/router.py",
    "backend/features/fine_tuning/schemas.py",
    "backend/features/fine_tuning/service.py",
    "backend/features/governance/router.py",
    "backend/features/governance/service.py",
    "backend/features/marketplace/router.py",
    "backend/features/marketplace/service.py",
    "backend/features/model_hub/models.py",
    "backend/features/model_hub/router.py",
    "backend/features/model_hub/schemas.py",
    "backend/features/model_hub/service.py",
    "backend/features/refactor_engine/models.py",
    "backend/features/refactor_engine/router.py",
    "backend/features/refactor_engine/service.py",
    "backend/features/review_assistant/router.py",
    "backend/features/review_assistant/service.py",
    "backend/features/search_rag/prompts/rag_code_prompt.j2",
    "backend/features/search_rag/prompts/rag_doc_prompt.j2",
    "backend/features/search_rag/prompts/rag_web_prompt.j2",
    "backend/features/search_rag/router.py",
    "backend/features/search_rag/service.py",
    "backend/features/telemetry/router.py",
    "backend/features/telemetry/service.py",
    "backend/features/test_automation/router.py",
    "backend/features/test_automation/service.py",
    "backend/features/tool_runner/router.py",
    "backend/features/tool_runner/service.py",
    "backend/features/vision_assistant/prompts/vision_caption_prompt.j2",
    "backend/features/vision_assistant/prompts/vision_error_analysis_prompt.j2",
    "backend/features/vision_assistant/router.py",
    "backend/features/vision_assistant/service.py",
    "backend/features/workflow_engine/models.py",
    "backend/features/workflow_engine/router.py",
    "backend/features/workflow_engine/service.py",

    # workers
    "workers/Dockerfile.worker",
    "workers/requirements.worker.txt",
    "workers/celery_app.py",
    "workers/ml_tasks/embedding_task.py",
    "workers/ml_tasks/evaluation_task.py",
    "workers/ml_tasks/fine_tuner_task.py",

    # plugins
    "plugins-core/example-hello-world/plugin.json",
    "plugins-core/example-hello-world/dist/index.js",
    "plugins-external/README.md",

    # scripts
    "scripts/bootstrap_dev.ps1",
    "scripts/build_all.sh",
    "scripts/convert_gguf_models.py",
    "scripts/db_migrate.sh",
    "scripts/fetch_models.sh",
    "scripts/test_all.sh",

    # tests
    "tests/backend/integration/test_fine_tune_api.py",
    "tests/backend/unit/test_fine_tune_service.py",
    "tests/electron-shell/unit/test_ipc_router.ts",
    "tests/renderer-ui/integration/model_hub_flow.test.tsx",
    "tests/renderer-ui/unit/CodeEditor.test.tsx",
    "tests/e2e/playwright.config.ts",
    "tests/e2e/specs/onboarding.spec.ts",
    "tests/fixtures/small_dataset.jsonl",
    "tests/fixtures/tutorial_image.png",

    # docs
    "docs/adr/ADR-0001-record-decisions.md",
    "docs/adr/ADR-0002-electron-context-isolation.md",
    "docs/api_reference/openapi.md",
    "docs/contributing.md",
    "docs/developer_guide/build_system.md",
    "docs/developer_guide/coding_style.md",
    "docs/release_process.md",
    "docs/security_overview.md",
    "docs/telemetry_policy.md",
    "docs/user_guide/getting_started.md",
    "docs/user_guide/model_hub.md",
    "docs/user_guide/troubleshooting.md"
)

# Ana dizinde 'project' klasörü altında oluşturmak için root değişkeni
$root = Join-Path $PSScriptRoot "..\project"

# Klasörleri oluştur
Write-Host "Creating directories..." -ForegroundColor Cyan
foreach ($dir in $dirs) {
    $fullPath = Join-Path $root $dir
    if (-not (Test-Path $fullPath -PathType Container)) {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
        Write-Host "  Created: $fullPath" -ForegroundColor Green
    } else {
        Write-Host "  Exists:  $fullPath (Directory)" -ForegroundColor Yellow
    }
}
Write-Host "Directories created." -ForegroundColor Cyan
Write-Host ""

# Dosyaları oluştur
Write-Host "Creating placeholder files..." -ForegroundColor Cyan
foreach ($file in $files) {
    $fullPath = Join-Path $root $file
    $parentDir = Split-Path $fullPath
    if (-not (Test-Path $parentDir -PathType Container)) {
        New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
        Write-Host "  Created Parent Dir: $parentDir" -ForegroundColor Magenta
    }

    if (-not (Test-Path $fullPath -PathType Leaf)) {
        if ($file.EndsWith(".json")) {
            Set-Content -Path $fullPath -Value "{}"
        } elseif ($file.EndsWith(".js") -or $file.EndsWith(".ts") -or $file.EndsWith(".tsx")) {
            Set-Content -Path $fullPath -Value "// Placeholder for $file"
        } elseif ($file.EndsWith(".py")) {
            Set-Content -Path $fullPath -Value "# Placeholder for $file"
        } elseif ($file.EndsWith(".md")) {
            Set-Content -Path $fullPath -Value "# Placeholder for $file"
        } elseif ($file.EndsWith(".j2")) {
            Set-Content -Path $fullPath -Value "{# Placeholder for $file #}"
        } elseif ($file.EndsWith(".yml") -or $file.EndsWith(".yaml")) {
            Set-Content -Path $fullPath -Value "# Placeholder for $file"
        } elseif ($file.EndsWith(".css")) {
            Set-Content -Path $fullPath -Value "/* Placeholder for $file */"
        } elseif ($file.EndsWith(".sh")) {
            Set-Content -Path $fullPath -Value "#!/usr/bin/env bash`n# Placeholder for $file"
        } elseif ($file.EndsWith(".ps1")) {
            Set-Content -Path $fullPath -Value "# Placeholder for $file"
        } else {
            New-Item -ItemType File -Path $fullPath -Force | Out-Null
        }
        Write-Host "  Created: $fullPath" -ForegroundColor Green
    } else {
        Write-Host "  Exists:  $fullPath (File)" -ForegroundColor Yellow
    }
}
Write-Host "Placeholder files created." -ForegroundColor Cyan
Write-Host ""

Write-Host "✅ Project structure initialized successfully in 'project' folder." -ForegroundColor Green