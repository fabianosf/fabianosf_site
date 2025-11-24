#!/bin/bash

# Script para parar Traefik e iniciar Nginx
# Execute no servidor

echo "🛑 PARANDO TRAEFIK E INICIANDO NGINX"
echo "===================================="
echo ""

# 1. Parar Traefik
echo "1. Parando Traefik:"
sudo docker stop traefik.1.rmprfa72tx7ba8zu9yn8n1a6f 2>/dev/null
sleep 3

# Parar todos os containers Traefik
sudo docker ps | grep traefik | awk '{print $1}' | xargs -r sudo docker stop 2>/dev/null
sleep 2

if sudo docker ps | grep -q traefik; then
    echo "⚠️  Traefik ainda está rodando"
    sudo docker ps | grep traefik
else
    echo "✅ Traefik parado"
fi
echo ""

# 2. Matar processos usando portas 80 e 443
echo "2. Liberando portas 80 e 443:"
PORTA_80=$(sudo lsof -ti:80 2>/dev/null)
PORTA_443=$(sudo lsof -ti:443 2>/dev/null)

if [ -n "$PORTA_80" ]; then
    echo "Matando processo na porta 80: $PORTA_80"
    sudo kill -9 $PORTA_80 2>/dev/null
    sleep 1
fi

if [ -n "$PORTA_443" ]; then
    echo "Matando processo na porta 443: $PORTA_443"
    sudo kill -9 $PORTA_443 2>/dev/null
    sleep 1
fi

# Verificar se estão livres
if sudo netstat -tulpn | grep -q ":80"; then
    echo "⚠️  Porta 80 ainda em uso:"
    sudo netstat -tulpn | grep :80
else
    echo "✅ Porta 80 livre"
fi

if sudo netstat -tulpn | grep -q ":443"; then
    echo "⚠️  Porta 443 ainda em uso:"
    sudo netstat -tulpn | grep :443
else
    echo "✅ Porta 443 livre"
fi
echo ""

# 3. Verificar configuração do Nginx
echo "3. Verificando configuração do Nginx:"
sudo nginx -t
echo ""

# 4. Iniciar Nginx
echo "4. Iniciando Nginx:"
sudo systemctl start nginx
sleep 3

if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx iniciado com sucesso!"
    sudo systemctl status nginx | head -7
else
    echo "❌ Erro ao iniciar Nginx"
    echo "Último erro:"
    sudo journalctl -xeu nginx.service --no-pager | tail -10
    exit 1
fi
echo ""

# 5. Verificar qual site está sendo servido
echo "5. Testando qual site está sendo servido:"
echo "----------------------------------------"
echo "Testando localhost:"
curl -s http://localhost | head -10
echo ""
echo "Testando com Host fabianosf.com:"
curl -s -H "Host: fabianosf.com" http://localhost | head -10
echo ""

# 6. Verificar arquivos
echo "6. Verificando arquivos do portfólio:"
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ index.html existe"
    echo "Primeiras 3 linhas:"
    head -3 /var/www/fabianosf_site/index.html
else
    echo "❌ index.html NÃO existe!"
fi
echo ""

echo "======================================"
echo "✅ Processo concluído!"
echo "======================================"
echo ""
echo "🌐 Teste agora:"
echo "   - http://fabianosf.com"
echo "   - http://92.113.33.16"
echo ""
echo "Se ainda mostrar ASBJJ, limpe o cache do navegador!"
echo ""

