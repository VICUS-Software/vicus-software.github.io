#!/bin/bash

# Run from public/videos/ directory

# 1. Create a folder for original videos (if not exists)
mkdir -p raw-videos

# 2. Move original videos there
shopt -s nullglob
for f in *.mp4 *.mov *.avi *.mkv *.webm; do
    mv "$f" raw-videos/
done
shopt -u nullglob

# 3. Run compression (output back to current directory)
../../scripts/compress-videos.sh ./raw-videos ./
