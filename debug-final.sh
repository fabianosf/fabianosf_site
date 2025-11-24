#!/bin/bash

# Script para debug final
# Execute no servidor

VPS_PATH="/var/www/fabianosf_site"

echo "🔍 DEBUG FINAL - ERRO 500"
echo "========================="
echo ""

# 1. Verificar se index.html existe
echo "1. Verificando index.html:"
if [ -f "${VPS_PATH}/index.html" ]; then
    echo "✅ index.html EXISTE"
    echo "Tamanho: $(du -h ${VPS_PATH}/index.html | cut -f1)"
    echo "Conteúdo (primeiras 10 linhas):"
    head -10 ${VPS_PATH}/index.html
else
    echo "❌ index.html NÃO EXISTE!"
    echo "Execute o envio dos arquivos da sua máquina"
    exit 1
fi
echo ""

# 2. Verificar assets
echo "2. Verificando assets:"
if [ -d "${VPS_PATH}/assets" ]; then
    ASSET_COUNT=$(find ${VPS_PATH}/assets -type f 2>/dev/null | wc -l)
    echo "✅ Diretório assets existe"
    echo "Arquivos: $ASSET_COUNT"
    if [ $ASSET_COUNT -gt 0 ]; then
        echo "Lista:"
        ls -lh ${VPS_PATH}/assets/ | head -5
    else
        echo "⚠️  Diretório assets está VAZIO!"
    fi
else
    echo "❌ Diretório assets não existe!"
fi
echo ""

# 3. Verificar permissões
echo "3. Verificando permissões:"
ls -la ${VPS_PATH}/ | head -10
echo ""

# 4. Testar acesso do www-data
echo "4. Testando acesso do www-data:"
if sudo -u www-data test -r ${VPS_PATH}/index.html 2>/dev/null; then
    echo "✅ www-data pode ler index.html"
else
    echo "❌ www-data NÃO pode ler index.html"
    echo "Ajustando permissões..."
    sudo chown -R www-data:www-data ${VPS_PATH}
    sudo chmod -R 755 ${VPS_PATH}
    sudo find ${VPS_PATH} -type f -exec chmod 644 {} \;
    echo "✅ Permissões ajustadas"
fi
echo ""

# 5. Ver erros do Nginx
echo "5. ÚLTIMOS ERROS DO NGINX:"
echo "----------------------------------------"
sudo tail -50 /var/log/nginx/error.log | tail -20
echo ""

# 6. Ver erros específicos do site
echo "6. ERROS DO SITE:"
echo "----------------------------------------"
if [ -f "/var/log/nginx/fabianosf_site-error.log" ]; then
    sudo tail -30 /var/log/nginx/fabianosf_site-error.log
else
    echo "Arquivo de log não encontrado"
    echo "Verificando log geral:"
    sudo tail -30 /var/log/nginx/error.log | grep -i "fabianosf\|/var/www"
fi
echo ""

# 7. Verificar configuração do Nginx
echo "7. Configuração do Nginx:"
sudo grep -E "root|server_name|index" /etc/nginx/sites-available/fabianosf_site
echo ""

# 8. Testar configuração
echo "8. Testando configuração do Nginx:"
sudo nginx -t
echo ""

# 9. Reiniciar Nginx
echo "9. Reiniciando Nginx:"
sudo systemctl restart nginx
sleep 1
if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx reiniciado e rodando"
else
    echo "❌ Erro ao reiniciar Nginx"
    sudo systemctl status nginx | head -10
fi
echo ""

echo "======================================"
echo "📋 RESUMO:"
echo "======================================"
if [ -f "${VPS_PATH}/index.html" ]; then
    echo "✅ index.html: OK"
else
    echo "❌ index.html: FALTANDO"
fi

if [ -d "${VPS_PATH}/assets" ] && [ $(find ${VPS_PATH}/assets -type f 2>/dev/null | wc -l) -gt 0 ]; then
    echo "✅ assets: OK"
else
    echo "⚠️  assets: Verificar"
fi

if sudo -u www-data test -r ${VPS_PATH}/index.html 2>/dev/null; then
    echo "✅ Permissões: OK"
else
    echo "❌ Permissões: PROBLEMA"
fi

if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx: Rodando"
else
    echo "❌ Nginx: Parado"
fi

echo ""
echo "🌐 Teste: http://92.113.33.16 ou http://fabianosf.com"
echo ""

