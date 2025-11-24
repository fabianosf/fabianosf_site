#!/bin/bash

# Script para verificar o index.html e logs
# Execute no servidor

VPS_PATH="/var/www/fabianosf_site"

echo "🔍 VERIFICANDO INDEX.HTML E LOGS"
echo "================================"
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 1. Ver conteúdo completo do index.html
echo -e "${YELLOW}1. Conteúdo do index.html:${NC}"
echo "----------------------------------------"
cat ${VPS_PATH}/index.html
echo ""
echo ""

# 2. Verificar se tem as tags corretas
echo -e "${YELLOW}2. Verificando estrutura:${NC}"
echo "----------------------------------------"
if grep -q "<!DOCTYPE html>" ${VPS_PATH}/index.html; then
    echo -e "${GREEN}✅ Tem DOCTYPE${NC}"
else
    echo -e "${RED}❌ Sem DOCTYPE${NC}"
fi

if grep -q "<html" ${VPS_PATH}/index.html; then
    echo -e "${GREEN}✅ Tem tag HTML${NC}"
else
    echo -e "${RED}❌ Sem tag HTML${NC}"
fi

if grep -q "<script" ${VPS_PATH}/index.html; then
    echo -e "${GREEN}✅ Tem scripts${NC}"
else
    echo -e "${RED}❌ Sem scripts${NC}"
fi
echo ""

# 3. Verificar assets
echo -e "${YELLOW}3. Arquivos em assets:${NC}"
echo "----------------------------------------"
ls -lah ${VPS_PATH}/assets/ | head -10
echo ""

# 4. Ver últimos erros do Nginx
echo -e "${YELLOW}4. Últimos erros do Nginx:${NC}"
echo "----------------------------------------"
sudo tail -30 /var/log/nginx/error.log
echo ""

# 5. Ver erros específicos do site
echo -e "${YELLOW}5. Erros do site:${NC}"
echo "----------------------------------------"
if [ -f "/var/log/nginx/fabianosf_site-error.log" ]; then
    sudo tail -30 /var/log/nginx/fabianosf_site-error.log
else
    echo "Arquivo de log não encontrado"
fi
echo ""

# 6. Testar acesso do www-data
echo -e "${YELLOW}6. Testando acesso do www-data:${NC}"
echo "----------------------------------------"
if sudo -u www-data cat ${VPS_PATH}/index.html > /dev/null 2>&1; then
    echo -e "${GREEN}✅ www-data pode ler index.html${NC}"
else
    echo -e "${RED}❌ www-data NÃO pode ler index.html${NC}"
    echo "Ajustando permissões..."
    sudo chown -R www-data:www-data ${VPS_PATH}
    sudo chmod -R 755 ${VPS_PATH}
    sudo find ${VPS_PATH} -type f -exec chmod 644 {} \;
fi
echo ""

# 7. Verificar configuração do Nginx
echo -e "${YELLOW}7. Configuração do Nginx (root):${NC}"
echo "----------------------------------------"
sudo grep "root" /etc/nginx/sites-available/fabianosf_site
echo ""

echo -e "${YELLOW}====================================${NC}"
echo -e "${YELLOW}Envie a saída completa deste script${NC}"
echo -e "${YELLOW}====================================${NC}"

