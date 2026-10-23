# Final QA — v1

Passed: ESLint, TypeScript, bundle, 1815-frame transparent overlay rendering, FFmpeg composition, mobile transcode and full mobile decode. Master H.264/AAC 1080×1920 30fps,60.5 seconds; mobile720×1280.

Independent reviewer inspected all12 final scene samples: no clipping or text/face collisions. Rounded inset coordinates and timing match compositor. Dialogue first12s cross-correlation reports0ms offset; output measured -16.51LUFS and -1.48dBTP. No BGM. SDR metadata explicitly BT.709; HDR HLG source was tonemapped.

Limits: frame samples and numerical audio checks do not constitute subjective listening or a full dynamic playback review. Two literal ASR phrases remain uncertain despite small/medium/context recognition: «голос по Аристотелю» and «пять золотых философов». The original speech remains intact. Cards avoid building claims on those words.

Style is adapted from reference dark-card typography and selective silver scenes; it does not recreate unrelated celebrity inserts or claim identical montage.

Deliverables: out/expert-potential-v1.mp4, out/expert-potential-v1-mobile.mp4, out/expert-potential.srt.
