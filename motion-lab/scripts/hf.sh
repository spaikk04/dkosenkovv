#!/usr/bin/env bash
set -euo pipefail
lab_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export HYPERFRAMES_NO_TELEMETRY=1
export XDG_CACHE_HOME=/workspace/.cache
export XDG_STATE_HOME=/workspace/.local/state
export HYPERFRAMES_HISTORY_ROOT=/workspace/.cache/hyperframes-history
export HYPERFRAMES_FONT_CACHE_DIR=/workspace/.cache/hyperframes-fonts
export HYPERFRAMES_EXTRACT_CACHE_DIR=/workspace/.cache/hyperframes-extract
export HYPERFRAMES_BROWSER_PATH=/usr/bin/chromium
export NODE_USE_ENV_PROXY=1
exec "$lab_dir/node_modules/.bin/hyperframes" "$@"
