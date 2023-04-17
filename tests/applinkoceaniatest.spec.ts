import { test, expect } from '@playwright/test';
test.use({ viewport: { width: 1900, height: 1060 }, });

test('test', async ({ page }) => {
  await page.goto('https://oceania.testing.agent.cenora.io/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('rabdy+oceania@cenora.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Pruebas01*');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.locator('#notification-dialog').getByText('close').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Links' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: '+ NEW CRUISES LINK' }).click();
  await page1.goto('https://oceania.testing.links-agent.cenora.io/wizard');

  await page1.waitForSelector('#extension-iframe', {
    state: 'visible',
    timeout: 60000
  })

  const sessionIframe = await page1.frameLocator('#extension-iframe')

  await sessionIframe.locator('body').waitFor({
    state: 'visible',
    timeout: 60000
  })


  await sessionIframe.locator('.q-infinite-scroll .shadow-2-card:first-child').hover()
  await page1.mouse.down()
  const box = await page1.locator('#extension-iframe').boundingBox();
  await page1.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 1000);
  })
  await page1.locator('#drop-zone').hover(); 
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 1000);
  })
  await page1.mouse.up();

  await new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 1000);
  })

  
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 1000);
  })

 
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 1000);
  })

  await page1.bringToFront()

  await page1.getByRole('button', { name: 'Save and CONTINUE' }).click();
  await page1.getByRole('textbox', { name: 'Customer Name (Required)' }).click();
  await page1.getByRole('textbox', { name: 'Customer Name (Required)' }).fill('auto');
  await page1.getByLabel('Short Description (Required)').click();
  await page1.getByLabel('Short Description (Required)').fill('test auto');
  await page1.getByRole('button', { name: 'Publish AND COPY LINK' }).click();
  await page1.waitForTimeout(5000);
 
});