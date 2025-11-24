#!/bin/bash

# Script para configurar domínio no Nginx
# Execute no servidor: ssh fabianosf@92.113.33.16

VPS_PATH="/var/www/fabianosf_site"
SITE_NAME="fabianosf_site"
DOMAIN="fabianosf.com"
VPS_IP="92.113.33.16"

echo "🌐 Configurando domínio ${DOMAIN}..."
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Atualizar configuração do Nginx com domínio
echo -e "${YELLOW}⚙️  Atualizando configuração do Nginx...${NC}"
sudo tee /etc/nginx/sites-available/${SITE_NAME} > /dev/null <<EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN} ${VPS_IP} _;
    
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

echo -e "${GREEN}✅ Configuração atualizada${NC}"
echo ""

# Ativar site
echo -e "${YELLOW}🔗 Ativando site...${NC}"
sudo ln -sf /etc/nginx/sites-available/${SITE_NAME} /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
echo -e "${GREEN}✅ Site ativado${NC}"
echo ""

# Testar e reiniciar
echo -e "${YELLOW}🧪 Testando configuração...${NC}"
if sudo nginx -t; then
    echo -e "${GREEN}✅ Configuração OK${NC}"
    sudo systemctl restart nginx
    echo -e "${GREEN}✅ Nginx reiniciado${NC}"
    echo ""
    echo -e "${GREEN}🎉 Domínio configurado!${NC}"
    echo ""
    echo -e "${YELLOW}📋 Verifique:${NC}"
    echo "  - Acesse: http://${DOMAIN}"
    echo "  - Acesse: http://www.${DOMAIN}"
    echo "  - Acesse: http://${VPS_IP}"
    echo ""
    echo -e "${YELLOW}💡 Certifique-se de que o DNS está apontando:${NC}"
    echo "  ${DOMAIN} -> ${VPS_IP}"
    echo "  www.${DOMAIN} -> ${VPS_IP}"
else
    echo -e "${RED}❌ Erro na configuração${NC}"
    echo "Verifique: sudo nginx -t"
    exit 1
fi

