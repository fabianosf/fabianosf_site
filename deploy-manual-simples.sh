#!/bin/bash

# Script de deploy manual - você precisará inserir senhas quando solicitado
# Execute: ./deploy-manual-simples.sh

VPS_USER="fabianosf"
VPS_HOST="92.113.33.16"
VPS_PATH="/var/www/fabianosf_site"

echo "🚀 DEPLOY MANUAL PARA PRODUÇÃO"
echo "=============================="
echo ""
echo "Este script vai pedir sua senha SSH algumas vezes."
echo "Digite a senha quando solicitado."
echo ""
read -p "Pressione ENTER para continuar..."
echo ""

# Verificar build
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

# Passo 1: Enviar index.html
echo "1️⃣ Enviando index.html..."
echo "💡 Digite a senha SSH quando solicitado"
scp dist/index.html ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/
if [ $? -eq 0 ]; then
    echo "✅ index.html enviado"
else
    echo "❌ Erro ao enviar index.html"
    exit 1
fi
echo ""

# Passo 2: Enviar favicon
if [ -f "dist/favicon.svg" ]; then
    echo "2️⃣ Enviando favicon.svg..."
    scp dist/favicon.svg ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/
    echo "✅ favicon enviado"
fi
echo ""

# Passo 3: Enviar assets
if [ -d "dist/assets" ]; then
    echo "3️⃣ Enviando assets (CSS e JS)..."
    echo "💡 Digite a senha SSH quando solicitado"
    scp -r dist/assets/* ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/assets/
    echo "✅ assets enviados"
fi
echo ""

# Passo 4: Enviar images (incluindo a nova foto)
if [ -d "dist/images" ]; then
    echo "4️⃣ Enviando imagens (incluindo a nova foto)..."
    echo "💡 Digite a senha SSH quando solicitado"
    scp -r dist/images/* ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/images/
    echo "✅ imagens enviadas"
fi
echo ""

# Passo 5: Ajustar permissões
echo "5️⃣ Ajustando permissões no servidor..."
echo "💡 Digite a senha SSH e depois a senha do ROOT quando solicitado"
echo ""
ssh -t ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
sudo chown -R www-data:www-data /var/www/fabianosf_site
sudo chmod -R 755 /var/www/fabianosf_site
sudo find /var/www/fabianosf_site -type f -exec chmod 644 {} \;
echo ""
echo "✅ Permissões ajustadas"
echo ""
echo "Verificando arquivos:"
ls -lh /var/www/fabianosf_site/ | head -10
echo ""
if [ -f "/var/www/fabianosf_site/images/20161127_153951.jpg" ]; then
    echo "✅ Nova foto encontrada!"
    echo "Tamanho: $(du -h /var/www/fabianosf_site/images/20161127_153951.jpg | cut -f1)"
else
    echo "⚠️ Foto não encontrada"
fi
ENDSSH

echo ""
echo "🎉 DEPLOY CONCLUÍDO!"
echo "🌐 Acesse: http://${VPS_HOST} ou http://fabianosf.com"
echo ""

