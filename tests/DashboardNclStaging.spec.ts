import { test, expect } from '@playwright/test';
test.use({ viewport: { width: 1900, height: 1060 }, });

test('test', async ({ page }) => {
  await page.goto('https://ncl.staging.agent.cenora.io/login');
  await page.waitForSelector('div.login-box-shadown div.q-img', {
    state: 'visible',
  })

  await page.locator('div.login-box-shadown div.q-img').click({
    clickCount: 7
  });
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('rabdy+ncl@cenora.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Pruebas01*');
  await page.getByRole('button', { name: 'Log In' }).click();
 // await page.locator('#notification-dialog').getByText('close').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Dashboard' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('tab', { name: 'Agents' }).getByText('Agents').click();
  await page1.getByPlaceholder('Search by Name...').click();
  await page1.getByText('search', { exact: true }).fill('Rabdy Gutierrez');
  await page1.waitForTimeout(5000);
  await page1.getByText('Rabdy Gutierrez').nth(1).click();
  await page1.waitForTimeout(5000);
  await page1.getByRole('button', { name: 'today' }).click();
  await page1.close();
  await page.close();


 



});
