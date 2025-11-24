#!/bin/bash

# Script completo para corrigir 404
# Execute no seu PC: ./corrigir-404-completo.sh

VPS_USER="fabianosf"
VPS_HOST="92.113.33.16"
VPS_PATH="/var/www/fabianosf_site"
TEMP_PATH="/home/fabianosf/temp_deploy"

echo "🔧 CORRIGINDO ERRO 404 COMPLETO"
echo "================================="
echo ""

# Muda para o diretório do script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR" || exit 1

# 1. Verificar se dist existe, se não, fazer build
echo "1. Verificando build..."
if [ ! -d "dist" ] || [ ! -f "dist/index.html" ]; then
    echo "📦 Fazendo build..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Erro no build!"
        exit 1
    fi
fi

if [ ! -f "dist/index.html" ]; then
    echo "❌ index.html não encontrado em dist/"
    exit 1
fi

echo "✅ Build OK"
echo ""

# 2. Criar diretório temporário no servidor
echo "2. Preparando servidor..."
echo "💡 Digite a senha do SSH"
ssh ${VPS_USER}@${VPS_HOST} "rm -rf ${TEMP_PATH} && mkdir -p ${TEMP_PATH}"
echo ""

# 3. Enviar arquivos
echo "3. Enviando arquivos..."
echo "💡 Digite a senha do SSH"
rsync -avz --progress dist/ ${VPS_USER}@${VPS_HOST}:${TEMP_PATH}/
echo ""

# 4. Mover arquivos e configurar no servidor
echo "4. Configurando no servidor..."
echo "💡 Você precisará digitar a senha do SUDO algumas vezes"
echo ""

# 4.1. Criar diretórios
echo "4.1. Criando diretórios..."
echo "💡 Digite a senha do SUDO"
ssh -t ${VPS_USER}@${VPS_HOST} "sudo mkdir -p /var/www/fabianosf_site/assets && sudo mkdir -p /var/www/fabianosf_site/images"
echo ""

# 4.2. Mover arquivos
echo "4.2. Movendo arquivos..."
echo "💡 Digite a senha do SUDO"
ssh -t ${VPS_USER}@${VPS_HOST} "sudo cp -r /home/fabianosf/temp_deploy/* /var/www/fabianosf_site/"
echo ""

# 4.3. Ajustar permissões
echo "4.3. Ajustando permissões..."
echo "💡 Digite a senha do SUDO"
ssh -t ${VPS_USER}@${VPS_HOST} "sudo chown -R www-data:www-data /var/www/fabianosf_site && sudo chmod -R 755 /var/www/fabianosf_site && sudo find /var/www/fabianosf_site -type f -exec chmod 644 {} \;"
echo ""

# 4.4. Verificar arquivos
echo "4.4. Verificando arquivos..."
ssh ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ index.html EXISTE!"
    ls -lh /var/www/fabianosf_site/index.html
else
    echo "❌ index.html NÃO EXISTE!"
    exit 1
fi
ENDSSH
echo ""

# 4.5. Verificar/criar configuração do Nginx
echo "4.5. Configurando Nginx..."
echo "💡 Digite a senha do SUDO"

# Primeiro verificar se existe
NGINX_EXISTS=$(ssh ${VPS_USER}@${VPS_HOST} "test -f /etc/nginx/sites-available/fabianosf_site && echo 'yes' || echo 'no'")

if [ "$NGINX_EXISTS" = "yes" ]; then
    echo "✅ Configuração do Nginx existe"
    ssh -t ${VPS_USER}@${VPS_HOST} "sudo ln -sf /etc/nginx/sites-available/fabianosf_site /etc/nginx/sites-enabled/fabianosf_site"
    ssh -t ${VPS_USER}@${VPS_HOST} "sudo nginx -t && sudo systemctl reload nginx && echo '✅ Nginx recarregado'"
else
    echo "⚠️  Configuração do Nginx não existe, criando..."
    
    # Criar arquivo de configuração localmente
    cat > /tmp/fabianosf_site_nginx.conf << 'NGINX_EOF'
server {
    listen 80;
    listen [::]:80;
    server_name fabianosf.com www.fabianosf.com;
    
    root /var/www/fabianosf_site;
    index index.html;
    
    access_log /var/log/nginx/fabianosf_access.log;
    error_log /var/log/nginx/fabianosf_error.log;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
NGINX_EOF
    
    # Enviar para o servidor
    scp /tmp/fabianosf_site_nginx.conf ${VPS_USER}@${VPS_HOST}:/tmp/fabianosf_site_nginx.conf
    
    # Mover para o local correto
    ssh -t ${VPS_USER}@${VPS_HOST} "sudo mv /tmp/fabianosf_site_nginx.conf /etc/nginx/sites-available/fabianosf_site && sudo ln -sf /etc/nginx/sites-available/fabianosf_site /etc/nginx/sites-enabled/fabianosf_site"
    
    # Testar e recarregar
    ssh -t ${VPS_USER}@${VPS_HOST} "sudo nginx -t && sudo systemctl reload nginx && echo '✅ Configuração criada e Nginx recarregado'"
    
    # Limpar arquivo temporário local
    rm -f /tmp/fabianosf_site_nginx.conf
fi
echo ""

# 4.6. Limpar diretório temporário
echo "4.6. Limpando arquivos temporários..."
ssh ${VPS_USER}@${VPS_HOST} "rm -rf /home/fabianosf/temp_deploy"
echo ""

# 4.7. Teste final
echo "4.7. Teste final..."
ssh ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
echo ""
echo "======================================"
echo "TESTE FINAL:"
echo "======================================"
echo ""
echo "Arquivos em /var/www/fabianosf_site/:"
ls -la /var/www/fabianosf_site/ | head -10
echo ""
echo "Teste com curl:"
curl -s -H "Host: fabianosf.com" http://localhost | head -5
echo ""
ENDSSH

echo ""
echo "======================================"
echo "✅ PROCESSO CONCLUÍDO!"
echo "======================================"
echo ""
echo "🌐 Teste no navegador:"
echo "   http://fabianosf.com"
echo "   http://92.113.33.16"
echo ""
echo "💡 Se ainda der 404:"
echo "   1. Limpe o cache do navegador"
echo "   2. Teste em modo anônimo"
echo "   3. Execute no servidor: ./verificar-404.sh"
echo ""

