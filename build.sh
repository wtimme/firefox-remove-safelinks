#!/usr/bin/env bash

# The list of files to ignore is defined in web-ext-config.mjs, which is
# picked up automatically by both `web-ext build` and `web-ext lint`.
web-ext build
