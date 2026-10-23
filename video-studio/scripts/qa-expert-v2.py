"""Verify the actual exported files, preserving subprocess failure exit codes."""
from pathlib import Path
import subprocess,json,re,hashlib
import numpy as np
from PIL import Image,ImageDraw
root=Path(__file__).resolve().parents[1];out=root/'out';qa=out/'expert-v2-qa'
edit=json.load(open(root/'src/expert-v2/edit.json'));total=edit['totalFrames']
report={};names=['expert-potential-v2','expert-potential-v2-no-music','expert-potential-v2-mobile']
for name in names:
 path=out/f'{name}.mp4'
 probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(path)]))
 video=next(s for s in probe['streams'] if s['codec_type']=='video');audio=next(s for s in probe['streams'] if s['codec_type']=='audio')
 assert video['codec_name']=='h264' and video['pix_fmt']=='yuv420p'
 assert video['color_space']=='bt709' and video['color_range']=='tv'
 assert int(video['nb_frames'])==total
 assert (video['width'],video['height'])==((720,1280) if name.endswith('mobile') else (1080,1920))
 assert audio['codec_name']=='aac' and audio['sample_rate']=='48000'
 decode=subprocess.run(['ffmpeg','-v','error','-threads','2','-i',str(path),'-map','0:v','-map','0:a','-f','null','-'],capture_output=True,text=True,check=True)
 assert not decode.stderr.strip(),decode.stderr
 # Faststart atom ordering, not a filename assertion.
 atoms=[]
 with open(path,'rb') as file:
  while True:
   start=file.tell();header=file.read(8)
   if len(header)<8:break
   size=int.from_bytes(header[:4],'big');kind=header[4:].decode(errors='replace');headerSize=8
   if size==1:size=int.from_bytes(file.read(8),'big');headerSize=16
   if size<headerSize:break
   atoms.append(kind);file.seek(start+size)
 assert atoms.index('moov')<atoms.index('mdat')
 report[name]={'bytes':path.stat().st_size,'duration':float(probe['format']['duration']),'width':video['width'],'height':video['height'],'frames':int(video['nb_frames']),'codec':video['codec_name'],'audio':audio['codec_name'],'color':video['color_space'],'range':video['color_range'],'fullDecode':'passed','faststart':True}
# Video stream identity across the music/no-music versions.
hashes=[]
for name in names[:2]:
 h=subprocess.check_output(['ffmpeg','-v','error','-i',str(out/f'{name}.mp4'),'-map','0:v','-c','copy','-f','hash','-'],text=True).strip();hashes.append(h)
assert hashes[0]==hashes[1]
report['sameVideoBitstreamBothVariants']=True
# Measure this pipeline's audio output offset; do not assume a priming constant.
def pcm(path):
 return np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',str(path),'-vn','-ar','48000','-ac','1','-f','f32le','-']),np.float32).astype(np.float64)
master=pcm(out/'expert-v2-master.wav');encoded=pcm(out/'expert-potential-v2.mp4')
offsets=[]
for at in [1,20,45]:
 a=master[at*48000:(at+2)*48000];b=encoded[at*48000:(at+2)*48000]
 size=1<<(len(a)+len(b)-1).bit_length();corr=np.fft.irfft(np.fft.rfft(a,size)*np.conj(np.fft.rfft(b,size)),size)
 lags=np.arange(-4096,4097);lag=int(lags[np.argmax(corr[lags%size])]);offsets.append({'atSeconds':at,'outputDelaySamples':-lag,'outputDelayFrames':-lag/1600})
assert max(abs(x['outputDelaySamples']) for x in offsets)<=160
report['audioOffset']={'method':'PCM vs decoded AAC waveform FFT cross-correlation; three independent windows','sampleRate':48000,'pipeline':'FFmpeg libx264/AAC 192k 48kHz MP4; mux edit-list/skip samples respected by FFmpeg decoder','windows':offsets}
measure=subprocess.run(['ffmpeg','-hide_banner','-i',str(out/'expert-potential-v2.mp4'),'-af','loudnorm=I=-16:TP=-1.5:LRA=8:print_format=json','-f','null','-'],capture_output=True,text=True,check=True)
text=measure.stderr;start=text.rfind('{');loud=json.JSONDecoder().raw_decode(text[start:])[0];report['loudness']=loud
assert float(loud['input_tp'])<=-0.8
assert -18<=float(loud['input_i'])<=-14
# Extract actual decoded output frames: one entrance, peak and settled pose per scene.
frames=json.load(open(root/'production/expert-v2/qa-frames.json'))
frames=sorted(set(frames+[s['toFrame']-2 for s in edit['shots']]+[530,850,1067,1541,1618]))
selection='+'.join(f'eq(n,{f})' for f in frames)
subprocess.run(['ffmpeg','-y','-v','error','-i',str(out/'expert-potential-v2.mp4'),'-vf',f"select='{selection}',scale=540:960",'-fps_mode','vfr','-q:v','2','-threads','2',str(qa/'decoded-%03d.jpg')],check=True)
actual=sorted(qa.glob('decoded-*.jpg'));assert len(actual)==len(frames)
for old,f in zip(actual,frames):old.rename(qa/f'final-frame-{f:04d}.jpg')
for label,offset in [('entrance',3),('peak',18),('settled',None)]:
 sheet=Image.new('RGB',(1080,1440),(11,14,20));draw=ImageDraw.Draw(sheet)
 for i,s in enumerate(edit['shots']):
  dur=s['toFrame']-s['fromFrame'];f=s['fromFrame']+(min(max(30,dur//2),dur-2) if offset is None else min(offset,dur-2))
  im=Image.open(qa/f'final-frame-{f:04d}.jpg').resize((270,480))
  sheet.paste(im,((i%4)*270,(i//4)*480));draw.text(((i%4)*270+6,(i//4)*480+6),f'f{f}',fill='white')
 sheet.save(qa/f'contact-{label}.jpg',quality=92)
subprocess.run(['ffmpeg','-y','-v','error','-ss',str(530/30),'-i',str(out/'expert-potential-v2-mobile.mp4'),'-frames:v','1',str(qa/'mobile-frame.jpg')],check=True)
report['decodedQaFrames']=frames
(root/'production/expert-v2/QA-metrics.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2))
