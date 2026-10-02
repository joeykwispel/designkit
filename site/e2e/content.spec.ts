import { expect, test } from '@playwright/test';
import { paths, PREVIEW } from './pages';

test('the menu reaches every page and marks the current one', async ({ page, isMobile }) => {
  await page.goto('/');
  for (const path of paths.slice(1)) {
    if (isMobile) await page.locator('.jo-nav__burger').click();
    await page.locator(`.jo-nav__link[href="${path}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.locator('.jo-nav__link[aria-current="page"]')).toHaveAttribute('href', path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }
});

test('the language switch stays on the same page', async ({ page, isMobile }) => {
  test.skip(isMobile, 'the switch is the same component on mobile');
  await page.goto('/tokens/');
  await page.getByRole('link', { name: 'NL', exact: true }).click();
  await expect(page).toHaveURL(/\/nl\/tokens\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'nl');
  await expect(page.getByRole('heading', { level: 2, name: /Kleuren/ })).toBeVisible();
});

test('token swatches show the values of the package', async ({ page }) => {
  await page.goto('/tokens/');
  const row = page.locator('#colors').getByRole('row', { name: /--accent-text/ });
  await expect(row).toContainText('#7dd3c0');
  await expect(row).toContainText('#0b6259');
  // contrast of each text colour is printed next to it
  await expect(row).toContainText(/\d+\.\d\d:1 AA/);
  // the one known gap is listed, not hidden
  await expect(page.locator('#gaps + p + ul')).toContainText('--syn-num');
});

test('the stack tabs switch the samples everywhere and remember the choice', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('tab', { name: 'Angular' }).click();
  await expect(page.getByRole('tabpanel')).toContainText('src/styles.css');
  await page.goto('/header/');
  await expect(page.getByRole('tab', { name: 'Angular' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('jo-header.component');
  // arrow keys move between the tabs
  await page.getByRole('tab', { name: 'Angular' }).press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Plain HTML' })).toHaveAttribute('aria-selected', 'true');
});

test('a code sample can be copied', async ({ page, context, browserName, isMobile }) => {
  test.skip(browserName !== 'chromium' || isMobile, 'clipboard permissions are a Chromium desktop feature in Playwright');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  const block = page.locator('#install figure');
  await block.getByRole('button').click();
  await expect(block.getByRole('button')).toHaveText('copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('npm i @joeykwispel/design-kit');
});

test('component previews are styled by the kit', async ({ page }) => {
  await page.goto('/components/');
  const primary = page.locator('#btnPrimary .demo .btn-primary');
  await expect(primary).toBeVisible();
  // the dark theme's --accent, straight from kit.css
  await expect(primary).toHaveCSS('background-color', 'rgb(125, 211, 192)');
  await page.locator('#skip .demo button').click();
  await expect(page.locator('a.skip')).toBeFocused();
});

test.describe('header playground', () => {
  test('shows the kit header in a frame and follows the controls', async ({ page, isMobile }) => {
    test.skip(isMobile, 'the controls are the same on mobile; the frame is scaled down');
    await page.goto('/header/');
    const frame = page.frameLocator('#playground iframe');
    await expect(frame.locator('.jo-nav__link')).toHaveCount(4);
    await expect(frame.locator('.jo-nav__burger')).toBeHidden();
    await expect(frame.locator('.jo-nav__search')).toBeHidden();

    await page.getByRole('button', { name: /Ctrl K/ }).click();
    await expect(frame.locator('.jo-nav__search')).toBeVisible();

    await page.getByRole('group', { name: 'Links' }).getByRole('button', { name: '0', exact: true }).click();
    await expect(frame.locator('.jo-nav__menu')).toHaveCount(0);
    await page.getByRole('group', { name: 'Links' }).getByRole('button', { name: '2', exact: true }).click();
    await expect(frame.locator('.jo-nav__link')).toHaveCount(2);

    // at phone width the links fold into the burger menu
    await page.getByRole('button', { name: /Phone/ }).click();
    await expect(frame.locator('.jo-nav__burger')).toBeVisible();
    await frame.locator('.jo-nav__burger').click();
    await expect(frame.locator('.jo-nav__menu')).toHaveClass(/is-open/);
  });

  test('a theme switch inside the frame reaches the page around it', async ({ page, isMobile }) => {
    test.skip(isMobile, 'same code path as desktop');
    await page.goto('/header/');
    await page.frameLocator('#playground iframe').locator('.jo-nav__theme').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('the preview page stands alone and is kept out of search results', async ({ page }) => {
    await page.goto(`${PREVIEW}#links=3&search=1`);
    await expect(page.locator('.jo-nav')).toHaveCount(1);
    await expect(page.locator('footer')).toHaveCount(0);
    await expect(page.locator('.jo-nav__link')).toHaveCount(3);
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', 'noindex');
    await page.keyboard.press('Control+K');
    await expect(page.getByRole('status')).toHaveText('Command menu opened');
  });
});

test('the changelog is the one of the package', async ({ page }) => {
  await page.goto('/changelog/');
  await expect(page.getByRole('heading', { level: 2, name: '1.0.0' })).toBeVisible();
  await expect(page.locator('.log')).toContainText('The design kit as a package');
  await page.goto('/nl/changelog/');
  await expect(page.locator('.english')).toBeVisible();
});

test('no page scrolls sideways on a phone', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'a phone-only problem');
  for (const path of paths) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${path} is ${overflow}px wider than the screen`).toBeLessThanOrEqual(0);
  }
});
