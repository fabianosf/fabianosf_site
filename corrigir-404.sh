#!/bin/bash

# Script para corrigir o 404
# Execute no servidor

echo "🔧 CORRIGINDO 404"
echo "================"
echo ""

# 1. Ver configuração atual
echo "1. Configuração atual do fabianosf_site:"
echo "----------------------------------------"
sudo cat /etc/nginx/sites-available/fabianosf_site
echo ""

# 2. Verificar se está ativa
echo "2. Verificando se está ativa:"
sudo ls -la /etc/nginx/sites-enabled/ | grep fabianosf
echo ""

# 3. Recriar configuração correta
echo "3. Recriando configuração correta:"
sudo tee /etc/nginx/sites-available/fabianosf_site > /dev/null <<'EOF'
server {
    listen 80;
    server_name fabianosf.com www.fabianosf.com 92.113.33.16;
    
    root /var/www/fabianosf_site;
    index index.html;

    access_log /var/log/nginx/fabianosf_site-access.log;
    error_log /var/log/nginx/fabianosf_site-error.log;

    # Configuração para SPA (React Router)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para arquivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/json application/javascript;
}
EOF
echo "✅ Configuração recriada"
echo ""

# 4. Garantir que está ativa
echo "4. Ativando configuração:"
sudo rm -f /etc/nginx/sites-enabled/fabianosf_site
sudo ln -sf /etc/nginx/sites-available/fabianosf_site /etc/nginx/sites-enabled/
echo "✅ Ativada"
echo ""

# 5. Verificar arquivos
echo "5. Verificando arquivos:"
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ index.html existe"
    ls -la /var/www/fabianosf_site/index.html
else
    echo "❌ index.html NÃO existe!"
fi
echo ""

# 6. Testar configuração
echo "6. Testando configuração:"
sudo nginx -t
echo ""

# 7. Reiniciar Nginx completamente
echo "7. Reiniciando Nginx:"
sudo systemctl stop nginx
sleep 1
sudo systemctl start nginx
sleep 2
if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx reiniciado"
else
    echo "❌ Erro ao reiniciar"
    sudo systemctl status nginx | head -10
fi
echo ""

# 8. Testar novamente
echo "8. Testando resposta:"
curl -H "Host: fabianosf.com" http://localhost | head -10
echo ""

# 9. Testar com IP
echo "9. Testando com IP:"
curl http://localhost | head -10
echo ""

echo "======================================"
echo "✅ Correção concluída!"
echo "======================================"
echo ""
echo "🌐 Teste:"
echo "   - http://fabianosf.com"
echo "   - http://92.113.33.16"
echo ""

