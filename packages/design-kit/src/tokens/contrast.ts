/** WCAG 2 contrast between two CSS colors. Understands `#rgb`, `#rrggbb` and `rgb()` / `rgba()`. */

export type Rgba = [r: number, g: number, b: number, a: number];

export function parseColor(color: string): Rgba {
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color.trim())?.[1];
  if (hex) {
    const full = hex.length === 3 ? [...hex].map((c) => c + c).join('') : hex;
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)).concat(1) as Rgba;
  }
  const parts = /^rgba?\(([^)]+)\)$/i
    .exec(color.trim())?.[1]
    .split(/[\s,/]+/)
    .filter(Boolean)
    .map(Number);
  if (parts && parts.length >= 3 && parts.every((n) => !Number.isNaN(n))) return [parts[0], parts[1], parts[2], parts[3] ?? 1];
  throw new Error(`Cannot parse color "${color}"`);
}

/** Paints a translucent color over an opaque one. */
export function flatten(color: string, backdrop: string): Rgba {
  const [r, g, b, a] = parseColor(color);
  const [br, bg, bb] = parseColor(backdrop);
  return [r * a + br * (1 - a), g * a + bg * (1 - a), b * a + bb * (1 - a), 1];
}

function luminance([r, g, b]: Rgba): number {
  const [lr, lg, lb] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

/**
 * Contrast ratio from 1 to 21. A translucent `background` is painted over `backdrop` first
 * (pass the page background for surfaces like `--surface`).
 */
export function contrast(foreground: string, background: string, backdrop = background): number {
  const bg = flatten(background, backdrop);
  const [r, g, b, a] = parseColor(foreground);
  const fg: Rgba = [r * a + bg[0] * (1 - a), g * a + bg[1] * (1 - a), b * a + bg[2] * (1 - a), 1];
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
