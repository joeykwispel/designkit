import type { Locale } from './types';
import { stackKeys, type StackKey } from './data/stacks';
import { localize, stripLocale } from './i18n';

class AppState {
  /** Set by the [[lang]] layout from the URL: / is English, /nl/ is Dutch. */
  locale = $state<Locale>('en');

  /** The stack whose code samples are shown. One choice for every tab group on the site. */
  stack = $state<StackKey>('sveltekit');

  setStack(stack: StackKey) {
    this.stack = stack;
    try {
      localStorage.setItem('stack', stack);
    } catch {
      /* storage unavailable */
    }
  }

  /** Call once in the browser: brings back the stack chosen on an earlier visit. */
  restoreStack() {
    try {
      const stored = localStorage.getItem('stack');
      if (stackKeys.includes(stored as StackKey)) this.stack = stored as StackKey;
    } catch {
      /* storage unavailable */
    }
  }

  /** Remembers the choice, so a later visit to the English home page sends a Dutch reader to /nl/. */
  rememberLocale(l: Locale) {
    try {
      localStorage.setItem('lang', l);
    } catch {
      /* storage unavailable */
    }
  }

  /** The same page in another language. */
  hrefFor(l: Locale, pathname: string) {
    return localize(stripLocale(pathname), l);
  }

  /** Site-absolute href in the current language. */
  href(path: string) {
    return localize(path, this.locale);
  }
}

export const app = new AppState();
