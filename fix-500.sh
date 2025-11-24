#!/bin/bash

# Script para corrigir erro 500 no VPS
# Execute no VPS: ssh fabianosf@92.113.33.16

VPS_PATH="/home/fabianosf/fabianosf_site"

echo "🔍 Diagnosticando problema 500..."

# Verificar se arquivos existem
echo "📁 Verificando arquivos..."
if [ ! -f "${VPS_PATH}/index.html" ]; then
    echo "❌ ERRO: index.html não encontrado em ${VPS_PATH}/"
    echo "💡 Execute o deploy novamente: ./deploy.sh"
    exit 1
fi

echo "✅ index.html encontrado"

# Verificar permissões
echo "🔐 Verificando permissões..."
ls -la ${VPS_PATH}/ | head -5

# Ajustar permissões
echo "🔧 Ajustando permissões..."
sudo chown -R fabianosf:www-data ${VPS_PATH}
sudo chmod -R 755 ${VPS_PATH}
sudo find ${VPS_PATH} -type f -exec chmod 644 {} \;

echo "✅ Permissões ajustadas"

# Verificar/criar configuração do nginx
echo "⚙️  Configurando Nginx..."
sudo tee /etc/nginx/sites-available/fabianosf_site > /dev/null <<EOF
server {
    listen 80;
    server_name 92.113.33.16 _;
    
    root ${VPS_PATH};
    index index.html;

    access_log /var/log/nginx/fabianosf-access.log;
    error_log /var/log/nginx/fabianosf-error.log;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/json application/javascript;
}
EOF

# Ativar site
echo "🔗 Ativando site..."
sudo ln -sf /etc/nginx/sites-available/fabianosf_site /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Testar configuração
echo "🧪 Testando configuração do Nginx..."
if sudo nginx -t; then
    echo "✅ Configuração OK"
    sudo systemctl restart nginx
    echo "✅ Nginx reiniciado"
    echo ""
    echo "🎉 Correção concluída!"
    echo "🌐 Acesse: http://92.113.33.16"
else
    echo "❌ Erro na configuração do Nginx"
    echo "Verifique: sudo nginx -t"
    exit 1
fi

