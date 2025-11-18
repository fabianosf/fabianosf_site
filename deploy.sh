#!/bin/bash

# Script de Deploy para VPS
# Configure as variáveis abaixo com suas informações

# ============================================
# CONFIGURAÇÕES - EDITE AQUI
# ============================================
VPS_USER="seu-usuario"           # Seu usuário no VPS
VPS_HOST="seu-ip-ou-dominio"     # IP ou domínio do VPS
VPS_PATH="/var/www/seu-site"     # Caminho no VPS onde o site será hospedado
# ============================================

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Iniciando deploy...${NC}"

# Verifica se o build existe
if [ ! -d "dist" ]; then
    echo -e "${YELLOW}📦 Fazendo build do projeto...${NC}"
    npm run build
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erro ao fazer build!${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}📦 Reconstruindo projeto...${NC}"
    npm run build
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erro ao fazer build!${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ Build concluído!${NC}"

# Verifica se as variáveis foram configuradas
if [ "$VPS_USER" == "seu-usuario" ] || [ "$VPS_HOST" == "seu-ip-ou-dominio" ]; then
    echo -e "${RED}❌ Por favor, configure as variáveis no início do script!${NC}"
    echo -e "${YELLOW}Edite o arquivo deploy.sh e configure:${NC}"
    echo -e "  - VPS_USER"
    echo -e "  - VPS_HOST"
    echo -e "  - VPS_PATH"
    exit 1
fi

echo -e "${YELLOW}📤 Enviando arquivos para o VPS...${NC}"
echo -e "${YELLOW}Destino: ${VPS_USER}@${VPS_HOST}:${VPS_PATH}${NC}"

# Usa rsync para transferir os arquivos
rsync -avz --delete --progress dist/ ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Arquivos enviados com sucesso!${NC}"
    echo -e "${GREEN}🎉 Deploy concluído!${NC}"
    echo -e "${YELLOW}💡 Não esqueça de reiniciar o Nginx no VPS se necessário:${NC}"
    echo -e "   ssh ${VPS_USER}@${VPS_HOST}"
    echo -e "   sudo systemctl restart nginx"
else
    echo -e "${RED}❌ Erro ao enviar arquivos!${NC}"
    echo -e "${YELLOW}Verifique:${NC}"
    echo -e "  - Se você tem acesso SSH ao VPS"
    echo -e "  - Se o diretório ${VPS_PATH} existe no VPS"
    echo -e "  - Se você tem permissões para escrever no diretório"
    exit 1
fi

