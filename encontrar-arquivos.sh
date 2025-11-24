#!/bin/bash

# Script para encontrar onde estão os arquivos
# Execute no servidor

echo "🔍 PROCURANDO ARQUIVOS DO PORTFÓLIO"
echo "===================================="
echo ""

# 1. Verificar /var/www/fabianosf_site
echo "1. Verificando /var/www/fabianosf_site:"
ls -la /var/www/fabianosf_site/ 2>/dev/null || echo "Diretório não existe ou sem permissão"
echo ""

# 2. Procurar index.html em vários lugares
echo "2. Procurando index.html:"
find /var/www -name "index.html" -type f 2>/dev/null | head -10
echo ""

# 3. Verificar configuração asbjj (pode estar servindo o site errado)
echo "3. Verificando configuração asbjj:"
if [ -f "/etc/nginx/sites-available/asbjj" ]; then
    echo "Configuração asbjj encontrada:"
    sudo grep -E "server_name|root" /etc/nginx/sites-available/asbjj
    echo ""
    if [ -L "/etc/nginx/sites-enabled/asbjj" ]; then
        echo "⚠️  asbjj está ATIVA!"
    else
        echo "✅ asbjj está desativada"
    fi
fi
echo ""

# 4. Ver todas as configurações ativas
echo "4. Todas as configurações ativas:"
sudo ls -la /etc/nginx/sites-enabled/
echo ""

# 5. Ver qual configuração está respondendo para fabianosf.com
echo "5. Testando configurações:"
echo "----------------------------------------"
echo "Teste com IP (deve funcionar):"
curl -s http://92.113.33.16 | head -5
echo ""
echo "Teste com Host fabianosf.com (dá 404):"
curl -s -H "Host: fabianosf.com" http://localhost | head -5
echo ""

# 6. Verificar se há redirecionamento
echo "6. Verificando redirecionamentos:"
sudo grep -r "return\|rewrite" /etc/nginx/sites-enabled/ 2>/dev/null | head -10
echo ""

echo "======================================"
echo "💡 SOLUÇÃO:"
echo "======================================"
echo ""
echo "O problema é que:"
echo "  1. index.html não existe em /var/www/fabianosf_site/"
echo "  2. Ou a configuração asbjj está interferindo"
echo ""
echo "Execute:"
echo "  ls -la /var/www/fabianosf_site/"
echo "  find /var/www -name index.html"
echo ""

