#!/bin/bash

# Video compression script for web
# Compresses all videos in input directory and outputs to public/videos/

INPUT_DIR="${1:-./raw-videos}"
OUTPUT_DIR="${2:-./public/videos}"

# Settings
WIDTH=1280          # Max width (height auto-calculated)
CRF=28              # Quality: 18-28 (lower = better quality, bigger file)
PRESET="slow"       # Encoding speed: ultrafast, fast, medium, slow, veryslow

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}Error: ffmpeg is not installed${NC}"
    echo "Install with: sudo apt install ffmpeg"
    exit 1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Check if input directory exists
if [ ! -d "$INPUT_DIR" ]; then
    echo -e "${RED}Error: Input directory '$INPUT_DIR' does not exist${NC}"
    echo ""
    echo "Usage: ./compress-videos.sh [input_dir] [output_dir]"
    echo "  Default input:  ./raw-videos"
    echo "  Default output: ./public/videos"
    echo ""
    echo "Example:"
    echo "  mkdir raw-videos"
    echo "  # Copy your original videos to raw-videos/"
    echo "  ./scripts/compress-videos.sh"
    exit 1
fi

# Count videos
VIDEO_COUNT=$(find "$INPUT_DIR" -maxdepth 1 -type f \( -iname "*.mp4" -o -iname "*.mov" -o -iname "*.avi" -o -iname "*.mkv" -o -iname "*.webm" \) | wc -l)

if [ "$VIDEO_COUNT" -eq 0 ]; then
    echo -e "${YELLOW}No video files found in '$INPUT_DIR'${NC}"
    exit 0
fi

echo ""
echo "=================================="
echo "  Video Compression for Web"
echo "=================================="
echo ""
echo "Input:    $INPUT_DIR"
echo "Output:   $OUTPUT_DIR"
echo "Videos:   $VIDEO_COUNT"
echo "Width:    ${WIDTH}px"
echo "Quality:  CRF $CRF"
echo ""

# Process each video
COUNTER=0
while IFS= read -r INPUT_FILE; do
    [ -f "$INPUT_FILE" ] || continue

    COUNTER=$((COUNTER + 1))
    FILENAME=$(basename "$INPUT_FILE")
    BASENAME="${FILENAME%.*}"
    OUTPUT_FILE="$OUTPUT_DIR/${BASENAME}.mp4"

    echo -e "${YELLOW}[$COUNTER/$VIDEO_COUNT] Processing: $FILENAME${NC}"

    # Get original file size
    ORIGINAL_SIZE=$(du -h "$INPUT_FILE" | cut -f1)

    # Compress video (try libx264, fallback to libx265, then mpeg4)
    if ffmpeg -encoders 2>/dev/null | grep -q libx264; then
        ENCODER="libx264"
        EXTRA_OPTS="-preset $PRESET"
    elif ffmpeg -encoders 2>/dev/null | grep -q libx265; then
        ENCODER="libx265"
        EXTRA_OPTS="-preset $PRESET"
    else
        ENCODER="mpeg4"
        EXTRA_OPTS="-q:v 5"
    fi

    ffmpeg -i "$INPUT_FILE" \
        -vcodec $ENCODER \
        -crf $CRF \
        $EXTRA_OPTS \
        -vf "scale=${WIDTH}:-2" \
        -an \
        -movflags +faststart \
        -y \
        "$OUTPUT_FILE"

    if [ $? -eq 0 ]; then
        NEW_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
        echo -e "${GREEN}  ✓ Done: $ORIGINAL_SIZE → $NEW_SIZE${NC}"
    else
        echo -e "${RED}  ✗ Failed to compress $FILENAME${NC}"
    fi

    echo ""
done < <(find "$INPUT_DIR" -maxdepth 1 -type f \( -iname "*.mp4" -o -iname "*.mov" -o -iname "*.avi" -o -iname "*.mkv" -o -iname "*.webm" \))

echo "=================================="
echo -e "${GREEN}  Compression complete!${NC}"
echo "=================================="
echo ""
echo "Videos saved to: $OUTPUT_DIR"
echo ""
