# Desafio Portinari - 1ºsemetre 2020

## Desenvolvido Por

Alison Kaique Lemes Leite
alison.kaique@totvs.com.br

## Estrutura do Projeto

O projeto é composto por duas aplicações:

1) API: responsável por disponibilizar os dados que serão acessados pela aplicação 'Minha Lista de Tarefas'.
2) Aplicação 'Minha Lista de Tarefas': responsável por disponibilizar ao usuário uma aplicação para organizar as suas tarefas diárias.

Abaixo relação de diretorios:

1) API: /api-my-task-list/
2) Aplicação 'MInha Lista de Tarefas': /my-task-list/

## Instalando as Dependências

Antes de utilizar a aplicação 'Minha Lista de Tarefas' é necessário que as dependências sejam instaladas, tanto para a API quanto para a aplicação principal.
Por isso iremos efetuar a instalação das dependências em cada aplicação uma a uma.

* API
* Acessar o terminal / prompt de comandos no diretório /api-my-task-list/
* Executar o comando 'npm install'
* Aguardar o término da instalação das dependências

* Aplicação 'Minha Lista de Tarefas'
* Acessar o terminal / prompt de comandos no diretório /my-task-list/
* Executar o comando 'npm install'
* Aguardar o término da instalação das dependências

## Inicialização a Aplicação

Para que a aplicação funcione corretamente é necessário que a seguinte ordem de inicialização seja respeitada:

1) API
2) Aplicação 'Minha Lista de Tarefas'

Para isso iremos executar os seguintes comandos:

* API
* Acessar o terminal / prompt de comandos no diretório /api-my-task-list/
* Executar o comando 'npm start'
* Aguardar a inicialização e verificar que a seguinte mensagem é mostrada no log 'Servidor Escutando na Porta 3000'

* Aplicação 'Minha Lista de Tarefas'
* Acessar o terminal / prompt de comandos no diretório /my-task-list/
* Executar o comando 'ng serve --open'
* Aguardar inicialização e verificar que o navegador padrão será aberto com a página de login ou página inicial da aplicação (dependendo da configuração de Lembrar Login)

## Funcionalidades

A aplicação possui as seguintes funcionalidades, divididas por segmentos:

Login: 
* Login por e-mail e senha, com a opção de 'Lembrar Login' e com isso a próxima vez que acessar a aplicação será automaticamente direcionado para página inicial
* Criação de Novo Registro de Usuário a partir das seguintes informações: e-mail, nome de usuário, nome completo e senha.

Categorias:
* Com as categorias é possível organizar suas Tarefas de forma a separá-las por um grupo específico.
* Uma Categoria possui 'descrição' e 'cor', numa paleta com 12 cores disponíveis.
* É possível visualizar, incluir e excluir Categorias.

Tarefas:
* Com o intuito de organizar o seu cotidiano, a sessão de Lista de Tarefas disponibiliza ao usuário uma lista de suas tarefas por onde de Data Limite.
* Organizadas por Data Limite, Categoria e Título é possível verificar quais estão vencidas, pendentes para execução ou até mesmo concluídas.
* Uma Tarefa possui 'título', 'descrição', 'data limite' e 'categoria'.
* É possível visualizar, incluir, alterar, concluir e excluir Tarefas.

Logout:
* Logout da aplicação, finalizando a sessão ativa do usuário.

## Certificados Alura

Abaixo relação de certificados e seus respectivos links dos cursos da Alura:

* HTTP - Entendendo a web por baixo dos panos: https://cursos.alura.com.br/certificate/alisonkaique/http-fundamentos
* HTML5 e CSS3 parte 1: A primeira página da Web: https://cursos.alura.com.br/certificate/alisonkaique/html5-css3-primeiros-passos
* HTML5 e CSS3 parte 2: Posicionamento, listas e navegação: https://cursos.alura.com.br/certificate/alisonkaique/html5-css3-posicionamento-listas-navegacao
* JavaScript: Programando na linguagem da web: https://cursos.alura.com.br/user/alisonkaique/course/javascript-programando-na-linguagem-web/certificate
* JavaScript avançado I: ES6, orientação a objetos e padrões de projetos: https://cursos.alura.com.br/certificate/alisonkaique/javascript-es6-orientacao-a-objetos-parte-1
* TypeScript parte 1: Evoluindo seu Javascript: https://cursos.alura.com.br/certificate/alisonkaique/typescript-parte1
* TypeScript parte 2: Mais técnicas e boas práticas: https://cursos.alura.com.br/certificate/alisonkaique/typescript-parte2
* Angular parte 1: Fundamentos: https://cursos.alura.com.br/certificate/alisonkaique/angular-fundamentos
* Angular parte 2: Autenticação, Forms e lazy loading: https://cursos.alura.com.br/certificate/alisonkaique/angular-autenticacao
* Angular parte 3: upload, build e novos componentes: https://cursos.alura.com.br/certificate/alisonkaique/angular-upload-build
* Angular parte 4: lapidando o projeto: https://cursos.alura.com.br/certificate/alisonkaique/angular-lapidando-projeto
* Jasmine: Testes automatizados em JavaScript: https://cursos.alura.com.br/certificate/alisonkaique/testes-automatizados-em-javascript-com-jasmine



