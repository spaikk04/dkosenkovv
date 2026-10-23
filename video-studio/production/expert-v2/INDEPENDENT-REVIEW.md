# Independent review — Expert v2

Status: final encoded-frame and technical review completed, 2026-10-24 (Europe/Moscow). See final addendum below, which supersedes preliminary risks. No continuous real-time playback or subjective listening claim is made.

Reviewed: repository AGENTS.md, MOTION.md, brand.md; final-review.md and complete aesthetic-rules.md; DIRECTION.md, ASSETS.md, edit.json, sound-plan.json; Film.tsx, Scene3D.tsx, prepare/compose/sound scripts; original expert-edit transcript, captions and QA context; rendered form-polished.png (overlay only, presenter not composited).

## Mandatory final-review checklist

P1/P2/P4 ✓ Recorded goal maps to actual scenes: montage, mesh-based 3D, semantic b-roll, timed subtitles, sparse sound. This is expert speech rather than a product advertisement.
P3/D1/D2 ✓ Source/code review: no invented metrics, brands, customer data or product claims. Philosophers and five steps match retained speech. Two uncertain source phrases explicitly excluded.
F1/F3 ✓ Source review: real lit Three.js meshes, not CSS fake spheres; four distinct cutaway metaphors plus five front-facing step graphics.
F2 △ Five step cards share entry treatment but communicate separate instructions; dynamic variety must be judged in final export.
V1/V3/V4 ✓ Observed form-polished.png follows provisional graphite/silver/blue palette and local type; no brand authenticity claim.
V2/Q3 △ Deterministic frame-derived animation, no random handheld or beat-driven full-frame pulses in source; final motion still pending.
S1–S6 N/A: original authored scenes. No named Gallery card/style variant or inaccessible source equivalence is claimed. Web3Bento is a disclosed structural reference.
B1 ✓ EDL covers exactly 1622 frames without destination gaps or overlaps; 12 shots cover same range. 14 dialogue segments retain ascending source order.
B2 △ Caption/sound/graphic timings share edit.json. Final perceived cut continuity, phoneme preservation and action/audio alignment await export.
B3 △ No brand wordmark. Form assembly settles after45 local frames; final scene has only 82 frames and fade-out begins after73, leaving short settle hold.
B4 ✓ Source review matches recorded shot order.
D3/D4 N/A: no existing product UI impersonation or network-dependent screenshot page. Local assets and procedural meshes.
D5 ✓ No live metrics or private third-party data observed.
A1/A2/A6 △ Declared atmospheric score and sparse Mixkit SFX; audibility/intelligibility require final listening.
A3 N/A: non-percussive score; no beat grid claimed.
A4 △ Closing impact f1585 and shimmer f1598 planned; final listening pending.
A5 ✓ Samples explicitly cropped to gesture lengths in samples; no uncontrolled long tails.
A7 ✓ SFX vocabulary contains physical paper/air/metal/impact, no synthetic UI notification cue.
A8 △ Both exports use same video stream by compositor design; actual bitstream and sound equality pending.
A9 ✗ No output-pipeline delay measurement recorded in sound-plan.json. Source peak offsets are recorded separately, but final output correlation has not yet been supplied.

## Aesthetic rules

R1 △ No wordmark; scene headings hold. Final branded hold requirement is inapplicable.
R2 △ Form assembly has easing and long settle. Paper triplet f194/197/200 uses fixed spacing and same sample; mild repetitive transient risk.
R3 ✓ Opening lasts182f with visible subject/headline; ≥3s narrative arc available.
R4 ✓ Source contains no full-frame beat slams/strobes.
Q1 ✓ No existing product page is recreated.
Q2 N/A: no UI text textures in perspective; all titles rendered in DOM.
Q3 △ Stable source camera; dynamic output pending.
Q4 ✓ No repeated glint/sweep graphics or persistent glow.
Q5 ✓ Opening title supports original presenter; no competing icon flood.
Q6 ✓ Step information is front-facing; 3D contains objects rather than tiny perspective text.
Q7 ✓ Form-polished.png shows volumetric object, dark environment and changing view in code.
Q8 N/A as literal product-family finale; editorial five-step close is recorded.
Q9/Q10 N/A: no page-slot arrivals or mock documents.
Q11 ✗ form-polished.png subtitle is fontSize56 but effective glyph height around43px, below strict56px threshold; 32px auxiliary label also falls below32px effective height. MOTION allows these nominal sizes, so either increase or document this deliberate adaptation and verify mobile readability. No clipping is visible in this still.
S1 △ Quiet non-percussive score deliberately differs from promotional tech-house default; speech-led editorial format supports the choice. Final timbre audition pending.
S2 △ Declarative sample-aligned events and descending paper gains provided; three paper events reuse one sample at fixed3f spacing.
S3 ✓ Same edit table drives all events; any subsequent edit requires regeneration.
S4 △ Cropping/peak gain handling implemented. Actual output audibility pending.
S5 ✗ Output offset measurement absent at preliminary pass.
C1 ✓ Original speech continues under animated cutaways, captions use retained transcript.
C2 ✓ Semantic literal headings rather than fabricated product slogans.
C3 ✓ Explicit recorded exception: screen-space editorial titles, not labels attached to 3D objects. Preserves typography clarity.
P1 △ One rendered overlay still inspected; full output checks remain.
P2 ✓ Brief maps reference methods to adapted editorial scenes; no unviewed demo fidelity claim.
P3 N/A: no ambiguous revision request resolved by reviewer.
P4 ✓ Distinct semantic metaphors; step grid repeats structure intentionally for ordered instructions.

## Required follow-up before final signoff

1. Inspect exported frames at every scene, especially overlay fades f449–456,635–643,1060–1068,1613–1621: compositor portrait is a rectangular300×534 image without alpha-rounded mask. Rounded stage cutout hides corners during hold, but its opacity fades while portrait remains fully visible; possible square-corner artifact.
2. Quantify final audio offset and SFX correspondence; distinguish source attack latency from output encoding latency.
3. Inspect mobile subtitle/auxiliary text at actual playback size; record intentional Q11 exception or increase effective sizes.
4. Complete final MP4 decode, frame counts, both-version video equality and dynamic/subjective checks. Preliminary overlay has no source presenter and cannot establish face visibility.

## Preflight composition addendum

Inspected out/expert-v2-qa/preflight-sheet.jpg after updated caption pass. This is a five-scene composite contact sheet, not a final MP4.

Q5/Q6/P1 ✓ Hook, thinkers, energy, form and pressure samples show clear subject hierarchy; face/eyes remain uncovered. Pressure heading is now two lines and both chips sit above the hairline in the sampled frame850. Source presenter is visible in both cutaway insets. No title or subtitle clipping visible in these samples.
Q11 △ At the contact-sheet scale, speech captions and large headings remain readable; philosopher names, Aristotle label and pressure chips are auxiliary and visibly small. Strict effective-pixel threshold is still not claimed; actual720px mobile export pending.
B2/C1 △ Production reports revised punctuation boundaries and capitalized final «Помогут». Sheet confirms current subtitle styling, but final closing groups are outside these five samples.
Transition corner/large-face-flash risk remains to verify in final encoded exit frames; producer reports dedicated opaque-stage and RGBA-mask corrections.

## Final encoded-output review — supersedes preliminary risks

Inspected actual decoded master frames through contact-entrance.jpg, contact-peak.jpg and contact-settled.jpg: all12 scenes at entry, developed pose and hold. Inspected720×1280 decoded mobile-frame.jpg at native displayed resolution. Independently extracted reviewer-transitions.jpg from final master (f450,456,457,638,643,644,1065,1068,1069,1539,1540,1552) and reviewer-mobile.jpg from final mobile (f1087,1175,1315,1420,1490,1585,1605,1620). These are direct MP4 decodes, not preview captures. Reviewed QA-metrics.json.

B1/B2/Q3/P1 ✓ Sampled entry/hold/exit states preserve consistent framing; no random camera jitter suggested by inspected states or source. Stable dark stage persists through energy→form f456/457. Form→presenter f643/644 is a deliberate full cut, with no residual inset. Direction→step1 f1068/1069 clears the stage correctly. This is frame-sample verification, not continuous playback.
Q4/Q6 ✓ Actual inset corners stay rounded in exit samples; no face/text/object collision. Previously identified rectangular-corner and large-face-flash risks are resolved in inspected frames.
Q11 △ Speech captions are comfortably readable in native720px mobile sample and270px contact thumbnails; titles of allfive steps remain readable. No strict effective56px-glyph-height compliance is claimed: typography is an intentional MOTION.md portrait adaptation. Small auxiliary labels remain a mild optional optimization for particularly small embedded players.
C1/B2 ✓ Final output closing caption begins «Помогут вам распознать и», then «раскрыть ваш потенциал.» (f1540/1552/1585/1605). It no longer combines the fifth-step sentence with a lower-case closing verb. Final fade f1620 is clean.
F1/V1 ✓ Finished3D cutaways show actual mesh geometry, reflections and assembled volume; energy, form, direction and five-column closing image are visually distinct. Allfive action steps appear. No permanent watermark, version footer or progress bar is present in sampled output or source.
A8 ✓ Technical result: master/no-music have identical encoded video bitstreams. Both1622frames,54.066667s; mobile also1622frames. Compositor uses same SFX stem for both mixes; separate final loudness processing may cause slight gain differences, so sample-identical SFX amplitude is not asserted.
A9/S5 ✓ QA-metrics records measured PCM-versus-decoded-AAC FFT correlation at1/20/45s:0samples output delay in allthree windows,48kHz FFmpegAAC/MP4 with decoder honoring skip/edit metadata. Source peak delays remain separately recorded in sound-plan. This addresses output latency numerically; it does not establish perceived audiovisual impact alignment by ear.
A1/A5/A6 △ Master measured -16.03LUFS, -3.36dBTP with no clipping indicated. SFX are deterministically peak-aligned and cropped. Subjective music timbre, SFX audibility under speech and phoneme continuity at every splice were not auditioned by this reviewer and remain unverified.
D4 ✓ Technical checks report complete decode for allthree exports; H.264/AAC, BT.709 TV range, faststart, correct dimensions/frame counts.

### Final disposition

No blocking visual defect found in inspected final encoded frames. The inset-mask, stage-transition and closing-caption concerns are resolved. Image composition and mobile caption legibility pass this independent sampled review.

Optional improvements: enlarge auxiliary philosopher/chip labels if delivery requires a verysmall embedded player; alternate the three paper transients to reduce repeated-sample character. Neither is a demonstrated delivery blocker.

Unverified: continuous motion playback, subjective sound audition, exact perceived cut/phoneme continuity and every single renderedframe. Automatic decode/correlation/loudness results must not be described as listening or full dynamic viewing. Gallery fidelity is inapplicable because no specific card/style was selected; inaccessible source was not treated as reviewed.
