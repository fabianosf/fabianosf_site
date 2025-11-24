#!/bin/bash

# Deploy Manual - Pede senha interativamente
# Execute: ./deploy-manual.sh

VPS_USER="fabianosf"
VPS_HOST="92.113.33.16"
VPS_PATH="/var/www/fabianosf_site"

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🚀 Deploy Manual${NC}"
echo ""

# Verificar se dist existe
if [ ! -d "dist" ]; then
    echo -e "${YELLOW}📦 Fazendo build...${NC}"
    npm run build
fi

if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Erro: diretório dist não encontrado!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build pronto${NC}"
echo ""
echo -e "${YELLOW}📤 Enviando arquivos para o servidor...${NC}"
echo -e "${YELLOW}💡 Você precisará digitar a senha${NC}"
echo ""

# Enviar arquivos
rsync -avz --progress dist/ ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Arquivos enviados!${NC}"
    echo ""
    echo -e "${YELLOW}🔐 Ajustando permissões no servidor...${NC}"
    echo -e "${YELLOW}💡 Você precisará digitar a senha novamente${NC}"
    echo ""
    
    ssh -t ${VPS_USER}@${VPS_HOST} "sudo chown -R www-data:www-data ${VPS_PATH} && sudo chmod -R 755 ${VPS_PATH} && sudo find ${VPS_PATH} -type f -exec chmod 644 {} \;"
    
    echo ""
    echo -e "${GREEN}🎉 Deploy concluído!${NC}"
    echo -e "${GREEN}🌐 Acesse: http://${VPS_HOST} ou http://fabianosf.com${NC}"
else
    echo -e "${RED}❌ Erro ao enviar arquivos${NC}"
    exit 1
fi

