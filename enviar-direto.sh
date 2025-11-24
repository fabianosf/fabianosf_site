#!/bin/bash

# Script para enviar arquivos DIRETO
# Execute: ./enviar-direto.sh

VPS_USER="fabianosf"
VPS_HOST="92.113.33.16"
VPS_PATH="/var/www/fabianosf_site"

echo "📤 ENVIANDO ARQUIVOS DIRETO"
echo "==========================="
echo ""

# Verificar se dist existe
if [ ! -d "dist" ]; then
    echo "❌ Diretório dist não encontrado!"
    echo "Fazendo build..."
    npm run build
fi

if [ ! -f "dist/index.html" ]; then
    echo "❌ index.html não encontrado em dist/"
    exit 1
fi

echo "✅ Arquivos locais encontrados"
echo ""

# Enviar index.html primeiro
echo "1. Enviando index.html..."
scp dist/index.html ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/
if [ $? -eq 0 ]; then
    echo "✅ index.html enviado"
else
    echo "❌ Erro ao enviar index.html"
    exit 1
fi

# Enviar favicon
if [ -f "dist/favicon.svg" ]; then
    echo "2. Enviando favicon.svg..."
    scp dist/favicon.svg ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/
fi

# Enviar assets
if [ -d "dist/assets" ]; then
    echo "3. Enviando assets..."
    scp -r dist/assets/* ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/assets/
    echo "✅ assets enviados"
fi

# Enviar images
if [ -d "dist/images" ]; then
    echo "4. Enviando images..."
    scp -r dist/images/* ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/images/
    echo "✅ images enviadas"
fi

echo ""
echo "✅ Todos os arquivos enviados!"
echo ""
echo "🔐 Ajustando permissões..."
echo "💡 Digite a senha do SSH e depois a senha do root"
echo ""

ssh -t ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
sudo chown -R www-data:www-data /var/www/fabianosf_site
sudo chmod -R 755 /var/www/fabianosf_site
sudo find /var/www/fabianosf_site -type f -exec chmod 644 {} \;
echo ""
echo "Verificando arquivos:"
ls -la /var/www/fabianosf_site/
echo ""
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ index.html existe no servidor!"
    echo "Tamanho:"
    du -h /var/www/fabianosf_site/index.html
else
    echo "❌ index.html NÃO existe no servidor!"
fi
ENDSSH

echo ""
echo "🎉 Concluído!"
echo "🌐 Teste: http://${VPS_HOST} ou http://fabianosf.com"

