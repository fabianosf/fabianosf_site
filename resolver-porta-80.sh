#!/bin/bash

# Script para resolver conflito da porta 80
# Execute no servidor

echo "🔧 RESOLVENDO CONFLITO DA PORTA 80"
echo "=================================="
echo ""

# 1. Ver o que está usando a porta 80
echo "1. Processos usando porta 80:"
sudo netstat -tulpn | grep :80
echo ""

# 2. Ver containers Docker
echo "2. Containers Docker rodando:"
sudo docker ps | head -10
echo ""

# 3. Ver qual container está mapeando porta 80
echo "3. Containers com porta 80:"
sudo docker ps --format "table {{.Names}}\t{{.Ports}}" | grep 80
echo ""

# 4. Opções
echo "======================================"
echo "📋 OPÇÕES:"
echo "======================================"
echo ""
echo "Opção 1: Parar o container Docker que usa porta 80"
echo "  sudo docker ps | grep 80"
echo "  sudo docker stop <nome-do-container>"
echo ""
echo "Opção 2: Mudar o Nginx para outra porta (não recomendado)"
echo ""
echo "Opção 3: Configurar o Docker para não usar porta 80"
echo ""
echo "======================================"
echo ""

# 5. Tentar identificar qual container
echo "5. Tentando identificar container:"
CONTAINER_80=$(sudo docker ps --format "{{.Names}}" --filter "publish=80")
if [ -n "$CONTAINER_80" ]; then
    echo "Container usando porta 80: $CONTAINER_80"
    echo ""
    echo "Para parar:"
    echo "  sudo docker stop $CONTAINER_80"
    echo ""
    echo "⚠️  ATENÇÃO: Isso vai parar o container!"
    echo "   Se for o site ASBJJ, você pode querer manter ele"
    echo "   e usar outra solução"
else
    echo "Não encontrado via filtro, verifique manualmente:"
    echo "  sudo docker ps"
fi
echo ""

echo "======================================"
echo "💡 RECOMENDAÇÃO:"
echo "======================================"
echo ""
echo "Se o container na porta 80 for o site ASBJJ, você tem 2 opções:"
echo ""
echo "1. Usar o Nginx como proxy reverso para ambos os sites"
echo "2. Parar o container e usar apenas Nginx"
echo ""
echo "Qual você prefere?"

