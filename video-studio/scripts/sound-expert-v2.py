"""Original atmospheric score + sample-aligned sparse SFX, deterministic stems."""
from pathlib import Path
import subprocess,json,wave
import numpy as np
root=Path(__file__).resolve().parents[1]
edit=json.load(open(root/'production/expert-v2/edit.json'));sr=48000
n=round(edit['totalFrames']/30*sr);time=np.arange(n)/sr
shots=edit['shots'];fx=np.zeros((n,2),np.float64);events=[]
# Peak targets are relative to authored shot starts, matching the .4s entry poses.
recipes={
 'hook':[('air.mp3',12,.065)],
 'thinkers':[('paper.mp3',12,.06),('paper.mp3',15,.045),('paper.mp3',18,.035)],
 'energy':[('air.mp3',12,.09),('impact.mp3',16,.055)],
 'dynamis':[('metal.mp3',12,.075),('impact.mp3',45,.06)],
 'pressure':[('air.mp3',12,.045)],
 'direction':[('metal.mp3',12,.09),('impact.mp3',45,.08)],
 'step1':[('paper.mp3',12,.05)],'step2':[('paper.mp3',12,.05)],
 'step3':[('sweep.mp3',12,.05)],'step4':[('air.mp3',12,.045)],'step5':[('impact.mp3',12,.065)],
 'close':[('air.mp3',12,.08),('impact.mp3',45,.08),('shimmer.mp3',58,.03)]}
cache={}
for shot in shots:
 for src,offset,peak in recipes[shot['id']]:
  if src not in cache:
   raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(root/'public/audio/v2'/src),'-f','f32le','-ar',str(sr),'-ac','2','-'])
   a=np.frombuffer(raw,dtype=np.float32).reshape(-1,2).astype(np.float64)
   # Limit samples to this visual gesture. Fade rather than leave long tails.
   length=min(len(a),int((1.1 if src in ['air.mp3','shimmer.mp3'] else .75)*sr));a=a[:length].copy()
   env=np.max(np.abs(a),axis=1)
   attack=int(np.argmax(env))
   # Keep at most 0.3 seconds pre-attack, important for sweep alignment.
   crop=max(0,attack-int(.3*sr));a=a[crop:];attack-=crop
   a/=max(np.max(np.abs(a)),1e-8)
   fade=min(int(.12*sr),len(a)//3)
   a[:min(240,len(a))]*=np.linspace(0,1,min(240,len(a)))[:,None]
   a[-fade:]*=np.linspace(1,0,fade)[:,None]
   attack=int(np.argmax(np.max(np.abs(a),axis=1)))
   a/=max(np.max(np.abs(a)),1e-8)
   cache[src]=(a,attack)
  a,attack=cache[src]
  target=shot['fromFrame']+offset
  start=round(target/30*sr)-attack
  sound=a*peak
  if start<0:sound=sound[-start:];start=0
  end=min(n,start+len(sound));fx[start:end]+=sound[:end-start]
  events.append({'shot':shot['id'],'src':src,'targetFrame':target,'peakOffsetSamples':attack,'startSample':start,'peakGain':peak,'durationSamples':end-start})
# Cinematic harmonic air, original and non-percussive: no third-party BGM.
score=np.zeros(n)
chords=[[73.416,110,146.832,174.614],[65.406,98,130.813,164.814],[87.307,130.813,174.614,220],[73.416,110,146.832,220]]
for k,freqs in enumerate(chords):
 start=n*k/4/sr;end=n*(k+1)/4/sr
 fadein=np.clip((time-start+1.8)/1.8,0,1);fadeout=np.clip((end+1.8-time)/1.8,0,1)
 env=fadein*fadeout
 for j,freq in enumerate(freqs):
  score+=.022/(1+j*.35)*np.sin(2*np.pi*freq*time+.2*j)*env*(.8+.2*np.sin(2*np.pi*.07*time+j))
# Lift into the closing object, never covering the voice.
score*=1+.35*np.clip((time-shots[-1]['fromFrame']/30)/1.2,0,1)
score*=np.minimum(np.clip(time/1,0,1),np.clip((n/sr-time)/.6,0,1))
stereo=np.stack([score,np.roll(score,31)],axis=1)
def save(path,a):
 with wave.open(str(path),'wb') as w:
  w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((np.clip(a,-.99,.99)*32767).astype('<i2').tobytes())
save(root/'public/audio/v2/sfx.wav',fx);save(root/'public/audio/v2/score.wav',stereo)
metrics={'sampleRate':sr,'samples':n,'events':events,'sfxPeakDb':float(20*np.log10(max(np.max(np.abs(fx)),1e-9))),'scoreRmsDb':float(20*np.log10(max(np.sqrt(np.mean(stereo**2)),1e-9))),'scoreSource':'Original deterministic harmonic atmosphere; no rhythmic beat grid or third-party music.'}
(root/'production/expert-v2/sound-plan.json').write_text(json.dumps(metrics,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:v for k,v in metrics.items() if k!='events'}));print('SFX events:',len(events))
