#!/usr/bin/env bash

web-ext build --ignore-files \
    "icons/*.sh" \
    "icons/*.svg" \
    "test-page.html" \
    "CHANGELOG.md" \
    "screenshot.png" \
    "build.sh"
