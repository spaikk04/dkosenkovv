#!/usr/bin/env bash
set -euo pipefail
cd /workspace/dkosenkovv/video-studio
ffmpeg -y -hide_banner -loglevel error -ss 8.2 -i public/footage/original-IMG_7125.MOV -t 60.5 -map 0:v:0 -map 0:a:0 -vf 'zscale=t=linear:npl=1000,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=mobius:desat=0:peak=1,zscale=t=bt709:m=bt709:r=tv,format=yuv420p,fps=30' -c:v libx264 -preset fast -crf 18 -threads 3 -color_primaries bt709 -color_trc bt709 -colorspace bt709 -c:a aac -b:a 192k -movflags +faststart public/footage/expert-cut-sdr.mp4
