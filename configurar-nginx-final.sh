#!/bin/bash

# Script para configurar Nginx para todos os sites
# Execute no servidor

echo "🔧 CONFIGURANDO NGINX PARA TODOS OS SITES"
echo "========================================="
echo ""

# 1. Parar Traefik definitivamente
echo "1. Parando Traefik:"
sudo docker stop traefik.1.rmprfa72tx7ba8zu9yn8n1a6f 2>/dev/null
sudo docker ps | grep traefik | awk '{print $1}' | xargs -r sudo docker stop 2>/dev/null
sleep 2
if sudo docker ps | grep -q traefik; then
    echo "⚠️  Traefik ainda está rodando"
else
    echo "✅ Traefik parado"
fi
echo ""

# 2. Liberar portas
echo "2. Liberando portas 80 e 443:"
PORTA_80=$(sudo lsof -ti:80 2>/dev/null)
PORTA_443=$(sudo lsof -ti:443 2>/dev/null)
if [ -n "$PORTA_80" ]; then
    sudo kill -9 $PORTA_80 2>/dev/null
fi
if [ -n "$PORTA_443" ]; then
    sudo kill -9 $PORTA_443 2>/dev/null
fi
sleep 1
echo "✅ Portas liberadas"
echo ""

# 3. Verificar configurações ativas
echo "3. Configurações ativas do Nginx:"
sudo ls -la /etc/nginx/sites-enabled/
echo ""

# 4. Verificar se index.html existe
echo "4. Verificando arquivos do portfólio:"
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ index.html existe"
    ls -la /var/www/fabianosf_site/ | head -10
else
    echo "❌ index.html NÃO existe em /var/www/fabianosf_site/"
    echo ""
    echo "💡 Você precisa enviar os arquivos da sua máquina:"
    echo "   cd /home/fabianosf/Downloads/fabianosf_site"
    echo "   ./enviar-completo.sh"
    echo ""
    echo "Ou manualmente:"
    echo "   scp -r dist/* fabianosf@92.113.33.16:/var/www/fabianosf_site/"
fi
echo ""

# 5. Verificar configuração do fabianosf_site
echo "5. Verificando configuração fabianosf_site:"
sudo grep -E "server_name|root" /etc/nginx/sites-available/fabianosf_site
echo ""

# 6. Testar configuração
echo "6. Testando configuração do Nginx:"
sudo nginx -t
echo ""

# 7. Iniciar/reiniciar Nginx
echo "7. Iniciando Nginx:"
sudo systemctl start nginx
sleep 2
if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx rodando"
    sudo systemctl status nginx | head -5
else
    echo "❌ Erro ao iniciar Nginx"
    sudo journalctl -xeu nginx.service --no-pager | tail -5
fi
echo ""

# 8. Testar sites
echo "8. Testando sites:"
echo "----------------------------------------"
echo "Teste 1 - asbjj.com.br:"
curl -s -H "Host: asbjj.com.br" http://localhost | head -3
echo ""
echo "Teste 2 - fabianosf.com:"
curl -s -H "Host: fabianosf.com" http://localhost | head -3
echo ""
echo "Teste 3 - IP direto:"
curl -s http://92.113.33.16 | head -3
echo ""

echo "======================================"
echo "✅ Configuração concluída!"
echo "======================================"
echo ""
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ Tudo configurado!"
    echo "🌐 Teste:"
    echo "   - http://asbjj.com.br (deve funcionar)"
    echo "   - http://fabianosf.com (deve funcionar)"
else
    echo "⚠️  Arquivos do portfólio não encontrados!"
    echo "💡 Execute o deploy da sua máquina primeiro"
fi
echo ""

