import { test, expect } from '@playwright/test';
test.use({ viewport: { width: 1900, height: 1060 }, });
import dotenv from 'dotenv'
dotenv.config()

test.use({
  browserName: 'chromium',
  headless: true,
});

test('test', async ({ page, context }) => {
  const urlAgent = 'https://oceania.cenora.io/login';
  const urlComsumer = 'https://oceania.live/desktop/widget';
 // const urlAgent = 'https://ncl.testing.agent.cenora.io/login';
  //const urlComsumer = 'https://ncl.testing.consumer.cenora.io/desktop/widget';
 //const urlAgent = process.env.URL_NCL_TESTING_AGENT;
  //const urlComsumer = process.env.URL_NCL_TESTING_CONSUMER;

  await page.goto(urlAgent);

  await page.waitForSelector('div.login-box-shadown div.q-img', {
    state: 'visible',
  })

  await page.locator('div.login-box-shadown div.q-img').click({
    clickCount: 7
  });

  await page.getByRole('textbox', { name: 'Email' }).fill('rabdy+oceania@cenora.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Pruebas01*');
  await page.getByRole('button', { name: 'Log In' }).click();
  
/*
  await page.waitForSelector('#notification-dialog', {
    state: 'visible',
    })

  await page.getByRole('button', { name: 'got it!' }).click();
*/
  const extensionIframe = await page.frameLocator('#extension-iframe')

  
  await extensionIframe.locator('.q-infinite-scroll .shadow-2-card:first-child').waitFor({
    state: 'visible',
    timeout: 0,
 })
///const name = await page.frameLocator('#extension-iframe').getByText('671 Cards').textContent();

//await page.frameLocator('#extension-iframe').getByPlaceholder('Search').fill(name || '');

//await page.screenshot({ path: 'screenshot.png', fullPage: true });

//await page.frameLocator('#extension-iframe').getByPlaceholder('Search').clear();

  await extensionIframe.locator('.q-infinite-scroll .shadow-2-card:first-child').waitFor({
    state: 'visible',
    timeout: 0,
  })


  await page.getByRole('button', { name: 'Invite' }).click();

  const page1 = await context.newPage();
  await page1.goto(urlComsumer);
  // await page1.frameLocator('iframe').getByText('7640').click();
  await page1.frameLocator('iframe').locator('div.access-code-box span:not(:empty)').waitFor({
    state: 'visible',
    timeout: 60000
  })
  const code = await page1.frameLocator('iframe').locator('div.access-code-box span').textContent();

  await page.bringToFront()
  await page.getByPlaceholder('Enter Code').fill(code || '');
  await page.getByLabel('personCustomer Namearrow_drop_down').fill('Test');
  await page.getByText('START').click();

  await page.waitForSelector('#session-preview', {
    state: 'visible',
    timeout: 60000
  })

  const sessionIframe = await page.frameLocator('#session-preview')

  await sessionIframe.locator('body').waitFor({
    state: 'visible',
    timeout: 60000
  })

  await extensionIframe.locator('.q-infinite-scroll .shadow-2-card:first-child').hover()
  await page.mouse.down()
  const box = await page.locator('#session-preview').boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 1000);
  })
  await page.locator('#dropOverlay').hover();
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 1000);
  })
  await page.mouse.up();

  await new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 1000);
  })

  await sessionIframe.locator('.shadow-2-card').waitFor({
    state: 'visible'
  })

  await new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 1000);
  })

  await page1.bringToFront()

  await new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 1000);
  })

  await page.bringToFront()

  await page.getByRole('button', { name: 'END SESSION' }).click();
  await page.waitForSelector('.validate-end-session_text', { state: 'visible' })

  await page.locator('div').filter({ hasText: 'CANCELEND SESSION' }).getByRole('button', { name: 'END SESSION' }).click();

  await page.getByText('START').isVisible()});