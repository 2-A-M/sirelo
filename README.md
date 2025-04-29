# Sistema de Autenticação Completo

Um sistema completo de autenticação e registro de usuários, desenvolvido com React, TypeScript e Laravel.

![Captura de tela do projeto](https://via.placeholder.com/800x400)

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
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio

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

## 🚀 Deploy

### Frontend (Vercel)

1. Crie uma conta na [Vercel](https://vercel.com/)
2. Conecte seu repositório GitHub
3. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Adicione variável de ambiente:
   - `VITE_API_URL`: URL do seu backend no Railway

### Backend (Railway)

1. Crie uma conta no [Railway](https://railway.app/)
2. Inicie um novo projeto a partir do GitHub
3. Configure o diretório do projeto para `backend`
4. Adicione um serviço MySQL
5. Configure variáveis de ambiente:
   - `APP_KEY`: Execute `php artisan key:generate --show` localmente
   - `APP_ENV`: production
   - `DB_CONNECTION`: mysql
   - Outras variáveis de conexão com banco de dados
6. Configure o comando inicial: 
   ```
   php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=$PORT
   ```

## 👨‍💻 Desenvolvido por

[Seu Nome](https://github.com/seu-usuario) - Desenvolvedor Full Stack

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo LICENSE para detalhes. 