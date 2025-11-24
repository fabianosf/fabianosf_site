#!/bin/bash

# Script que resolve o problema de permissão
# Envia para diretório temporário e move com sudo
# Execute: ./enviar-final.sh

VPS_USER="fabianosf"
VPS_HOST="92.113.33.16"
VPS_PATH="/var/www/fabianosf_site"
TEMP_PATH="/home/fabianosf/temp_deploy"

echo "🚀 ENVIO FINAL (Resolve Permissões)"
echo "===================================="
echo ""

# Verificar se dist existe
if [ ! -d "dist" ]; then
    echo "📦 Fazendo build..."
    npm run build
fi

if [ ! -f "dist/index.html" ]; then
    echo "❌ index.html não encontrado em dist/"
    exit 1
fi

echo "✅ Arquivos locais OK"
echo ""

# 1. Criar diretório temporário no servidor
echo "1. Criando diretório temporário no servidor..."
echo "💡 Digite a senha do SSH"
ssh ${VPS_USER}@${VPS_HOST} "rm -rf ${TEMP_PATH} && mkdir -p ${TEMP_PATH}"
echo ""

# 2. Enviar TODOS os arquivos para o diretório temporário
echo "2. Enviando todos os arquivos para diretório temporário..."
echo "💡 Digite a senha do SSH"
rsync -avz --progress dist/ ${VPS_USER}@${VPS_HOST}:${TEMP_PATH}/
echo ""

# 3. Mover arquivos para /var/www com sudo e ajustar permissões
echo "3. Movendo arquivos para /var/www e ajustando permissões..."
echo "💡 Digite a senha do SSH e depois a senha do ROOT"
echo ""

ssh -t ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
# Criar diretório de destino
sudo mkdir -p /var/www/fabianosf_site/assets
sudo mkdir -p /var/www/fabianosf_site/images

# Mover arquivos
sudo cp -r /home/fabianosf/temp_deploy/* /var/www/fabianosf_site/

# Ajustar permissões
sudo chown -R www-data:www-data /var/www/fabianosf_site
sudo chmod -R 755 /var/www/fabianosf_site
sudo find /var/www/fabianosf_site -type f -exec chmod 644 {} \;

# Limpar diretório temporário
rm -rf /home/fabianosf/temp_deploy

# Verificar
echo ""
echo "======================================"
echo "VERIFICAÇÃO FINAL:"
echo "======================================"
echo ""
echo "Arquivos em /var/www/fabianosf_site/:"
ls -la /var/www/fabianosf_site/
echo ""
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ index.html EXISTE!"
    echo "Tamanho:"
    du -h /var/www/fabianosf_site/index.html
    echo ""
    echo "Primeiras 5 linhas:"
    head -5 /var/www/fabianosf_site/index.html
else
    echo "❌ index.html NÃO EXISTE!"
fi
echo ""
echo "Arquivos em assets:"
ls -la /var/www/fabianosf_site/assets/ | head -5
echo ""
echo "Permissões:"
ls -ld /var/www/fabianosf_site/
ENDSSH

echo ""
echo "🎉 Processo concluído!"
echo "🌐 Teste: http://${VPS_HOST} ou http://fabianosf.com"

