#!/bin/bash

# Script de Deploy para VPS
# Configure apenas as 3 variáveis abaixo

VPS_USER="fabianosf"           # Exemplo: root ou ubuntu
VPS_HOST="92.113.33.16"        # Exemplo: 192.168.1.100 ou meusite.com
VPS_PATH="/var/www/fabianosf_site"     # Caminho no VPS

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Muda para o diretório do script (onde está o package.json)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR" || exit 1

echo -e "${GREEN}🚀 Iniciando deploy...${NC}"
echo -e "${YELLOW}📁 Diretório: $SCRIPT_DIR${NC}"

# Verifica configuração
if [ "$VPS_USER" == "seu-usuario" ] || [ "$VPS_HOST" == "seu-ip-ou-dominio" ]; then
    echo -e "${RED}❌ Configure VPS_USER, VPS_HOST e VPS_PATH no início do script!${NC}"
    exit 1
fi

# Verifica se está no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: package.json não encontrado!${NC}"
    echo -e "${YELLOW}Certifique-se de que o script está no diretório do projeto.${NC}"
    exit 1
fi

# Build
echo -e "${YELLOW}📦 Fazendo build...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro no build!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build concluído!${NC}"

# Remove espaços em branco do VPS_HOST
VPS_HOST=$(echo "$VPS_HOST" | xargs)

# Verifica conexão SSH
echo -e "${YELLOW}🔌 Verificando conexão com o VPS...${NC}"
if ! ssh -o ConnectTimeout=5 -o BatchMode=yes ${VPS_USER}@${VPS_HOST} exit 2>/dev/null; then
    echo -e "${YELLOW}⚠️  Testando conexão SSH (pode pedir senha)...${NC}"
fi

# Cria diretório no VPS se não existir e ajusta permissões
echo -e "${YELLOW}📁 Verificando/criando diretório no VPS...${NC}"
echo -e "${YELLOW}💡 Pode pedir senha do usuário para criar diretório...${NC}"
ssh ${VPS_USER}@${VPS_HOST} "mkdir -p ${VPS_PATH} && chmod 755 ${VPS_PATH}"

# Ajusta permissões para o Nginx (pode pedir senha do sudo)
echo -e "${YELLOW}🔐 Ajustando permissões para o Nginx (pode pedir senha do sudo)...${NC}"
ssh -t ${VPS_USER}@${VPS_HOST} "sudo chown -R ${VPS_USER}:www-data ${VPS_PATH} && sudo chmod -R 755 ${VPS_PATH} && sudo find ${VPS_PATH} -type f -exec chmod 644 {} \;"

# Deploy com opções mais robustas
echo -e "${YELLOW}📤 Enviando para ${VPS_USER}@${VPS_HOST}:${VPS_PATH}...${NC}"
rsync -avz --delete --progress --no-perms --no-owner --no-group dist/ ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/

RSYNC_EXIT=$?

# Verifica se os arquivos principais foram transferidos mesmo com erro
if [ $RSYNC_EXIT -eq 23 ] || [ $RSYNC_EXIT -eq 24 ]; then
    echo -e "${YELLOW}⚠️  Alguns arquivos podem não ter sido transferidos (erro menor)${NC}"
    echo -e "${YELLOW}🔍 Verificando se os arquivos principais foram enviados...${NC}"
    
    # Verifica se index.html foi transferido
    if ssh ${VPS_USER}@${VPS_HOST} "test -f ${VPS_PATH}/index.html" 2>/dev/null; then
        echo -e "${GREEN}✅ Arquivos principais transferidos com sucesso!${NC}"
        echo -e "${YELLOW}💡 O erro pode ser apenas de permissões/atributos, mas o site deve funcionar.${NC}"
        echo -e "${YELLOW}🔐 Ajustando permissões finais (pode pedir senha do sudo)...${NC}"
        ssh -t ${VPS_USER}@${VPS_HOST} "sudo chown -R ${VPS_USER}:www-data ${VPS_PATH} && sudo chmod -R 755 ${VPS_PATH} && sudo find ${VPS_PATH} -type f -exec chmod 644 {} \;"
    else
        echo -e "${RED}❌ Arquivos principais não foram transferidos!${NC}"
        echo -e "${YELLOW}Possíveis causas:${NC}"
        echo -e "  1. Diretório ${VPS_PATH} sem permissão de escrita"
        echo -e "  2. Problemas de permissão no VPS"
        echo -e ""
        echo -e "${YELLOW}💡 Execute no VPS:${NC}"
        echo -e "  ssh ${VPS_USER}@${VPS_HOST}"
        echo -e "  mkdir -p ${VPS_PATH}"
        echo -e "  chmod 755 ${VPS_PATH}"
        echo -e "  chown -R ${VPS_USER}:${VPS_USER} ${VPS_PATH}"
        exit 1
    fi
elif [ $RSYNC_EXIT -eq 0 ]; then
    echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"
    echo -e "${YELLOW}🔐 Ajustando permissões finais (pode pedir senha do sudo)...${NC}"
    ssh -t ${VPS_USER}@${VPS_HOST} "sudo chown -R ${VPS_USER}:www-data ${VPS_PATH} && sudo chmod -R 755 ${VPS_PATH} && sudo find ${VPS_PATH} -type f -exec chmod 644 {} \;"
else
    echo -e "${RED}❌ Erro no deploy (código: $RSYNC_EXIT)!${NC}"
    echo -e "${YELLOW}Possíveis causas:${NC}"
    echo -e "  1. Diretório ${VPS_PATH} não existe ou sem permissão"
    echo -e "  2. Problemas de permissão no VPS"
    echo -e "  3. Espaço em disco insuficiente"
    echo -e "  4. Problemas de conexão"
    echo -e ""
    echo -e "${YELLOW}💡 Execute no VPS:${NC}"
    echo -e "  ssh ${VPS_USER}@${VPS_HOST}"
    echo -e "  mkdir -p ${VPS_PATH}"
    echo -e "  chmod 755 ${VPS_PATH}"
    echo -e "  chown -R ${VPS_USER}:${VPS_USER} ${VPS_PATH}"
    exit 1
fi

