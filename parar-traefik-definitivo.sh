#!/bin/bash

# Script para parar Traefik definitivamente
# Execute no servidor

echo "🛑 PARANDO TRAEFIK DEFINITIVAMENTE"
echo "==================================="
echo ""

# 1. Ver se Traefik está rodando
echo "1. Verificando Traefik:"
sudo docker ps | grep traefik
echo ""

# 2. Parar Traefik
echo "2. Parando Traefik:"
sudo docker stop traefik.1.rmprfa72tx7ba8zu9yn8n1a6f 2>/dev/null
sleep 2
echo "✅ Traefik parado"
echo ""

# 3. Verificar se parou
echo "3. Verificando se parou:"
if sudo docker ps | grep -q traefik; then
    echo "⚠️  Traefik ainda está rodando!"
    echo "Tentando parar todos os containers Traefik:"
    sudo docker ps | grep traefik | awk '{print $1}' | xargs -r sudo docker stop
else
    echo "✅ Traefik parado"
fi
echo ""

# 4. Verificar portas
echo "4. Verificando portas 80 e 443:"
sudo netstat -tulpn | grep -E ":80|:443"
echo ""

# 5. Se ainda estiver em uso, matar processo
echo "5. Verificando processos usando portas 80/443:"
PORTA_80=$(sudo lsof -ti:80 2>/dev/null)
PORTA_443=$(sudo lsof -ti:443 2>/dev/null)

if [ -n "$PORTA_80" ]; then
    echo "⚠️  Processo usando porta 80: $PORTA_80"
    echo "Para matar: sudo kill -9 $PORTA_80"
    read -p "Matar processo? (s/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        sudo kill -9 $PORTA_80
        echo "✅ Processo morto"
    fi
fi

if [ -n "$PORTA_443" ]; then
    echo "⚠️  Processo usando porta 443: $PORTA_443"
    echo "Para matar: sudo kill -9 $PORTA_443"
    read -p "Matar processo? (s/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        sudo kill -9 $PORTA_443
        echo "✅ Processo morto"
    fi
fi
echo ""

# 6. Verificar portas novamente
echo "6. Verificando portas novamente:"
sudo netstat -tulpn | grep -E ":80|:443" || echo "✅ Portas 80 e 443 livres!"
echo ""

# 7. Tentar iniciar Nginx
echo "7. Tentando iniciar Nginx:"
sudo systemctl start nginx
sleep 2
if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx iniciado com sucesso!"
    sudo systemctl status nginx | head -5
else
    echo "❌ Ainda com erro"
    sudo systemctl status nginx | head -10
fi
echo ""

echo "======================================"
echo "✅ Processo concluído!"
echo "======================================"

