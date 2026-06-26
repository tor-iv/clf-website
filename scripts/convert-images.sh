#!/bin/bash
SRC="/Users/torcox/Desktop/caregiverliberation.org"
DEST="./public/images"
mkdir -p "$DEST"

CONVERTED_COUNT=0
COPIED_COUNT=0

# Copy web-ready JPEGs
for f in "$SRC"/*.JPG "$SRC"/*.jpg "$SRC"/*.jpeg "$SRC"/*.JPEG; do
  [ -f "$f" ] || continue
  base=$(basename "$f" | tr '[:upper:]' '[:lower:]' | sed 's/\.[^.]*$//')
  sips -s format jpeg "$f" --out "$DEST/${base}.jpg" 2>/dev/null
  if [ $? -eq 0 ]; then
    echo "Copied: $base.jpg"
    ((COPIED_COUNT++))
  fi
done

# Convert HEIC to JPEG
for f in "$SRC"/*.HEIC "$SRC"/*.heic; do
  [ -f "$f" ] || continue
  base=$(basename "$f" .HEIC | tr '[:upper:]' '[:lower:]')
  base=$(basename "$base" .heic)
  sips -s format jpeg "$f" --out "$DEST/${base}.jpg" 2>/dev/null
  if [ $? -eq 0 ]; then
    echo "Converted: $base.jpg"
    ((CONVERTED_COUNT++))
  fi
done

echo ""
echo "Summary:"
echo "--------"
echo "HEIC files converted: $CONVERTED_COUNT"
echo "JPEG files copied: $COPIED_COUNT"
echo "Total files in $DEST: $(ls -1 "$DEST" | wc -l)"
