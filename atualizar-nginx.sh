#!/bin/bash

# Script para atualizar Nginx para usar /var/www
# Execute no servidor: ssh fabianosf@92.113.33.16

VPS_PATH="/var/www/fabianosf_site"
SITE_NAME="fabianosf_site"
VPS_IP="92.113.33.16"

echo "⚙️  Atualizando configuração do Nginx..."
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 1. Criar diretório se não existir
echo -e "${YELLOW}📁 Verificando diretório ${VPS_PATH}...${NC}"
sudo mkdir -p ${VPS_PATH}
sudo chown -R fabianosf:www-data ${VPS_PATH}
sudo chmod -R 755 ${VPS_PATH}
echo -e "${GREEN}✅ Diretório OK${NC}"
echo ""

# 2. Atualizar configuração do Nginx
echo -e "${YELLOW}⚙️  Atualizando configuração do Nginx...${NC}"
sudo tee /etc/nginx/sites-available/${SITE_NAME} > /dev/null <<EOF
server {
    listen 80;
    server_name ${VPS_IP} _;
    
    root ${VPS_PATH};
    index index.html;

    access_log /var/log/nginx/${SITE_NAME}-access.log;
    error_log /var/log/nginx/${SITE_NAME}-error.log;

    # Configuração para SPA (React Router)
    location / {
        try_files \$uri \$uri/ /index.html;
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

# 3. Ativar site
echo -e "${YELLOW}🔗 Ativando site...${NC}"
sudo ln -sf /etc/nginx/sites-available/${SITE_NAME} /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
echo -e "${GREEN}✅ Site ativado${NC}"
echo ""

# 4. Testar e reiniciar
echo -e "${YELLOW}🧪 Testando configuração...${NC}"
if sudo nginx -t; then
    echo -e "${GREEN}✅ Configuração OK${NC}"
    sudo systemctl restart nginx
    echo -e "${GREEN}✅ Nginx reiniciado${NC}"
    echo ""
    echo -e "${GREEN}🎉 Configuração atualizada!${NC}"
    echo ""
    echo -e "${YELLOW}📋 Próximos passos:${NC}"
    echo "  1. Execute o deploy da sua máquina: ./deploy.sh"
    echo "  2. Acesse: http://${VPS_IP}"
else
    echo -e "${RED}❌ Erro na configuração${NC}"
    echo "Verifique: sudo nginx -t"
    exit 1
fi

