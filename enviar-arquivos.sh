#!/bin/bash

# Script simples para enviar arquivos
# Execute: ./enviar-arquivos.sh

VPS_USER="fabianosf"
VPS_HOST="92.113.33.16"
VPS_PATH="/var/www/fabianosf_site"

echo "📤 Enviando arquivos para o servidor..."
echo "💡 Você precisará digitar a senha do SSH"
echo ""

# Verificar se dist existe
if [ ! -d "dist" ]; then
    echo "❌ Diretório dist não encontrado!"
    echo "Execute: npm run build"
    exit 1
fi

# Enviar arquivos (sem tentar mudar permissões)
echo "Enviando arquivos..."
rsync -avz --progress --no-perms --no-owner --no-group dist/ ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/

RSYNC_EXIT=$?

# Verificar se os arquivos foram enviados mesmo com erro code 23
if [ $RSYNC_EXIT -eq 0 ] || [ $RSYNC_EXIT -eq 23 ] || [ $RSYNC_EXIT -eq 24 ]; then
    echo ""
    echo "✅ Arquivos enviados! (erro de permissão ignorado)"
    echo ""
    echo "🔐 Ajustando permissões..."
    echo "💡 Você precisará digitar a senha do ROOT (sudo)"
    echo ""
    
    # Verificar se index.html foi enviado
    if ssh ${VPS_USER}@${VPS_HOST} "test -f ${VPS_PATH}/index.html" 2>/dev/null; then
        echo "✅ index.html encontrado no servidor"
    else
        echo "⚠️  index.html não encontrado, mas continuando..."
    fi
    
    echo ""
    echo "Ajustando permissões (digite a senha do root quando pedir):"
    ssh -t ${VPS_USER}@${VPS_HOST} "sudo chown -R www-data:www-data ${VPS_PATH} && sudo chmod -R 755 ${VPS_PATH} && sudo find ${VPS_PATH} -type f -exec chmod 644 {} \; && echo '' && echo 'Arquivos no servidor:' && ls -la ${VPS_PATH}/"
    
    echo ""
    echo "🎉 Concluído!"
    echo "🌐 Acesse: http://${VPS_HOST} ou http://fabianosf.com"
else
    echo "❌ Erro ao enviar arquivos (código: $RSYNC_EXIT)"
    exit 1
fi

