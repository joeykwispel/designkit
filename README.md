# designkit

The design system of [joeyoosenbrug.nl](https://joeyoosenbrug.nl), in one place:

- **`packages/design-kit`**: the npm package [`@joeykwispel/design-kit`](packages/design-kit/README.md). Tokens, base styles, components and the shared header that every `*.joeyoosenbrug.nl` app installs.
- **`site`**: the documentation at [designkit.joeyoosenbrug.nl](https://designkit.joeyoosenbrug.nl), in English and Dutch, built with the package itself.

## Working on it

Needs Node 24.

```sh
npm install        # also builds the package once
npm run build:kit  # rebuild the package after changing it
npm run lint
npm run check
npm run test:unit
```

Every token value is typed once, in `packages/design-kit/src/tokens/tokens.ts`. The build writes the `:root` blocks of `kit.css`, `tokens.json` and `tailwind.css` from it.

Changes go through a pull request into `main`. The checks have to be green before anything merges.

## License

MIT
