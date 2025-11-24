#!/bin/bash

# Script de Configuração Inicial do Servidor
# Execute no servidor: ssh fabianosf@92.113.33.16
# Depois copie este script e execute: ./configurar-servidor.sh

VPS_PATH="/var/www/fabianosf_site"
SITE_NAME="fabianosf_site"
VPS_IP="92.113.33.16"

echo "🚀 Configurando servidor do zero..."
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 1. Criar diretório
echo -e "${YELLOW}📁 Criando diretório ${VPS_PATH}...${NC}"
sudo mkdir -p ${VPS_PATH}
sudo chown -R fabianosf:www-data ${VPS_PATH}
sudo chmod -R 755 ${VPS_PATH}
echo -e "${GREEN}✅ Diretório criado${NC}"
echo ""

# 2. Instalar Nginx (se não estiver instalado)
echo -e "${YELLOW}📦 Verificando Nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    echo -e "${YELLOW}Instalando Nginx...${NC}"
    sudo apt update
    sudo apt install -y nginx
    echo -e "${GREEN}✅ Nginx instalado${NC}"
else
    echo -e "${GREEN}✅ Nginx já está instalado${NC}"
fi
echo ""

# 3. Configurar Nginx
echo -e "${YELLOW}⚙️  Configurando Nginx...${NC}"
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

# 4. Ativar site
echo -e "${YELLOW}🔗 Ativando site...${NC}"
sudo ln -sf /etc/nginx/sites-available/${SITE_NAME} /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
echo -e "${GREEN}✅ Site ativado${NC}"
echo ""

# 5. Testar e reiniciar Nginx
echo -e "${YELLOW}🧪 Testando configuração do Nginx...${NC}"
if sudo nginx -t; then
    echo -e "${GREEN}✅ Configuração OK${NC}"
    sudo systemctl restart nginx
    sudo systemctl enable nginx
    echo -e "${GREEN}✅ Nginx reiniciado e habilitado${NC}"
else
    echo -e "${RED}❌ Erro na configuração do Nginx${NC}"
    echo "Verifique: sudo nginx -t"
    exit 1
fi
echo ""

# 6. Verificar status
echo -e "${YELLOW}📊 Status do Nginx:${NC}"
sudo systemctl status nginx --no-pager | head -5
echo ""

# 7. Verificar permissões
echo -e "${YELLOW}🔐 Verificando permissões...${NC}"
ls -la ${VPS_PATH} 2>/dev/null || echo "Diretório vazio (aguardando deploy)"
echo ""

echo -e "${GREEN}🎉 Configuração do servidor concluída!${NC}"
echo ""
echo -e "${YELLOW}📋 Próximos passos:${NC}"
echo "  1. Execute o deploy da sua máquina: ./deploy.sh"
echo "  2. Acesse: http://${VPS_IP}"
echo ""
echo -e "${YELLOW}💡 Comandos úteis:${NC}"
echo "  - Ver logs: sudo tail -f /var/log/nginx/${SITE_NAME}-error.log"
echo "  - Reiniciar nginx: sudo systemctl restart nginx"
echo "  - Status nginx: sudo systemctl status nginx"

