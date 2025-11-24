#!/bin/bash

# Script para corrigir erro do Nginx
# Execute no servidor

echo "🔧 CORRIGINDO ERRO DO NGINX"
echo "==========================="
echo ""

# 1. Ver status detalhado
echo "1. Status do Nginx:"
sudo systemctl status nginx.service | head -20
echo ""

# 2. Ver erros no journal
echo "2. Últimos erros:"
sudo journalctl -xeu nginx.service --no-pager | tail -30
echo ""

# 3. Testar configuração
echo "3. Testando configuração:"
sudo nginx -t
echo ""

# 4. Verificar se há erros de sintaxe
echo "4. Verificando sintaxe:"
if sudo nginx -t 2>&1 | grep -q "successful"; then
    echo "✅ Configuração OK"
else
    echo "❌ Erro na configuração"
    echo "Corrigindo..."
    
    # Verificar conflitos
    echo "Procurando conflitos:"
    sudo nginx -t 2>&1 | grep -i "conflict\|duplicate\|error"
    echo ""
    
    # Verificar se há server_name duplicado
    echo "Server names duplicados:"
    sudo grep -r "server_name.*fabianosf" /etc/nginx/sites-available/ | grep -v "^#"
    echo ""
fi
echo ""

# 5. Verificar portas
echo "5. Verificando portas:"
sudo netstat -tulpn | grep :80 || echo "Porta 80 não está em uso"
echo ""

# 6. Tentar iniciar
echo "6. Tentando iniciar Nginx:"
sudo systemctl start nginx
sleep 2
if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx iniciado com sucesso!"
else
    echo "❌ Ainda com erro"
    echo "Últimos erros:"
    sudo journalctl -xeu nginx.service --no-pager | tail -10
fi
echo ""

echo "======================================"
echo "Se ainda der erro, envie a saída completa"
echo "======================================"

