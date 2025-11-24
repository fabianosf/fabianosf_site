#!/bin/bash

# Script para ver o erro específico do Nginx
# Execute no servidor

echo "🔍 VERIFICANDO ERRO ESPECÍFICO DO NGINX"
echo "======================================="
echo ""

# 1. Testar configuração
echo "1. Testando configuração do Nginx:"
echo "----------------------------------------"
sudo nginx -t
echo ""

# 2. Ver erros detalhados
echo "2. Erros detalhados:"
sudo nginx -T 2>&1 | grep -i error | head -10
echo ""

# 3. Ver journal
echo "3. Últimos erros no journal:"
sudo journalctl -xeu nginx.service --no-pager | tail -40
echo ""

# 4. Verificar se há conflitos de server_name
echo "4. Verificando conflitos de server_name:"
sudo nginx -T 2>&1 | grep -A 2 -B 2 "conflicting\|duplicate" | head -20
echo ""

# 5. Verificar sintaxe de cada arquivo
echo "5. Verificando arquivos de configuração:"
for file in /etc/nginx/sites-enabled/*; do
    if [ -L "$file" ]; then
        echo ""
        echo "Arquivo: $file"
        echo "Link para: $(readlink $file)"
        sudo nginx -t -c "$file" 2>&1 | head -5
    fi
done
echo ""

# 6. Verificar se porta 80 está livre
echo "6. Verificando porta 80:"
sudo netstat -tulpn | grep :80
echo ""

echo "======================================"
echo "Envie a saída completa, especialmente:"
echo "  - Resultado do 'sudo nginx -t'"
echo "  - Erros do journal"
echo "======================================"

