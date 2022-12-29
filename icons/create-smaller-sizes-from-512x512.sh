#!/usr/bin/env bash

ORIGINAL_FILE="512x512.png"

convert "$ORIGINAL_FILE" -resize 48x48 "48x48.png"
convert "$ORIGINAL_FILE" -resize 96x96 "96x96.png"
