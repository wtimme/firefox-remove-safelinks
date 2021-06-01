# Remove Microsoft Safe Links

When enabled, "Microsoft Defender for Office 365" uses a feature called
["Safe Link"][safe-link] to replace links in emails with URLs that go through
Microsoft's servers. I consider this an invasion of my privacy.

The Firefox addon detects when you open a "Safe Link" and, instead of sending
your data to Microsoft, it directly opens the original URL.

## How to package the addon

1. Install `web-ext` (see [their GitHub README][web-ext])
2. From your checkout, run `web-ext build`

## Source code checklist (Firefox addon review)

- [x] **Did you use any build tools?** No.
- [x] **Does your package include source code for any private repositories or frameworks used in your add-on?** All of the code is open source. It does not contain any frameworks.
- [x] **Operation system used for the build:** macOS 11.1
- [x] **Details of any specific versions of tools or utilities needed:** There are none. A simple text editor will suffice.
- [x] **Links to any tools or utilities that need to be downloaded:** n/a
- [x] **Guidance for installing any downloaded tools and utilities, for example, links to online instructions:** n/a
- [x] **instructions for building your add-on code or details of any scripts provided:** n/a
- [x] **Does your package include your build script?** I do not have a build script. The instructions on how to build are part of this README.

[safe-link]: https://docs.microsoft.com/en-us/microsoft-365/business-video/safe-links?view=o365-worldwide
[web-ext]: https://github.com/mozilla/web-ext
