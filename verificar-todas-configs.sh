#!/bin/bash

# Script para verificar todas as configurações
# Execute no servidor

echo "🔍 VERIFICANDO TODAS AS CONFIGURAÇÕES"
echo "======================================"
echo ""

# 1. Ver fabianosf.com (antiga)
echo "1. CONFIGURAÇÃO: fabianosf.com"
echo "----------------------------------------"
if [ -f "/etc/nginx/sites-available/fabianosf.com" ]; then
    echo "Server name:"
    sudo grep "server_name" /etc/nginx/sites-available/fabianosf.com
    echo "Root:"
    sudo grep "root" /etc/nginx/sites-available/fabianosf.com
    echo "Status:"
    if [ -L "/etc/nginx/sites-enabled/fabianosf.com" ]; then
        echo "⚠️  ATIVA (deve ser desativada)"
    else
        echo "✅ Desativada"
    fi
else
    echo "Arquivo não existe"
fi
echo ""

# 2. Ver fabianosf_site (nova)
echo "2. CONFIGURAÇÃO: fabianosf_site"
echo "----------------------------------------"
if [ -f "/etc/nginx/sites-available/fabianosf_site" ]; then
    echo "Server name:"
    sudo grep "server_name" /etc/nginx/sites-available/fabianosf_site
    echo "Root:"
    sudo grep "root" /etc/nginx/sites-available/fabianosf_site
    echo "Status:"
    if [ -L "/etc/nginx/sites-enabled/fabianosf_site" ]; then
        echo "✅ ATIVA (correta!)"
    else
        echo "❌ Desativada (deve ser ativada)"
    fi
else
    echo "Arquivo não existe"
fi
echo ""

# 3. Ver outras configurações
echo "3. OUTRAS CONFIGURAÇÕES:"
echo "----------------------------------------"
for config in asbjj.com.br easypanel easypanel-ip walenna-site.conf; do
    if [ -f "/etc/nginx/sites-available/$config" ]; then
        echo ""
        echo "  $config:"
        echo "  Server name:"
        sudo grep "server_name" /etc/nginx/sites-available/$config | head -1
        echo "  Root:"
        sudo grep "root" /etc/nginx/sites-available/$config | head -1
        if [ -L "/etc/nginx/sites-enabled/$config" ]; then
            echo "  Status: ✅ Ativa"
        else
            echo "  Status: Desativada"
        fi
    fi
done
echo ""

# 4. Resumo
echo "======================================"
echo "📋 RESUMO:"
echo "======================================"
echo ""
echo "Para o domínio fabianosf.com, você deve usar:"
echo "  ✅ fabianosf_site (seu portfólio)"
echo ""
echo "NÃO use:"
echo "  ❌ fabianosf.com (antiga - aponta para ASBJJ)"
echo ""
echo "Configurações ativas agora:"
sudo ls -la /etc/nginx/sites-enabled/
echo ""

