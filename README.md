# llm-ai-ide
IDE‑AGENT‑ROOT

Multimodal, extensible AI‑powered IDE agent – desktop app (Electron + React), Python micro‑services, and plugin ecosystem, designed for local + cloud LLM workflows.


✨  What is this project?

IDE‑Agent is a full‑stack developer productivity suite that brings large‑language‑model super‑powers straight into your editor & terminal.It combines an Electron shell, a React renderer, a FastAPI backend, and a Celery worker farm – all orchestrated from a single pnpm monorepo.

Capability

Short demo

Local & remote model hub

backend/model_hub, renderer‑ui/model‑hub/*

Code completion & refactor tools

Monaco‑based Code Editor + inline LLM suggestions

One‑click LoRA fine‑tuning

Fine‑Tuning tab + Celery fine_tuner_task

Vision & audio assistants

LLaVA / Whisper workflows

Workflow Builder

Drag‑and‑drop node graph to compose AI pipelines

Plugin marketplace

Hot‑reloadable JS plugins (plugins‑core, plugins‑external)

See the roadmap for the full feature list.

🗺️  High‑level architecture

┌──────────────┐   IPC    ┌──────────────┐  HTTP/gRPC   ┌──────────────┐
│ renderer‑ui  │◀────────▶│ electron‑shell│◀────────────▶│  FastAPI      │
└──────────────┘          └──────────────┘               └──────────────┘
       ▲                        ▲                               ▲
       │ Preload bridges        │ Celery tasks (Rabbit/Redis)   │ Qdrant, DBs
       └───────────── plugins & workers ────────────────────────┘

renderer‑ui – Vite + React, shadcn/ui, Tailwind.

electron‑shell – window management, menu, security, auto‑update.

backend – FastAPI micro‑services, Alembic migrations, model APIs.

workers – Celery tasks (embeddings, evaluation, LoRA fine‑tune).

common – Shared TypeScript utilities & Zod schemas.

🚀  Quick start (dev)

# 1. Clone & install root deps
$ git clone https://github.com/your‑org/ide‑agent-root.git && cd ide‑agent-root
$ pnpm install

# 2. Bootstrap folders & placeholder files
$ ./scripts/bootstrap_dev.sh   # PowerShell? -> .\scripts\bootstrap_dev.ps1

# 3. Start everything (dev hot‑reload)
$ pnpm dev          # runs: backend, workers, electron, vite

Requirements: Node >=18, Python >=3.10, Poetry, Docker (for DB/Qdrant).

Tip: Check out docs/user_guide/getting_started.md for detailed OS‑specific steps.

🏗️  Repository layout (abridged)

common/              # Shared TS types & helpers
renderer‑ui/         # React front‑end (Vite)
electron‑shell/      # Main & preload processes
backend/             # FastAPI + Aleksandrovich Alembic migrations
workers/             # Celery tasks (GPU optional)
plugins‑core/        # First‑party sample plugins
scripts/             # Dev & CI helper scripts
docs/                # ADRs, guides, API reference

Full file inventory lives in /docs and the canvases.

🙌  Contributing

We love pull requests!  Whether you want to fix a typo or add a new feature, please read:

CONTRIBUTING.md – coding style & branch naming (hint: sprint‑<n>)

CODE_OF_CONDUCT.md – be excellent to each other.

Open a Draft PR – our CI will run lint, test & type‑check.

New to OSS? Open an issue and we’ll help you get started 💬

🛣️  Roadmap

Sprint‑11 – LoRA fine‑tune pipeline using LoRATrainer (👈 current)

Sprint‑12 – Eval dashboard v2 & dataset versioning

Sprint‑13 – Multi‑agent Debate‑Lab

... see docs/release_process.md

📜  License

Released under the MIT License.  See LICENSE for details.