# Sistema de Registro e Login

https://front-production-2f2b.up.railway.app/

Um sistema completo de autenticação e registro de usuários, desenvolvido com React, TypeScript e Laravel.


## 🚀 Funcionalidades

- ✅ **Login de usuários** com opção "lembrar-me"
- ✅ **Cadastro de novos usuários**
- ✅ **Recuperação de senha** via e-mail
- ✅ **Redefinição de senha** segura com token
- ✅ **Dashboard de usuário** com informações básicas
- ✅ **Tema claro e escuro**
- ✅ **Design responsivo** para todos os dispositivos
- ✅ **Validação de formulários** em tempo real
- ✅ **Mensagens de erro/sucesso** personalizadas

## 🔧 Tecnologias Utilizadas

### Frontend
- React + TypeScript
- Vite como bundler
- React Router para navegação
- React Hook Form para gerenciamento de formulários
- Zod para validação de dados
- Framer Motion para animações
- Tailwind CSS para estilização
- Lucide React para ícones

### Backend
- Laravel 10
- Laravel Sanctum para autenticação API
- Sistema de recuperação de senha nativo do Laravel

## 📋 Pré-requisitos

- Node.js (v18+)
- PHP (v8.1+)
- Composer
- MySQL ou PostgreSQL

## ⚙️ Instalação

### Configuração do Frontend

```bash
# Clone o repositório
git clone https://github.com/2-A-M/sirelo.git
cd sirelo

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Configuração do Backend

```bash
# Navegue até a pasta do backend
cd backend

# Instale as dependências
composer install

# Copie o arquivo de ambiente
cp .env.example .env

# Gere a chave da aplicação
php artisan key:generate

# Configure o banco de dados no arquivo .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=nome_do_banco
# DB_USERNAME=seu_usuario
# DB_PASSWORD=sua_senha

# Execute as migrações
php artisan migrate

# Inicie o servidor
php artisan serve
```

## 📝 Uso

1. Acesse o sistema em `http://localhost:5173`
2. Crie uma nova conta ou faça login
3. Explore as funcionalidades de gerenciamento de usuário
4. Teste a recuperação de senha enviando um e-mail

## 👨‍💻 Desenvolvido por

[Arthur Acha](https://github.com/2-A-M) - Desenvolvedor Full Stack

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo LICENSE para detalhes. 
