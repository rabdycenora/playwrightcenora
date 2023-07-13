import { test, expect } from '@playwright/test';
import { Enviroment } from "../enviroments/Enviroments";
test.describe.configure({ mode: 'serial'});
const env = new Enviroment('CELEBRITY');
test.use({ viewport: { width: 1900, height: 1060 }, });
test.use({browserName: 'chromium',headless: true,});

test('test Agente @drag-drop', async ({ page, context }) => {
  await page.goto(env.urlAgent);
  await page.waitForSelector('div.login-box-shadown div.q-img', {state: 'visible'});
  await page.locator('div.login-box-shadown div.q-img').click({clickCount: 7});
  await page.getByRole('textbox', { name: 'Email' }).fill(env.userName);
  await page.getByRole('textbox', { name: 'Password' }).fill(env.password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.waitForSelector('#notification-dialog', {state: 'visible',});
  await page.getByRole('button', { name: 'got it!' }).click();
  const extensionIframe = await page.frameLocator('#extension-iframe');
  //await expect(page.frameLocator('#extension-iframe').getByRole('link', { name: 'The Cruises' })).toBeVisible();
  await expect(page.frameLocator('#extension-iframe').getByPlaceholder('Search')).toBeVisible();
  await extensionIframe.locator('.q-infinite-scroll .shadow-2-card:first-child').waitFor({state: 'visible',timeout: 0,});
  await page.getByRole('button', { name: 'Invite' }).click();
  const page1 = await context.newPage();
  await page1.goto(env.urlComsumer);
  await page1.frameLocator('iframe').locator('div.access-code-box span:not(:empty)').waitFor({state: 'visible',timeout: 60000});
  const code = await page1.frameLocator('iframe').locator('div.access-code-box span').textContent();
  await page.bringToFront();
  await page.getByPlaceholder('Enter Code').fill(String(code).trim());
  await page.getByLabel('personCustomer Namearrow_drop_down').fill('Test');
  await page.getByText('START').click();
  await page.waitForSelector('#session-preview', {state: 'visible',timeout: 60000});
  const sessionIframe = await page.frameLocator('#session-preview');
  await sessionIframe.locator('body').waitFor({state: 'visible',timeout: 60000});
  await extensionIframe.locator('.q-infinite-scroll .shadow-2-card:first-child').hover();
  await page.mouse.down();
  const box = await page.locator('#session-preview').boundingBox();
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  await new Promise(resolve => {setTimeout(() => {resolve(true)}, 1000);});
  await page.locator('#dropOverlay').hover();
  await new Promise(resolve => {setTimeout(() => {resolve(true)}, 1000);});
  await page.mouse.up();
  await new Promise(resolve => {setTimeout(() => {resolve(true)}, 1000);});
  await sessionIframe.locator('.shadow-2-card').waitFor({state: 'visible'});
  await new Promise(resolve => {setTimeout(() => {resolve(true)}, 1000);});
  await page1.bringToFront();
  await new Promise(resolve => {setTimeout(() => {resolve(true)}, 1000);});
  await page.bringToFront();
  await page.getByRole('button', { name: 'END SESSION' }).click();
  await page.waitForSelector('.validate-end-session_text', { state: 'visible' });
  await page.locator('div').filter({ hasText: 'CANCELEND SESSION' }).getByRole('button', { name: 'END SESSION' }).click();
  await page.getByText('START').isVisible();
  await page.close();
});

test('test Applink @link', async ({ page }) => {
  await page.goto(env.urlAgent);
  await page.waitForSelector('div.login-box-shadown div.q-img', {state: 'visible',})
  await page.locator('div.login-box-shadown div.q-img').click({clickCount: 7});
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(env.userName);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(env.password);
  await page.getByRole('button', { name: 'Log In' }).click();
 // await page.locator('#notification-dialog').getByText('close').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Links' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: '+ NEW CRUISES LINK' }).waitFor({ state: 'visible'});
  await page1.getByRole('button', { name: '+ NEW CRUISES LINK' }).click();
  await page1.waitForSelector('#extension-iframe', {state: 'visible',timeout: 60000})
  const sessionIframe = await page1.frameLocator('#extension-iframe')
  await sessionIframe.locator('body').waitFor({state: 'visible',timeout: 60000})
  await sessionIframe.locator('.q-infinite-scroll .shadow-2-card:first-child').hover()
  await page1.mouse.down()
  const box = await page1.locator('#extension-iframe').boundingBox();
  await page1.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await new Promise(resolve => {setTimeout(() => {resolve(true)}, 1000);})
  await page1.locator('#drop-zone').hover(); 
  await new Promise(resolve => {setTimeout(() => {resolve(true)}, 1000);})
  await page1.mouse.up();
  await new Promise(resolve => {setTimeout(() => {resolve(true)}, 1000);})
  await new Promise(resolve => {setTimeout(() => {resolve(true)}, 1000);})
  await new Promise(resolve => {setTimeout(() => { resolve(true)}, 1000);})
  await page1.bringToFront()
  await page1.getByRole('button', { name: 'Save and CONTINUE' }).click();
  await page1.getByRole('textbox', { name: 'Customer Name (Required)' }).click();
  await page1.getByRole('textbox', { name: 'Customer Name (Required)' }).fill('auto');
  await page1.getByLabel('Short Description (Required)').click();
  await page1.getByLabel('Short Description (Required)').fill('test auto');
  await page1.getByRole('button', { name: 'Publish AND COPY LINK' }).click();
  await page1.waitForTimeout(5000);
  await page.close();
});

/*test('test ApplinkSession @session', async ({ page, context }) => {
  await page.goto(env.urlAgent);
  await page.waitForSelector('div.login-box-shadown div.q-img', {state: 'visible'});
  await page.locator('div.login-box-shadown div.q-img').click({clickCount: 7});
  await page.getByRole('textbox', { name: 'Email' }).fill(env.userName);
  await page.getByRole('textbox', { name: 'Password' }).fill(env.password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.waitForSelector('#notification-dialog', {state: 'visible',});
  await page.getByRole('button', { name: 'got it!' }).click();
  const extensionIframe = await page.frameLocator('#extension-iframe');
  //await expect(page.frameLocator('#extension-iframe').getByRole('link', { name: 'The Cruises' })).toBeVisible();
  await expect(page.frameLocator('#extension-iframe').getByPlaceholder('Search')).toBeVisible();
  await extensionIframe.locator('.q-infinite-scroll .shadow-2-card:first-child').waitFor({state: 'visible',timeout: 0,});
  await extensionIframe.locator('.q-infinite-scroll .shadow-2-card:first-child').waitFor({state: 'visible',timeout: 0,});
  await page.getByRole('button', { name: 'Invite' }).click();
  const page1 = await context.newPage();
  await page1.goto(env.urlComsumer);
  await page1.frameLocator('iframe').locator('div.access-code-box span:not(:empty)').waitFor({state: 'visible',timeout: 60000});
  const code = await page1.frameLocator('iframe').locator('div.access-code-box span').textContent();
  await page.bringToFront();
  await page.getByPlaceholder('Enter Code').fill(code || '');
  await page.getByLabel('personCustomer Namearrow_drop_down').fill('Test');
  await page.getByText('START').click();
  await page.waitForSelector('#session-preview', {state: 'visible',timeout: 60000});
  const sessionIframe = await page.frameLocator('#session-preview');
  await sessionIframe.locator('body').waitFor({state: 'visible',timeout: 60000});
  await extensionIframe.locator('.q-infinite-scroll .shadow-2-card:first-child').hover();
  await page.mouse.down();
  const box = await page.locator('#session-preview').boundingBox();
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  await new Promise(resolve => {setTimeout(() => {resolve(true)}, 1000);});
  await page.locator('#dropOverlay').hover();
  await new Promise(resolve => {setTimeout(() => {resolve(true)}, 1000);});
  await page.mouse.up();
  await new Promise(resolve => {setTimeout(() => {resolve(true)}, 1000);});
  await sessionIframe.locator('.shadow-2-card').waitFor({state: 'visible'});
  await new Promise(resolve => {setTimeout(() => {resolve(true)}, 1000);});
  await page1.bringToFront();
  await new Promise(resolve => {setTimeout(() => {resolve(true)}, 1000);});
  await page.bringToFront();
  await page.getByRole('button', { name: 'END SESSION' }).click();
  await page.waitForSelector('.validate-end-session_text', { state: 'visible' });
  await page.locator('div').filter({ hasText: 'CANCELEND SESSION' }).getByRole('button', { name: 'END SESSION' }).click();
  await page.getByText('START').isVisible()
  await page.getByText('list_alt').click();
  await page.getByText('link').nth(1).click();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Convert to Link' }).click();
  const page2 = await page2Promise;
  await page.waitForTimeout(10000);
  await page2.getByRole('button', { name: 'Save and CONTINUE' }).waitFor({ state: 'visible'});
  await page2.getByRole('button', { name: 'Save and CONTINUE' }).click();
  //await page2.getByLabel('Short Description (Required)').last().waitFor({ state: 'attached'});
  await page2.locator("//textarea[@class='q-field__native q-placeholder']").waitFor({ state: 'visible'});
  await page2.getByLabel('Short Description (Required)').last().click();
  await page2.getByLabel('Short Description (Required)').last().fill('test2 auto2');
  await page2.getByRole('button', { name: 'Publish AND COPY LINK' }).click();
  await page2.waitForTimeout(10000);
  await page.close();
});
*/
test('test dashboard @dash', async ({ page }) => {
  await page.goto(env.urlAgent);
  await page.waitForSelector('div.login-box-shadown div.q-img', {state: 'visible',})
  await page.locator('div.login-box-shadown div.q-img').click({ clickCount: 7});
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(env.userName);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(env.password);
  await page.getByRole('button', { name: 'Log In' }).click();
 // await page.locator('#notification-dialog').getByText('close').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Dashboard' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('tab', { name: 'Agents' }).getByText('Agents').click();
  await page1.getByPlaceholder('Search by Name...').click();
  await page1.getByPlaceholder('Search by Name...').fill('Rabdy Gutierrez');
  await page1.waitForTimeout(5000);
  await page1.getByText('Rabdy Gutierrez').nth(1).click();
  await page1.waitForTimeout(5000);
  await page1.getByRole('button', { name: 'today' }).click();
  await page1.close();
  await page.close();
});
