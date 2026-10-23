"""Composite frame-driven transparent motion layer with original footage and SFX."""
from pathlib import Path
import subprocess,json
root=Path(__file__).resolve().parents[1]
frames = sorted((root/'out/expert-overlay').glob('element-*.png'))
if len(frames) != 1815 or not (root/'out/expert-overlay/element-1814.png').exists():
    raise RuntimeError(f'Expected 1815 overlay frames; found {len(frames)}')
rows=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {SFX} from './src/expert/timeline.ts';console.log(JSON.stringify(SFX))"],cwd=root,text=True))
args=['ffmpeg','-y','-hide_banner','-loglevel','warning','-threads','2','-i',str(root/'public/footage/expert-cut-sdr.mp4'),'-framerate','30','-i',str(root/'out/expert-overlay/element-%04d.png')]
for row in rows:args+=['-i',str(root/'public'/row['src'])]
filters=["[0:v]split=2[b][s]", "[b]eq=saturation=0.85,setsar=1[b0]", "[s]scale=320:570:flags=lanczos,eq=saturation=0.85[s0]", "[b0][s0]overlay=686:1030:enable='gte(t,31.8)*lt(t,37.9)'[stage]", "[stage][1:v]overlay=0:0:format=auto,fade=t=in:st=0:d=0.166667,fade=t=out:st=60.166667:d=0.333333,format=yuv420p[v]", "[0:a]highpass=f=70,volume=0.9[voice]"]
labels=['[voice]']
for i,row in enumerate(rows):
 delay=round(row['from']/30*1000);dur=row['duration']/30;fade=max(0,dur-.1)
 filters.append(f"[{i+2}:a]atrim=0:{dur},asetpts=PTS-STARTPTS,volume={row['volume']},afade=t=out:st={fade}:d=0.1,adelay={delay}:all=1[fx{i}]")
 labels.append(f'[fx{i}]')
filters.append(''.join(labels)+f'amix=inputs={len(labels)}:duration=first:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=9[a]')
args+=['-filter_complex_threads','2','-filter_complex',';'.join(filters),'-map','[v]','-map','[a]','-t','60.5','-c:v','libx264','-preset','fast','-crf','18','-threads','4','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-c:a','aac','-b:a','192k','-ar','48000','-movflags','+faststart',str(root/'out/expert-potential-v1.mp4')]
subprocess.run(args,cwd=root,check=True)
subprocess.run(['ffprobe','-v','error','-show_entries','format=duration,size:stream=codec_name,codec_type,width,height,nb_frames','-of','json',str(root/'out/expert-potential-v1.mp4')],check=True)
