#!/bin/bash

# Script para resolver conflito com Traefik
# Execute no servidor

echo "🔧 RESOLVENDO CONFLITO COM TRAEFIK"
echo "==================================="
echo ""

# 1. Ver configuração do Traefik
echo "1. Verificando Traefik:"
echo "----------------------------------------"
sudo docker ps | grep traefik
echo ""

# 2. Ver configurações do Traefik
echo "2. Procurando configurações do Traefik:"
echo "----------------------------------------"
if [ -d "/etc/traefik" ]; then
    echo "Diretório /etc/traefik encontrado"
    sudo ls -la /etc/traefik/
elif [ -d "/opt/traefik" ]; then
    echo "Diretório /opt/traefik encontrado"
    sudo ls -la /opt/traefik/
else
    echo "Procurando arquivos de configuração do Traefik..."
    sudo find / -name "traefik.yml" -o -name "traefik.yaml" 2>/dev/null | head -5
fi
echo ""

# 3. Opções
echo "======================================"
echo "📋 OPÇÕES:"
echo "======================================"
echo ""
echo "Opção 1: Parar Traefik e usar apenas Nginx"
echo "  sudo docker stop traefik.1.rmprfa72tx7ba8zu9yn8n1a6f"
echo "  sudo systemctl start nginx"
echo ""
echo "Opção 2: Configurar Traefik para servir fabianosf.com"
echo "  (Requer configuração do Traefik)"
echo ""
echo "Opção 3: Mudar Traefik para outra porta e usar Nginx na 80"
echo "  (Mais complexo)"
echo ""
echo "======================================"
echo ""

# 4. Verificar se há labels do Docker para Traefik
echo "4. Verificando containers com labels do Traefik:"
sudo docker ps --format "{{.Names}}" | while read container; do
    echo "Container: $container"
    sudo docker inspect $container --format '{{range .Config.Labels}}{{.}}{{"\n"}}{{end}}' | grep -i traefik | head -3
done
echo ""

echo "======================================"
echo "💡 RECOMENDAÇÃO:"
echo "======================================"
echo ""
echo "Como o Traefik já está gerenciando os sites, você tem 2 opções:"
echo ""
echo "1. PARAR TRAEFIK (mais simples):"
echo "   sudo docker stop traefik.1.rmprfa72tx7ba8zu9yn8n1a6f"
echo "   sudo systemctl start nginx"
echo ""
echo "2. USAR TRAEFIK (recomendado se outros sites dependem dele):"
echo "   Configure o Traefik para servir fabianosf.com"
echo ""
echo "Qual você prefere?"

