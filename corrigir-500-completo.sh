#!/bin/bash

# Script para corrigir erro 500 completamente
# Execute no servidor: ssh fabianosf@92.113.33.16

VPS_PATH="/var/www/fabianosf_site"
SITE_NAME="fabianosf_site"
DOMAIN="fabianosf.com"
VPS_IP="92.113.33.16"

echo "🔧 CORREÇÃO COMPLETA DO ERRO 500"
echo "================================"
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 1. Ver erros recentes
echo -e "${YELLOW}📋 Últimos erros do Nginx:${NC}"
sudo tail -10 /var/log/nginx/error.log
echo ""

# 2. Garantir que diretório existe
echo -e "${YELLOW}📁 Criando/verificando diretório...${NC}"
sudo mkdir -p ${VPS_PATH}
sudo mkdir -p ${VPS_PATH}/assets
echo -e "${GREEN}✅ Diretório OK${NC}"
echo ""

# 3. Ajustar TODAS as permissões
echo -e "${YELLOW}🔐 Ajustando permissões...${NC}"
sudo chown -R www-data:www-data ${VPS_PATH}
sudo chmod -R 755 ${VPS_PATH}
sudo find ${VPS_PATH} -type f -exec chmod 644 {} \;
echo -e "${GREEN}✅ Permissões ajustadas${NC}"
echo ""

# 4. Recriar configuração do Nginx do zero
echo -e "${YELLOW}⚙️  Recriando configuração do Nginx...${NC}"
sudo tee /etc/nginx/sites-available/${SITE_NAME} > /dev/null <<'EOF'
server {
    listen 80;
    server_name fabianosf.com www.fabianosf.com 92.113.33.16 _;
    
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

echo -e "${GREEN}✅ Configuração recriada${NC}"
echo ""

# 5. Ativar site
echo -e "${YELLOW}🔗 Ativando site...${NC}"
sudo ln -sf /etc/nginx/sites-available/${SITE_NAME} /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
echo -e "${GREEN}✅ Site ativado${NC}"
echo ""

# 6. Testar configuração
echo -e "${YELLOW}🧪 Testando configuração...${NC}"
if sudo nginx -t 2>&1; then
    echo -e "${GREEN}✅ Configuração OK${NC}"
else
    echo -e "${RED}❌ Erro na configuração${NC}"
    exit 1
fi
echo ""

# 7. Reiniciar Nginx
echo -e "${YELLOW}🔄 Reiniciando Nginx...${NC}"
sudo systemctl restart nginx
sleep 2
if sudo systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✅ Nginx reiniciado e rodando${NC}"
else
    echo -e "${RED}❌ Erro ao reiniciar Nginx${NC}"
    sudo systemctl status nginx
    exit 1
fi
echo ""

# 8. Verificar arquivos
echo -e "${YELLOW}📄 Verificando arquivos:${NC}"
if [ -f "${VPS_PATH}/index.html" ]; then
    echo -e "${GREEN}✅ index.html existe${NC}"
    echo "Tamanho: $(du -h ${VPS_PATH}/index.html | cut -f1)"
else
    echo -e "${RED}❌ index.html NÃO existe!${NC}"
    echo -e "${YELLOW}💡 Execute o deploy da sua máquina: ./deploy.sh${NC}"
fi

if [ -d "${VPS_PATH}/assets" ]; then
    ASSET_COUNT=$(find ${VPS_PATH}/assets -type f 2>/dev/null | wc -l)
    echo -e "${GREEN}✅ Diretório assets existe (${ASSET_COUNT} arquivos)${NC}"
else
    echo -e "${RED}❌ Diretório assets NÃO existe!${NC}"
    echo -e "${YELLOW}💡 Execute o deploy da sua máquina: ./deploy.sh${NC}"
fi
echo ""

# 9. Testar acesso do www-data
echo -e "${YELLOW}🔍 Testando acesso do www-data:${NC}"
if sudo -u www-data test -r ${VPS_PATH}/index.html 2>/dev/null; then
    echo -e "${GREEN}✅ www-data pode ler os arquivos${NC}"
else
    echo -e "${RED}❌ www-data NÃO pode ler os arquivos${NC}"
    echo "Ajustando novamente..."
    sudo chown -R www-data:www-data ${VPS_PATH}
    sudo chmod -R 755 ${VPS_PATH}
fi
echo ""

# 10. Limpar cache do Nginx
echo -e "${YELLOW}🧹 Limpando cache...${NC}"
sudo rm -rf /var/cache/nginx/*
echo -e "${GREEN}✅ Cache limpo${NC}"
echo ""

echo -e "${GREEN}====================================${NC}"
echo -e "${GREEN}🎉 CORREÇÃO CONCLUÍDA${NC}"
echo -e "${GREEN}====================================${NC}"
echo ""
echo -e "${YELLOW}📋 Verifique:${NC}"
echo "  - http://${DOMAIN}"
echo "  - http://www.${DOMAIN}"
echo "  - http://${VPS_IP}"
echo ""

if [ ! -f "${VPS_PATH}/index.html" ]; then
    echo -e "${RED}⚠️  ATENÇÃO: Arquivos não encontrados!${NC}"
    echo -e "${YELLOW}Execute o deploy da sua máquina:${NC}"
    echo "  cd /home/fabianosf/Downloads/fabianosf_site"
    echo "  ./deploy.sh"
    echo ""
fi

# 11. Mostrar últimos erros novamente
echo -e "${YELLOW}📋 Últimos erros (se houver):${NC}"
sudo tail -5 /var/log/nginx/error.log 2>/dev/null || echo "Nenhum erro recente"
echo ""

