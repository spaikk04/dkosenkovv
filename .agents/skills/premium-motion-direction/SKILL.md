---
name: premium-motion-direction
description: Plan refined product videos with Apple-inspired interface motion, stylized 3D, pixel typography, consistent icons and restrained sound design. Use when asked for premium product motion, clean animated cards, cartoon 3D or pixel text; route implementation to installed Remotion, Motion and Video Shotcraft skills.
---

# Premium motion direction

This is a project-specific editorial skill, not an official Apple or third-party library skill. Read the repository's `docs/motion-toolkit.md` for researched sources and installation status.

## Choose the implementation

- For exported video, use `remotion-best-practices` and `video-shotcraft`. Inspect the existing project and installed versions before choosing APIs. Honor the user's selected creative mode.
- For an interactive website, use the `motion` skill. Its local best practices work offline; documentation tools and spring generation require the Motion MCP server, and Motion+ features require a separate entitlement. Do not claim these services are connected simply because the skill is installed.
- For 3D in Remotion, consult its installed `3d.md` guidance and use `@remotion/three`, compatible Three.js and React Three Fiber versions. For interactive React 3D, use React Three Fiber and Drei. Keep render time bounded with a simple scene before adding postprocessing.
- For vector icons, prefer Lucide with consistent stroke weight. For supplied animated vector assets, consider Lottie, verifying the asset's license separately.
- For pixel typography, first try a licensed pixel font or deterministic SVG grid. Use PixiJS only when sprites, many particles or shaders justify a canvas engine. Aseprite is an authoring alternative, not a required runtime dependency.
- Magic UI is a source of interface components and visual references. Live DOM, CSS, Motion and GSAP animations must be converted to frame-based values before Remotion rendering.
- Install libraries only in an actual application with its package manager and compatible versions. Skill installation alone does not install these runtimes.

## Art direction

Derive typography, spacing, surface colors, radii and accent colors from the product. For an Apple-inspired direction, prefer generous whitespace, precise alignment, clear hierarchy, a restrained palette, soft material lighting and readable surfaces. Do not claim Apple affiliation or assume Apple fonts, sounds or SF Symbols are licensed for the intended video.

Use one main action per shot. Cards and panels should have a reason to move: reveal hierarchy, show a transition or explain a feature. Keep small UI responses around 150–300 ms as a starting point, larger surfaces up to roughly 500 ms; video hero shots need longer reading holds. Favor restrained springs with little overshoot for refined UI, and deliberately stronger squash/stretch only for a cartoon direction.

For stylized 3D, choose a coherent silhouette, limited materials and a soft key/fill setup before camera motion. Use gentle camera arcs and accurate contact shadows. For pixel text, use integer positions and scaling, nearest-neighbor sampling and stable glyph spacing. Preserve Cyrillic glyphs, line breaks and readable final holds.

## Sound

Use original, generated or appropriately licensed sounds. The existing Video Shotcraft skill includes audio and attribution material; check the specific asset's terms before delivery. Use sparse soft clicks, short filtered whooshes and restrained tonal confirmations. Align meaningful transients to the visual event; leave silence between events. Do not reuse Apple system sounds by assumption.

Keep dialogue intelligible, use short fades, avoid clipping, and inspect the rendered audio. When music is used, follow Video Shotcraft's beat-sync guidance and deliver its requested music and no-music variants. Record sound sources and attribution in the video project's asset manifest.

## Determinism and validation

In offline video rendering, derive all motion from the composition frame and fps. Seed randomness. Do not rely on wall-clock time, CSS keyframes, autonomous Motion/GSAP playback or interactive render loops. Seek external animation data to the target frame and wait for assets to load through the renderer's supported mechanism.

Check stills at the start, maximum motion, settled pose and scene boundary; then inspect a short rendered segment with audio. Verify text clipping, Cyrillic, icon alignment, transparent surfaces, 3D readiness, frame determinism and audio transients. Do not report readiness from dependency installation alone. For live interfaces also check keyboard interaction and reduced-motion preferences.
