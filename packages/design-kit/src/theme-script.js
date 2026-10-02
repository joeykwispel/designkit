/**
 * The script that sets the theme before the first paint, so a stored light theme never flashes dark.
 * Put it in an inline <script> in <head>, before any CSS. It reads the `jo-theme` cookie shared by every
 * *.joeyoosenbrug.nl app (falling back to localStorage) and adds the `js` class that .reveal needs.
 */
export const themeScript = `try{var m=document.cookie.match(/(?:^|; )jo-theme=(dark|light)/);var t=(m&&m[1])||localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;document.documentElement.classList.add('js')}catch(e){}`;

/** Content-Security-Policy source for `script-src`, valid when the script is inlined exactly as exported. */
export const themeScriptHash = 'sha256-RFnXNC+xnXsxGMxBusij8KygAFwkNGPnAYGHh+fXnfk=';
