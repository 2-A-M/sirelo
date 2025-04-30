#!/bin/bash
set -e

# Remover arquivo .env se existir e usar variáveis de ambiente
if [ -f .env ]; then
    rm .env
fi

# Cache de configuração
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Verificar se precisa rodar migrations
php artisan migrate --force

# Executar comando fornecido ou padrão
exec "$@" 