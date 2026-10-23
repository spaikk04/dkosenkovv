# Expert edit — production brief

User-authorized goal: edit IMG_7125.MOV in the visual direction of the first 44-second reference. Autonomous execution; no repeated creative approval needed.

Input: 70.065 seconds, portrait 1080×1920, 60 fps. Prepare a compatible 30 fps H.264/AAC source, retaining original speech. Inspect transcript before trimming: avoid removing or changing meaning. No invented subtitles or health claims.

Direction: dark graphite and silver, off-white type, pale blue secondary accent; one semantic highlight per scene, rounded layered cards, restrained perspective, soft shadows and readable holds. Avoid copying the first reference's outer showcase frame or its word “After”. Talking head stays the primary subject, supported by occasional full-screen typography and diagrams tied to actual words.

Reference breakdown:
- Food cards / stacked tiles → adapt the spatial hierarchy to the actual subject, not the food topic.
- Metallic backgrounds → limited use for full-screen information panels.
- Animated phrases → word-level caption timing; no random words inserted before transcript exists.
- Cutouts / illustrative inserts → use original assets and procedural diagrams, no unrelated celebrity footage.
- Light streaks / blur → restrained transitions, no strobe or continuous decorative glow.

Deliverable: portrait MP4 with original dialogue, synchronized readable captions, semantic motion graphics and sparse original SFX; review frames and timestamps before final delivery. No BGM selected; original dialogue plus SFX avoids music licensing and preserves intelligibility.

Current blocker: speech model download host openaipublic.azureedge.net is denied by environment proxy. Domain added to saved draft; runtime application/publication pending. Transcript and final storyboard cannot be truthfully completed yet. Source preparation and recognition software installation proceed independently.

## Resumed

Network domain applied; official Whisper small/medium models downloaded and SHA-256 verified. Word-timed transcript and independent short-segment verification completed. First 8.2 seconds removed; output 60.5 seconds. Native browser video rendering proved too slow, so final export uses lossless transparent PNG overlays plus FFmpeg composition with original dialogue. Graphic scene timing remains from timeline.ts; full-screen silver scene uses a rounded presenter inset at the same frame boundaries. No new information is fabricated from unclear ASR wording.

## Reproduce

From video-studio: `npm run render:expert-overlay`, then `npm run compose:expert`. Expect 1815 transparent PNG frames; the compositor refuses partial output. Full MP4 is out/expert-potential-v1.mp4. Source footage is retained in ignored public/footage, not committed to Git. Original API-free speech scripts and pinned Python requirements are included.
