#!/bin/bash

# Script simples para enviar arquivos usando scp
# Execute: ./enviar-simples.sh

VPS_USER="fabianosf"
VPS_HOST="92.113.33.16"
VPS_PATH="/var/www/fabianosf_site"

echo "📤 Enviando arquivos..."
echo "💡 Você precisará digitar a senha do SSH"
echo ""

# Verificar se dist existe
if [ ! -d "dist" ]; then
    echo "❌ Diretório dist não encontrado!"
    echo "Execute: npm run build"
    exit 1
fi

# Enviar todos os arquivos usando scp
echo "Enviando arquivos com scp..."
scp -r dist/* ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Arquivos enviados!"
    echo ""
    echo "🔐 Ajustando permissões..."
    echo "💡 Você precisará digitar a senha do SSH novamente e depois a senha do root"
    echo ""
    
    ssh -t ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
sudo chown -R www-data:www-data /var/www/fabianosf_site
sudo chmod -R 755 /var/www/fabianosf_site
sudo find /var/www/fabianosf_site -type f -exec chmod 644 {} \;
echo ""
echo "Arquivos no servidor:"
ls -la /var/www/fabianosf_site/
echo ""
echo "Verificando index.html:"
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ index.html existe!"
    head -5 /var/www/fabianosf_site/index.html
else
    echo "❌ index.html NÃO existe!"
fi
ENDSSH
    
    echo ""
    echo "🎉 Concluído!"
    echo "🌐 Acesse: http://${VPS_HOST} ou http://fabianosf.com"
else
    echo "❌ Erro ao enviar arquivos"
    exit 1
fi

