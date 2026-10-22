# Contributing

This project is a small, unbundled Firefox WebExtension — there's no build
step beyond what `web-ext` does for packaging. To keep the history useful
and the add-on reliable, contributions are expected to follow the rules
below.

## AI-assisted commits must say so

If AI was used to write or materially change the code in a commit, that must
be conveyed in the commit message, not just in the PR description. Add a
trailer identifying the tool/model, for example:

```
Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
```

This applies to any AI assistant, not just Claude — use the trailer that
correctly identifies the tool you used. The point is that `git log` and
`git blame` stay an honest record of how the code came to be, without
anyone having to go dig through a PR thread to find out.

## Commits should be small and atomic

Each commit should represent one logical change and be independently:

- reviewable,
- revertible (`git revert`),
- cherry-pickable (`git cherry-pick`),
- bisectable (`git bisect`).

Avoid bundling unrelated changes together. If you catch yourself writing
"and" in a commit message's subject line, it's often a sign the commit
should be split.

## Every commit must build

The add-on must load without errors at every commit — not just on the final
commit of a PR. Concretely, before committing, load the extension
temporarily (e.g. `about:debugging#/runtime/this-firefox` → "Load Temporary
Add-on…`, or `web-ext run`) and confirm it starts up without errors in the
console. Don't leave intermediate commits in a broken state; if a change
can't be made in one atomic, working step, find a sequence of smaller
working steps instead.

## `web-ext lint` must be clean before opening a PR

Before opening a pull request, run:

```
web-ext lint
```

and make sure it reports no errors, notices, or warnings. This keeps the
add-on store submission process friction-free and catches manifest/API
mistakes early.

Ideally, this holds for every commit in the PR, not just the final state —
if an intermediate commit needs to carry a lint warning for some reason, do
that deliberately (e.g. note it in the commit message) rather than by
accident.

## Also see

- [README.md](README.md) for how to test and package the add-on.
- [.github/pull_request_template.md](.github/pull_request_template.md) for
  the checklist that applies when opening a PR.
