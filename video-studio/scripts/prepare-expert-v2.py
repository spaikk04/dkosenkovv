"""Frame-aligned dialogue edit and remapped captions; no speech synthesis."""
from pathlib import Path
import json, subprocess
root=Path(__file__).resolve().parents[1]
# Source is the retained, SDR-converted 60.5s take. Exact boundaries are 30fps.
ranges=[(0,177),(190,352),(358,474),(481,598),(603,675),(681,807),(813,948),(955,1041),(1059,1168),(1218,1258),(1263,1517),(1524,1587),(1591,1674),(1733,1815)]
rows=[]; cursor=0
for i,(a,b) in enumerate(ranges):
 rows.append(dict(id=f'cut{i+1}',sourceFrom=a,sourceTo=b,fromFrame=cursor,toFrame=cursor+b-a));cursor+=b-a
v=json.load(open(root/'src/expert/captions.json'))
words=[]
for w in v['words']:
 # Retained 'пока' begins after the measured silence at 35.435s; Whisper onset included silence.
 if w['text']=='пока' and 34<w['start']<36:w={**w,'start':35.4333}
 mid=(w['start']+w['end'])/2*30
 for r in rows:
  if r['sourceFrom']<=mid<r['sourceTo']:
   words.append({**w,'start':round(max(r['sourceFrom']/30,w['start'])-r['sourceFrom']/30+r['fromFrame']/30,4),'end':round(min(r['sourceTo']/30,w['end'])-r['sourceFrom']/30+r['fromFrame']/30,4)})
   break
for w in words:
 if w['text']=='помогут' and w['start']>50:w['text']='Помогут'
captions=[];group=[]
for w in words:
 if group and (len(group)>=4 or w['start']-group[-1]['end']>.25 or len(' '.join(x['text'] for x in group))+len(w['text'])>32):
  captions.append({'start':group[0]['start'],'end':group[-1]['end']+.1,'words':group});group=[]
 group.append(w)
 if (w['text'].endswith(('.','?','!')) or (w['text'].endswith((',',';')) and len(group)>=2)):
  captions.append({'start':group[0]['start'],'end':group[-1]['end']+.1,'words':group});group=[]
if group:captions.append({'start':group[0]['start'],'end':group[-1]['end']+.1,'words':group})
for a,b in zip(captions,captions[1:]):a['end']=min(a['end'],b['start'])
# Map the established semantic scene boundaries into the new cut.
def dest(src):
 for r in rows:
  if r['sourceFrom']<=src<r['sourceTo']:return r['fromFrame']+src-r['sourceFrom']
 return next((r['fromFrame'] for r in rows if r['sourceFrom']>src),cursor)
scenes=[('hook',0,'Большой потенциал'),('thinkers',195,'Три философа'),('energy',351,'Статичная энергия'),('dynamis',483,'Дюнамис'),('pressure',678,'Давление'),('direction',954,'Форма и цель'),('step1',1137,'Предназначение и цель'),('step2',1263,'Регулярные действия'),('step3',1401,'Меньше анализа'),('step4',1524,'Ожидания'),('step5',1593,'Реальность'),('close',1674,'Раскрыть потенциал')]
shots=[dict(id=id,fromFrame=dest(a),label=label) for id,a,label in scenes]
for i,s in enumerate(shots):s['toFrame']=shots[i+1]['fromFrame'] if i+1<len(shots) else cursor
manifest={'fps':30,'totalFrames':cursor,'duration':cursor/30,'cuts':rows,'shots':shots,'captions':captions,'words':words,'changes':['Remove dead lead-in and excess pauses; retain breathing room.','Remove uncertain own-voice/Aristotle aside; join determine + purpose and goal.','Remove closing phrase five golden philosophers; retain help you recognize and unlock your potential.','Correct onset of пока against measured speech activity.']}
(root/'production/expert-v2/edit.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
(root/'src/expert-v2/edit.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
filters=[];inputs=[]
for i,r in enumerate(rows):
 start=r['sourceFrom']/30;end=r['sourceTo']/30
 # Local 4ms edge fades prevent clicks, well below phoneme length.
 dur=end-start
 filters.extend([f'[0:v]trim=start_frame={r["sourceFrom"]}:end_frame={r["sourceTo"]},setpts=PTS-STARTPTS[v{i}]',f'[0:a]atrim=start={start}:end={end},asetpts=PTS-STARTPTS,afade=t=in:d=0.004,afade=t=out:st={max(0,dur-.004)}:d=0.004[a{i}]'])
 inputs.append(f'[v{i}][a{i}]')
filters.append(''.join(inputs)+f'concat=n={len(rows)}:v=1:a=1[v][a]')
script=root/'production/expert-v2/cut.ffscript';script.write_text(';\n'.join(filters))
out=root/'public/footage/expert-v2-cut.mp4'
subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','warning','-threads','2','-i',str(root/'public/footage/expert-cut-sdr.mp4'),'-filter_complex_threads','2','-filter_complex_script',str(script),'-map','[v]','-map','[a]','-r','30','-c:v','libx264','-preset','fast','-crf','17','-threads','4','-c:a','aac','-b:a','192k','-ar','48000','-movflags','+faststart',str(out)],check=True)
print(json.dumps({'frames':cursor,'duration':cursor/30,'shots':shots},ensure_ascii=False))
