#!/bin/bash

# Script para liberar portas 80 e 443
# Execute no servidor

echo "🔓 LIBERANDO PORTAS 80 E 443"
echo "============================="
echo ""

# 1. Parar Traefik
echo "1. Parando Traefik:"
sudo docker stop traefik.1.rmprfa72tx7ba8zu9yn8n1a6f 2>/dev/null
sudo docker ps | grep traefik | awk '{print $1}' | xargs -r sudo docker stop 2>/dev/null
sleep 3
echo "✅ Traefik parado"
echo ""

# 2. Verificar processos usando porta 80
echo "2. Processos usando porta 80:"
PORTA_80=$(sudo lsof -ti:80 2>/dev/null)
if [ -n "$PORTA_80" ]; then
    echo "Processo encontrado: $PORTA_80"
    sudo ps aux | grep $PORTA_80 | grep -v grep
    echo "Matando processo..."
    sudo kill -9 $PORTA_80 2>/dev/null
    sleep 1
    echo "✅ Processo morto"
else
    echo "✅ Porta 80 livre"
fi
echo ""

# 3. Verificar processos usando porta 443
echo "3. Processos usando porta 443:"
PORTA_443=$(sudo lsof -ti:443 2>/dev/null)
if [ -n "$PORTA_443" ]; then
    echo "Processo encontrado: $PORTA_443"
    sudo ps aux | grep $PORTA_443 | grep -v grep
    echo "Matando processo..."
    sudo kill -9 $PORTA_443 2>/dev/null
    sleep 1
    echo "✅ Processo morto"
else
    echo "✅ Porta 443 livre"
fi
echo ""

# 4. Verificar portas novamente
echo "4. Verificando portas:"
sudo netstat -tulpn | grep -E ":80|:443" || echo "✅ Portas 80 e 443 livres!"
echo ""

# 5. Verificar containers Docker
echo "5. Containers Docker rodando:"
sudo docker ps | head -5
echo ""

# 6. Tentar iniciar Nginx
echo "6. Iniciando Nginx:"
sudo systemctl start nginx
sleep 3
if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx iniciado com sucesso!"
    sudo systemctl status nginx | head -7
else
    echo "❌ Ainda com erro"
    echo "Último erro:"
    sudo journalctl -xeu nginx.service --no-pager | tail -5
fi
echo ""

echo "======================================"
echo "✅ Processo concluído!"
echo "======================================"

