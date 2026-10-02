/**
 * A small tokenizer for the code samples, so they are coloured with the kit's own syntax classes
 * (.kw .str .num-t .fn .prop .com .punc) instead of a highlighter's theme. It is not a parser: it only has to
 * make the handful of snippets on this site look right.
 */

export type Lang = 'sh' | 'js' | 'css' | 'html' | 'svelte';

export interface Token {
  text: string;
  /** One of the kit's syntax classes; plain text has none. */
  cls?: 'kw' | 'str' | 'num-t' | 'fn' | 'prop' | 'com' | 'punc';
}

type Rule = [pattern: RegExp, cls: NonNullable<Token['cls']>];

const str: Rule = [/'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`/y, 'str'];
const jsWords =
  /\b(?:import|from|export|default|const|let|var|function|return|async|await|if|else|new|type|interface|as|try|catch|for|of|true|false|null|undefined)\b/y;

const js: Rule[] = [
  [/\/\/[^\n]*|\/\*[\s\S]*?\*\//y, 'com'],
  str,
  [jsWords, 'kw'],
  [/\b\d[\d.]*\b/y, 'num-t'],
  [/[A-Za-z_$][\w$]*(?=\()/y, 'fn'],
  [/[{}()[\];,.:=<>/+\-*!?&|]/y, 'punc']
];

const html: Rule[] = [[/<!--[\s\S]*?-->/y, 'com'], str, [/<\/?[A-Za-z][\w:.-]*/y, 'kw'], [/[A-Za-z_:@][\w:.-]*(?==)/y, 'prop'], [/\/?>|[={}]/y, 'punc']];

const rules: Record<Lang, Rule[]> = {
  js,
  html,
  // markup with a script block: the markup rules first, then the words and calls of JavaScript
  svelte: [...html, [/\/\/[^\n]*/y, 'com'], [jsWords, 'kw'], [/[A-Za-z_$][\w$]*(?=\()/y, 'fn'], [/[()[\];,.]/y, 'punc']],
  css: [
    [/\/\*[\s\S]*?\*\//y, 'com'],
    str,
    [/@[\w-]+/y, 'kw'],
    [/--[\w-]+/y, 'prop'],
    [/#[0-9a-fA-F]{3,8}\b|-?\d*\.?\d+(?:px|rem|em|ms|s|%|deg|ch|vw|svh)?\b/y, 'num-t'],
    [/[a-z-]+(?=\()/y, 'fn'],
    [/[a-z-]+(?=\s*:)/y, 'prop'],
    [/[{}();:,]/y, 'punc']
  ],
  sh: [[/(?<=^|\s)#[^\n]*/my, 'com'], str, [/(?<=^|\n)(?:npm|npx|pnpm|node|git)\b/y, 'fn'], [/(?<=\s)--?[\w-]+/y, 'prop']]
};

/** Splits `code` into tokens. Joining their text gives `code` back, character for character. */
export function highlight(code: string, lang: Lang): Token[] {
  const out: Token[] = [];
  let plain = '';
  let i = 0;
  scan: while (i < code.length) {
    for (const [pattern, cls] of rules[lang]) {
      pattern.lastIndex = i;
      const match = pattern.exec(code)?.[0];
      if (!match) continue;
      if (plain) out.push({ text: plain });
      plain = '';
      out.push({ text: match, cls });
      i += match.length;
      continue scan;
    }
    // no rule starts here: take the whole word, so a keyword inside an identifier is not coloured
    const word = /[\w$-]+|[\s\S]/y;
    word.lastIndex = i;
    const text = word.exec(code)![0];
    plain += text;
    i += text.length;
  }
  if (plain) out.push({ text: plain });
  return out;
}
