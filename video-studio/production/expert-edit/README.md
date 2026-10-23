# Потенциал — монтаж v1

Source: user-provided IMG_7125.MOV from Google Drive. Creative reference: user-provided first expert montage. Output: 60.5 seconds, 1080×1920, 30fps; original speech retained, with the first8.2 seconds of preparation removed. No BGM, sparse transition SFX.

Reproduce from video-studio:

```bash
npm ci
npm run render:expert-overlay
npm run compose:expert
/workspace/.venvs/video-tools/bin/python scripts/qa-expert.py
```

PNG overlay sequence and rendered media are in ignored `out/`. Source footage in `public/footage/` is also ignored; it remains in the environment snapshot and is not automatically uploaded to GitHub. Caption JSON, editorial decisions, asset sources and scripts are regular project files.

The frame-accurate FFmpeg pipeline uses a static original camera for reliable export; the native Studio preview adds a small scene-local push-in. Overlay transitions and caption timing are otherwise shared. The exported graphics receive the source composite's short opening/closing fade in addition to their own fade, deliberately yielding a soft lead/finish. No claim of pixel-identical native-preview/FFmpeg parity is made.

The runtime workbench is prepared outside vendored skill sources at `/workspace/.runtime/video-shotcraft/workbench`, linked to the project's current dependencies and src/workbench.ts manifest. It can be restarted with:

```bash
node /workspace/.runtime/video-shotcraft/workbench/scripts/open.mjs /workspace/dkosenkovv/video-studio --no-open
```

Workbench scene clips include their captions and SFX internally; they preserve local timing when moved as a unit. This does not claim independent per-word editing controls. The environment's regular Remotion Studio also remains available via `npm run dev`.

Automatic transcription remains uncertain on the speaker's phrase rendered as «голос по Аристотелю» and closing «пять золотых философов» despite repeated small/medium recognition. No contradictory graphic claims were built around these phrases. The speaker's original audio is untouched in content. See ASSETS.md for normalization notes and sources.

Source HDR handling: original HEVC is10-bit BT.2020 HLG (arib-std-b67). Native8-bit transcode preserved HDR metadata and looked washed out. Corrected directly from original using linear HLG conversion at npl1000, BT.709 primaries, Mobius mapping with peak1/desat0, then BT.709 transfer/matrix and explicit SDR metadata. Corrected local input is public/footage/expert-cut-sdr.mp4; output compositing uses that file. Test frames show recovered skin highlight detail. Overlay layer is unchanged.
