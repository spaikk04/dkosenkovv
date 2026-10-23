#!/usr/bin/env bash
set -euo pipefail
cd /workspace/dkosenkovv/video-studio
command -v node
command -v chromium
command -v ffmpeg
npm ci --no-fund --no-audit
python3 -m venv /workspace/.venvs/video-tools
/workspace/.venvs/video-tools/bin/pip install --cache-dir /workspace/.pip-cache -r requirements-video-tools.txt
/workspace/.venvs/video-tools/bin/python scripts/remove-background.py --prepare
npm run lint
