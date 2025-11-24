#!/bin/bash

# Script para verificar se os arquivos foram enviados
# Execute no servidor

VPS_PATH="/var/www/fabianosf_site"

echo "🔍 Verificando arquivos no servidor..."
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Verificar se index.html existe
if [ -f "${VPS_PATH}/index.html" ]; then
    echo -e "${GREEN}✅ index.html encontrado${NC}"
    echo "Tamanho: $(du -h ${VPS_PATH}/index.html | cut -f1)"
    echo "Primeiras linhas:"
    head -5 ${VPS_PATH}/index.html
    echo ""
else
    echo -e "${RED}❌ index.html NÃO encontrado!${NC}"
    echo -e "${YELLOW}💡 Execute o deploy da sua máquina: ./deploy.sh${NC}"
    exit 1
fi

# Listar arquivos
echo -e "${YELLOW}📁 Arquivos no diretório:${NC}"
ls -lah ${VPS_PATH}/ | head -20
echo ""

# Verificar arquivos principais
echo -e "${YELLOW}🔍 Verificando arquivos principais:${NC}"
[ -f "${VPS_PATH}/index.html" ] && echo -e "${GREEN}✅ index.html${NC}" || echo -e "${RED}❌ index.html${NC}"
[ -d "${VPS_PATH}/assets" ] && echo -e "${GREEN}✅ assets/ (diretório existe)${NC}" || echo -e "${RED}❌ assets/ (não encontrado)${NC}"

if [ -d "${VPS_PATH}/assets" ]; then
    echo "Arquivos em assets:"
    ls -lh ${VPS_PATH}/assets/ | head -10
fi

echo ""
echo -e "${YELLOW}💡 Se os arquivos não existem, execute o deploy:${NC}"
echo "   cd /home/fabianosf/Downloads/fabianosf_site"
echo "   ./deploy.sh"

