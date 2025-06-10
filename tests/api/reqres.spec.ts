import { test, expect, } from '@playwright/test';

/*Teste para listar usuários e validar os dados da resposta*/
test('Deve listar usuários da página 2 e validar estrutura dos dados', async ({ request }) => {

    /*Faz uma requisição GET para o endpoint*/
  const response = await request.get('https://reqres.in/api/users?page=2');

  /*Valida se o status HTTP da resposta é 200 (OK)*/
  expect(response.status()).toBe(200);

  /*Converte a resposta em JSON*/
  const responseBody = await response.json();

  /*Valida se o campo "data" é um array*/
  expect(Array.isArray(responseBody.data)).toBeTruthy();

  /*Percorre cada usuário retornado para validar os campos*/
  for (const user of responseBody.data) {
    /*Verifica se o ID existe e é um número*/
    expect(user).toHaveProperty('id');
    expect(typeof user.id).toBe('number');

    /*Verifica se o primeiro nome existe e é uma string*/
    expect(user).toHaveProperty('first_name');
    expect(typeof user.first_name).toBe('string');

    /*Verifica se o sobrenome existe e é uma string*/
    expect(user).toHaveProperty('last_name');
    expect(typeof user.last_name).toBe('string');

    /*Verifica se o email existe e é uma string*/
    expect(user).toHaveProperty('email');
    expect(typeof user.email).toBe('string');

    /*Valida o formato do e-mail com regex*/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(user.email).toMatch(emailRegex);
  }

});


/*Teste POST*/
test('Deve criar um novo usuário com sucesso (POST /api/users)', async ({ request }) => {
  /*Define os dados do usuário a ser criado*/
  const newUser = {
    name: 'Maria',
    job: 'Teste',
  };

  /*Envia a requisição POST para criar o usuário*/
  const response = await request.post('https://reqres.in/api/users', {
    /*incluir a chave de autenticação*/
    headers: {
      'x-api-key': 'reqres-free-v1',
      'Content-Type': 'application/json'
    },

    /*Define o corpo da requisição com os dados do novo usuário*/
    data: newUser,
  });
  
  /*Valida se o status da resposta é 201 (Created)*/
  expect(response.status()).toBe(201);

  /*Converte a resposta para JSON para acessar os dados retornados*/
  const responseBody = await response.json();

  /*Verifica se o nome retornado é o mesmo que foi enviado*/
  expect(responseBody.name).toBe(newUser.name);
  expect(responseBody.job).toBe(newUser.job);

});

/*DELETE*/
test('Deve retornar erro 404 ao tentar deletar um usuário inexistente (DELETE /api/users/999)', async ({ request }) => {
  const response = await request.delete('https://reqres.in/api/users/999', {
    headers: {
      'x-api-key': 'reqres-free-v1',
      'Content-Type': 'application/json'
    },
  });

  /*Valida se o status da resposta é 404 (Not Found)*/
  expect(response.status()).toBe(404);

});
