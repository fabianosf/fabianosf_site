#!/bin/bash

# Script de deploy automático usando sshpass
# Execute: ./deploy-automatico.sh

VPS_USER="fabianosf"
VPS_HOST="92.113.33.16"
VPS_PATH="/var/www/fabianosf_site"
TEMP_PATH="/home/fabianosf/temp_deploy"
SSH_PASS="123"
SUDO_PASS="123"

echo "🚀 DEPLOY AUTOMÁTICO PARA PRODUÇÃO"
echo "==================================="
echo ""

# Verificar se dist existe
if [ ! -d "dist" ]; then
    echo "📦 Fazendo build..."
    npm run build
fi

if [ ! -f "dist/index.html" ]; then
    echo "❌ Erro: dist/index.html não encontrado!"
    exit 1
fi

echo "✅ Build verificado"
echo ""

# Instalar sshpass se necessário
if ! command -v sshpass &> /dev/null; then
    echo "📦 Instalando sshpass..."
    sudo apt-get update && sudo apt-get install -y sshpass
fi

# 1. Criar diretório temporário no servidor
echo "1️⃣ Criando diretório temporário no servidor..."
sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no ${VPS_USER}@${VPS_HOST} "rm -rf ${TEMP_PATH} && mkdir -p ${TEMP_PATH}/assets ${TEMP_PATH}/images"
if [ $? -ne 0 ]; then
    echo "❌ Erro ao criar diretório temporário"
    exit 1
fi
echo "✅ Diretório temporário criado"
echo ""

# 2. Enviar TODOS os arquivos para diretório temporário
echo "2️⃣ Enviando arquivos para o servidor..."
sshpass -p "$SSH_PASS" rsync -avz --progress -e "ssh -o StrictHostKeyChecking=no" dist/ ${VPS_USER}@${VPS_HOST}:${TEMP_PATH}/
if [ $? -ne 0 ]; then
    echo "❌ Erro ao enviar arquivos"
    exit 1
fi
echo "✅ Arquivos enviados"
echo ""

# 3. Mover arquivos para /var/www com sudo e ajustar permissões
echo "3️⃣ Movendo arquivos para produção e ajustando permissões..."
sshpass -p "$SSH_PASS" ssh -t -o StrictHostKeyChecking=no ${VPS_USER}@${VPS_HOST} << ENDSSH
# Criar diretório de destino
echo "$SUDO_PASS" | sudo -S mkdir -p /var/www/fabianosf_site/assets
echo "$SUDO_PASS" | sudo -S mkdir -p /var/www/fabianosf_site/images

# Mover arquivos
echo "$SUDO_PASS" | sudo -S cp -r /home/fabianosf/temp_deploy/* /var/www/fabianosf_site/

# Ajustar permissões
echo "$SUDO_PASS" | sudo -S chown -R www-data:www-data /var/www/fabianosf_site
echo "$SUDO_PASS" | sudo -S chmod -R 755 /var/www/fabianosf_site
echo "$SUDO_PASS" | sudo -S find /var/www/fabianosf_site -type f -exec chmod 644 {} \;

# Limpar diretório temporário
rm -rf /home/fabianosf/temp_deploy

# Verificar
echo ""
echo "======================================"
echo "✅ VERIFICAÇÃO FINAL:"
echo "======================================"
echo ""
echo "Arquivos em /var/www/fabianosf_site/:"
ls -la /var/www/fabianosf_site/ | head -10
echo ""
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ index.html EXISTE!"
    echo "Tamanho: \$(du -h /var/www/fabianosf_site/index.html | cut -f1)"
else
    echo "❌ index.html NÃO EXISTE!"
fi
echo ""
if [ -f "/var/www/fabianosf_site/images/20161127_153951.jpg" ]; then
    echo "✅ Nova foto EXISTE!"
    echo "Tamanho: \$(du -h /var/www/fabianosf_site/images/20161127_153951.jpg | cut -f1)"
else
    echo "⚠️ Foto não encontrada"
fi
echo ""
echo "Arquivos em assets:"
ls -la /var/www/fabianosf_site/assets/ | head -5
ENDSSH

echo ""
echo "🎉 DEPLOY CONCLUÍDO!"
echo "🌐 Acesse: http://${VPS_HOST} ou http://fabianosf.com"
echo ""

