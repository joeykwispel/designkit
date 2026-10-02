# Changelog

All notable changes to `@joeykwispel/design-kit`. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versions follow [Semantic Versioning](https://semver.org/): renaming or removing a token or class is a major release, a new token or class a minor one.

## 1.1.0

### Added

- `svelte`: a `tools` snippet for an app's own controls in the header, such as a sign-in button. It is rendered before the language switch.
- `react`: the same through `children`.

### Fixed

- `tokens`: the type declarations pointed at `.ts` files that are not in the package. They now point at the `.js` files next to them.

## 1.0.0

The design kit as a package. Until now it lived in `docs/design-kit/` of the portfolio and was copied into every app by hand.

### Added

- `kit.css` and `header.css`: the same CSS as the copied `jo-kit.css` and `jo-header.css`, so adopting the package changes nothing on screen.
- `header`: `initJoHeader`, `readTheme`, `setTheme`, and `headerLabels` with the header's wording in English and Dutch.
- `tokens` and `tokens.json`: every token value for both themes, for canvas, generated images and `<meta name="theme-color">`.
- `tailwind.css`: the tokens as Tailwind 4 theme variables.
- `theme-script`: the script that sets the theme before the first paint, with its Content-Security-Policy hash.
- `svelte`: the header as a Svelte 5 component.
- `react`: the header as a React component.
- `header.html`: the header as plain markup.

### Fixed

- The Ctrl K button is no longer visible when it has the `hidden` attribute. Its `display: inline-flex` used to win.
