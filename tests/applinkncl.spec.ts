import { test, expect } from '@playwright/test';

test.use({
  browserName: 'chromium',
  headless: false,
});

test('test', async ({ page }) => {
  await page.goto('https://ncl.testing.links-agent.cenora.io/');
  await page.goto('https://ncl.testing.links-agent.cenora.io/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('rabdy+ncl@cenora.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Pruebas01*');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('button', { name: '+ NEW CRUISES LINK' }).click();

  await page.frameLocator('#extension-iframe').getByPlaceholder('Search').click();
  await page.frameLocator('#extension-iframe').getByPlaceholder('Search').fill('8 days canada');
  
  await page.waitForSelector('#extension-iframe', {
    state: 'visible',
    timeout: 60000
  })

  const sessionIframe = await page.frameLocator('#extension-iframe')

  await sessionIframe.locator('body').waitFor({
    state: 'visible',
    timeout: 60000
  })


  await sessionIframe.locator('.q-infinite-scroll .shadow-2-card:first-child').hover()
  await page.mouse.down()
  const box = await page.locator('#extension-iframe').boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 1000);
  })
  await page.locator('#drop-zone').hover(); 
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

  await page.bringToFront()

  await page.getByRole('button', { name: 'Save and CONTINUE' }).click();
  await page.getByRole('textbox', { name: 'Customer Name (Required)' }).click();
  await page.getByRole('textbox', { name: 'Customer Name (Required)' }).fill('auto');
  await page.getByLabel('Short Description (Required)').click();
  await page.getByLabel('Short Description (Required)').fill('test auto');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Publish AND COPY LINK' }).click();
  await page.waitForTimeout(5000);
 


 
});