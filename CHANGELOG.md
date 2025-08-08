# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.10.0] - 2024-02-12
### Added
- Added options UI for testing an URL against the regular expressions
- Added example for regular expressions, in order to make it easier to get started

## [1.9.0] - 2024-02-07
### Added
- Added options UI for blocking URLs matching patterns instead of _all_ URLs (#18)

## Changed
- Migrated background script to be non-persistent (in preparation for Manifest V3)

## [1.8.0] - 2024-11-02
Due to issues with the changes that have been introduced with 1.7.0 (see GitHub issues),
I have decided to revert the corresponding changes for now, as our privacy
is more important than the features that have been added.

If you have experience with Firefox Add-On development (and especially Manifest V3 and
background scripts), please do not hesitate to reach out and help on GitHub.

Thanks in advance, and sorry for any inconvenience!

## [1.7.0] - 2024-10-19
### Added
- Added "allow list" option for limitting the add-on to user-configured URLs (@LukeCz)
- Upgrade to Manifest v3 (@LukeCz)

## [1.6.0] - 2023-05-01
### Added
- Support for office365.us Safe Link domains (e.g. "usg01.safelinks.protection.office365.us") (#8)

## [1.5.0] - 2023-01-25
### Added
- Support for regional Safe Link domains (e.g. "eur01.safelinks.protection.outlook.com")

## [1.4.0] - 2023-01-13
### Changed
- Limit the permission of the add-on to only the pages that require a redirect instead of `<all_urls>` (@LukeCz)
- Reduce complexity when preparing the redirect (@LukeCz)

## [1.3.0] - 2022-12-29
### Added
- Add icon for the add-on

## [1.2.0] - 2022-12-29
### Added
- Support for Safe Links in outlook.office.com ([#3](https://github.com/wtimme/firefox-remove-safelinks/issues/3))

## [1.1.0] - 2021-09-23
### Added
- Support for new Safe Links URL in MS Teams [@mpexo](https://github.com/mpexo)

## [1.0.0] - 2021-06-01

The initial release 🎉

[1.10.0]: https://github.com/wtimme/firefox-remove-safelinks/compare/1.9.0...1.10.0
[1.9.0]: https://github.com/wtimme/firefox-remove-safelinks/compare/1.8.0...1.9.0
[1.8.0]: https://github.com/wtimme/firefox-remove-safelinks/compare/1.7.0...1.8.0
[1.7.0]: https://github.com/wtimme/firefox-remove-safelinks/compare/1.6.0...1.7.0
[1.6.0]: https://github.com/wtimme/firefox-remove-safelinks/compare/1.5.0...1.6.0
[1.5.0]: https://github.com/wtimme/firefox-remove-safelinks/compare/1.4.0...1.5.0
[1.4.0]: https://github.com/wtimme/firefox-remove-safelinks/compare/1.3.0...1.4.0
[1.3.0]: https://github.com/wtimme/firefox-remove-safelinks/compare/1.2.0...1.3.0
[1.2.0]: https://github.com/wtimme/firefox-remove-safelinks/compare/1.1.0...1.2.0
[1.1.0]: https://github.com/wtimme/firefox-remove-safelinks/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/wtimme/firefox-remove-safelinks/releases/tag/1.0.0
