### Introduction

<!-- Give a short introduction to your changes. What is your motivation or the benefit of these changes? -->

### All Submissions:

* [ ] Have you tested your changes with the `test-page.html` file?
* [ ] Have you added a short summary to the `CHANGELOG.md`, or actively decided that it's not worth mentioning?
* [ ] If you touched `background.js` or the manifest's `background` config: have you verified the add-on still works after the background script suspends and wakes up again (terminate it via `about:debugging` → "Terminate Background Script", wait ~30-60s, then trigger a Safe Link)? A past regression (see #14) came from a listener that stopped firing after suspend/wake.
