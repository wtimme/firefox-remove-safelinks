#!/bin/bash

# Install the dependencies
npm install

# Build the extension
web-ext build --ignore-files \
  "node_modules/**" \
  "package{,-lock}.json" \
  "icons/*.sh" \
  "icons/*.svg" \
  "test-page.html" \
  "CHANGELOG.md"
