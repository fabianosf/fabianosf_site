#!/bin/bash

# Script simples para enviar arquivos AGORA
# Execute: ./enviar-agora.sh

VPS_USER="fabianosf"
VPS_HOST="92.113.33.16"
TEMP_PATH="/home/fabianosf/temp_deploy"
VPS_PATH="/var/www/fabianosf_site"

echo "📤 ENVIANDO ARQUIVOS AGORA"
echo "=========================="
echo ""

# Verificar se dist existe
if [ ! -d "dist" ]; then
    echo "📦 Fazendo build..."
    npm run build
fi

if [ ! -f "dist/index.html" ]; then
    echo "❌ index.html não encontrado!"
    exit 1
fi

echo "✅ Arquivos locais OK"
echo ""

# 1. Criar diretório temporário
echo "1. Criando diretório temporário..."
ssh ${VPS_USER}@${VPS_HOST} "rm -rf ${TEMP_PATH} && mkdir -p ${TEMP_PATH}"
echo "✅ Diretório criado"
echo ""

# 2. Enviar TODOS os arquivos
echo "2. Enviando arquivos..."
echo "💡 Digite a senha do SSH"
rsync -avz --progress dist/ ${VPS_USER}@${VPS_HOST}:${TEMP_PATH}/
echo ""

# 3. Mover para /var/www com sudo
echo "3. Movendo arquivos para /var/www..."
echo "💡 Digite a senha do SSH e depois a senha do ROOT"
echo ""

ssh -t ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
sudo mkdir -p /var/www/fabianosf_site
sudo cp -r /home/fabianosf/temp_deploy/* /var/www/fabianosf_site/
sudo chown -R www-data:www-data /var/www/fabianosf_site
sudo chmod -R 755 /var/www/fabianosf_site
sudo find /var/www/fabianosf_site -type f -exec chmod 644 {} \;
rm -rf /home/fabianosf/temp_deploy

echo ""
echo "Verificando arquivos:"
ls -la /var/www/fabianosf_site/
echo ""
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ index.html EXISTE!"
    wc -l /var/www/fabianosf_site/index.html
else
    echo "❌ index.html NÃO EXISTE!"
fi
ENDSSH

echo ""
echo "🎉 Concluído!"
echo "🌐 Teste: http://fabianosf.com"

