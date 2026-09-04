# HaoChia EntryPortal

Independent optimized copy of the published HaoChia Portal. The client-facing `tennliu/HaoChia_Portal` repository is not modified by this repository.

## Layout model
- Root `index.html`: redirects by viewport width.
- `web/`: desktop/tablet, 1000px master stage scaled proportionally.
- `phone/`: mobile, 430px master stage scaled down proportionally; >=768px redirects to desktop.
- `shared/`: Guide UI/behavior and shared assets.

## Optimization differences from v47.1 source
- Source Han Sans TC Medium/Bold are self-hosted in `shared/assets/fonts/`.
- Former `no-ttt.github.io/HaoChia/...` first-party dependencies are snapshotted under `shared/assets/local/` and referenced relatively.
- Medium/Bold are preloaded on desktop and mobile.
- Large below-fold images use native lazy loading / async decoding where geometry is already fixed by CSS.
- Page reveal no longer waits for every image/video. It waits for the local fonts, with a 900ms ceiling, then initializes AOS/current motion.
- Existing v47.1 Guide, 1000px desktop master, 430px mobile master, section seam fix, Guide video fade/collapse, and Guide cue behavior are preserved.

## Font maintenance
Runtime WOFF2 files are already committed. If Chinese copy changes and introduces new glyphs, rebuild them with:

```bash
pip3 install fonttools brotli
SOURCE_HAN_DIR=/path/to/source-han-otf ./scripts/rebuild-fonts.sh
```

`SOURCE_HAN_DIR` must contain `SourceHanSansTC-Medium.otf` and `SourceHanSansTC-Bold.otf`. Source font files are intentionally not committed here.

## External runtime dependencies intentionally retained
- AOS library from unpkg CDN.
- Destination links such as HaoChia, BeGood, LINE and government services.

All project-owned visual assets, video, poster and web fonts used by the rendered page are local to this repository.

## QA
Test from the root URL as well as direct `/web/` and `/phone/` URLs. When testing a different device width in DevTools, reload after changing the viewport so the redirect runs with the intended width.
