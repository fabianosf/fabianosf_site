#!/bin/bash

# Script para verificar o que está sendo servido
# Execute no servidor

echo "🔍 VERIFICANDO O QUE ESTÁ SENDO SERVIDO"
echo "======================================="
echo ""

# 1. Verificar se Traefik está rodando
echo "1. Verificando Traefik:"
if sudo docker ps | grep -q traefik; then
    echo "⚠️  Traefik AINDA está rodando!"
    sudo docker ps | grep traefik
else
    echo "✅ Traefik parado"
fi
echo ""

# 2. Verificar portas
echo "2. Verificando portas 80 e 443:"
sudo netstat -tulpn | grep -E ":80|:443"
echo ""

# 3. Testar qual site está sendo servido
echo "3. Testando qual site está sendo servido:"
echo "----------------------------------------"
echo "Teste 1 - localhost:"
curl -s http://localhost | head -15
echo ""
echo "Teste 2 - com Host fabianosf.com:"
curl -s -H "Host: fabianosf.com" http://localhost | head -15
echo ""
echo "Teste 3 - com IP:"
curl -s http://92.113.33.16 | head -15
echo ""

# 4. Verificar configuração ativa do Nginx
echo "4. Configuração ativa do Nginx:"
echo "----------------------------------------"
sudo ls -la /etc/nginx/sites-enabled/
echo ""
echo "Conteúdo de fabianosf_site:"
sudo grep -E "server_name|root" /etc/nginx/sites-enabled/fabianosf_site
echo ""

# 5. Verificar arquivos
echo "5. Verificando arquivos:"
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ index.html existe"
    echo "Primeiras 5 linhas (deve ser portfólio):"
    head -5 /var/www/fabianosf_site/index.html
else
    echo "❌ index.html NÃO existe!"
fi
echo ""

# 6. Verificar logs do Nginx
echo "6. Últimos acessos no Nginx:"
sudo tail -5 /var/log/nginx/access.log 2>/dev/null || echo "Log não encontrado"
echo ""

echo "======================================"
echo "📋 DIAGNÓSTICO:"
echo "======================================"
echo ""
if sudo docker ps | grep -q traefik; then
    echo "⚠️  PROBLEMA: Traefik ainda está rodando!"
    echo "   Execute: sudo docker stop traefik.1.rmprfa72tx7ba8zu9yn8n1a6f"
else
    echo "✅ Traefik parado"
fi
echo ""
if curl -s -H "Host: fabianosf.com" http://localhost | grep -qi "asbjj\|jiu-jitsu"; then
    echo "⚠️  PROBLEMA: Ainda está servindo ASBJJ!"
    echo "   Pode ser cache do navegador ou configuração errada"
else
    echo "✅ Parece estar servindo o site correto"
fi
echo ""

