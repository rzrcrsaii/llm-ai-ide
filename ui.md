Aşağıda projenin **tüm UI katmanını** ve **başlıca bileşenlerini**, gerçek dosya-yolu eşlemeleriyle “maksimum token” kullanarak verdim. Her bir sekme ve ortak UI öğesini, **React/Tailwind/shadcn/ui** ekosistemiyle nasıl inşa edebileceğinizi gösteren bir tasarım nesneleri listesi olarak alın.

---

## 📐 1. Genel Pencere Düzeni

```
┌────────────────────────────────────────────────────────────────────┐
│                         TopNavbar (components/layout)            │
│  ┌────┐  ┌────────────────────────────────────────────────────┐   │
│  │Logo│  │ TabBar (components/layout)                         │   │
│  └────┘  │ [ModelHub] [CodeEditor] [Terminal] … [Settings]      │   │
│          └────────────────────────────────────────────────────┘   │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │ Sidebar (components/layout)      │       ContentArea       │    │
│  │  • Explorer                       │    (features/**tab**/)  │    │
│  │  • Git                            │ ┌─────────────────────┐ │    │
│  │  • TODO                           │ │ Current Tab Header  │ │    │
│  │                                   │ │ ─────────────────── │ │    │
│  │                                   │ │ Tab Content         │ │    │
│  │                                   │ │                     │ │    │
│  └───────────────────────────────────┘ └─────────────────────┘ │    │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │                          StatusBar (components/layout)     │    │
│  │  Ready • Model: Llama-2-13B • GPU: 8 GB Free • Line 123   │    │
│  └────────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────┘
```

* **Electron-shell/src/main/index.ts** → pencereleri ve menüyü açar
* **renderer-ui/src/components/layout/TopNavbar.tsx** → logo + global menü
* **renderer-ui/src/components/layout/TabBar.tsx** → dinamik sekmeler
* **renderer-ui/src/components/layout/Sidebar.tsx** → dosya/geçmiş/git paneli
* **renderer-ui/src/components/layout/StatusBar.tsx** → alt bilgi çubuğu

---

## 🧩 2. Orta Bölme (ContentArea) – Sekme Başına

### 2.1 Model Hub Sekmesi (ModelHubTab)

```
┌────────────────────────────────────────────┐
│ ModelHubTab.tsx                           │
│ ┌─ RemoteGallery (components/model-hub)  │
│ │  ┌ ModelCard                           │
│ │  └─────────────────────────────────────│
│ ├─ LocalList                             │
│ │  ┌ LocalModelCard                      │
│ │  └─────────────────────────────────────│
│ └─ DownloadQueue                         │
│     ┌ QueueItem                          │
└────────────────────────────────────────────┘
```

* **renderer-ui/src/features/model-hub/ModelHubTab.tsx**
* **…/components/model-hub/ModelCard.tsx, LocalList.tsx, DownloadQueue.tsx**
* **…/hooks/useModelHub.ts**

### 2.2 Code Editor Sekmesi (CodeEditorTab)

```
┌────────────────────────────────────────────┐
│ CodeEditorTab.tsx                         │
│ ┌─ EditorToolbar (components/code-editor)│
│ │    • Run • Format • Lint                │
│ ├─ MonacoEditorWrapper.tsx                │
│ │    • ghost-text overlay                 │
│ └─ InlineSuggestionBox.tsx                │
└────────────────────────────────────────────┘
```

* **renderer-ui/src/features/code-editor/CodeEditorTab.tsx**
* **…/MonacoEditorWrapper.tsx, providers/inlineLLMCompletionProvider.ts**
* **…/components/code-editor/EditorToolbar.tsx**

### 2.3 Terminal Sekmesi (TerminalTab)

```
┌────────────────────────────────────────────┐
│ TerminalTab.tsx                           │
│ ┌─ TabHeader: “bash” “pwsh”               │
│ └─ XtermWrapper.tsx                       │
│      • PTY data → xterm.js render         │
└────────────────────────────────────────────┘
```

* **renderer-ui/src/features/terminal/TerminalTab.tsx**
* **…/XtermWrapper.tsx**

### 2.4 Fine-Tune Sekmesi (FineTuneTab)

```
┌────────────────────────────────────────────┐
│ FineTuneTab.tsx                           │
│ ┌ AdapterRegistryPanel (components/…)    │
│ ├ ConfigPane                              │
│ ├ DatasetPane                             │
│ └ JobMonitor                              │
└────────────────────────────────────────────┘
```

* **renderer-ui/src/features/fine-tuning/FineTuneTab.tsx**
* **…/components/fine-tuning/**

### 2.5 MCP Tools Sekmesi (ToolRunnerTab)

```
┌────────────────────────────────────────────┐
│ ToolRunnerTab.tsx                         │
│ ┌─ ToolList (components/tool-runner)     │
│ │    • Black • ESLint • PyTest            │
│ └─ OutputPane                             │
└────────────────────────────────────────────┘
```

* **renderer-ui/src/features/tool-runner/ToolRunnerTab.tsx**
* **…/components/tool-runner/**

### 2.6 Debate Lab Sekmesi (DebateLabTab)

```
┌────────────────────────────────────────────┐
│ DebateLabTab.tsx                          │
│ ┌ PromptBox (components/debate-lab)      │
│ ├ DebateStream                            │
│ └ ScorePanel                              │
└────────────────────────────────────────────┘
```

* **renderer-ui/src/features/debate-lab/DebateLabTab.tsx**
* **…/components/debate-lab/**
* **…/hooks/useDebate.ts**

*(aynı yöntemle Collaboration, Vision, Audio, Search RAG, Workflow Builder, Marketplace, Agent Config vb. sekmeler)*

---

## 🧰 3. Ortak UI Bileşenleri

* **Button**: `renderer-ui/src/components/common/Button.tsx`
* **Card**: `…/components/common/Card.tsx`
* **Modal**: `…/components/common/Modal.tsx`
* **LoadingSpinner**: `…/components/common/LoadingSpinner.tsx`
* **Icon**: `…/components/common/Icon.tsx`
* **Dropdown**: `…/components/common/Dropdown.tsx`
* **Toast**: `…/components/common/Toast.tsx`

Tüm bu bileşenler **shadcn/ui** üzerinden özelleştirilebilir.

---

## 🎨 4. Tema & Stil

* **renderer-ui/src/app/theme.ts**

  * Renk paleti (MD3)
  * Typography (xl, lg, base, sm)
  * Spacing scale (p-1 … p-8)
* **global.css** ve **theme-variables.css**

---

## 🔗 5. API / IPC Köprüleri

Her sekme kendi bridge aracılığıyla backend/electron-shell ile konuşur:

| Sekme       | Bridge dosyası                                           |
| ----------- | -------------------------------------------------------- |
| Model Hub   | `electron-shell/src/preload/bridges/model-hub-bridge.ts` |
| Code Editor | `…/bridges/code-editor-api-bridge.ts`                    |
| Terminal    | `…/bridges/terminal-api-bridge.ts`                       |
| Fine-Tune   | `…/bridges/fine-tune-api-bridge.ts`                      |
| Tool Runner | `…/bridges/tool-runner-api-bridge.ts`                    |
| Debate Lab  | `…/bridges/debate-api-bridge.ts`                         |
| Vision      | `…/bridges/vision-api-bridge.ts`                         |
| Audio       | `…/bridges/audio-api-bridge.ts`                          |

---

## ✅ Sprint ↔ UI Dosya Eşlemesi

| Sprint No | Özellik           | UI Tab                     | Bileşen Dosyaları             |
| --------- | ----------------- | -------------------------- | ----------------------------- |
| S01       | Model Hub         | ModelHubTab                | `features/model-hub/*`        |
| S02–S03   | Kod-Editör        | CodeEditorTab              | `features/code-editor/*`      |
| S03       | MCP Tools         | ToolRunnerTab              | `features/tool-runner/*`      |
| S04–S05   | Fine-Tune         | FineTuneTab                | `features/fine-tuning/*`      |
| S05–S13   | Debate Lab        | DebateLabTab               | `features/debate-lab/*`       |
| S07       | Eval Dashboard    | EvalBoardTab               | `features/eval-board/*`       |
| S09,16,23 | Vision Assistant  | VisionTab                  | `features/vision-assistant/*` |
| S15,17,24 | Audio/Speech      | SpeechLabTab               | `features/audio-speech/*`     |
| S10,29–33 | Search & RAG      | SearchTab                  | `features/search-rag/*`       |
| S34       | Collaboration     | CollabTab                  | `features/collaboration/*`    |
| S35–36    | Refactor & Review | RefactorPanel, ReviewPanel | `features/refactor-tools/*`   |
| S49       | Workflow Builder  | WorkflowBuilderTab         | `features/workflow-builder/*` |
| S06       | Agent Config      | AgentConfigTab             | `features/agent-config/*`     |
| S22,26    | Marketplace       | PluginStoreTab             | `features/marketplace/*`      |
| S38       | Test Automation   | TestAutomationTab          | `features/test-automation/*`  |

---

> Artık UI katmanı elinizde: **tüm sekmeler**, **içerik ağaçları**, **ortak bileşenler**, **tema** ve **bridge/API** dosyalarıyla eksiksiz bir tasarım yapabilirsiniz. Yeni bir model devralmaya hazır!
