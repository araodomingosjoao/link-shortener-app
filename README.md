# Projeto de Encurtador de Links - Vue + Laravel

Este é um projeto de encurtador de links que utiliza o framework Vue.js para o frontend e o framework Laravel para o backend. Ele permite encurtar URLs e rastrear as métricas de acesso dos links encurtados.

## Pré-requisitos

Certifique-se de ter os seguintes componentes instalados em seu ambiente de desenvolvimento:

- Node.js: [Download Node.js](https://nodejs.org/)
- Composer: [Download Composer](https://getcomposer.org/)

## Configuração do Backend (Laravel)

1. Clone o repositório do projeto:

   ```bash
   git clone https://github.com/araodomingosjoao/link-shortener-api
   ```

2. Navegue até o diretório do projeto Laravel:

   ```bash
   cd link-shortener-api
   ```

3. Instale as dependências do Composer:

   ```bash
   composer install
   ```

4. Configure o arquivo `.env` com as configurações do banco de dados e outras configurações necessárias.

5. Gere uma nova chave para a aplicação:

   ```bash
   php artisan key:generate
   ```

6. Execute as migrações para criar as tabelas no banco de dados:

   ```bash
   php artisan migrate
   ```

7. Inicie o servidor do Laravel:

   ```bash
   php artisan serve
   ```

O backend do Laravel agora está rodando em `http://localhost:8000`.

## Configuração do Frontend (Vue.js)

1. Clone o repositório do projeto:

   ```bash
   git clone https://github.com/araodomingosjoao/link-shortener-app
   ```

2. Navegue até o diretório do projeto Vue:

   ```bash
   cd link-shortener-app
   ```

3. Instale as dependências do Node.js:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento do Vue:

   ```bash
   npm run dev
   ```

O frontend Vue.js agora está rodando em `http://localhost:5173/`.

## Acesso à Aplicação

Acesse a aplicação em seu navegador:

- Frontend Vue.js: [http://localhost:5173](http://localhost:8080)
- Backend Laravel: [http://localhost:8000](http://localhost:8000)

## Observações

Certifique-se de que o servidor do backend Laravel esteja em execução antes de iniciar o servidor de desenvolvimento do Vue.js.