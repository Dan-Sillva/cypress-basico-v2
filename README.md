# Testes automatizados com Cypress - Básico

👻 Seja bem vindo ao meu projeto de testes.
> Este repositório foi criado para estudo do curso <a href="https://www.udemy.com/course/testes-automatizados-com-cypress-basico">Testes Automatizados com Cypress - Basico</a>

## 1. O que preciso para rodar os teste ?
De inicio, os pré-requisitos são:

- Git;
- NodeJs e Npm;
- Editor de Texto (vscode);

## 2. Como configurar o teste na minha maquina ?

De inicio, devemos clonar o repositório do github na sua máquina. Para isso, podemos utilizar o comando:

    git clone https://github.com/Dan-Sillva/cypress-basico-v2.git

Com isso, iremos acessar a pasta criada atravez do terminal, com o seguinte comando:

    cd cypress-basico-v2

Dentro da pasta, devemos configurar as dependências do projeto com o npm. Iremos utilizar o cypress, seu @type e também o cypress-file-upload:

    npm install cypress @types/cypress cypress-file-upload --save-dev

 > --save-dev para instalar como dependências de desenvolvedor
 
Com isso, seu projeto está configurado e pronto para rodar 😎.

## 3. Ok, mas como eu posso rodar o teste ?

Para rodar os testes, você tem quatro opções diferentes:

#### 3.1 cy:open

    npm run cy:open

Dessa forma, o cypress abre sua interface, e executa os testes no tamanho comum do navegador

#### 3.2 cy:open.mobile

    npm run cy:open.mobile

Dessa forma, o cypress abre sua interface, e executa os testes no tamanho mobile do navegador

#### 3.3 cy:run

    npm run cy:run

Dessa forma, o cypress executa os testes em modo headless, com o tamanho comum do navegador

#### 3.4 cy:run.mobile

    npm run cy:run.mobile

Dessa forma, o cypress executa os testes em modo headless, com o tamanho mobile do navegador
