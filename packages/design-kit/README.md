# @joeykwispel/design-kit

The design system of [joeyoosenbrug.nl](https://joeyoosenbrug.nl): tokens, base styles, components and the shared header that every `*.joeyoosenbrug.nl` app uses.

**Documentation, live examples and guidelines: [designkit.joeyoosenbrug.nl](https://designkit.joeyoosenbrug.nl)**

## Install

```sh
npm i @joeykwispel/design-kit @fontsource-variable/inter @fontsource-variable/jetbrains-mono
```

```js
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import '@joeykwispel/design-kit/kit.css';
import '@joeykwispel/design-kit/header.css';
```

## What is in it

| Import          | Contents                                                                    |
| --------------- | --------------------------------------------------------------------------- |
| `/kit.css`      | Tokens for both themes, base styles, the backdrop, `.btn` `.tag` `.glass` … |
| `/header.css`   | Styles of the header, classes prefixed `jo-nav`                             |
| `/header`       | `initJoHeader`, `readTheme`, `setTheme`, `headerLabels`                     |
| `/svelte`       | `Header`, a Svelte 5 component                                              |
| `/react`        | `JoHeader`, a React component                                               |
| `/header.html`  | The header as plain markup                                                  |
| `/tokens`       | Token values as typed JavaScript, plus `contrast()`                         |
| `/tokens.json`  | The same values as JSON                                                     |
| `/tailwind.css` | The tokens as Tailwind 4 theme variables                                    |
| `/theme-script` | The script that sets the theme before the first paint, and its CSP hash     |

## License

MIT
