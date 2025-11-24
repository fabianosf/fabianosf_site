#!/bin/bash

# Script para debugar erro 500
# Execute no servidor

VPS_PATH="/var/www/fabianosf_site"
SITE_NAME="fabianosf_site"

echo "🔍 DEBUGANDO ERRO 500"
echo "===================="
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 1. Ver últimos erros do Nginx
echo -e "${YELLOW}1. Últimos erros do Nginx:${NC}"
echo "----------------------------------------"
sudo tail -30 /var/log/nginx/error.log
echo ""

# 2. Ver erros específicos do site
echo -e "${YELLOW}2. Erros específicos do site:${NC}"
echo "----------------------------------------"
if [ -f "/var/log/nginx/${SITE_NAME}-error.log" ]; then
    sudo tail -30 /var/log/nginx/${SITE_NAME}-error.log
else
    echo "Arquivo de log não encontrado"
fi
echo ""

# 3. Verificar se index.html existe e tem conteúdo
echo -e "${YELLOW}3. Verificando index.html:${NC}"
echo "----------------------------------------"
if [ -f "${VPS_PATH}/index.html" ]; then
    echo -e "${GREEN}✅ Arquivo existe${NC}"
    echo "Tamanho: $(du -h ${VPS_PATH}/index.html | cut -f1)"
    echo "Primeiras 10 linhas:"
    head -10 ${VPS_PATH}/index.html
    echo ""
    echo "Últimas 5 linhas:"
    tail -5 ${VPS_PATH}/index.html
else
    echo -e "${RED}❌ Arquivo NÃO existe!${NC}"
fi
echo ""

# 4. Verificar permissões detalhadas
echo -e "${YELLOW}4. Permissões detalhadas:${NC}"
echo "----------------------------------------"
ls -la ${VPS_PATH}/ | head -15
echo ""

# 5. Testar se www-data pode ler
echo -e "${YELLOW}5. Testando acesso do www-data:${NC}"
echo "----------------------------------------"
if sudo -u www-data test -r ${VPS_PATH}/index.html; then
    echo -e "${GREEN}✅ www-data pode ler index.html${NC}"
else
    echo -e "${RED}❌ www-data NÃO pode ler index.html${NC}"
    echo "Ajustando permissões..."
    sudo chown -R www-data:www-data ${VPS_PATH}
    sudo chmod -R 755 ${VPS_PATH}
    sudo find ${VPS_PATH} -type f -exec chmod 644 {} \;
    echo -e "${GREEN}✅ Permissões ajustadas${NC}"
fi
echo ""

# 6. Verificar configuração do Nginx
echo -e "${YELLOW}6. Configuração atual do Nginx:${NC}"
echo "----------------------------------------"
sudo cat /etc/nginx/sites-available/${SITE_NAME}
echo ""

# 7. Verificar se há erros de sintaxe
echo -e "${YELLOW}7. Testando sintaxe do Nginx:${NC}"
echo "----------------------------------------"
sudo nginx -t
echo ""

# 8. Verificar se diretório tem arquivos
echo -e "${YELLOW}8. Arquivos no diretório:${NC}"
echo "----------------------------------------"
ls -lah ${VPS_PATH}/ | head -20
echo ""

# 9. Verificar se assets existe
echo -e "${YELLOW}9. Verificando diretório assets:${NC}"
echo "----------------------------------------"
if [ -d "${VPS_PATH}/assets" ]; then
    echo -e "${GREEN}✅ Diretório assets existe${NC}"
    echo "Arquivos:"
    ls -lh ${VPS_PATH}/assets/ | head -10
else
    echo -e "${RED}❌ Diretório assets NÃO existe${NC}"
    echo -e "${YELLOW}💡 Isso pode ser o problema! Execute o deploy.${NC}"
fi
echo ""

echo -e "${YELLOW}====================================${NC}"
echo -e "${YELLOW}📋 PRÓXIMOS PASSOS:${NC}"
echo -e "${YELLOW}====================================${NC}"
echo ""
echo "1. Verifique os erros acima"
echo "2. Se assets não existe, execute: ./deploy.sh (da sua máquina)"
echo "3. Se permissões estiverem erradas, execute:"
echo "   sudo chown -R www-data:www-data ${VPS_PATH}"
echo "   sudo chmod -R 755 ${VPS_PATH}"
echo ""

