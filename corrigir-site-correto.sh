#!/bin/bash

# Script para ativar o site correto (fabianosf_site)
# Execute no servidor

echo "🔧 CORRIGINDO PARA O SITE CORRETO"
echo "================================="
echo ""

# 1. Desativar configuração antiga (fabianosf.com)
echo "1. Desativando configuração antiga (fabianosf.com):"
sudo rm -f /etc/nginx/sites-enabled/fabianosf.com
echo "✅ Configuração antiga desativada"
echo ""

# 2. Ativar apenas fabianosf_site
echo "2. Ativando configuração correta (fabianosf_site):"
sudo ln -sf /etc/nginx/sites-available/fabianosf_site /etc/nginx/sites-enabled/
echo "✅ Configuração correta ativada"
echo ""

# 3. Verificar configurações ativas
echo "3. Configurações ativas agora:"
sudo ls -la /etc/nginx/sites-enabled/
echo ""

# 4. Verificar qual site está configurado
echo "4. Verificando configuração do fabianosf_site:"
echo "----------------------------------------"
sudo grep -E "server_name|root" /etc/nginx/sites-available/fabianosf_site
echo ""

# 5. Testar configuração
echo "5. Testando configuração:"
sudo nginx -t
echo ""

# 6. Reiniciar Nginx
echo "6. Reiniciando Nginx:"
sudo systemctl restart nginx
sleep 2
if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx reiniciado"
else
    echo "❌ Erro ao reiniciar"
    sudo systemctl status nginx | head -10
fi
echo ""

# 7. Verificar se não há mais conflitos
echo "7. Verificando conflitos:"
if sudo nginx -t 2>&1 | grep -q "conflicting"; then
    echo "⚠️  Ainda há conflitos:"
    sudo nginx -t 2>&1 | grep "conflicting"
else
    echo "✅ Sem conflitos!"
fi
echo ""

# 8. Verificar arquivos
echo "8. Verificando arquivos do site:"
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ index.html existe em /var/www/fabianosf_site/"
    echo "Primeiras 3 linhas:"
    head -3 /var/www/fabianosf_site/index.html
else
    echo "❌ index.html NÃO existe!"
fi
echo ""

echo "======================================"
echo "✅ Correção concluída!"
echo "======================================"
echo ""
echo "🌐 Agora teste:"
echo "   - http://fabianosf.com"
echo "   - http://92.113.33.16"
echo ""
echo "Deve mostrar o portfólio do Fabiano, não o site ASBJJ"
echo ""

