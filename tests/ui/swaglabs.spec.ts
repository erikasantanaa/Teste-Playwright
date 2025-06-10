import { test, expect } from '@playwright/test';
import { login } from '../export-teste/login.spec';


test('Logar com credenciais incorretas e validar as mensagens de erro', async ({ page }) => {

  /*Acessar o site saucedemo.com*/
  await page.goto('https://www.saucedemo.com/');

  /*Preencher o campo “Username” com dado incorreto */
  await page.fill('input[data-test="username"]', 'user_user' );

  /*Preencher o campo “Password” com dado incorreto */
  await page.fill('input[data-test="password"]', 'sauce_sauce');

  /*Selecionar o botão “Login”*/
  await page.click('input[data-test="login-button"]');

  /*O sistema deve informar mensagem de erro*/
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');

});

test('Adicionar e remover itens no carrinho', async ({ page }) => {

  /*Logar e acessar a página principal*/
  await login(page);

  /*Selecionar botão “Add to cart” sendo três produtos*/
  await page.click('button[data-test="add-to-cart-sauce-labs-bike-light"]');
        /*Verificar a atualização do contador a cada click*/
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await page.click('button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
        /*Verificar a atualização do contador a cada click*/
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

  await page.click('button[data-test="add-to-cart-sauce-labs-onesie"]');
        /*Verificar a atualização do contador a cada item adicionado*/
  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

  /*Selecionar botão “Remove” sendo 2 produtos */
  await page.click('button[data-test="remove-sauce-labs-bike-light"]');
        /*Verificar a atualização do contador após remover item */
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

  await page.click('button[data-test="remove-sauce-labs-onesie"]');
         /*Verificar a atualização do contador após remover item */
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  /*Selecionar o campo ícone “Carrinho” */
  await page.click('.shopping_cart_link');

  /*Visualizar o produto restante*/
  const items = page.locator('.cart_item');
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Sauce Labs Bolt T-Shirt');

});

test('Adicionar itens no carrinho e finalizar sem dados preenchidos, gerando mensagem de erro', async ({ page }) =>{
  /*Logar e acessar a página principal*/
  await login(page);  

  /*Selecionar botão “Add to cart” sendo 2 produtos*/
  await page.click('button[data-test="add-to-cart-sauce-labs-bike-light"]');
  await page.click('button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');

  /*Selecionar o campo ícone “Carrinho”*/
  await page.click('.shopping_cart_link');

  /*Selecionar botão “Checkout”*/
  await page.click('button[id="checkout"]');

  /*Visualizar campos vazios "First Name", "Last Name", "Zip/Postal Code"*/
  const firstName = await page.inputValue('input[id="first-name"]');
  const lastName = await page.inputValue('input[id="last-name"]');
  const postalCode = await page.inputValue('input[id="postal-code"]');

  expect(firstName).toBe('');
  expect(lastName).toBe('');
  expect(postalCode).toBe('');

  /*Selecionar botão “Continue”*/
  await page.click('input[id="continue"]');

  /* Visualizar mensagem de erro “Error: First Name is required”*/
  await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');

});

















