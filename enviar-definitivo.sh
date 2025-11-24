#!/bin/bash

# Script DEFINITIVO para enviar arquivos
# Execute: ./enviar-definitivo.sh

VPS_USER="fabianosf"
VPS_HOST="92.113.33.16"
TEMP_PATH="/home/fabianosf/temp_deploy_fabiano"
VPS_PATH="/var/www/fabianosf_site"

echo "📤 ENVIO DEFINITIVO"
echo "==================="
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

echo "✅ Arquivos locais encontrados:"
ls -la dist/ | head -8
echo ""

# 1. Limpar e criar diretório temporário
echo "1. Preparando diretório temporário no servidor..."
ssh ${VPS_USER}@${VPS_HOST} "rm -rf ${TEMP_PATH} && mkdir -p ${TEMP_PATH}" || {
    echo "❌ Erro ao criar diretório temporário"
    exit 1
}
echo "✅ Diretório criado"
echo ""

# 2. Enviar TODOS os arquivos
echo "2. Enviando TODOS os arquivos..."
echo "💡 Digite a senha do SSH"
rsync -avz --progress --no-perms --no-owner --no-group dist/ ${VPS_USER}@${VPS_HOST}:${TEMP_PATH}/

if [ $? -ne 0 ]; then
    echo "❌ Erro ao enviar arquivos"
    exit 1
fi

echo "✅ Arquivos enviados para diretório temporário"
echo ""

# 3. Verificar se chegou no temporário
echo "3. Verificando arquivos no diretório temporário..."
ssh ${VPS_USER}@${VPS_HOST} "ls -la ${TEMP_PATH}/ | head -10"
echo ""

# 4. Mover para /var/www com sudo
echo "4. Movendo arquivos para /var/www/fabianosf_site..."
echo "💡 Digite a senha do SSH e depois a senha do ROOT"
echo ""

ssh -t ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
# Criar diretório de destino
sudo mkdir -p /var/www/fabianosf_site/assets
sudo mkdir -p /var/www/fabianosf_site/images

# Limpar diretório de destino (manter estrutura)
sudo rm -f /var/www/fabianosf_site/*.html
sudo rm -f /var/www/fabianosf_site/*.svg
sudo rm -rf /var/www/fabianosf_site/assets/*
sudo rm -rf /var/www/fabianosf_site/images/*

# Copiar arquivos
sudo cp -r /home/fabianosf/temp_deploy_fabiano/* /var/www/fabianosf_site/

# Ajustar permissões
sudo chown -R www-data:www-data /var/www/fabianosf_site
sudo chmod -R 755 /var/www/fabianosf_site
sudo find /var/www/fabianosf_site -type f -exec chmod 644 {} \;

# Limpar temporário
rm -rf /home/fabianosf/temp_deploy_fabiano

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
    echo "Tamanho: $(du -h /var/www/fabianosf_site/index.html | cut -f1)"
    echo "Linhas: $(wc -l /var/www/fabianosf_site/index.html | cut -d' ' -f1)"
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
echo "Testando acesso do www-data:"
sudo -u www-data test -r /var/www/fabianosf_site/index.html && echo "✅ www-data pode ler" || echo "❌ www-data NÃO pode ler"
ENDSSH

echo ""
echo "🎉 Processo concluído!"
echo ""
echo "🌐 Teste agora:"
echo "   - http://fabianosf.com"
echo "   - http://92.113.33.16"
echo ""
echo "💡 Se ainda mostrar ASBJJ, limpe o cache do navegador (Ctrl+Shift+Delete)"

