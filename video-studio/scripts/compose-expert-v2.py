"""Lossless Remotion graphics + edited source + controlled original sound mix."""
from pathlib import Path
import json,subprocess,sys
root=Path(__file__).resolve().parents[1]
edit=json.load(open(root/'production/expert-v2/edit.json'));n=edit['totalFrames'];duration=n/30
out=root/'out';overlay=out/'expert-v2-polished-overlay'
frames=sorted(overlay.glob('element-*.png'))
if '--audio-only' not in sys.argv and (len(frames)!=n or not (overlay/f'element-{n-1:04d}.png').exists()):
 raise RuntimeError(f'Incomplete overlay: {len(frames)}/{n}')
def run(a):subprocess.run(a,cwd=root,check=True)
common=['ffmpeg','-y','-hide_banner','-loglevel','warning','-threads','2']
source=root/'public/footage/expert-v2-cut.mp4'
audio_outputs=[out/'expert-v2-master.wav',out/'expert-v2-no-music.wav']
audio_sources=[source,root/'public/audio/v2/sfx.wav',root/'public/audio/v2/score.wav']
if not all(p.exists() for p in audio_outputs) or min((p.stat().st_mtime for p in audio_outputs if p.exists()),default=0)<max(p.stat().st_mtime for p in audio_sources):
 # Prepare dialogue once so both variants have the exact same treatment.
 if not (out/'expert-v2-voice.wav').exists() or (out/'expert-v2-voice.wav').stat().st_mtime<source.stat().st_mtime:
  run(common+['-i',str(source),'-vn','-af','highpass=f=75,afftdn=nr=5:nf=-42,acompressor=threshold=0.15:ratio=2:attack=15:release=180:makeup=1.05,loudnorm=I=-17:TP=-2:LRA=9','-ar','48000','-ac','2','-c:a','pcm_s24le',str(out/'expert-v2-voice.wav')])
 for bgm in [True,False]:
  name='master' if bgm else 'no-music'
  args=common+['-i',str(out/'expert-v2-voice.wav'),'-i',str(root/'public/audio/v2/sfx.wav')]
  if bgm:args+=['-i',str(root/'public/audio/v2/score.wav')]
  streams='[0:a][1:a][2:a]' if bgm else '[0:a][1:a]'
  filt=streams+f'amix=inputs={3 if bgm else 2}:duration=first:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=8,afade=t=out:st={duration-.2}:d=0.2[a]'
  run(args+['-filter_complex',filt,'-map','[a]','-ar','48000','-ac','2','-c:a','pcm_s24le',str(out/f'expert-v2-{name}.wav')])
if '--audio-only' in sys.argv:
 print('Audio stems and both mixes prepared.');sys.exit(0)
# Reset each subtle push-in at actual dialogue cuts; use small framing changes to mask edits.
expr='1.02'
for i,row in reversed(list(enumerate(edit['cuts']))):
 base=1.015 if i%2==0 else 1.065
 term=f'{base}+0.015*(on-{row["fromFrame"]})/{row["toFrame"]-row["fromFrame"]}'
 expr=f'if(lt(on,{row["toFrame"]}),{term},{expr})'
full=[s for s in edit['shots'] if s['id'] in ['energy','dynamis','direction','close']]
enable='+'.join(f'gte(t,{s["fromFrame"]/30})*lt(t,{s["toFrame"]/30})' for s in full)
filt=[
 '[0:v]split=2[main][portrait]',
 f"[main]zoompan=z='{expr}':x='iw/2-iw/zoom/2':y='ih*.48-ih/zoom*.48':d=1:s=1080x1920:fps=30,eq=saturation=.9:contrast=1.025:brightness=.003,setsar=1[base]",
 "[portrait]scale=300:534:flags=lanczos,eq=saturation=.9:contrast=1.025:brightness=.003,format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='255*clip(40.5-hypot(max(abs(X-W/2)-(W/2-40),0),max(abs(Y-H/2)-(H/2-40),0)),0,1)'[small]",
 f"[base][small]overlay=108:1050:enable='{enable}'[stage]",
 '[stage][1:v]overlay=0:0:format=auto[graphics]',
 f'[graphics][2:v]overlay=0:1600:format=auto,fade=t=out:st={duration-.3}:d=0.3,format=yuv420p[v]']
script=root/'production/expert-v2/composite.ffscript';script.write_text(';\n'.join(filt))
run(common+['-i',str(source),'-framerate','30','-i',str(overlay/'element-%04d.png'),'-framerate','30','-i',str(out/'expert-v2-captions/element-%04d.png'),'-i',str(out/'expert-v2-master.wav'),'-filter_complex_threads','2','-filter_complex_script',str(script),'-map','[v]','-map','3:a','-frames:v',str(n),'-c:v','libx264','-preset','fast','-crf','19','-threads','4','-pix_fmt','yuv420p','-color_range','tv','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-c:a','aac','-b:a','192k','-ar','48000','-movflags','+faststart',str(out/'expert-potential-v2.mp4')])
# Exact same video bitstream and SFX, remove only the original atmospheric score.
run(common+['-i',str(out/'expert-potential-v2.mp4'),'-i',str(out/'expert-v2-no-music.wav'),'-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','192k','-ar','48000','-t',str(duration),'-movflags','+faststart',str(out/'expert-potential-v2-no-music.mp4')])
run(common+['-i',str(out/'expert-potential-v2.mp4'),'-vf','scale=720:1280:flags=lanczos','-c:v','libx264','-preset','fast','-crf','22','-threads','4','-c:a','aac','-b:a','128k','-color_range','tv','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-movflags','+faststart',str(out/'expert-potential-v2-mobile.mp4')])
print('Completed all three exports.')
