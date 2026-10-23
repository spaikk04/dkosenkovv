"""Check final file timing, audio alignment and output streams (not a listening test)."""
import json,subprocess
from pathlib import Path
import numpy as np
from scipy.signal import correlate,correlation_lags
root=Path(__file__).resolve().parents[1]
out=root/'out/expert-potential-v1.mp4'
meta=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(out)],text=True))
v=next(s for s in meta['streams'] if s['codec_type']=='video');a=next(s for s in meta['streams'] if s['codec_type']=='audio')
assert (v['width'],v['height'])==(1080,1920)
assert v['codec_name']=='h264' and a['codec_name']=='aac'
assert int(v['nb_frames'])==1815
assert abs(float(meta['format']['duration'])-60.5)<.1

def audio(path):
 b=subprocess.check_output(['ffmpeg','-v','error','-i',str(path),'-t','12','-vn','-ac','1','-ar','8000','-f','f32le','pipe:1'])
 return np.frombuffer(b,dtype='<f4').astype(np.float64)
x=audio(root/'public/footage/expert-cut-sdr.mp4');y=audio(out)
z=correlate(y,x,method='fft');lags=correlation_lags(len(y),len(x))
sel=np.abs(lags)<=1600;best=int(lags[sel][np.argmax(z[sel])]);ms=best/8
assert abs(ms)<60,f'Unexpected audio offset {ms}ms'
report={'duration':float(meta['format']['duration']),'frames':int(v['nb_frames']),'resolution':[v['width'],v['height']],'video':v['codec_name'],'audio':a['codec_name'],'dialogue_offset_ms_first12seconds':ms,'note':'Numerical alignment check, not a subjective listening or full lip-sync audit.'}
(root/'production/expert-edit/qa-metrics.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
