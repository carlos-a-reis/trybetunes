# Trybe Tunes

Este é um projeto de uma aplicação que permite pesquisar e listar álbuns e músicas de várias bandas e artistas, além de proporcionar a opção de ouvir um preview de cada música. A aplicação também oferece a funcionalidade de favoritar suas músicas preferidas. Além disso, possui uma rota de perfil onde é possível visualizar e editar informações pessoais, como nome, e-mail, descrição e foto.

## Funcionalidades

A aplicação oferece as seguintes funcionalidades:

1.  Pesquisa de Álbuns e Artistas: Você pode buscar por álbuns e artistas específicos utilizando o campo de pesquisa.
2.  Listagem de Álbuns: Após realizar uma pesquisa, a aplicação exibirá os resultados correspondentes, exibindo informações como o nome do álbum, o artista e a capa do álbum.
3.  Listagem de Músicas: Ao selecionar um álbum específico, a aplicação irá exibir uma lista das músicas presentes no álbum.
4.  Preview de Músicas: É possível ouvir um trecho de cada música através do recurso de preview disponibilizado.
5.  Favoritos: Você pode marcar suas músicas preferidas como favoritas, facilitando o acesso posterior a elas.
6. Configuração de perfil: Você pode visualizar e editar informações pessoais, como seu nome, e-mail, descrição e foto.

## Rotas da Aplicação

A aplicação está dividida em várias rotas, cada uma responsável por uma parte da funcionalidade. Aqui estão as principais rotas disponíveis:

-   `/`: Rota inicial da aplicação, exibindo a página inicial com a funcionalidade de pesquisa.
-   `/album/{albumId}`: Rota para exibir as músicas de um álbum específico.
-   `/favorites`: Rota para exibir as músicas favoritas marcadas pelo usuário.
-  `/profile`: Rota com informações da pessoa usuária.
- `/profile/edit`: Rota que permite a edição de informações do perfil.

## Tecnologias Utilizadas

> [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [ReactJS](https://reactjs.org/), [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML), [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS), [Bootstrap](https://getbootstrap.com), [React Router](https://reactrouter.com/en/main)

## Como executar o projeto

Siga as etapas abaixo para executar o projeto em sua máquina local:

1.  Clone este repositório para o seu ambiente de desenvolvimento.
```bash
git clone git@github.com:carlos-a-reis/trybetunes.git
```
2.  Instale as dependências necessárias
```bash
cd trybetubes
npm install
```
3. Execute o projeto:
```bash
npm start
```
4. Acesse o projeto em seu navegador:
```bash
http://localhost:3000
```
