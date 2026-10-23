"""Download official Whisper small with SHA-256 verification, then transcribe Russian."""
from pathlib import Path
import hashlib
import json
import urllib.request
import torch
import whisper

root = Path('/workspace/dkosenkovv/video-studio')
cache = Path('/workspace/.cache/whisper')
cache.mkdir(parents=True, exist_ok=True)
expected = '9ecf779972d90ba49c06d968637d720dd632c55bbf19d441fb42bf17a411e794'
model_path = cache / 'small.pt'
if not model_path.exists():
    urllib.request.urlretrieve(f'https://openaipublic.azureedge.net/main/whisper/models/{expected}/small.pt', model_path)
if hashlib.sha256(model_path.read_bytes()).hexdigest() != expected:
    raise RuntimeError('Whisper model failed official SHA-256 verification')
torch.set_num_threads(4)
model = whisper.load_model(str(model_path), device='cpu')
result = model.transcribe(str(root/'production/expert-edit/speech.wav'), language='ru', word_timestamps=True, fp16=False, verbose=False)
folder = root/'production/expert-edit'
(folder/'transcript.json').write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n')
(folder/'transcript.txt').write_text(result['text']+'\n')
captions = [{'text': w['word'], 'startMs': round(w['start']*1000), 'endMs': round(w['end']*1000), 'timestampMs': round(w['start']*1000), 'confidence': w.get('probability')} for s in result['segments'] for w in s.get('words', [])]
(folder/'captions.json').write_text(json.dumps(captions, ensure_ascii=False, indent=2)+'\n')
print(result['text'])
