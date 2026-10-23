# Apple Design audit — technical demo

Applied `.agents/skills/apple-design/SKILL.md` to the local 15s demonstration. This is a fixed video composition, not a claim of certification by Apple or a complete interactive-UI audit.

Ranked findings and resolution:

1. **High — continuity and legibility of the first morph.** Initial pill mask clipped the first glyph and the expanded card approached the headline. Fixed by moving the card below the heading and moving its text from the pill's actual visible region to the final text anchor. Typography no longer stretches with a container scale.
2. **High — overlapping supporting text.** The stack's mounted region crossed the supporting caption. Moved caption below the component. Back-card overlap/occlusion is intentional and declared on the stacked text, not suppressed across the scene; front card remains readable.
3. **Medium — unnecessary spring overshoot.** Ordinary scene titles use a short non-overshooting transition. The registry stack retains velocity-preserving throws as its physical metaphor; that is the sole justified momentum-driven exception.
4. **Medium — presentation hierarchy.** Dark ground, solid silver object, one accent and size-specific tracking keep a single focal object. Real content replaces registry skeleton labels. Local Cyrillic fonts and calm holds are retained.
5. **Scope — direct manipulation, drag velocity and interruption.** The MP4 has no pointer input, so no claim of tested gesture behavior. The registry donor contains its own deterministic velocity-preserving retarget logic; interactive user testing remains outside this technical render check.
6. **Scope — reduced motion.** MP4 content cannot change with OS media queries. The optional playback page uses native controls with no autoplay, so the viewer initiates motion and can pause. This is not represented as a full accessibility certification.

Evidence: full HyperFrames check passes lint/runtime/layout/contrast/craft. Motion-sidecar audit reports disabled/0 samples and is not counted as a tested capability. Source timelines, actual snapshots at0/2.5/7.5/12.5/14.55s and decoded output frames are reviewed. No external TTS, generated footage or music service used.
