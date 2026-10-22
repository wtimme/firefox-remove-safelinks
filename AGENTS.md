# Instructions for AI agents

Read [CONTRIBUTING.md](CONTRIBUTING.md) first; its rules (atomic commits, AI
trailer in commit messages, every commit must load, `web-ext lint`) apply to
agents as well. This file only records things that are not obvious from the
code or from CONTRIBUTING.md.

## Known `web-ext lint` warning: `MISSING_DATA_COLLECTION_PERMISSIONS`

`web-ext lint` currently reports exactly one warning:

> The "/browser_specific_settings/gecko/data_collection_permissions" property
> is required for all new Firefox extensions, and will be required for new
> versions of existing extensions in the future.

**This warning is expected. Do not fix it, and do not ask the developer about
it.** Leave it out of "lint is not clean" reports and PR notes, except to say
that it is the known one.

Why it is deliberately left unaddressed:

- This add-on has been public for a long time, so Mozilla treats it as an
  *existing* extension. For those, the key is only a hint about what will
  become mandatory later; it is not required today.
- Adding the key would require raising `strict_min_version` above 109, because
  Firefox versions that predate the key do not support it. Dropping those
  Firefox versions is a user-facing decision that has not been made. (Check
  MDN for the exact version that introduced the key before revisiting this.)

Revisit only when the developer says so, or when Mozilla makes the key
mandatory for new versions of existing extensions. At that point it is a
deliberate release decision (min-version bump, CHANGELOG entry, likely a major
or minor version bump), not a drive-by lint fix.

Any *other* warning, notice or error from `web-ext lint` is still a problem
and must be fixed per CONTRIBUTING.md.
