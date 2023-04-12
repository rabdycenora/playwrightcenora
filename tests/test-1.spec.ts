import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ncl.testing.agent.cenora.io/login');
  await page.goto('https://ncl.testing.links-agent.cenora.io/');
  await page.goto('https://ncl.testing.links-agent.cenora.io/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click({
    button: 'right'
  });
  await page.getByRole('textbox', { name: 'Email' }).fill('rabdy+ncl@cenora.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click({
    button: 'right'
  });
  await page.getByRole('textbox', { name: 'Password' }).fill('Pruebas01*');
  await page.goto('https://ncl.testing.links-agent.cenora.io/wizard');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('button', { name: '+ NEW CRUISES LINK' }).click();
  await page.getByRole('button').filter({ hasText: 'menu' }).click();
  await page.getByRole('button').filter({ hasText: 'menu' }).click();
  await page.locator('#wizard-menu-toggle').click();
  await page.getByText('Discard Link').click();
  await page.getByRole('button', { name: 'Discard' }).click();
  await page.locator('#linkstable-menu-toggle-3').click();
  await page.getByText('Duplicate').click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.locator('tr:nth-child(5) > td:nth-child(5)').click();
  await page.getByRole('button').filter({ hasText: /^clear$/ }).click();
  await page.locator('#linkstable-menu-toggle-4').click();
  await page.locator('#linkstable-menu-toggle-1').click();
  await page.getByText('editEdit').click();
  await page.getByRole('button', { name: 'Save and CONTINUE' }).click();
});