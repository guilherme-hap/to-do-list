# To-Do List

Este é um projeto de lista de tarefas (To-Do List) desenvolvido em React. O projeto permite que os usuários façam login, registrem-se, editem suas informações e gerenciem suas tarefas diárias.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- Node.js (https://nodejs.org/)
- npm (gerenciador de pacotes do Node.js)

## Instalação

Siga os passos abaixo para configurar e executar o projeto localmente:

1. Clone o repositório para sua máquina local:
   ```bash
   git clone https://github.com/seu-usuario/to-do-list.git
   ```


2. Navegue até o diretório do projeto:
   ```bash
   cd to-do-list
   ```

3. Instale as dependências do projeto:
   ```bash
   npm install react bootstrap react-bootstrap
   ```

## Executando o projeto

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
npm start
```

O servidor será iniciado na porta 3000. Abra seu navegador e acesse http://localhost:3000 para ver o projeto em execução.

## Dependências
O projeto utiliza as seguintes dependências principais:

- **React**: Biblioteca JavaScript para construir interfaces de usuário.
- **React Bootstrap**: Biblioteca de componentes React baseada no Bootstrap para estilização e layout.
- **Bootstrap**: Framework CSS para desenvolvimento de interfaces responsivas e modernas.

## Estrutura do Projeto
A estrutura do projeto é organizada da seguinte forma:
```
to-do-list/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── login/
│   │   │   └── Login.js
│   │   ├── register/
│   │   │   └── Register.js
│   │   ├── todo/
│   │   │   └── Todolist.js
│   │   └── EditUser/
│   │       └── EditUser.js
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── README.md
```

## Funcionalidades
- **Login**: Permite que os usuários façam login com suas credenciais.
- **Registro**: Permite que novos usuários se registrem.
- **Gerenciamento de Tarefas**: Permite que os usuários adicionem, editem e excluam tarefas.
- **Edição de Usuário**: Permite que os usuários editem suas informações pessoais.

