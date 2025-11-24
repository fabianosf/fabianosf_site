#!/bin/bash

# Script de Diagnóstico e Correção Completa
# Execute no servidor: ssh fabianosf@92.113.33.16

VPS_PATH="/var/www/fabianosf_site"
SITE_NAME="fabianosf_site"
VPS_IP="92.113.33.16"

echo "🔍 DIAGNÓSTICO COMPLETO DO SERVIDOR"
echo "===================================="
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 1. Verificar se diretório existe
echo -e "${YELLOW}1. Verificando diretório...${NC}"
if [ -d "${VPS_PATH}" ]; then
    echo -e "${GREEN}✅ Diretório existe${NC}"
    ls -la ${VPS_PATH} | head -10
else
    echo -e "${RED}❌ Diretório não existe${NC}"
    echo -e "${YELLOW}Criando diretório...${NC}"
    sudo mkdir -p ${VPS_PATH}
    sudo chown -R fabianosf:www-data ${VPS_PATH}
    sudo chmod -R 755 ${VPS_PATH}
    echo -e "${GREEN}✅ Diretório criado${NC}"
fi
echo ""

# 2. Verificar se index.html existe
echo -e "${YELLOW}2. Verificando arquivos...${NC}"
if [ -f "${VPS_PATH}/index.html" ]; then
    echo -e "${GREEN}✅ index.html encontrado${NC}"
    echo "Primeiras linhas do index.html:"
    head -3 ${VPS_PATH}/index.html
else
    echo -e "${RED}❌ index.html NÃO encontrado!${NC}"
    echo -e "${YELLOW}💡 Execute o deploy da sua máquina: ./deploy.sh${NC}"
fi
echo ""

# 3. Verificar permissões
echo -e "${YELLOW}3. Verificando permissões...${NC}"
PERM_OWNER=$(stat -c '%U:%G' ${VPS_PATH} 2>/dev/null)
PERM_DIR=$(stat -c '%a' ${VPS_PATH} 2>/dev/null)
echo "Dono: $PERM_OWNER"
echo "Permissões: $PERM_DIR"

if [ "$PERM_OWNER" != "fabianosf:www-data" ] && [ "$PERM_OWNER" != "www-data:www-data" ]; then
    echo -e "${YELLOW}Ajustando permissões...${NC}"
    sudo chown -R fabianosf:www-data ${VPS_PATH}
    sudo chmod -R 755 ${VPS_PATH}
    sudo find ${VPS_PATH} -type f -exec chmod 644 {} \;
    echo -e "${GREEN}✅ Permissões ajustadas${NC}"
else
    echo -e "${GREEN}✅ Permissões OK${NC}"
fi
echo ""

# 4. Verificar configuração do Nginx
echo -e "${YELLOW}4. Verificando configuração do Nginx...${NC}"
if [ -f "/etc/nginx/sites-available/${SITE_NAME}" ]; then
    echo -e "${GREEN}✅ Arquivo de configuração existe${NC}"
    echo "Caminho configurado no Nginx:"
    grep "root" /etc/nginx/sites-available/${SITE_NAME} | head -1
else
    echo -e "${RED}❌ Arquivo de configuração não existe${NC}"
fi
echo ""

# 5. Criar/Atualizar configuração do Nginx
echo -e "${YELLOW}5. Criando/Atualizando configuração do Nginx...${NC}"
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
echo -e "${GREEN}✅ Configuração criada/atualizada${NC}"
echo ""

# 6. Ativar site
echo -e "${YELLOW}6. Ativando site...${NC}"
sudo ln -sf /etc/nginx/sites-available/${SITE_NAME} /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
echo -e "${GREEN}✅ Site ativado${NC}"
echo ""

# 7. Testar configuração
echo -e "${YELLOW}7. Testando configuração do Nginx...${NC}"
if sudo nginx -t 2>&1; then
    echo -e "${GREEN}✅ Configuração OK${NC}"
else
    echo -e "${RED}❌ Erro na configuração${NC}"
    exit 1
fi
echo ""

# 8. Reiniciar Nginx
echo -e "${YELLOW}8. Reiniciando Nginx...${NC}"
sudo systemctl restart nginx
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Nginx reiniciado${NC}"
else
    echo -e "${RED}❌ Erro ao reiniciar Nginx${NC}"
    sudo systemctl status nginx
    exit 1
fi
echo ""

# 9. Verificar logs de erro recentes
echo -e "${YELLOW}9. Últimos erros do Nginx:${NC}"
sudo tail -5 /var/log/nginx/error.log 2>/dev/null || echo "Nenhum erro recente"
echo ""

# 10. Verificar se Nginx está rodando
echo -e "${YELLOW}10. Status do Nginx:${NC}"
sudo systemctl status nginx --no-pager | head -7
echo ""

# 11. Verificar se pode acessar arquivos
echo -e "${YELLOW}11. Testando acesso aos arquivos (como www-data):${NC}"
if sudo -u www-data test -r ${VPS_PATH}/index.html 2>/dev/null; then
    echo -e "${GREEN}✅ Nginx pode ler os arquivos${NC}"
else
    echo -e "${RED}❌ Nginx NÃO pode ler os arquivos!${NC}"
    echo -e "${YELLOW}Ajustando permissões...${NC}"
    sudo chown -R www-data:www-data ${VPS_PATH}
    sudo chmod -R 755 ${VPS_PATH}
    sudo find ${VPS_PATH} -type f -exec chmod 644 {} \;
    echo -e "${GREEN}✅ Permissões ajustadas para www-data${NC}"
fi
echo ""

echo -e "${GREEN}====================================${NC}"
echo -e "${GREEN}🎉 DIAGNÓSTICO CONCLUÍDO${NC}"
echo -e "${GREEN}====================================${NC}"
echo ""
echo -e "${YELLOW}📋 Resumo:${NC}"
echo "  - Diretório: ${VPS_PATH}"
echo "  - Configuração: /etc/nginx/sites-available/${SITE_NAME}"
echo "  - Status: $(sudo systemctl is-active nginx)"
echo ""
if [ -f "${VPS_PATH}/index.html" ]; then
    echo -e "${GREEN}✅ Tudo configurado! Acesse: http://${VPS_IP}${NC}"
else
    echo -e "${YELLOW}⚠️  Arquivos não encontrados!${NC}"
    echo -e "${YELLOW}Execute o deploy da sua máquina: ./deploy.sh${NC}"
fi
echo ""

