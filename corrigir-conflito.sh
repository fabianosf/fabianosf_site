#!/bin/bash

# Script para corrigir conflito do Nginx
# Execute no servidor

VPS_PATH="/var/www/fabianosf_site"
SITE_NAME="fabianosf_site"

echo "🔧 CORRIGINDO CONFLITO DO NGINX"
echo "==============================="
echo ""

# 1. Verificar todas as configurações do Nginx
echo "1. Verificando configurações do Nginx:"
echo "----------------------------------------"
echo "Configurações ativas:"
sudo ls -la /etc/nginx/sites-enabled/
echo ""
echo "Configurações disponíveis:"
sudo ls -la /etc/nginx/sites-available/ | grep -E "fabianosf|default"
echo ""

# 2. Verificar se há configuração default ativa
echo "2. Verificando configuração default:"
if [ -L "/etc/nginx/sites-enabled/default" ]; then
    echo "⚠️  Configuração default está ativa - removendo..."
    sudo rm /etc/nginx/sites-enabled/default
    echo "✅ Removida"
else
    echo "✅ Default não está ativa"
fi
echo ""

# 3. Verificar se há outras configurações com o mesmo server_name
echo "3. Procurando conflitos:"
sudo grep -r "server_name.*fabianosf" /etc/nginx/sites-available/ 2>/dev/null
echo ""

# 4. Remover diretório dist que não deveria estar lá
echo "4. Verificando diretório dist:"
if [ -d "${VPS_PATH}/dist" ]; then
    echo "⚠️  Diretório dist encontrado - removendo..."
    sudo rm -rf ${VPS_PATH}/dist
    echo "✅ Removido"
else
    echo "✅ Sem diretório dist"
fi
echo ""

# 5. Garantir que apenas uma configuração está ativa
echo "5. Garantindo apenas uma configuração ativa:"
sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -sf /etc/nginx/sites-available/${SITE_NAME} /etc/nginx/sites-enabled/
echo "✅ Configuração ativada"
echo ""

# 6. Verificar conteúdo do index.html (caminhos dos assets)
echo "6. Verificando caminhos no index.html:"
if [ -f "${VPS_PATH}/index.html" ]; then
    echo "Caminhos dos assets no index.html:"
    grep -o 'href="[^"]*"' ${VPS_PATH}/index.html | head -3
    grep -o 'src="[^"]*"' ${VPS_PATH}/index.html | head -3
fi
echo ""

# 7. Testar configuração
echo "7. Testando configuração do Nginx:"
sudo nginx -t
echo ""

# 8. Reiniciar Nginx
echo "8. Reiniciando Nginx:"
sudo systemctl restart nginx
sleep 2
if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx reiniciado"
else
    echo "❌ Erro ao reiniciar"
    sudo systemctl status nginx | head -10
fi
echo ""

# 9. Verificar avisos
echo "9. Verificando avisos:"
sudo nginx -t 2>&1 | grep -i warn || echo "Sem avisos"
echo ""

echo "======================================"
echo "✅ Correção concluída!"
echo "======================================"
echo ""
echo "🌐 Teste:"
echo "   - http://92.113.33.16"
echo "   - http://fabianosf.com"
echo ""
echo "Se ainda der erro, verifique os logs:"
echo "   sudo tail -f /var/log/nginx/error.log"
echo ""

