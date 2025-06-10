
import { Page, expect} from '@playwright/test';


/**Logar com credenciais corretas e acessar a página principal*/
export async function login(page: Page) {

      /*Acessar o site saucedemo.com*/
      await page.goto('https://www.saucedemo.com/');
    
      /*Preencher o campo “Username”*/
      await page.fill('input[data-test="username"]', 'standard_user' );
    
      /*Preencher o campo “Password”*/
      await page.fill('input[data-test="password"]', 'secret_sauce');
    
      /*Selecionar o botão “Login”*/
      await page.click('input[data-test="login-button"]');
    
      /*O sistema deve direcionar para a tela principal*/
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      await page.getByText('Products');
    
}