#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_HAN_DIR="${SOURCE_HAN_DIR:-$ROOT/font-source}"
DEST="$ROOT/shared/assets/fonts"
MEDIUM="$SOURCE_HAN_DIR/SourceHanSansTC-Medium.otf"
BOLD="$SOURCE_HAN_DIR/SourceHanSansTC-Bold.otf"
for f in "$MEDIUM" "$BOLD"; do
  [[ -f "$f" ]] || { echo "Missing source font: $f"; echo "Set SOURCE_HAN_DIR=/path/to/SourceHanSansTC OTF files."; exit 1; }
done
command -v fonttools >/dev/null || { echo 'Install: pip3 install fonttools brotli'; exit 1; }
TMP="$(mktemp)"; trap 'rm -f "$TMP"' EXIT
python3 - "$ROOT" "$TMP" <<'PY'
from pathlib import Path
import re,sys
root=Path(sys.argv[1]); out=Path(sys.argv[2])
chars=set()
# Include all CJK/Chinese punctuation present in runtime HTML + Guide JS.
for p in [root/'web/index.html',root/'phone/index.html',root/'shared/guide-v47.js',root/'shared/guide-v47-1.js']:
    if p.exists():
        text=p.read_text(encoding='utf-8')
        chars.update(c for c in text if ord(c)>=0x3000)
out.write_text(''.join(sorted(chars)),encoding='utf-8')
print(f'Collected {len(chars)} non-ASCII/CJK glyphs')
PY
mkdir -p "$DEST"
COMMON=(--flavor=woff2 --text="$(cat "$TMP")" --unicodes='U+0020-007E,U+00A9,U+2013-2014' --layout-features='*' --recommended-glyphs --name-IDs='*' --name-legacy --name-languages='*')
fonttools subset "$MEDIUM" --output-file="$DEST/SourceHanSansTC-Medium.woff2" "${COMMON[@]}"
fonttools subset "$BOLD" --output-file="$DEST/SourceHanSansTC-Bold.woff2" "${COMMON[@]}"
ls -lh "$DEST"/*.woff2
