#!/bin/bash

# Script para configurar o site correto
# Execute no servidor

echo "🔧 CONFIGURANDO SITE CORRETO"
echo "============================"
echo ""

# 1. Verificar o que está servindo na porta 80
echo "1. Verificando o que está na porta 80:"
echo "----------------------------------------"
sudo netstat -tulpn | grep :80
echo ""

# 2. Ver containers Docker
echo "2. Containers Docker:"
sudo docker ps | grep -E "traefik|asbjj"
echo ""

# 3. Opções
echo "======================================"
echo "📋 SITUAÇÃO:"
echo "======================================"
echo ""
echo "O Traefik está servindo o site ASBJJ na porta 80."
echo ""
echo "OPÇÕES:"
echo ""
echo "Opção 1: Parar Traefik e usar apenas Nginx"
echo "  (ASBJJ vai parar de funcionar)"
echo ""
echo "Opção 2: Configurar Traefik para servir fabianosf.com"
echo "  (Ambos os sites funcionam)"
echo ""
echo "Opção 3: Usar Nginx na porta 8080 e redirecionar"
echo "  (Mais complexo)"
echo ""
echo "======================================"
echo ""

# 4. Verificar configuração do Traefik
echo "4. Procurando configuração do Traefik:"
if [ -d "/etc/traefik" ]; then
    echo "Diretório encontrado: /etc/traefik"
    sudo ls -la /etc/traefik/
elif docker inspect traefik.1.rmprfa72tx7ba8zu9yn8n1a6f 2>/dev/null | grep -q "traefik.yml"; then
    echo "Configuração dentro do container"
else
    echo "Procurando arquivos de configuração..."
    sudo find / -name "*traefik*" -type f 2>/dev/null | grep -E "\.yml|\.yaml|\.toml" | head -5
fi
echo ""

echo "======================================"
echo "💡 RECOMENDAÇÃO:"
echo "======================================"
echo ""
echo "Se você precisa que o ASBJJ continue funcionando:"
echo "  Configure o Traefik para servir fabianosf.com"
echo ""
echo "Se não precisa do ASBJJ agora:"
echo "  sudo docker stop traefik.1.rmprfa72tx7ba8zu9yn8n1a6f"
echo "  sudo systemctl start nginx"
echo ""
echo "Qual você prefere?"

