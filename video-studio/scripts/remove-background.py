"""Remove an image background with the locally cached U2NetP model."""
import os
from pathlib import Path
import sys
import hashlib
import urllib.request

os.environ.setdefault('U2NET_HOME', '/workspace/.cache/u2net')
os.environ.setdefault('NUMBA_CACHE_DIR', '/workspace/.cache/numba')
os.environ.setdefault('OMP_NUM_THREADS', '2')
model = Path(os.environ['U2NET_HOME']) / 'u2netp.onnx'
model.parent.mkdir(parents=True, exist_ok=True)
if not model.exists():
    urllib.request.urlretrieve('https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2netp.onnx', model)
if hashlib.md5(model.read_bytes()).hexdigest() != '8e83ca70e441ab06c318d82300c84806':
    raise RuntimeError('U2NetP checksum does not match the upstream rembg checksum')
if len(sys.argv) == 2 and sys.argv[1] == '--prepare':
    print('U2NetP model checksum verified')
    sys.exit(0)
if len(sys.argv) != 3:
    raise SystemExit('Usage: remove-background.py INPUT_IMAGE OUTPUT_PNG | --prepare')
from rembg import new_session, remove
from PIL import Image
result = remove(Image.open(sys.argv[1]), session=new_session('u2netp'))
result.save(sys.argv[2])
print(f'Saved {result.size} RGBA image to {sys.argv[2]}')
